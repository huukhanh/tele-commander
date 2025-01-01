export const config = {
    telegramToken: process.env.TELEGRAM_BOT_TOKEN || '',
    serverPort: parseInt(process.env.SERVER_PORT || '3000'),
    commandPrefix: '/',
}
