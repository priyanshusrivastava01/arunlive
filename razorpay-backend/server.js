// Local development server for Hono app
import { serve } from '@hono/node-server'
import app from './index.js'
import dotenv from 'dotenv'

dotenv.config()

// Create a modified app with environment variables
const wrappedApp = app

// Override env access for local development
const originalFetch = wrappedApp.fetch.bind(wrappedApp)
wrappedApp.fetch = (request, env, ctx) => {
  // Inject process.env as c.env for local development
  const localEnv = {
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    META_PIXEL_ID: process.env.META_PIXEL_ID,
    META_ACCESS_TOKEN: process.env.META_ACCESS_TOKEN,
    MONGODB_URI: process.env.MONGO_URI || process.env.MONGODB_URI,
  }
  
  return originalFetch(request, localEnv, ctx)
}

const port = process.env.PORT || 5000

console.log(`🚀 Server running on http://localhost:${port}`)

serve({
  fetch: wrappedApp.fetch,
  port
})
