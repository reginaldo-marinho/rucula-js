import { maskInput, maskOutput } from "../../../../common/mask";
import { constPrefixEventField } from "../../../../const";
import { FileEvent } from "./FileEvent";

export class FileEventCommon extends FileEvent{

   
    protected setEventListener(): void {

        var input = this.input as HTMLInputElement;
        
        this.input.addEventListener('focus',(e) => {
            if(this.field.mask  && input.value){
                input.value =  maskOutput(input.value,this.field.mask)
            }
            
            this.dispatchEvent(constPrefixEventField.BEFORE);
            this.set()
            
        })

        this.input.addEventListener('input',() => {
            this.set()
            this.dispatchEvent(constPrefixEventField.INPUT);
        })

        this.input.addEventListener('focusout',() => {            
            this.dispatchEvent(constPrefixEventField.AFTER);
            this.set()
        })

        this.input.addEventListener('blur',() => {            
            if(this.field.mask  && input.value){
                input.value = maskInput(input.value,this.field.mask)
            }
        })
    }
}

