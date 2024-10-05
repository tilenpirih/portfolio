import type { H3Event } from 'h3'
import { defineEventHandler, getRequestHeaders } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const memoryUsage = process.memoryUsage()

  const headers = getRequestHeaders(event)

  const formattedMemoryUsageInMB = {
    rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
    heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
    heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
    external: `${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`,
  }
  const snapshot = {
    memoryUsage,
    formattedMemoryUsageInMB,
    headers,
    timestamp: new Date().toISOString(),
  }

  return snapshot
})