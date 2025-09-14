const rateLimit = 5
const rateLimitWindowMS = 15 * 1000 // 15 seconds
const ipRequests: { ip: string; count: number; timestamp: number }[] = []

export const isRateLimited = (ip: string) => {
  const currentTime = Date.now()
  const ipRequest = ipRequests.find((req) => req.ip === ip)

  if (!ipRequest) {
    ipRequests.push({ ip, count: 1, timestamp: currentTime })
    return false
  }

  if (currentTime - ipRequest.timestamp > rateLimitWindowMS) {
    ipRequest.count = 1
    ipRequest.timestamp = currentTime
    return false
  }

  if (ipRequest.count >= rateLimit) {
    return true
  }

  ipRequest.count++

  return false
}
