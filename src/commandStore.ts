import { Command } from './types';

class CommandStore {
    private commands: Map<string, Command> = new Map();

    addCommand(command: Command) {
        this.commands.set(command.id, command);
    }

    getCommand(id: string): Command | undefined {
        return this.commands.get(id);
    }

    getPendingCommands(commandPrefix: string): Command[] {
        return Array.from(this.commands.values())
            .filter(cmd => cmd.status === 'pending' && cmd.command.startsWith(commandPrefix));
    }

    updateCommandStatus(id: string, status: Command['status']) {
        const command = this.commands.get(id);
        if (command) {
            command.status = status;
            this.commands.set(id, command);
        }
    }
}

export const commandStore = new CommandStore();
