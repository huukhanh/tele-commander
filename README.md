# Tele-Commander

A Telegram bot-based command distribution system that allows multiple programs to receive commands from Telegram and send results back.

## Features

- Receive and process commands from Telegram
- Distribute commands to different programs based on command prefixes
- Filter and retrieve commands by status and prefix
- Pagination support for command listing
- Handle command results and send them back to Telegram
- RESTful API for command management

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

For development:
```bash
npm run dev
```

## API Endpoints

### List Commands with Filters
```
GET /api/commands
```
Retrieve commands with optional filtering and pagination.

Query Parameters:
- `status`: Filter by command status (pending/processing/completed/failed)
- `prefix`: Filter by command prefix
- `limit`: Number of items per page (default: 10)
- `offset`: Page offset for pagination (default: 0)

Example:
```bash
# Get all pending commands
curl http://localhost:3000/api/commands?status=pending

# Get completed commands with prefix '/test'
curl http://localhost:3000/api/commands?status=completed&prefix=/test

# Get paginated results
curl http://localhost:3000/api/commands?limit=5&offset=10
```

### Get Pending Commands by Prefix
```
GET /api/commands/:prefix
```
Retrieves pending commands for a specific prefix.

Example:
```bash
curl http://localhost:3000/api/commands/test
```

### Submit Command Results
```
POST /api/results
```
Submit command execution results back to the system.

Request Body:
```json
{
  "commandId": "string",
  "result": "string",
  "status": "success" | "error"
}
```

Example:
```bash
curl -X POST http://localhost:3000/api/results \
  -H "Content-Type: application/json" \
  -d '{
    "commandId": "123e4567-e89b-12d3-a456-426614174000",
    "result": "Task completed successfully",
    "status": "success"
  }'
```

## Usage Example

### 1. Command Submission
Send a command in Telegram:
```
/test hello world
```

Bot response:
```
Command received. ID: 123e4567-e89b-12d3-a456-426614174000
```

### 2. Command Retrieval
Your program can fetch commands using any of these methods:

```bash
# Get all pending commands
curl http://localhost:3000/api/commands?status=pending

# Get specific prefix commands
curl http://localhost:3000/api/commands/test

# Get filtered and paginated commands
curl http://localhost:3000/api/commands?status=pending&prefix=/test&limit=5
```

### 3. Result Submission
Process the command and send back results:
```bash
curl -X POST http://localhost:3000/api/results \
  -H "Content-Type: application/json" \
  -d '{
    "commandId": "123e4567-e89b-12d3-a456-426614174000",
    "result": "Command executed successfully",
    "status": "success"
  }'
```

The bot will send the result back to the Telegram chat:
```
Result for command /test:
Command executed successfully
```

## Development

### Project Structure
```
src/
  ├── config.ts       # Configuration settings
  ├── types.ts        # TypeScript interfaces
  ├── commandStore.ts # Command storage and management
  └── server.ts       # Main server implementation
```

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
