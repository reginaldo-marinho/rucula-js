import { field } from "./field";
export interface frame {
    name: string;
    type: string;
    parent: string;
    objectDto: string;
    alias: string;
    identity: string;
    vertical: boolean;
    sequence: number;
    fields?: Array<field>;
    layout: {
        col: {
            start: number;
            end: number;
        };
        row: {
            start: number;
            end: number;
        };
    };
    requerid: boolean;
    cssClass?: string;
}
