// error for network-related failures
export class NetworkError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NetworkError";
    }
}

// error for data-related or validation issues
export class DataError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DataError";
    }
}