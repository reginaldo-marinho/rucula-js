import { formatCurrencyForNumber, formatNumberWithLocalization } from "../../../../Helpers/CurrencyHelper";
import { FileEvent } from "./FileEvent";

export class FileEventCurrency extends FileEvent{

    
    protected setEventListener(): void {

        var input = this.input as HTMLInputElement;
        
        this.input.addEventListener('focusout',(e) => {

            let element = e.target as HTMLInputElement;

            let valueFormated = formatCurrencyForNumber(element.value);
            input.value = String(valueFormated);
            
            this.set();
            
            input.value = formatNumberWithLocalization(element.value)  
        })
    }
}

