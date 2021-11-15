import { ApiPromise } from "@polkadot/api";
import { Account, LocalStorageAccountCtx } from "./types";
import { Keyring } from "@polkadot/api";
import type { Balance } from "@polkadot/types/interfaces";
import BN from "bn.js";
export declare const getName: (account: Account) => string;
export declare const openInNewTab: (url: string) => void;
export declare const downloadFile: (fileName: string, data: string, type: string) => void;
export declare const createLocalStorageAccount: () => LocalStorageAccountCtx;
export declare const isEmpty: (obj: unknown) => boolean;
export declare const copyToClipboard: (text: string) => void;
export declare const getKeyring: () => Keyring;
export declare const transformCurrency: (currencyLevel: string, currency: string) => string;
export declare const isValidAddressPolkadotAddress: (address?: string) => boolean;
export declare const prettyBalance: (rawBalance: Balance | BN | number) => string;
export declare const humanReadable: (amnt: number, api: ApiPromise) => string;
export declare const validateLocalstorage: () => void;
//# sourceMappingURL=utils.d.ts.map