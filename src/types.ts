export interface Command {
    id: string;
    chatId: number;
    command: string;
    args: string[];
    timestamp: number;
    status: 'pending' | 'processing' | 'completed' | 'failed';
}

export interface CommandResult {
    commandId: string;
    result: string;
    status: 'success' | 'error';
}
