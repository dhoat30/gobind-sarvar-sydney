"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Script from "next/script";
import styles from "./PayWayDonationForm.module.scss";

const presetAmounts = [25, 50, 100, 250];

function normalizeAmount(value) {
  return value.replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1");
}

export default function PayWayDonationForm({ publishableApiKey }) {
  const frameId = useId().replaceAll(":", "");
  const frameContainerId = `payway-credit-card-${frameId}`;
  const frameRef = useRef(null);
  const [amount, setAmount] = useState("50.00");
  const [scriptReady, setScriptReady] = useState(false);
  const [cardValid, setCardValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [receipt, setReceipt] = useState(null);

  const parsedAmount = useMemo(() => Number.parseFloat(amount), [amount]);
  const canSubmit =
    Boolean(publishableApiKey) &&
    scriptReady &&
    cardValid &&
    !isSubmitting &&
    Number.isFinite(parsedAmount) &&
    parsedAmount >= 1;

  useEffect(() => {
    if (!scriptReady || !publishableApiKey || !window.payway) {
      return undefined;
    }

    let destroyed = false;

    window.payway.createCreditCardFrame(
      {
        publishableApiKey,
        container: frameContainerId,
        layout: "narrow",
        tokenMode: "callback",
        style: {
          ".payway-card label": {
            color: "#44474f",
          },
          ".payway-card input": {
            color: "#1a1b20",
          },
          ".payway-card select": {
            color: "#1a1b20",
          },
        },
        onValid: () => setCardValid(true),
        onInvalid: () => setCardValid(false),
      },
      (error, frame) => {
        if (destroyed) {
          frame?.destroy?.();
          return;
        }

        if (error) {
          setStatus({
            type: "error",
            message: error.message || "Unable to load the secure card form.",
          });
          return;
        }

        frameRef.current = frame;
      },
    );

    return () => {
      destroyed = true;
      frameRef.current?.destroy?.();
      frameRef.current = null;
    };
  }, [publishableApiKey, scriptReady]);

  function handleAmountChange(event) {
    setAmount(normalizeAmount(event.target.value));
    setReceipt(null);
  }

  async function submitPayment(singleUseTokenId) {
    const response = await fetch("/api/payway/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        singleUseTokenId,
      }),
    });

    const data = await response.json();

    console.log("PayWay transaction response:", {
      httpStatus: response.status,
      httpStatusText: response.statusText,
      body: data,
    });

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Payment could not be processed.");
    }

    return data;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!canSubmit || !frameRef.current) {
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });
    setReceipt(null);

    frameRef.current.getToken(async (error, data) => {
      if (error) {
        console.error("PayWay token error:", error);
        setStatus({
          type: "error",
          message: error.message || "Unable to securely tokenise the card.",
        });
        setIsSubmitting(false);
        return;
      }

      try {
        console.log("PayWay token created:", {
          singleUseTokenId: data.singleUseTokenId,
          paymentMethod: data.paymentMethod,
          creditCard: data.creditCard,
        });
        const result = await submitPayment(data.singleUseTokenId);
        setReceipt(result.transaction);
        setStatus({
          type: "success",
          message: "Thank you. Your donation has been processed successfully.",
        });
      } catch (paymentError) {
        setStatus({
          type: "error",
          message:
            paymentError instanceof Error
              ? paymentError.message
              : "Payment could not be processed.",
        });
      } finally {
        setIsSubmitting(false);
      }
    });
  }

  if (!publishableApiKey) {
    return (
      <div className={styles.paymentCard}>
        <h3>Card Donation</h3>
        <p className={styles.helperText}>
          PayWay is almost ready. Add your Westpac publishable key to enable card
          donations.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.paymentCard}>
      <Script
        src="https://api.payway.com.au/rest/v1/payway.js"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />

      <h3>Donate by Card</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field}>
          <span>Donation amount</span>
          <span className={styles.amountInput}>
            <span>$</span>
            <input
              inputMode="decimal"
              min="1"
              name="amount"
              onChange={handleAmountChange}
              placeholder="50.00"
              type="text"
              value={amount}
            />
          </span>
        </label>

        <div className={styles.amountButtons} aria-label="Preset amounts">
          {presetAmounts.map((preset) => (
            <button
              aria-pressed={Number(amount) === preset}
              key={preset}
              onClick={() => {
                setAmount(`${preset}.00`);
                setReceipt(null);
              }}
              type="button"
            >
              ${preset}
            </button>
          ))}
        </div>

        <div className={styles.cardFrame} id={frameContainerId} />

        <button className={styles.submitButton} disabled={!canSubmit} type="submit">
          {isSubmitting ? "Processing..." : "Donate securely"}
        </button>

        {status.message && (
          <p className={`${styles.status} ${styles[status.type]}`}>
            {status.message}
          </p>
        )}

        {receipt?.receiptNumber && (
          <p className={styles.receipt}>Receipt number: {receipt.receiptNumber}</p>
        )}
      </form>
    </div>
  );
}
