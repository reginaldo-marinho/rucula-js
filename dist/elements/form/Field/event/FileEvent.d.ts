import { field } from "../../../../entities/form/field";
import { ManagmentObject } from "../../../../object/ObjectManagment";
export declare abstract class FileEvent {
    protected input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    protected field: field;
    protected ruculaForm: any;
    protected managmentObject: ManagmentObject;
    constructor(managmentObject: ManagmentObject, input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, field: field, ruculaForm: HTMLElement);
    dispatchEvent(prefixEvent: string): void;
    protected abstract setEventListener(): void;
    protected set(): void;
}
