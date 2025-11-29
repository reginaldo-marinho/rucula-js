import { buttonURL } from "../entities/form/button";
import { ManagmentObject } from "../object/ObjectManagment";
export declare class URLRucula {
    private _URL?;
    private managmentObject?;
    constructor(managmentObject?: ManagmentObject, URL?: buttonURL);
    getURL(): string;
    domain(): string;
    private path;
    private createWithParams;
    private createWithoutParams;
}
