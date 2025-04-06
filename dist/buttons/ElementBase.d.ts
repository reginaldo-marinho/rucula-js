import { button } from "../entities/form/button";
export declare class ElementBase {
    protected p: string;
    constructor(p: string);
    element: HTMLButtonElement | HTMLAnchorElement;
    addDataIdAttribute(button: button): void;
    addColor(color?: string): void;
}
