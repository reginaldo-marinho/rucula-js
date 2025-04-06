import { Button } from "../../buttons/Button";
import { frame } from "../../entities/form/frame";
import { ManagmentObject } from "../../object/ObjectManagment";
import { Field } from "../form/Field";
import { FieldMenuContext } from "../form/Field/fieldMenuContext";
import { FrameEvent } from "./FrameEvent";
export type typeInputSnapshot = {
    element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    value: any;
};
export declare class FrameElement {
    protected managmentObject: ManagmentObject;
    protected field: Field;
    protected frameEvent: FrameEvent;
    protected button: Button;
    protected fieldMenuContext: FieldMenuContext;
    protected inputValueSnapshot: typeInputSnapshot[];
    constructor(managmentObject: ManagmentObject, field: Field, frameEvent: FrameEvent, button: Button, fieldMenuContext: FieldMenuContext);
    protected createbase(frame: frame): HTMLDivElement;
    protected setValuesDefined(frame: frame, htmlElement: HTMLElement): void;
    revertToInit(): void;
}
