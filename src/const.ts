import { P } from "./common/Prefixe";

export const DOT_SEPARATOR = ".";

export const constPrefixEventField = {
    BEFORE:'before',
    INPUT:'input',
    AFTER:'after',
}

export const constTypeInput = {
    
    TEXT: "text",   
    NUMBER: "number", 
    BOOLEAN: "bool", 
    DATE: "date",
    CURRENCY: "currency",
    SELECT: "select",
    CHECKBOX: "checkbox",
    TEXT_AREA: "textarea",
    RADIO: "radio",
    PASS: "password",
    FILE: "file",
}

export const constGroupFormat = {

    DOWN : "down",
    LEFT : "left",
    RIGTH: "right"
}

export const constTypeFrame = {

    BLOCK: "block",
    LINE: "line"
}


export const constIdBaseWindow =  {

    NEW: "r-a-new",
    CLOSE_GRID:"close-grid",
    RELOAD:"r-a-reload",
    ERASE_WINDOW: "erase-window",
    ALTER_THEME: "alter-theme",
    MAXIMIZE_WINDOW: "maximize-window",
    HOME: "home",
    PAGE_LEFT: "page-left",
    PAGE_RIGHT: "page-right",
    MAXIMIZE_GRID: "maximize-grid",
    ACTIONS_WINDOW: "r-actiond-window",
    GLOBALIZATION: "r-globalization",
    OLLI_GLOBALIZATION: "r-globalization-list",    
    ENVIROMENT: "r-enviroment",
    OLLI_ENVIROMENT: "r-enviroment-list",    
    FORM_RUCULA_JS:"form-rucula-js",
    BUTTONS_MENU_VERTICAL: "r-a-menu-vertical",
    BUTTONS_MENU_VERTICAL_MOBILE: "r-a-menu-vertical-mobile",
    BUTTON_MENU_VERTICAL_MOBILE_CLOSE: "r-a-mobile-close",
    BUTTONS_MENU_VERTICAL_LIST: "r-a-menu-vertical-list",
    TITLE:"r-window-title",
    FAVORITE:"r-favorite",
    CHAT:"r-chat",
    USER:"r-user",
    FRAME_INFO:"r-frame-INFO",
}

export const contextMenu = {
    INPUT:'context-menu-input'
}
export const constAttrInput = {
    ATTR_TYPE: "ruc-type"
}


export const constTargetButtonCrudDefault = {

    SAVE:"r-a-save",
    ALTER: "r-a-alter",
    DELETE:"r-a-delete"
    
}

export const constInputClass = {
    FOCUS_IN_INPUT_WITH_DEPENDENCY: 'r-i-focus-dependency'
}

export const constFrameLineActions = {
    ADD: 'f-l-action-add',
    REMOVE:'f-l-action-remove'
}

export const constYesNo = {
    NO: false,
    YES: true    
}

export const constPagination = {
    ROW_NUMBER:"r-pagination-row-number",
    FIND:"r-find",
    FIRST:"r-pagination-first",
    LAST:"r-pagination-last",
    PREVIOUS:"r-pagination-previous",
    NEXT:"r-pagination-next"
}

export const eventsName = {
    RUCULA_CREATE_INIT:'rucula-init',
    RUCULA_CREATE_LOADED:'rucula-loaded',  
    FRAMES_ERASE:'fremes-erase',  
    FRAMES_ERASE_COMPLETE:'fremes-erase-complete',  
}

export function eventIstance(prefix:string){
    return {
        RUCULA_CREATE_INIT: new Event(P(prefix,eventsName.RUCULA_CREATE_INIT)),
        RUCULA_CREATE_LOADED: new Event(P(prefix,eventsName.RUCULA_CREATE_LOADED)),
        FRAMES_ERASE: new Event(P(prefix,eventsName.FRAMES_ERASE)),
        FRAMES_ERASE_COMPLETE: new Event(P(prefix,eventsName.FRAMES_ERASE_COMPLETE)),
        ERASE_WINDOW: new Event(P(prefix,constIdBaseWindow.ERASE_WINDOW)),

    }
}
