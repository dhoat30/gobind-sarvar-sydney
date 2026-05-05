import { NextResponse } from "next/server";

const PAYWAY_API_URL = "https://api.payway.com.au/rest/v1/transactions";
const secretApiKey =
  process.env.WESTPAC_SECRET_KEY ||
  process.env.WESTPAC_PAYWAY_SECRET_KEY ||
  process.env.PAYWAY_SECRET_KEY;
  
const merchantId =
  process.env.WESTPAC_MERCHANT_ID ||
  process.env.WESTPAC_PAYWAY_MERCHANT_ID ||
  process.env.PAYWAY_MERCHANT_ID;
const isDevelopment = process.env.NODE_ENV !== "production";

function buildDebugResponse(response, data) {
  if (!isDevelopment) {
    return undefined;
  }

  return {
    httpStatus: response.status,
    httpStatusText: response.statusText,
    body: data,
  };
}

function parsePayWayResponse(responseText) {
  if (!responseText) {
    return {};
  }

  try {
    return JSON.parse(responseText);
  } catch {
    return { rawBody: responseText };
  }
}

function getPayWayMessage(data) {
  if (data?.responseText) {
    return data.responseText;
  }

  if (Array.isArray(data?.data) && data.data.length > 0) {
    return data.data
      .map((item) => [item.fieldName, item.message].filter(Boolean).join(": "))
      .filter(Boolean)
      .join(" ");
  }

  return "Payment was not approved.";
}

function getCustomerIpAddress(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip") || "";
}

function normalizeAmount(value) {
  const amount = Number.parseFloat(String(value));

  if (!Number.isFinite(amount) || amount < 1 || amount > 100000) {
    return null;
  }

  return amount.toFixed(2);
}

function createReference() {
  return `DON${Date.now().toString(36).toUpperCase()}`.slice(0, 20);
}

export async function POST(request) {
  if (!secretApiKey || !merchantId) {
    return NextResponse.json(
      {
        success: false,
        message:
          "PayWay is not fully configured. Add WESTPAC_SECRET_KEY and WESTPAC_MERCHANT_ID.",
      },
      { status: 500 },
    );
  }

  const body = await request.json().catch(() => null);
  const singleUseTokenId = body?.singleUseTokenId;
  const principalAmount = normalizeAmount(body?.amount);

  if (!singleUseTokenId || !principalAmount) {
    return NextResponse.json(
      {
        success: false,
        message: "Please enter a valid donation amount and card details.",
      },
      { status: 400 },
    );
  }

  const reference = createReference();
  const formData = new URLSearchParams();
  formData.append("singleUseTokenId", singleUseTokenId);
  formData.append("customerNumber", reference);
  formData.append("transactionType", "payment");
  formData.append("principalAmount", principalAmount);
  formData.append("currency", "aud");
  formData.append("orderNumber", reference);
  formData.append("merchantId", merchantId);

  const customerIpAddress = getCustomerIpAddress(request);

  if (customerIpAddress) {
    formData.append("customerIpAddress", customerIpAddress);
  }

  try {
    const response = await fetch(PAYWAY_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${secretApiKey}:`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "Idempotency-Key": crypto.randomUUID(),
      },
      body: formData,
    });
    const responseText = await response.text();
    const data = parsePayWayResponse(responseText);
    const paywayDebug = buildDebugResponse(response, data);

    console.log(
      "PayWay API response:",
      JSON.stringify(
        {
          httpStatus: response.status,
          httpStatusText: response.statusText,
          body: data,
        },
        null,
        2,
      ),
    );

    if (!response.ok || data.status === "declined" || data.status === "suspended") {
      return NextResponse.json(
        {
          success: false,
          message: getPayWayMessage(data),
          transaction: data,
          payway: paywayDebug,
        },
        { status: response.ok ? 402 : response.status },
      );
    }

    return NextResponse.json({
      success: true,
      transaction: {
        receiptNumber: data.receiptNumber,
        status: data.status,
        transactionId: data.transactionId,
      },
      payway: paywayDebug,
    });
  } catch (error) {
    console.error("PayWay payment error", error);
    return NextResponse.json(
      {
        success: false,
        message: "Payment service is unavailable. Please try again later.",
      },
      { status: 502 },
    );
  }
}
