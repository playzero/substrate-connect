import { AdminCtx, BalanceVisibilityCtx, EvtMgrCtx, EvtTxCtx, CreateAccountCtx } from './types';
import React from 'react';
import { ApiPromise } from '@polkadot/api';
declare const BalanceVisibleContext: React.Context<BalanceVisibilityCtx>;
declare const AccountContext: React.Context<CreateAccountCtx>;
declare const AdminContext: React.Context<AdminCtx>;
declare const ApiContext: React.Context<ApiPromise>;
declare const EvtMgrContext: React.Context<EvtMgrCtx>;
declare const EvtTxContext: React.Context<EvtTxCtx>;
export { AccountContext, AdminContext, ApiContext, BalanceVisibleContext, EvtMgrContext, EvtTxContext };
//# sourceMappingURL=contexts.d.ts.map