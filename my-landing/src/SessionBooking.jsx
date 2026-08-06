import React, { useEffect, useRef, useState } from "react";

const backendBaseUrl =
  import.meta.env.VITE_BACKEND_URL ||
  (import.meta.env.DEV
    ? "http://localhost:5000"
    : "https://landeng.onrender.com");

const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_live_SRqgDd9YMwmeZw";
const calendlyUrl = "https://calendly.com/linksvardha/60min";
const SESSION_PRICE = 7999; // Change this value to update the price

function ensureCalendlyStyles() {
  if (typeof window === "undefined") return;

  const styleHref = "https://assets.calendly.com/assets/external/widget.css";
  const existingStyle = document.querySelector(`link[href="${styleHref}"]`);
  if (existingStyle) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = styleHref;
  document.head.appendChild(link);
}

function loadCalendlyScript() {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return resolve();
    if (window.Calendly && typeof window.Calendly.initInlineWidget === "function") return resolve();

    const scriptSrc = "https://assets.calendly.com/assets/external/widget.js";
    const existing = document.querySelector(`script[src="${scriptSrc}"]`);

    const onLoad = () => resolve();
    const onError = () => reject(new Error("Calendly script failed to load"));

    if (existing) {
      existing.addEventListener("load", onLoad, { once: true });
      existing.addEventListener("error", onError, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    script.onload = onLoad;
    script.onerror = onError;
    document.body.appendChild(script);
  });
}

function loadRazorpayScript() {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return resolve();
    if (window.Razorpay) return resolve();

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Razorpay script failed to load"));
    document.head.appendChild(script);
  });
}

export default function SessionBooking() {
  const [loading, setLoading] = useState(false);
  const [calendlyReady, setCalendlyReady] = useState(false);
  const [calendlyError, setCalendlyError] = useState("");
  const [showFullNote, setShowFullNote] = useState(false);
  const calendlyContainerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const initCalendly = async () => {
      try {
        ensureCalendlyStyles();
        await loadCalendlyScript();

        if (!isMounted) return;

        const hasCalendlyApi = window.Calendly && typeof window.Calendly.initInlineWidget === "function";
        if (!hasCalendlyApi || !calendlyContainerRef.current) {
          setCalendlyError("Calendly could not be initialized.");
          return;
        }

        calendlyContainerRef.current.innerHTML = "";
        window.Calendly.initInlineWidget({
          url: `${calendlyUrl}?hide_gdpr_banner=1`,
          parentElement: calendlyContainerRef.current,
        });
        setCalendlyReady(true);
        setCalendlyError("");
      } catch (err) {
        if (!isMounted) return;
        setCalendlyError("Calendly load nahi hua. Neeche direct link use karein.");
      }
    };

    initCalendly();

    return () => {
      isMounted = false;
    };
  }, []);

  const openPayment = async () => {
    setLoading(true);

    try {
      await loadRazorpayScript();

      const res = await fetch(`${backendBaseUrl}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 7999}),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || "Failed to create order");
      }

      const order = await res.json();

      const options = {
        key: razorpayKeyId,
        amount: order.amount,
        currency: "INR",
        name: "Arunn Guptaa",
        description: "1-on-1 Guidance Session",
        order_id: order.id,
        handler: function () {
          alert("Payment successful! Your session is booked in Calendly.");
          setLoading(false);
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
        theme: { color: "#F6C84C" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response) => {
        const reason = response?.error?.description || "Payment failed";
        alert(reason);
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Could not initiate payment: " + (err.message || err));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-yellow-700">Book Your Session</h1>
        <p className="text-center text-zinc-700 mb-1">
          Step 1: Book your preferred slot in Calendly. Step 2: Click Pay Now below to confirm.
        </p>

        <div className="text-center mb-1">
          <div className="inline-block bg-yellow-100 border-2 border-yellow-400 rounded-lg px-4 py-2 shadow-md relative">
            <p className="text-yellow-800 font-semibold">
              Payment option is available below after booking your slot.
            </p>
            <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-yellow-400"></div>
          </div>
        </div>

        <div
          ref={calendlyContainerRef}
          className="w-full"
          style={{ minWidth: "100%", height: "720px" }}
        ></div>

        {!calendlyReady && !calendlyError && (
          <p className="text-center mt-3 text-sm text-zinc-600">Calendly load ho raha hai...</p>
        )}

        {calendlyError && (
          <p className="text-center mt-3 text-sm text-red-600">{calendlyError}</p>
        )}

        <div className="mt-6 max-w-xl mx-auto rounded-2xl border border-yellow-300 bg-yellow-50 p-5 text-center shadow-sm">
          <p className="text-sm text-zinc-700 mb-3">After selecting your slot, click below to complete payment.</p>
          <button
            onClick={openPayment}
            disabled={loading}
            className={`px-8 py-3 rounded-xl font-bold text-black transition-all duration-300 bg-gradient-to-r from-yellow-300 to-yellow-500 shadow-lg ${loading ? "opacity-60 cursor-not-allowed" : "hover:shadow-xl hover:scale-105"}`}
          >
            {loading ? "Opening Payment..." : `Pay Now ₹${SESSION_PRICE}`}
          </button>
          <p className="mt-2 text-xs text-zinc-600">* Fees refundable if you are not satisfied.</p>
        </div>

        <div className="mt-4 max-w-4xl mx-auto bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-sm text-red-800 font-medium">
            Terms and Conditions: {showFullNote ? "If anyone books a session but does not make the payment, the session will be declined. Also, please ensure that the details filled during session booking are accurate; if there is a mismatch in details, the session will not be considered valid." : "If anyone books a session but does not make the payment, the session will be declined..."}
            {!showFullNote && (
              <button
                onClick={() => setShowFullNote(true)}
                className="text-blue-600 underline ml-2"
              >
                Show More
              </button>
            )}
          </p>
        </div>

        <p className="text-center mt-6 text-zinc-600 text-sm">
          If Calendly does not load, open directly: <a className="text-yellow-700 underline" href="https://calendly.com/linksvardha/60min" target="_blank" rel="noreferrer">Calendly — 60min</a>
        </p>
      </div>
    </div>
  );
}
