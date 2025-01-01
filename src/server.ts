import express from 'express';
import TelegramBot from 'node-telegram-bot-api';
import { v4 as uuidv4 } from 'uuid';
import { config } from './config';
import { commandStore } from './commandStore';
import { Command, CommandResult } from './types';

const app = express();
const bot = new TelegramBot(config.telegramToken, { polling: true });

app.use(express.json());

// Handle incoming telegram messages
bot.on('message', (msg) => {
    if (!msg.text?.startsWith(config.commandPrefix)) return;

    const args = msg.text.split(' ');
    const command: Command = {
        id: uuidv4(),
        chatId: msg.chat.id,
        command: args[0],
        args: args.slice(1),
        timestamp: Date.now(),
        status: 'pending'
    };

    commandStore.addCommand(command);
    bot.sendMessage(msg.chat.id, `Command received. ID: ${command.id}`);
});

// API endpoint to get pending commands
app.get('/api/commands/:prefix', (req, res) => {
    const prefix = config.commandPrefix + req.params.prefix;
    const commands = commandStore.getPendingCommands(prefix);
    res.json(commands);
});

// API endpoint to submit command results
app.post('/api/results', async (req, res) => {
    const result: CommandResult = req.body;
    const command = commandStore.getCommand(result.commandId);

    if (!command) {
        return res.status(404).json({ error: 'Command not found' });
    }

    commandStore.updateCommandStatus(command.id, 'completed');
    await bot.sendMessage(command.chatId, 
        `Result for command ${command.command}:\n${result.result}`);

    res.json({ success: true });
});

app.listen(config.serverPort, () => {
    console.log(`Server running on port ${config.serverPort}`);
});
