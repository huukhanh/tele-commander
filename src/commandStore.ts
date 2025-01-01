import { Command, CommandQueryParams, CommandListResponse } from './types';

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

    getFilteredCommands(params: CommandQueryParams): CommandListResponse {
        let filteredCommands = Array.from(this.commands.values());

        if (params.status) {
            filteredCommands = filteredCommands.filter(cmd => cmd.status === params.status);
        }

        if (params.prefix && params.prefix.length > 0) {
            filteredCommands = filteredCommands.filter(cmd => cmd.command.startsWith(params.prefix!));
        }

        const total = filteredCommands.length;

        // Apply pagination
        if (params.offset || params.limit) {
            const offset = params.offset || 0;
            const limit = params.limit || 10;
            filteredCommands = filteredCommands.slice(offset, offset + limit);
        }

        return {
            commands: filteredCommands,
            total
        };
    }
}

export const commandStore = new CommandStore();
