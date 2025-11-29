export declare class WindowBaseDOM {
    private P;
    private ruculaWindow;
    private globalWindow;
    private evIstance;
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
    grid(): string;
    private createMold;
    private setSimpleHeaderTitle;
    headerWithWindowName(type: string, openLeftGrid?: boolean): boolean;
    private bodyForm;
    private closeLeftGrid;
    maximizeForm(): void;
    eraseForm(): void;
    private actionCrudpreventDefault;
    private openActionswindow;
    private alterTheme;
    private setEventClickQuerySelectorAll;
    private setEventClickById;
    getPrincipalElementRucula(): HTMLFormElement;
}
