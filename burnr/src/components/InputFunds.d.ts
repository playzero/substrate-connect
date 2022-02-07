import { FunctionComponent, SetStateAction, Dispatch } from "react";
import BN from "bn.js";
interface Props {
    total: BN;
    currency: string;
    hidePercentages?: boolean;
    setAmount: Dispatch<SetStateAction<string>>;
}
declare const InputFunds: FunctionComponent<Props>;
export default InputFunds;
//# sourceMappingURL=InputFunds.d.ts.map