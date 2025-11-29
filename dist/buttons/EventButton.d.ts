import { button } from '../entities/form/button';
import { Field } from '../elements/form/Field';
import { ManagmentObject } from '../object/ObjectManagment';
export declare class EventButton {
    field: Field;
    managmentObject: ManagmentObject;
    P: string;
    constructor(field: Field, managmentObject: ManagmentObject, P: string);
    eventButton(ruculaForm: HTMLElement, pathController: string, buttons: button[]): void;
    openCloseRightListButtonsActions(): void;
}
