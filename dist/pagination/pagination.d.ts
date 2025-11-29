export declare class PaginationEvents {
    private globalWindow;
    private p;
    constructor(p: string, globalWindow: HTMLElement);
    headerSearch(gridSearch: boolean): void;
    fotter(gridFooter: boolean): void;
}
