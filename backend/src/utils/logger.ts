import pino from 'pino'

export const logger = pino({
  level: 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
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
