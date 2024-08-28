import { defineEventHandler, getRequestHeaders, readBody } from 'h3'
import type { H3Event } from 'h3'

// Use a simple in-memory store for demonstration
// In a production app, consider using Redis or a database
const requestTimestamps: Record<string, number> = {}

const runtimeConfig = useRuntimeConfig()

export default defineEventHandler(async (event: H3Event) => {
  try {
    // Get the user's IP address from the request headers
    const headers = getRequestHeaders(event)
    const ip = headers['x-forwarded-for']?.split(',')[0].trim()
      || headers['cf-connecting-ip']
      || event.node.req.socket.remoteAddress
    console.log(ip)

    if (!ip) {
      throw new Error('Unable to determine IP address')
    }

    // Check if the user has made a request within the last hour
    const now = Date.now()
    const lastRequestTime = requestTimestamps[ip]

    if (lastRequestTime && now - lastRequestTime < 3600000) { // 1 hour in milliseconds
      return {
        statusCode: 429,
        statusMessage: 'Too many requests. You can only send one email per hour.',
      }
    }

    // Update the last request time for this IP
    requestTimestamps[ip] = now

    const body = await readBody(event)
    const data = {
      service_id: runtimeConfig.EMAILJS_SERVICE_ID,
      template_id: runtimeConfig.EMAILJS_TEMPLATE_ID,
      user_id: runtimeConfig.EMAILJS_PUBLIC_KEY,
      accessToken: runtimeConfig.EMAILJS_PRIVATE_KEY,
      template_params: {
        fullName: body.fullName,
        message: body.message,
        email: body.email,
      },
    }

    await new Promise(resolve => setTimeout(resolve, 1500))
    return {
      statusCode: 200,
      statusMessage: 'Email sent successfully!',
    }

    const response = await $fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (response === 'OK') {
      return {
        statusCode: 200,
        statusMessage: 'Email sent successfully!',
      }
    }
    return {
      statusCode: 500,
      statusMessage: 'Failed to send email',
    }
  }
  catch (e) {
    return e
  }
})