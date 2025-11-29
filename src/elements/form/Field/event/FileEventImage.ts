import { constPrefixEventField } from "../../../../const";
import { FileEvent } from "./FileEvent";

export class FileEventImage extends FileEvent{

    protected setEventListener(): void {

        this.input.addEventListener('load',() => {            
            this.dispatchEvent(constPrefixEventField.AFTER);
            this.set()
        })
    }
}

