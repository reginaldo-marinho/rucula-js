import { FileEventImage } from "./event/FileEventImage";
import { FieldInput } from "./FieldInput";

export class FieldImage extends FieldInput{
    
    create(){

        var input = document.createElement("img")

        this.input = input;
        
        input.src = this.field.value || "";
        input.alt = this.field.description || "";

        this.setEvents()
                
        return input;
    }
    protected setEvents(): void {

        new FileEventImage(this.p, this.managmentObject, this.input, this.field, this.ruculaForm)
    }

}



