import React, { SetStateAction, Dispatch } from 'react';
import BN from 'bn.js';
interface Props {
    total: BN;
    currency: string;
    hidePercentages?: boolean;
    setAmount: Dispatch<SetStateAction<string>>;
}
declare const InputFunds: React.FunctionComponent<Props>;
export default InputFunds;
//# sourceMappingURL=InputFunds.d.ts.map