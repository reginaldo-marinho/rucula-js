import { window } from "./entities/form/window";
import { globalConfiguration } from "./global/entities/GlobalConfiguration";
export declare class Rucula {
    private window;
    private elementRucula;
    private elementFormRucula;
    constructor(config: globalConfiguration, window: window, id?: string);
    private initWindow;
    private addHomeWindow;
    private createButtons;
    private createFrames;
    private resetBackground;
    object: {
        objectUnique: (alias: string) => any;
        getFullObject: () => any;
        getSepareteObject: () => any;
        setValue: (targetPath: string, value: any) => void;
        getValue: (config: string) => any;
    };
    event: {
        details: (event: CustomEvent) => {
            identity: string | null;
            name: any;
            row: any;
            value: any;
            targetPathWithRow: (targetPath: string) => string;
        };
    };
    buttons: {
        disable: (button: string) => void;
        enable: (button: string) => void;
        hide: (button: string) => void;
        destroy: (button: string) => void;
    };
}