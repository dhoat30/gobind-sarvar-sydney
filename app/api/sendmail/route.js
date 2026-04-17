import { NextResponse } from "next/server";

const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
const API_KEY = process.env.MAILGUN_API_KEY;
const EMAIL_TO = process.env.EMAIL_TO;
const MAILGUN_FROM_EMAIL = process.env.MAILGUN_FROM_EMAIL;
const MAILGUN_FROM_NAME = process.env.MAILGUN_FROM_NAME || "Gobind Sarvar Sydney";
const MAILGUN_SUBJECT_PREFIX = process.env.MAILGUN_SUBJECT_PREFIX || "Website enquiry";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "";

const defaultSenderEmail = MAILGUN_DOMAIN ? `forms@${MAILGUN_DOMAIN}` : "";
const senderEmail = MAILGUN_FROM_EMAIL || defaultSenderEmail;
const sender = senderEmail ? `${MAILGUN_FROM_NAME} <${senderEmail}>` : "";

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeSingleLine(value = "") {
  return String(value).replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
}

function normalizeEmail(value = "") {
  return String(value).trim().replace(/[\r\n]+/g, "");
}

function buildSubject(formName = "") {
  const normalizedFormName = normalizeSingleLine(formName);

  if (!normalizedFormName) {
    return MAILGUN_SUBJECT_PREFIX;
  }

  return `${MAILGUN_SUBJECT_PREFIX}: ${normalizedFormName}`;
}

function buildTextBody({ formName, email, message }) {
  const sections = [
    `${MAILGUN_FROM_NAME} website enquiry`,
    formName ? `Form: ${normalizeSingleLine(formName)}` : null,
    email ? `Reply to: ${normalizeEmail(email)}` : null,
    SITE_URL ? `Website: ${SITE_URL}` : null,
    "",
    "Submission details:",
    message?.trim() || "No message provided.",
  ].filter(Boolean);

  return sections.join("\n");
}

function buildHtmlBody({ formName, email, message }) {
  const safeFormName = normalizeSingleLine(formName);
  const safeEmail = normalizeEmail(email);
  const safeMessage = escapeHtml(message?.trim() || "No message provided.").replace(/\n/g, "<br />");
  const safeSiteUrl = escapeHtml(SITE_URL);

  return `
    <div style="margin:0;padding:24px;background:#f4f1eb;font-family:Arial,sans-serif;color:#1f2933;">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e5ded2;border-radius:16px;overflow:hidden;">
        <div style="padding:24px 28px;background:#16302b;color:#ffffff;">
          <p style="margin:0 0 6px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.78;">Website enquiry</p>
          <h1 style="margin:0;font-size:24px;line-height:1.3;font-weight:700;">${escapeHtml(MAILGUN_FROM_NAME)}</h1>
        </div>
        <div style="padding:28px;">
          <table role="presentation" width="100%" style="border-collapse:collapse;margin-bottom:24px;">
            <tbody>
              <tr>
                <td style="padding:0 0 12px;font-size:14px;color:#52606d;width:160px;">Form</td>
                <td style="padding:0 0 12px;font-size:14px;color:#102a43;font-weight:600;">${escapeHtml(safeFormName || "Website form")}</td>
              </tr>
              <tr>
                <td style="padding:0 0 12px;font-size:14px;color:#52606d;">Reply to</td>
                <td style="padding:0 0 12px;font-size:14px;color:#102a43;font-weight:600;">${escapeHtml(safeEmail || "Not supplied")}</td>
              </tr>
              ${safeSiteUrl ? `
              <tr>
                <td style="padding:0;font-size:14px;color:#52606d;">Website</td>
                <td style="padding:0;font-size:14px;color:#102a43;font-weight:600;">${safeSiteUrl}</td>
              </tr>` : ""}
            </tbody>
          </table>
          <div style="padding:20px;border-radius:12px;background:#f8fafc;border:1px solid #d9e2ec;">
            <p style="margin:0 0 12px;font-size:14px;font-weight:700;color:#102a43;">Submission details</p>
            <p style="margin:0;font-size:14px;line-height:1.7;color:#243b53;">${safeMessage}</p>
          </div>
        </div>
      </div>
    </div>
  `.trim();
}

export async function POST(req) {
  const { email, message, formName } = await req.json();

  if (!MAILGUN_DOMAIN || !API_KEY || !EMAIL_TO || !sender) {
    return NextResponse.json(
      {
        message: "Mail configuration is incomplete.",
        success: false,
      },
      { status: 500 },
    );
  }

  const url = `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;
  const formData = new URLSearchParams();
  const replyToEmail = normalizeEmail(email);
  const subject = buildSubject(formName);
  const textBody = buildTextBody({ formName, email: replyToEmail, message });
  const htmlBody = buildHtmlBody({ formName, email: replyToEmail, message });

  // Send from a domain-owned mailbox so SPF/DKIM can align.
  formData.append("from", sender);
  formData.append("to", EMAIL_TO);
  formData.append("subject", subject);
  formData.append("text", textBody);
  formData.append("html", htmlBody);
  formData.append("h:Auto-Submitted", "auto-generated");
  formData.append("h:X-Auto-Response-Suppress", "All");

  if (replyToEmail) {
    formData.append("h:Reply-To", replyToEmail);
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`api:${API_KEY}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed", success: false, data },
        { status: response.status },
      );
    }

    return NextResponse.json(
      { message: "This Worked", success: true, data },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Unknown mail error",
        success: false,
      },
      { status: 400 },
    );
  }
}
