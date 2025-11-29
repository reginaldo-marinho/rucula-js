import { button } from '../entities/form/button';
import { ElementBase } from './ElementBase';
import { ElementStrategy } from './ElementEstrategy';
export declare class ElementLink extends ElementBase implements ElementStrategy {
    createElement(button: button): HTMLAnchorElement;
}
