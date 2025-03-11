export class ServerError extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

export const handleControllerError = (res, err, logMessage) => {
    console.error(logMessage, err);

    const status = err.status || 500;
    const message = err.message || "Internal server error";

    return res.status(status).json({
        ok: false,
        status,
        message
    });
}