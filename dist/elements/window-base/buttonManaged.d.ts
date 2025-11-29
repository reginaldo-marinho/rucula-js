export declare class ButtonCrud {
    private P;
    private atualModel;
    private modes;
    constructor(P: string, crud: string, globalwindow: HTMLElement);
    private buttonCreate;
    private buttonAlter;
    private buttonDelete;
    private buttonsPlus;
    private olButtonsPlus;
    private crud;
    private SpecificRightButtons;
    removeUnusedButtons(): void;
    initTosave(): void;
    saveToAlter(): void;
    deleteToInit(): void;
    disableAll(): void;
    private set;
    disableCreate(): void;
    disableAlter(): void;
    disableDelete(): void;
    enableCreate(): void;
    enableAlter(): void;
    enableDelete(): void;
}
