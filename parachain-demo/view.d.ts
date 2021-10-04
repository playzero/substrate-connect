export interface Model {
    loadTime: number;
}
export interface Options {
    containerId: string;
}
export declare const emojis: {
    banknote: string;
    brick: string;
    chain: string;
    chequeredFlag: string;
    clock: string;
    info: string;
    newspaper: string;
    seedling: string;
    stethoscope: string;
    tick: string;
};
export default class UI {
    private options;
    private model;
    private container;
    private syncState;
    private syncMessage;
    constructor(options: Options, model: Model);
    private timeElapsed;
    private timestampHtml;
    private messageHtml;
    private errorHtml;
    private displayMessage;
    error: (error: Error) => void;
    log: (message: string, withTime?: boolean | undefined) => void;
    private insertAtTopOfContainer;
    private ensureClassOn;
    showSyncing: () => void;
    showSynced: () => void;
}
//# sourceMappingURL=view.d.ts.map