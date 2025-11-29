import { FieldInput } from "./FieldInput";
export declare class FieldStrategy {
    private field;
    setStrategy(field: FieldInput): void;
    create(): HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLImageElement;
}
