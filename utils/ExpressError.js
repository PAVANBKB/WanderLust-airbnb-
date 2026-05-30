class ExpressError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.message = message; // 🔥 Crucial: This MUST be exactly 'this.message'
    }
}

module.exports = ExpressError;