/// <reference types="react" />
import { SizeScale } from "../utils/types";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { Balance } from "@polkadot/types/interfaces";
interface Props extends SizeScale {
    value: Balance;
    isVisible: boolean;
    unit?: string;
    style?: CSSProperties;
}
declare const _default: import("react").NamedExoticComponent<Props>;
export default _default;
//# sourceMappingURL=BalanceValue.d.ts.map