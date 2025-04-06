import { field } from "../../entities/form/field";
import { ManagmentObject } from "../../object/ObjectManagment";
export declare class Field {
    private managmentObject;
    private ruculaForm;
    constructor(managmentObject: ManagmentObject, ruculaForm: HTMLElement);
    createSpanLabelIsRequerid(isRegex?: boolean): HTMLSpanElement;
    createGroupOfButton(element: HTMLButtonElement | HTMLAnchorElement): HTMLDivElement;
    createGroupOfInput(field: field, element: HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement): HTMLDivElement;
    checkTypeField(type: string | string[2]): void;
    isSimple(type: string): boolean;
    isTextArea(type: string): boolean;
    isSelect(type: string): boolean;
    create(field: field): HTMLInputElement | HTMLSelectElement;
    focusFieldsWithDependency(): void;
}
