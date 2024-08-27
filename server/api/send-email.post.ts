import type { H3Error, H3Event } from 'h3'
import { defineEventHandler, readBody } from 'h3'
import rateLimit from 'express-rate-limit'

const runtimeConfig = useRuntimeConfig()
// Set up the rate limiter
const emailLimiter = rateLimit({
  windowMs: 1 * 60 * 60 * 1000, // 1 hour
  max: 1, // Limit each IP to 1 request per hour
  message: 'You have reached the limit of 1 email per hour from this IP.',
  standardHeaders: true,
  legacyHeaders: false,
})

function withRateLimit(handler: any) {
  return async (event: any) => {
    const ip = event.node.req.headers['x-forwarded-for'] || event.node.req.connection.remoteAddress || '127.0.0.1'
    if (ip === '127.0.0.1') {
      return handler(event)
    }

    return new Promise((resolve, reject) => {
      emailLimiter(event.node.req, event.node.res, async (err: H3Error) => {
        if (err) {
          reject(err)
        }
        else {
          try {
            const result = await handler(event)
            resolve(result)
          }
          catch (error) {
            reject(error)
          }
        }
      })
    })
  }
}

export default defineEventHandler(withRateLimit(async (event: H3Event) => {
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
  // await new Promise(resolve => setTimeout(resolve, 1500))
  // return 'OK'
  const response = await $fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return response
}))