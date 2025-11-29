import { button } from '../entities/form/button';
export interface ElementStrategy {
    createElement(button: button): any;
}
