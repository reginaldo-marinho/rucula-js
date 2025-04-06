export declare class WindowBaseDOM {
    private P;
    private ruculaWindow;
    private globalWindow;
    constructor(prefix: string, config: {
        globalWindow: HTMLElement;
        openLeftGrid: boolean;
        windowName: string;
        type?: string;
    });
    private create;
    private widthAndHeigth;
    private createNameWindow;
    private cleanGlobalWindow;
    private openCloseForm;
    private leftGrid;
    private createMold;
    private bodyForm;
    private closeLeftGrid;
    maximizeForm(): void;
    eraseForm(): void;
    private actionCrudpreventDefault;
    private openActionswindow;
    private alterTheme;
    getPrincipalElementRucula(): HTMLFormElement;
}
