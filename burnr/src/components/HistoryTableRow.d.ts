import React from 'react';
import { Column } from '../utils/types';
interface rowContent {
    withWhom: string;
    extrinsic: string;
    value: string | number;
    status: string | number;
}
interface Props {
    row: rowContent;
    columns: Column[];
    unit?: string;
    showStatus?: boolean;
}
declare const HistoryTableRow: React.FunctionComponent<Props>;
export default HistoryTableRow;
//# sourceMappingURL=HistoryTableRow.d.ts.map