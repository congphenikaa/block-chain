import { getFullnodeUrl } from "@iota/iota-sdk/client";

export const NETWORK = "devnet";
export const FULLNODE_URL = getFullnodeUrl(NETWORK);

// Replace with your deployed package ID after deployment
export const PACKAGE_ID = "0xb1f57bd85b019686b372e7773958c386ac11ca7a4bda6c6d9d9341aafaac2169";

// Module and function names
export const MODULE_NAME = "guess";
export const SUBMIT_GUESS_FUNCTION = "submit_guess";
export const CHECK_GUESS_FUNCTION = "check_guess";
