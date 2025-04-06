export declare class DOMButtonsCheck {
    private buttonCreate;
    private buttonAlter;
    private buttonDelete;
    private buttonsPlus;
    private olButtonsPlus;
    private P;
    private crud;
    constructor(P: string, crud: string);
    private buttonCrudDefault;
    private SpecificRightButtons;
    clickCreate(): void;
    clickAlter(): void;
    clickDelete(): void;
    removeCreate(): void;
    removeAlter(): void;
    removeDelete(): void;
    removeUnusedButtons(): void;
}
