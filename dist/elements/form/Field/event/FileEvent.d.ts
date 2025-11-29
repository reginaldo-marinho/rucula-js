import { field } from "../../../../entities/form/field";
import { ManagmentObject } from "../../../../object/ObjectManagment";
export declare abstract class FileEvent {
    protected input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLImageElement;
    protected field: field;
    protected p: string;
    protected ruculaForm: any;
    protected managmentObject: ManagmentObject;
    constructor(p: string, managmentObject: ManagmentObject, input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLImageElement, field: field, ruculaForm: HTMLElement);
    dispatchEvent(prefixEvent: string): void;
    protected abstract setEventListener(): void;
    protected set(): void;
}
