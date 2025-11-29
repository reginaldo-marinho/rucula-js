export declare const DOT_SEPARATOR = ".";
export declare const constPrefixEventField: {
    BEFORE: string;
    INPUT: string;
    AFTER: string;
};
export declare const constTypeInput: {
    TEXT: string;
    NUMBER: string;
    BOOLEAN: string;
    DATE: string;
    CURRENCY: string;
    SELECT: string;
    CHECKBOX: string;
    TEXT_AREA: string;
    RADIO: string;
    PASS: string;
    FILE: string;
    IMAGE: string;
};
export declare const constGroupFormat: {
    DOWN: string;
    LEFT: string;
    RIGTH: string;
};
export declare const constTypeFrame: {
    BLOCK: string;
    LINE: string;
};
export declare const constIdBaseWindow: {
    NEW: string;
    CLOSE_GRID: string;
    RELOAD: string;
    ERASE_WINDOW: string;
    ALTER_THEME: string;
    MAXIMIZE_WINDOW: string;
    HOME: string;
    PAGE_LEFT: string;
    PAGE_RIGHT: string;
    MAXIMIZE_GRID: string;
    ACTIONS_WINDOW: string;
    GLOBALIZATION: string;
    OLLI_GLOBALIZATION: string;
    ENVIROMENT: string;
    OLLI_ENVIROMENT: string;
    FORM_RUCULA_JS: string;
    BUTTONS_MENU_VERTICAL: string;
    BUTTONS_MENU_VERTICAL_MOBILE: string;
    BUTTON_MENU_VERTICAL_MOBILE_CLOSE: string;
    BUTTONS_MENU_VERTICAL_LIST: string;
    TITLE: string;
    FAVORITE: string;
    CHAT: string;
    USER: string;
    FRAME_INFO: string;
};
export declare const contextMenu: {
    INPUT: string;
};
export declare const constAttrInput: {
    ATTR_TYPE: string;
};
export declare const constTargetButtonCrudDefault: {
    SAVE: string;
    ALTER: string;
    DELETE: string;
};
export declare const constInputClass: {
    FOCUS_IN_INPUT_WITH_DEPENDENCY: string;
};
export declare const constFrameLineActions: {
    ADD: string;
    REMOVE: string;
};
export declare const constYesNo: {
    NO: boolean;
    YES: boolean;
};
export declare const constPagination: {
    ROW_NUMBER: string;
    FIND: string;
    FIRST: string;
    LAST: string;
    PREVIOUS: string;
    NEXT: string;
};
export declare const eventsName: {
    RUCULA_CREATE_INIT: string;
    RUCULA_CREATE_LOADED: string;
    FRAMES_ERASE: string;
    FRAMES_ERASE_COMPLETE: string;
};
export declare function eventIstance(prefix: string): {
    RUCULA_CREATE_INIT: Event;
    RUCULA_CREATE_LOADED: Event;
    FRAMES_ERASE: Event;
    FRAMES_ERASE_COMPLETE: Event;
    ERASE_WINDOW: Event;
};
