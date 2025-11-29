import { field } from "../../../entities/form/field";
import { ManagmentObject } from "../../../object/ObjectManagment";
export declare abstract class FieldInput {
    protected managmentObject: ManagmentObject;
    protected p: string;
    protected floatLabel: boolean;
    protected field: field;
    input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLImageElement;
    protected ruculaForm: HTMLElement;
    constructor(p: string, field: field, managmentObject: ManagmentObject, ruculaForm: HTMLElement);
    protected abstract create(): void;
    protected abstract setEvents(): void;
    exec(): void;
}
