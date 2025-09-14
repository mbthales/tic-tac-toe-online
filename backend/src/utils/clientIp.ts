import type { Server } from 'bun'

export const getClientIP = (req: Request, server: Server) => {
  const ip = server.requestIP(req)?.address

  if (!ip) {
    return undefined
  }

  return normalizeToIPv4(ip)
}

const normalizeToIPv4 = (ip: string): string => {
  if (ip === '::1') {
    return '127.0.0.1'
  }

  if (ip.startsWith('::ffff:')) {
    return ip.substring(7)
  }

  if (ip === '::') {
    return '0.0.0.0'
  }

  return ip
}
