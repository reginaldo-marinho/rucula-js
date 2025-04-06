import { window } from "../entities/form/window";
export declare class WindowAPI {
    private url;
    constructor(url: string);
    get(p: string): Promise<window>;
}
