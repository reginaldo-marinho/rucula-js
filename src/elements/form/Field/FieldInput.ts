import { threadId } from "worker_threads";
import { constTypeInput } from "../../../const";
import { field } from "../../../entities/form/field";
import { ruculaGlobal } from "../../../global/GlobalConfig";
import { ManagmentObject } from "../../../object/ObjectManagment";
import { setCssClass } from "../style";

export abstract class FieldInput{
    
    protected managmentObject:ManagmentObject
    protected p:string
    protected floatLabel = ruculaGlobal?.getConfigurationGlobal()?.floatLabel

    protected field:field
    public input!: HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement|HTMLImageElement
    protected ruculaForm:HTMLElement

    constructor(p:string, field:field, managmentObject:ManagmentObject, ruculaForm:HTMLElement) {
        this.field = field;
        this.managmentObject = managmentObject
        this.ruculaForm = ruculaForm
        this.p = p
    }

    protected abstract create():void;
    protected abstract setEvents():void;


    exec(){
        this.create();
        setCssClass(this.field.cssClass, this.input);
    }
}