/// <reference types="react" />
import { AdminCtx, BalanceVisibilityCtx, EvtMgrCtx, EvtTxCtx, CreateAccountCtx } from "./types";
import { ApiPromise } from "@polkadot/api";
declare const BalanceVisibleContext: import("react").Context<BalanceVisibilityCtx>;
declare const AccountContext: import("react").Context<CreateAccountCtx>;
declare const AdminContext: import("react").Context<AdminCtx>;
declare const ApiContext: import("react").Context<ApiPromise>;
declare const EvtMgrContext: import("react").Context<EvtMgrCtx>;
declare const EvtTxContext: import("react").Context<EvtTxCtx>;
export { AccountContext, AdminContext, ApiContext, BalanceVisibleContext, EvtMgrContext, EvtTxContext, };
//# sourceMappingURL=contexts.d.ts.map