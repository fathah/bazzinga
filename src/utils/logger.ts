class Logger {
    static logError = (tag: string, message: unknown): void => {
        console.error(tag, message);
        console.tron.error(tag, message);
    };

    static logMessage = (tag: string, message: unknown): void => {
        console?.tron?.log(tag, message);
    };

    static logWarning = (message: string): void => {
        console.tron.warn(message);
    };
}

export default Logger;
