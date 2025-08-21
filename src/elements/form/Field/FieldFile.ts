import { FileEventSelectFile } from "./event/FileEventFile";
import { FieldInput } from "./FieldInput";

export class FieldFile extends FieldInput{
    
    create(){

        var input = document.createElement("input")

        this.input = input;
        this.input.classList.add('r-i-control');
        input.type = "file";    
        input.multiple = true
        this.setEvents()
        return input;
    }
    protected setEvents(): void {
        new FileEventSelectFile(this.p, this.managmentObject, this.input, this.field, this.ruculaForm)
    }

}



