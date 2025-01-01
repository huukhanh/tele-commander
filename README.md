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

## Running as System Service

The application can be configured to run automatically on system boot using systemd.

### Prerequisites
- Linux system with systemd
- Root/sudo access
- Node.js installed system-wide

### Installation Steps

1. Configure environment:
```bash
# Copy environment template
cp .env.example .env

# Edit environment file with your settings
nano .env
```

2. Build the application:
```bash
npm install
npm run build
```

3. Install systemd service:
```bash
# For current user
sudo ./systemd/install.sh

# For specific user
sudo ./systemd/install.sh username
```

4. Start and enable the service:
```bash
# Replace 'username' with your username
sudo systemctl start tele-commander@username.service
sudo systemctl enable tele-commander@username.service
```

### Service Management

Common systemd commands:
```bash
# Check service status
sudo systemctl status tele-commander@username.service

# View logs
sudo journalctl -u tele-commander@username.service -f

# Restart service
sudo systemctl restart tele-commander@username.service

# Stop service
sudo systemctl stop tele-commander@username.service

# Disable autostart
sudo systemctl disable tele-commander@username.service
```

### Updating the Application

When updating the application:
```bash
# Pull latest changes
git pull

# Install dependencies and rebuild
npm install
npm run build

# Restart the service
sudo systemctl restart tele-commander@username.service
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
