# Tele-Commander

A Telegram bot-based command distribution system that allows multiple programs to receive commands from Telegram and send results back.

## Features

- Receive commands from Telegram
- Distribute commands to different programs based on command prefixes
- Handle command results and send them back to Telegram
- RESTful API for command retrieval and result submission

## Prerequisites

- Node.js (v14 or higher)
- npm
- A Telegram bot token (get it from [@BotFather](https://t.me/botfather))

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tele-commander.git
cd tele-commander
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
export TELEGRAM_BOT_TOKEN="your-bot-token"
export SERVER_PORT=3000
```

4. Build and start the server:
```bash
npm run build
npm start
```

For development, you can use:
```bash
npm run dev
```

## API Endpoints

### Get Commands
```
GET /api/commands/:prefix
```
Retrieves pending commands for a specific prefix.

Example:
```bash
curl http://localhost:3000/api/commands/test
```

### Submit Results
```
POST /api/results
```
Submit command results back to the system.

Example:
```bash
curl -X POST http://localhost:3000/api/results \
  -H "Content-Type: application/json" \
  -d '{"commandId":"command-uuid","result":"Task completed","status":"success"}'
```

## Usage Example

1. Send a command in Telegram:
```
/test hello world
```

2. The bot will respond with a command ID:
```
Command received. ID: 123e4567-e89b-12d3-a456-426614174000
```

3. Your program can fetch pending commands:
```bash
curl http://localhost:3000/api/commands/test
```

4. Process the command and send back results:
```bash
curl -X POST http://localhost:3000/api/results \
  -H "Content-Type: application/json" \
  -d '{
    "commandId":"123e4567-e89b-12d3-a456-426614174000",
    "result":"Hello World command executed successfully",
    "status":"success"
  }'
```

5. The bot will send the result back to the Telegram chat:
```
Result for command /test:
Hello World command executed successfully
```

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
