import { defineEventHandler, getRequestHeaders, readBody } from 'h3'
import type { H3Event } from 'h3'

const requestTimestamps: Record<string, number> = {}

const runtimeConfig = useRuntimeConfig()

export default defineEventHandler(async (event: H3Event) => {
  try {
    // Get the user's IP address from the request headers
    const headers = getRequestHeaders(event)
    const ip = headers['x-forwarded-for']?.split(',')[0].trim()
      || headers['cf-connecting-ip']
      || event.node.req.socket.remoteAddress

    if (!ip) {
      throw new Error('Unable to determine IP address')
    }

    const now = Date.now()
    const lastRequestTime = requestTimestamps[ip]
    if (lastRequestTime && now - lastRequestTime < 3600000) {
      const error = new Error('Too many requests. You can only send one email per hour.') as any
      error.statusCode = 429
      throw error
    }

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

    const response = await $fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (response === 'OK') {
      return 'OK'
    }
    throw new Error('Failed to send email')
  }
  catch (e) {
    return e
  }
})