# Razorpay Backend

This is a minimal Express backend used to create Razorpay orders and verify payments for the Verdha Links landing page.

Setup

1. Copy `.env.example` to `.env` and set your Razorpay keys (for local development):

   RAZORPAY_KEY_ID=your_key_id
   RAZORPAY_KEY_SECRET=your_key_secret
   PORT=5000

2. Install dependencies and start:

   npm install
   npm start

API Endpoints

- POST /create-order
  - Body: { amount: <number in rupees> }
  - Returns: Razorpay order object (amount in paise)

- POST /verify-payment
  - Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
  - Returns success boolean

Notes

- Do not commit real secrets. Use environment variables (Vercel/Netlify) for production.
