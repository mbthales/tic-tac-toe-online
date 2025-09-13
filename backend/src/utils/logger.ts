import pino from 'pino'

export const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport:
    process.env.NODE_ENV === 'development'
      ? {
          target: 'pino-pretty',
          options: { colorize: true },
        }
      : undefined,
})

export const logRequest = (method: string, pathname: string) => {
  logger.info(`HTTP Request - ${method} ${pathname}`)
}

export const logWebSocket = (event: string, message?: string) => {
  const logMessage = message
    ? `WebSocket ${event} - ${message.slice(0, 50)}...`
    : `WebSocket ${event}`

  logger.info(logMessage)
}
