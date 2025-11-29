import { ManagmentObject } from "../object/ObjectManagment";
export declare class EventManagment {
    private managmentObject;
    private p;
    private elementRoot;
    constructor(p: string, managmentObject: ManagmentObject, elementRoot: HTMLElement);
    getFieldDetails(event: CustomEvent): {
        identity: string;
        name: any;
        row: any;
        value: any;
        targetPathWithRow: (targetPath: string) => string;
    };
    on(event: string, callback: any, query?: string): void;
}
