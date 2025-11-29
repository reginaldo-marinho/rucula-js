import { FieldInput } from "./FieldInput";

export class FieldStrategy{
    private field!:FieldInput;
    public setStrategy(field:FieldInput){
        this.field = field;
    }
    public create():HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement|HTMLImageElement{
        this.field.exec();
        return this.field.input;
    }
}