import { privateKeyToAccount } from "npm:viem@^2.21.7/accounts";
import * as tsj from "npm:ts-json-schema-generator@^2.3.0";
import { resolve } from "jsr:@std/path@^1.0.2";
import { ExchangeClient } from "../../index.ts";
import { assertJsonSchema, isHex } from "../utils.ts";

const TEST_PRIVATE_KEY = Deno.args[0];

if (!isHex(TEST_PRIVATE_KEY)) {
    throw new Error(`Expected a hex string, but got ${TEST_PRIVATE_KEY}`);
}

Deno.test(
    "withdraw3",
    { permissions: { net: true, read: true } },
    async () => {
        // Create client
        const account = privateKeyToAccount(TEST_PRIVATE_KEY);
        const exchangeClient = new ExchangeClient(account, "https://api.hyperliquid-testnet.xyz/exchange", false);

        // Create TypeScript type schemas
        const tsjSchemaGenerator = tsj.createGenerator({ path: resolve("./src/types/exchange.d.ts"), skipTypeCheck: true });
        const schema = tsjSchemaGenerator.createSchema("SuccessResponse");

        // Test
        const result = await exchangeClient.withdraw3({
            hyperliquidChain: "Testnet",
            signatureChainId: "0x66eee",
            amount: "2",
            time: Date.now(),
            destination: account.address,
        });

        assertJsonSchema(schema, result);
    },
);
