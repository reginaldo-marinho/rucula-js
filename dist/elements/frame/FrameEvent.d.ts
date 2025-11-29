import { ManagmentObject } from "../../object/ObjectManagment";
export declare class FrameEvent {
    managmentObject: ManagmentObject;
    constructor(managmentObject: ManagmentObject);
    managedFrame(frameElement: HTMLElement): void;
    valueInformed(event: Event): void;
    cleanRequeridDependency(frameElement: HTMLDivElement): void;
}
