/**
 * Represents an error from the Hyperliquid API.
 */
export class HyperliquidAPIError extends Error {
    /**
     * Constructs a new `HyperliquidAPIError` instance.
     *
     * @param message Error message.
     */
    constructor(message: string) {
        super(message);
        this.name = "HyperliquidAPIError";
    }
}

/**
 * Represents an error for batch operations in the Hyperliquid API.
 */
export class HyperliquidBatchAPIError extends Error {
    /** Array of error messages. */
    public messages: string[];

    /**
     * Constructs a new `HyperliquidBatchAPIError` instance.
     *
     * @param messages Array of error messages.
     */
    constructor(messages: string[]) {
        super(messages.join("\n"));
        this.name = "HyperliquidBatchAPIError";
        this.messages = messages;
    }
}
