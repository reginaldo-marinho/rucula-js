export declare class ButtonManaged {
    private P;
    private buttonsManeged;
    private atualModel;
    private modes;
    constructor(P: string, buttonsManeged: NodeListOf<HTMLButtonElement>);
    initTosave(): void;
    saveToAlter(): void;
    deleteToInit(): void;
    disableAll(): void;
    private set;
}
