import { callbackYesNo } from "./callback";
type config = {
    close?: boolean;
    icon?: string;
    title?: string;
    text?: string;
    footer?: string;
    disableadFooter?: boolean;
    disableadHeader?: boolean;
    htmlBody?: HTMLElement;
    timeout?: number;
};
type configCommon = {
    text?: string;
    htmlBody?: HTMLElement;
    timeout?: number;
    disableadFooter?: boolean;
    disableadHeader?: boolean;
};
export declare class Popup {
    private prefix;
    constructor(prefix: string);
    boxShow: HTMLElement;
    boxShowAppendChield(element: HTMLElement): void;
    messageElement(config: config): HTMLDivElement;
    closeTimeout(div: HTMLElement, timeout: number, callback?: callbackYesNo): void;
    closeOKOrCancel(callback: any, div: HTMLElement, callbackInTimeout?: boolean): void;
    close(): void;
    info(config: configCommon, callback?: callbackYesNo): void;
    sucess(config: configCommon, callback?: callbackYesNo): void;
    warning(config: configCommon, callback?: callbackYesNo): void;
    error(config: configCommon, callback?: callbackYesNo): void;
    alertSuccess(message: string, target: HTMLElement, timerSeconds?: number): void;
    alertWarning(message: string, target: HTMLElement, timerSeconds?: number): void;
    alertInfo(message: string, target: HTMLElement, timerSeconds?: number): void;
    alertError(message: string, target: HTMLElement, timerSeconds?: number): void;
    alertNeutral(message: string, target: HTMLElement, timerSeconds?: number): void;
    private elementaAlert;
}
export {};
