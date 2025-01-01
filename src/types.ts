export interface Command {
    id: string;
    chatId: number;
    command: string;
    args: string[];
    timestamp: number;
    status: 'pending' | 'processing' | 'completed' | 'failed';
}

export interface CommandResult {
    commandId: string;    // Changed from 'id'
    result: string;       // Added this field
    status: 'success' | 'error';
}

export interface CommandQueryParams {
    status?: Command['status'];
    prefix?: string;
    limit?: number;
    offset?: number;
}

export interface CommandListResponse {
    total: number;
    commands: Command[];
}
