let cookie = (() => {
    return {
        read: function (name) {
            var cookies = document.cookie.split('; ');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].split('=');
                if (cookie[0] === name) {
                    return decodeURIComponent(cookie[1]);
                }
            }
            return null;
        }
    };
})();

({
    RESET_BACKGROUND: "reset-background",
    RESET_BACKGROUND_EVENT: new Event("reset-background"),
    BEFORE_SEND_OBJECT_HTTP: "before-send-object-http",
    EVENT_BEFORE_SEND_OBJECT_HTTP: new Event("before-send-object-http"),
    AFTER_SEND_OBJECT_HTTP: "after-send-object-http",
    EVENT_AFTER_SEND_OBJECT_HTTP: new Event("after-send-object-http"),
    SEND_OBJECT_HTTP_OK: "send-object-http-ok",
    EVENT_SEND_OBJECT_HTTP_OK: new Event("send-object-http-ok"),
    SEND_OBJECT_HTTP_ERROR: "send-object-http-error",
    EVENT_SEND_OBJECT_HTTP_ERROR: new Event("send-object-http-error")
});
const constPrefixEventField = {
    BEFORE: 'before',
    INPUT: 'input',
    AFTER: 'after',
};
const constTypeInput = {
    TEXT: "text",
    NUMBER: "number",
    BOOLEAN: "bool",
    DATE: "date",
    CURRENCY: "currency",
    SELECT: "select",
    CHECKBOX: "checkbox",
    TEXT_AREA: "textarea",
    RADIO: "radio",
    PASS: "password"
};
const constGroupFormat = {
    DOWN: "down",
    LEFT: "left",
    RIGTH: "right"
};
const constTypeFrame = {
    BLOCK: "block",
    LINE: "line"
};
const constIdBaseWindow = {
    NEW: "r-a-new",
    CLOSE_GRID: "close-grid",
    RELOAD: "r-a-reload",
    ERASE_WINDOW: "erase-window",
    ALTER_THEME: "alter-theme",
    MAXIMIZE_WINDOW: "maximize-window",
    MAXIMIZE_GRID: "maximize-grid",
    ACTIONS_WINDOW: "r-actiond-window",
    GLOBALIZATION: "r-globalization",
    OLLI_GLOBALIZATION: "r-globalization-list",
    ENVIROMENT: "r-enviroment",
    OLLI_ENVIROMENT: "r-enviroment-list",
    FORM_RUCULA_JS: "form-rucula-js",
    BUTTONS_MENU_VERTICAL: "r-a-menu-vertical",
    BUTTONS_MENU_VERTICAL_MOBILE: "r-a-menu-vertical-mobile",
    BUTTON_MENU_VERTICAL_MOBILE_CLOSE: "r-a-mobile-close",
    BUTTONS_MENU_VERTICAL_LIST: "r-a-menu-vertical-list",
    TITLE: "r-window-title",
    FAVORITE: "r-favorite",
    CHAT: "r-chat",
    USER: "r-user",
    FRAME_INFO: "r-frame-INFO",
};
const contextMenu = {
    INPUT: 'context-menu-input'
};
const constAttrInput = {
    ATTR_TYPE: "ruc-type"
};
const constTargetButtonCrudDefault = {
    SAVE: "r-a-save",
    ALTER: "r-a-alter",
    DELETE: "r-a-delete"
};
const constInputClass = {
    FOCUS_IN_INPUT_WITH_DEPENDENCY: 'r-i-focus-dependency'
};
const constFrameLineActions = {
    ADD: 'f-l-action-add',
    REMOVE: 'f-l-action-remove'
};
const constYesNo = {
    NO: false,
    YES: true
};
const constPagination = {
    ROW_NUMBER: "r-pagination-row-number",
    FIND: "r-find",
    FIRST: "r-pagination-first",
    LAST: "r-pagination-last",
    PREVIOUS: "r-pagination-previous",
    NEXT: "r-pagination-next"
};

class WindowBaseDOM {
    P;
    ruculaWindow = document.createElement("div");
    globalWindow;
    constructor(prefix, config) {
        this.P = prefix;
        this.globalWindow = config.globalWindow;
        if (config.type === 'header') {
            config.openLeftGrid = false;
        }
        this.create(config);
    }
    create(config) {
        this.cleanGlobalWindow();
        this.ruculaWindow.classList.add("r-w");
        this.ruculaWindow.classList.add(`${this.P}r-w`);
        const actions = this.leftGrid();
        this.ruculaWindow.appendChild(actions);
        config.globalWindow?.appendChild(this.ruculaWindow);
        this.createMold(config.type);
        this.alterTheme();
        this.eraseForm();
        this.openActionswindow();
        this.actionCrudpreventDefault();
        this.widthAndHeigth();
        this.maximizeForm();
        this.openCloseForm();
        this.closeLeftGrid(config.openLeftGrid);
        this.createNameWindow(config.windowName);
    }
    widthAndHeigth() {
        let offsetTop = Number(this.ruculaWindow.offsetTop);
        let height = Number(window.innerHeight);
        this.ruculaWindow.style.height = `${height - offsetTop}px`;
    }
    createNameWindow(name) {
        let window = this.ruculaWindow.querySelector(".r-w-t");
        if (window) {
            window.innerHTML = name;
        }
    }
    cleanGlobalWindow() {
        for (let index = 0; index < this.globalWindow.childNodes.length; index++) {
            this.globalWindow.childNodes[index].remove();
        }
    }
    openCloseForm() {
        let rNew = this.ruculaWindow.querySelector(`#${this.P}${constIdBaseWindow.NEW}`);
        let itemContainer = document.querySelectorAll(`.${this.P}js-open-close-container`);
        rNew.addEventListener("click", () => {
            itemContainer.forEach(item => {
                item.classList.toggle("r-display-none");
                indicateBoxFrameOpend(rNew, item);
            });
            function indicateBoxFrameOpend(rNew, item) {
                var isBoxFrame = item.classList.contains("box-frame");
                var isBoxFrameOpened = item.classList.contains("r-display-none");
                if (isBoxFrame && isBoxFrameOpened == false) {
                    rNew.classList.add("r-box-frame-opened");
                }
                if (isBoxFrame && isBoxFrameOpened) {
                    rNew.classList.remove("r-box-frame-opened");
                }
            }
        });
        let rCloseGrid = this.ruculaWindow.querySelector(`#${this.P}${constIdBaseWindow.CLOSE_GRID}`);
        rCloseGrid?.addEventListener("click", () => {
            let div = document.querySelector(`.${this.P}r-f`);
            div.classList.toggle('r-mobile');
            let leftGrid = document.getElementById(`${this.P}r-left-block`);
            leftGrid.classList.toggle('r-display-block');
        });
    }
    leftGrid() {
        const actions = document.createElement("div");
        actions.className = "r-left-block";
        actions.id = `${this.P}r-left-block`;
        const ACTIONS = `
            <div class="r-box-show" id="${this.P}r-box-show">
            </div>
            <div class="r-act" id="${this.P}actions">
                <div class="r-act-opt r-head" id="${this.P}w-title">
                    <button id="${this.P}${constIdBaseWindow.NEW}" class="r-a-b r-btn-new-cancel-close r-desktop-web"><i class="bi bi-plus-lg"></i></button>
                    <button id="${this.P}${constIdBaseWindow.CLOSE_GRID}" class="r-a-b r-btn-new-cancel-close r-mobile"><i class="bi bi-x-lg"></i></button>
                    <div class="r-w-t">
                    </div>
                    <button id="${this.P}r-a-many" class="r-a-b"><i class="bi bi-list"></i></button>
                </div>
                <div class="r-left-block-grid" id="${this.P}w-grid">
                    <form class="searh-items-grid" id="${this.P}${constPagination.FIND}" autocomplete=off>
                        <input name="r-find-value" type="text"/>
                        <button><i class="bi bi-search"></i></button>
                    </form>
                    <div class="r-act-grid-body">
                    </div>
                    <div class="r-act-grid-footer" id="${this.P}r-act-grid-footer">
                        <div>
                            <span>N. Linha</span>
                            <select id="${this.P}${constPagination.ROW_NUMBER}" name="len-page">
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="1000">1000</option>
                            </select>
                        </div>
                         <div>
                            <button id="${this.P}${constPagination.FIRST}" class="r-a-b"><i class="bi bi-arrow-up"></i></button>
                            <button id="${this.P}${constPagination.LAST}" class="r-a-b"><i class="bi bi-arrow-down"></i></button>
                            <button id="${this.P}${constPagination.PREVIOUS}" class="r-a-b"><i class="bi bi-arrow-left"></i></button>
                            <button id="${this.P}${constPagination.NEXT}" class="r-a-b"><i class="bi bi-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
             </div>`;
        actions.innerHTML = ACTIONS;
        return actions.cloneNode(true);
    }
    createMold(type) {
        type ??= 'crud';
        const contentForm = document.createElement("div");
        const CREATE_OR_EDIT = `<div class="container-r-f  box-home ${this.P}js-open-close-container">
            <div class="r-act-opt r-head" id="${this.P}w-title">
            </div>
            <div class="r-f-items r-f-home">
                <div class="r-f-home-round">
                    <i id="${this.P}r-f-home-icon"class="bi" ></i>
                </div>
                <h3 id="${this.P}r-f-home-title"></h3>
            </div>
        </div>
        <div class="${this.P}r-f container-r-f box-frame r-display-none ${this.P}js-open-close-container">

        <div class="r-facede-action top">
            <div class="r-head r-read-new r-facede-action top">

                <div style="z-index: 10;">
                    <button id="${this.P}${constIdBaseWindow.ACTIONS_WINDOW}" class="r-a-b r-actions-window"><i class="bi bi-nut"></i></button>
                    <div class="r-display-inline-block r-actions-window r-actions-window-itens">
                        <div class="r-display-inline-block">
                            <button id="${this.P}${constIdBaseWindow.MAXIMIZE_WINDOW}" class="r-a-b open-box-frame"><i class="bi bi-arrows"></i></button>
                            <button id="${this.P}${constIdBaseWindow.MAXIMIZE_GRID}" class="r-a-b open-grid r-mobile"><i class="bi bi-grid-3x3-gap-fill"></i></button>
                            <button id="${this.P}${constIdBaseWindow.ALTER_THEME}" class="r-a-b "><i class="bi bi-circle-half"></i></button>
                        </div>
                        <div class="actions-view">
                            <button id="${this.P}${constIdBaseWindow.GLOBALIZATION}" class="r-a-b">
                                <i class="bi bi-globe-americas"></i>
                                <ol id="${this.P}${constIdBaseWindow.OLLI_GLOBALIZATION}" class="${constIdBaseWindow.OLLI_GLOBALIZATION} list-vertical-buttons list-vertical-buttons-pp-left r-display-none">
                                </ol>
                            </button>
                            <button id="${this.P}${constIdBaseWindow.ENVIROMENT}" class="r-a-b">
                                <div class="desc-environment"><i class="bi bi-fire"></i> <span class="description"></span> </div>
                                <ol id="${this.P}${constIdBaseWindow.OLLI_ENVIROMENT}" class="${constIdBaseWindow.OLLI_ENVIROMENT} list-vertical-buttons list-vertical-buttons-pp-left r-display-none">
                                </ol>
                            </button>
                        </div>
                    </div>
                </div>
                 <div class="r-display-inline-block">
                        <button id="${this.P}${constIdBaseWindow.CHAT}" class="r-a-b"><i class="bi bi-chat-dots"></i></button>
                        <button id="${this.P}${constIdBaseWindow.USER}" class="r-a-b"><i class="bi bi-person-circle"></i></button>
                    </div>
                </div>
            </div>

            <div class="r-w-body">
                ${type == 'crud' ? this.bodyForm() : ''}
            </div>
            <div class="r-facede-action bottom">
            </div>
        </div>
        `;
        contentForm.innerHTML = CREATE_OR_EDIT;
        this.ruculaWindow.appendChild(contentForm.childNodes[0]);
        this.ruculaWindow.appendChild(contentForm.childNodes[1]);
    }
    bodyForm() {
        return `<form class="r-window-work" autocomplete="off">
                    <div class="r-head r-read-edit r-facede-action-crud" id="${this.P}r-facede-action-crud">
                        <h3 id="${this.P}${constIdBaseWindow.FRAME_INFO}">
                        </h3>
                        <div id="${this.P}action-crud">
                            <button id="${this.P}r-a-save" class="r-a-b r-a-b-disable managed"><i class="bi bi-box-arrow-in-down"></i></button>
                            <button id="${this.P}r-a-alter" class="r-a-b r-a-b-disable managed"><i class="bi bi-pen"></i></button>
                            <button id="${this.P}r-a-delete" class="r-a-b r-a-b-disable managed"><i class="bi bi-trash"></i></button>
                            <button id="${this.P}r-a-reload" class="r-a-b r-a-b-disable"><i class="bi bi-arrow-repeat"></i></button>
                            <button id="${this.P}erase-window" class="r-a-b"><i class="bi bi-eraser"></i></button>
                            <button id="${this.P}r-a-menu-vertical" class="r-a-b r-desktop-web"><i class="bi bi-arrows"></i></button>
                            <button id="${this.P}r-a-menu-vertical-mobile" class="r-a-b r-mobile"><i class="bi bi-arrows"></i></button>
                        </div>
                    </div>
                    <div class="r-f-work r-f-items" id="${this.P}${constIdBaseWindow.FORM_RUCULA_JS}">
                    </div>
                </form>
                <div class="r-vertical-actions">
                    <ol id=${this.P}${constIdBaseWindow.BUTTONS_MENU_VERTICAL_LIST} class="">
                        <li class="r-display-none r-mobile" id="${this.P}${constIdBaseWindow.BUTTON_MENU_VERTICAL_MOBILE_CLOSE}">
                            <button class="r-b-i" type="button"><i class="bi bi-x-lg"> </i></button>
                        </li>
                    </ol>
                </div>`;
    }
    closeLeftGrid(grid) {
        if (grid == false) {
            let rf = this.globalWindow.querySelector(`.${this.P}r-f.r-display-none`);
            if (rf != null) {
                let buttonNew = this.globalWindow.querySelector(`#${this.P}${constIdBaseWindow.NEW}`);
                buttonNew.click();
            }
            let actions = this.globalWindow.querySelector(`#${this.P}actions`);
            actions?.remove();
            let maximizeWindow = this.globalWindow.querySelector(`#${this.P}${constIdBaseWindow.MAXIMIZE_WINDOW}`);
            maximizeWindow?.remove();
        }
    }
    maximizeForm() {
        let buttonMaximizeWindow = document.getElementById(`${this.P}${constIdBaseWindow.MAXIMIZE_WINDOW}`);
        buttonMaximizeWindow?.addEventListener('click', () => {
            let actions = document.getElementById(`${this.P}actions`);
            actions?.classList.toggle("r-close-grid");
        });
        let buttonMaximizeGrid = document.getElementById(`${this.P}${constIdBaseWindow.MAXIMIZE_GRID}`);
        buttonMaximizeGrid?.addEventListener('click', () => {
            let actions = document.getElementById(`${this.P}r-left-block`);
            actions?.classList.toggle("r-display-block");
            let formFrames = document.querySelector(`.${this.P}r-f`);
            formFrames.classList.toggle("r-mobile");
        });
    }
    eraseForm() {
        const eraseWindow = `${this.P}${constIdBaseWindow.ERASE_WINDOW}`;
        let evt = new Event(eraseWindow);
        document.getElementById(eraseWindow)?.addEventListener('click', () => {
            this.globalWindow.dispatchEvent(evt);
        });
    }
    actionCrudpreventDefault() {
        let facedeActionCrud = document.getElementById(`${this.P}r-facede-action-crud`);
        facedeActionCrud?.addEventListener('click', (e) => e.preventDefault());
    }
    openActionswindow() {
        let actions = document.getElementById(`${this.P}${constIdBaseWindow.ACTIONS_WINDOW}`);
        actions?.addEventListener('click', (e) => {
            actions?.nextElementSibling?.classList.toggle('r-actions-window-active');
            actions?.nextElementSibling?.classList.toggle('r-actions-window');
        });
    }
    alterTheme() {
        let rw = document.querySelector(`.${this.P}r-w`);
        let actions = document.getElementById(`${this.P}${constIdBaseWindow.ALTER_THEME}`);
        let theme = cookie.read('theme');
        if (theme == 'dark') {
            rw?.classList.add('dark-theme');
        }
        actions?.addEventListener('click', (e) => {
            rw?.classList.toggle('dark-theme');
            if (rw?.classList.contains('dark-theme')) {
                document.cookie = "theme=dark";
            }
            else {
                document.cookie = "theme=light";
            }
        });
    }
    getPrincipalElementRucula() {
        return document.getElementById(`${this.P}${constIdBaseWindow.FORM_RUCULA_JS}`);
    }
}

let ruculaGlobal = (() => {
    let configuration;
    function checkLocalizations(localizations) {
        if (localizations.length == 0) {
            throw new Error("🌿 localization must be informed");
        }
    }
    function checkEnvironments(environments) {
        if (environments.length == 0) {
            alert('não há ambientes no momento');
            throw new Error("🌿 environment must be informed");
        }
    }
    return {
        initGlobalConfiguration: function (config) {
            configuration = config;
            ruculaGlobal.setEnviroment();
            ruculaGlobal.setLocalization();
        },
        setLocalization: function (locales = 0) {
            checkLocalizations(configuration.localizations);
            if (typeof locales === "number") {
                configuration.chosenLocalization = configuration.localizations[0];
                return;
            }
            let loc = configuration.localizations.find(c => c.locales === locales);
            if (loc == undefined || loc == null) {
                throw new Error("🌿 localization not found");
            }
            configuration.chosenLocalization = loc;
        },
        setEnviroment: function (enviroment = 0) {
            checkEnvironments(configuration.environments);
            if (typeof enviroment === "number") {
                configuration.chosenEnvironment = configuration.environments[0];
                return;
            }
            let env = configuration.environments.find(c => c.env === enviroment);
            if (env == undefined || env == null) {
                var manualEnviroment = prompt('Ambiente não existe, considere outras alternativas!', configuration.environments[0].env);
                if (manualEnviroment == null) {
                    throw new Error("🌿 environment not found");
                }
                ruculaGlobal.setEnviroment(manualEnviroment);
            }
            configuration.chosenEnvironment = env;
        },
        getEnvironment: function () {
            return configuration.chosenEnvironment;
        },
        getLocalization: function () {
            return configuration.chosenLocalization;
        },
        getConfigurationGlobal: function () {
            return configuration;
        }
    };
})();

class URLRucula {
    _URL;
    managmentObject;
    constructor(managmentObject, URL = {}) {
        if (URL.absolute == null)
            URL.absolute = '';
        if (URL.relative == null)
            URL.relative = '';
        if (URL.params == null)
            URL.params = '';
        this._URL = URL;
        this.managmentObject = managmentObject;
    }
    getURL() {
        let url = '';
        if (this._URL == undefined) {
            return this.domain();
        }
        if (this._URL.absolute.length > 0) {
            url = this.path(this._URL.absolute);
        }
        else {
            url = this.domain();
        }
        if (this._URL.relative.length > 0) {
            let path = this.path(this._URL.relative);
            url = `${url}/${path}`;
        }
        let params = '';
        if (this._URL.params.length > 0) {
            params = this.path(this._URL.params);
            url = `${url}?${params}`;
            return url;
        }
        if (url == '') {
            return this.domain();
        }
        return url;
    }
    domain() {
        let enviroment = ruculaGlobal.getEnvironment();
        if (enviroment.port) {
            return `${enviroment.hostname}:${enviroment.port}`;
        }
        return `${enviroment.hostname}`;
    }
    path(path) {
        path = this.createWithParams(path);
        path = this.createWithoutParams(path);
        return path;
    }
    createWithParams(path) {
        var regex = /([^&]+=)({([^}&]+)})/g;
        var matches = path.matchAll(regex);
        for (const match of matches) {
            var propertValue = match[3];
            var value = this.managmentObject?.getPropert(propertValue);
            path = path.replace(match[0], `${match[1]}${value}`);
        }
        return path;
    }
    createWithoutParams(path) {
        var regex = /\/{([^}&]+)}/gm;
        var matches = path.matchAll(regex);
        for (const match of matches) {
            var propertValue = match[1];
            var value = this.managmentObject?.getPropert(propertValue);
            path = path.replace(match[0], `/${value}`);
        }
        return path;
    }
}

class EventButton {
    field;
    managmentObject;
    P;
    constructor(field, managmentObject, P) {
        this.field = field;
        this.managmentObject = managmentObject;
        this.P = P;
    }
    eventButton(ruculaForm, pathController, buttons) {
        let rucula = ruculaForm;
        buttons?.filter(b => b.type === "button")
            .forEach((button) => {
            let element = document?.getElementById(`${this.P}${button.target}`);
            let object = {
                detail: {
                    url: '',
                    body: {}
                }
            };
            let dependency = {
                detail: {}
            };
            let eventButton = new CustomEvent(`${this.P}${button.target}`, object);
            let eventButtonDependency = new CustomEvent(`${this.P}${button.target}.dependency`, dependency);
            element?.addEventListener("click", () => {
                if (button.URL) {
                    let url = new URLRucula(this.managmentObject, button.URL);
                    object.detail.url = url.getURL();
                }
                let optionObjectReturn = button?.body;
                let defaultsButton = [
                    this.P + constTargetButtonCrudDefault.SAVE,
                    this.P + constTargetButtonCrudDefault.ALTER,
                    this.P + constTargetButtonCrudDefault.DELETE,
                ];
                if (optionObjectReturn == undefined && defaultsButton.indexOf(button.target) > -1) {
                    rucula.dispatchEvent(eventButton);
                    return;
                }
                let dependencyCount = this.managmentObject.tableDependency.dependenciesCount();
                if (dependencyCount > 0) {
                    this.field.focusFieldsWithDependency();
                    rucula.dispatchEvent(eventButtonDependency);
                    return;
                }
                if (optionObjectReturn === '') {
                    object.detail.body = this.managmentObject.objectSeparate();
                }
                if (optionObjectReturn === '.') {
                    object.detail.body = this.managmentObject.objectFull();
                }
                if (optionObjectReturn && String(optionObjectReturn).length > 1) {
                    object.detail.body = this.managmentObject.objectUnique(optionObjectReturn);
                }
                rucula.dispatchEvent(eventButton);
            });
        });
    }
    openCloseRightListButtonsActions() {
        const buttonOpenClose = document.getElementById(`${this.P}r-a-menu-vertical`);
        const buttonMobileClose = document.getElementById(`${this.P}${constIdBaseWindow.BUTTON_MENU_VERTICAL_MOBILE_CLOSE}`);
        const buttonOpenClosemobile = document.getElementById(`${this.P}${constIdBaseWindow.BUTTONS_MENU_VERTICAL_MOBILE}`);
        const divRightListButtonsActions = document.querySelector(`.r-vertical-actions`);
        buttonOpenClose?.addEventListener("click", () => {
            divRightListButtonsActions?.classList.toggle("r-display-none");
        });
        buttonOpenClosemobile?.addEventListener("click", () => {
            divRightListButtonsActions?.classList.toggle("r-display-block");
        });
        buttonMobileClose?.addEventListener("click", () => {
            divRightListButtonsActions?.classList.toggle("r-display-block");
        });
    }
}

let configWindow = (() => {
    let windows = new Map();
    return {
        set: (window, P) => {
            let mappedwindow = windows.get(P);
            if (mappedwindow) {
                return;
            }
            windows.set(P, window);
        },
        get: (P) => {
            return windows.get(P);
        },
        frame: {
            get: (identity, P) => {
                let window = windows.get(P);
                let frame = window.frames.find(c => c.identity == identity);
                return frame;
            }
        }
    };
})();

let defaultValues = (() => {
    const configFrameDefault = {
        TYPE_FRAME: constTypeFrame.BLOCK,
        VERTICAL: true,
        REQUERID: true
    };
    const configInputDefault = {
        TYPE: constTypeInput.TEXT,
        REQUERID_TRUE: true,
        REQUERID_FALSE: false,
        DISABLE: false
    };
    function setDefaultFrame(frame) {
        frame.type ??= configFrameDefault.TYPE_FRAME;
        frame.vertical ??= configFrameDefault.VERTICAL;
        frame.requerid ??= configFrameDefault.REQUERID;
    }
    function setDefaultInput(field) {
        field.type ??= configInputDefault.TYPE;
        field.disable ??= configInputDefault.DISABLE;
        field.requerid ??= configInputDefault.REQUERID_FALSE;
    }
    return {
        setDefault: (window) => {
            if (!window) {
                return;
            }
            window.grid ??= true;
            window.gridFooter ??= true;
            window.gridSearch ??= true;
            window.frames.forEach(frame => {
                setDefaultFrame(frame);
                frame.fields?.forEach(field => {
                    setDefaultInput(field);
                });
            });
        }
    };
})();

class LayoutFrame {
    P;
    constructor(P) {
        this.P = P;
    }
    configureLayout(window, principalElementRucula) {
        if (window.layout.items === undefined) {
            return;
        }
        let rowLength = window.layout.items.length;
        let colLength = window.layout.items[0].length;
        window.layout.tamplateColumns = colLength;
        window.layout.tamplateRow = rowLength;
        var tamplateColumns = window.layout.tamplateColumns;
        principalElementRucula.style.gridTemplateColumns = `repeat(${tamplateColumns},1fr)`;
        principalElementRucula.style.gridTemplateRows = 'max-content';
        for (let row = 1; row <= rowLength; row++) {
            for (let col = 1; col <= colLength; col++) {
                let item = window.frames.find(c => c.alias == window.layout.items[row - 1][col - 1]);
                if (item == undefined) {
                    continue;
                }
                if (item.layout === undefined) {
                    item.layout = { row: { start: -1, end: -1 }, col: { start: -1, end: -1 } };
                }
                if (item.layout.row.start === -1) {
                    item.layout.row.start = row;
                }
                if (item.layout.col.start === -1) {
                    item.layout.col.start = col;
                }
                item.layout.row.end = row + 1;
                item.layout.col.end = col + 1;
            }
        }
    }
}

class DOMButtonsCheck {
    buttonCreate;
    buttonAlter;
    buttonDelete;
    buttonsPlus;
    olButtonsPlus;
    P;
    crud;
    constructor(P, crud) {
        this.P = P;
        this.crud = crud;
    }
    buttonCrudDefault() {
        this.buttonCreate = document.getElementById(`${this.P}${constTargetButtonCrudDefault.SAVE}`);
        this.buttonAlter = document.getElementById(`${this.P}${constTargetButtonCrudDefault.ALTER}`);
        this.buttonDelete = document.getElementById(`${this.P}${constTargetButtonCrudDefault.DELETE}`);
    }
    SpecificRightButtons() {
        this.buttonsPlus = document.getElementById(`${this.P}${constIdBaseWindow.BUTTONS_MENU_VERTICAL}`);
        this.olButtonsPlus = document.getElementById(`${this.P}${constIdBaseWindow.BUTTONS_MENU_VERTICAL_LIST}`);
        if (this.olButtonsPlus.querySelectorAll("button,a").length == 0) {
            this.buttonsPlus.remove();
            this.olButtonsPlus.remove();
        }
    }
    clickCreate() {
        this.buttonCreate.click();
    }
    clickAlter() {
        this.buttonAlter.click();
    }
    clickDelete() {
        this.buttonDelete.click();
    }
    removeCreate() {
        this.buttonCreate.remove();
    }
    removeAlter() {
        this.buttonAlter.remove();
    }
    removeDelete() {
        this.buttonDelete.remove();
    }
    removeUnusedButtons() {
        this.buttonCrudDefault();
        this.SpecificRightButtons();
        if (this.crud == "" || this.crud == undefined) {
            this.buttonCreate.remove();
            this.buttonAlter.remove();
            this.buttonDelete.remove();
            return;
        }
        let options = "crud";
        for (let index = 0; index < this.crud.length; index++) {
            let indexof = options.indexOf(this.crud[index]);
            options = options.replace(options[indexof], "");
        }
        if (options.length < 1 || (options.length == 1 && options[0] == "r")) {
            return;
        }
        for (let index = 0; index < options.length; index++) {
            if (options[index] == "c") {
                this.buttonCreate.remove();
            }
            if (options[index] == "u") {
                this.buttonAlter.remove();
            }
            if (options[index] == "d") {
                this.buttonDelete.remove();
            }
        }
    }
}

class LoaderManagment {
    loaderBkp = document.createElement('div');
    loaderElement = document.createElement('div');
    boxShow;
    P;
    constructor(P) {
        this.P = P;
        this.loaderElement.classList.add('r-loader');
        this.loaderElement.classList.add(`${this.P}js-r-loader`);
        this.loaderElement.classList.add('r-item-center');
    }
    enable() {
        this.boxShow = document.getElementById(`${this.P}r-box-show`);
        this.boxShow?.classList.add('r-box-show-center');
        this.boxShow?.appendChild(this.loaderElement);
    }
    disable() {
        let loader = document.querySelector(`.${this.P}js-r-loader`);
        this.loaderBkp.appendChild(loader);
        this.boxShow?.classList.remove('r-box-show-center');
    }
}

class Popup {
    prefix;
    constructor(prefix) {
        this.prefix = prefix;
    }
    boxShow;
    boxShowAppendChield(element) {
        this.boxShow = document.getElementById(`${this.prefix}r-box-show`);
        this.boxShow?.appendChild(element);
        this.boxShow?.classList.add('r-box-show-center');
    }
    messageElement(config) {
        let message = document.createElement('div');
        message.classList.add('r-message');
        message.innerHTML = `
            <div class="r-message-header">
                <div class="r-message-header-icon">
                    <i class="bi ${config.icon}"></i>
                </div>   
                <div class="r-message-header-title">
                    ${config.title}
                </div>
            </div>
            
            <div class="r-message-content">
                <div class="r-message-content-text">
                    ${config.text}
                </div>
            </div>
            <div class="r-message-footer">
                ${config.footer}
            </div>`;
        if (config?.disableadHeader) {
            let header = message.querySelector('.r-message-header');
            header?.remove();
        }
        if (config?.disableadFooter) {
            let footer = message.querySelector('.r-message-footer');
            footer?.remove();
        }
        if (config?.htmlBody) {
            let messageContent = message.querySelector('.r-message-content');
            messageContent?.appendChild(config?.htmlBody);
        }
        return message;
    }
    closeTimeout(div, timeout, callback) {
        setTimeout(() => {
            div.remove();
            this.close();
            if (callback) {
                callback();
            }
        }, timeout);
    }
    closeOKOrCancel(callback, div, callbackInTimeout = false) {
        if (callbackInTimeout) {
            callback(constYesNo.NO);
        }
        let ok = div.querySelector('button.ok');
        let cancel = div.querySelector('button.cancel');
        ok?.addEventListener('click', () => {
            div.remove();
            this.close();
            if (callback) {
                callback(constYesNo.YES);
            }
        });
        cancel?.addEventListener('click', () => {
            div.remove();
            this.close();
            if (callback) {
                callback(constYesNo.NO);
            }
        });
    }
    close() {
        this.boxShow.classList.remove('r-box-show-center');
    }
    info(config, callback) {
        let info = this.messageElement({
            icon: "bi-info-circle color-darkgrey",
            title: "Informação",
            text: config.text,
            footer: `<div class="r-message-footer">
                <div class="cancel-ok">
                    <button class="ok">OK</button>        
                </div>
            </div>`,
            disableadFooter: config.disableadFooter,
            disableadHeader: config.disableadHeader,
            htmlBody: config.htmlBody
        });
        if (config?.timeout) {
            this.closeTimeout(info, config.timeout, callback);
        }
        this.closeOKOrCancel(callback, info);
        this.boxShowAppendChield(info);
    }
    sucess(config, callback) {
        let sucess = this.messageElement({
            icon: "bi-check2-circle color-green",
            title: "Sucesso",
            text: config.text,
            footer: `<div class="r-message-footer">
                <div class="cancel-ok">
                    <button class="ok">OK</button>        
                </div>
            </div>`,
            disableadFooter: config.disableadFooter
        });
        this.closeOKOrCancel(callback, sucess);
        if (config.timeout) {
            this.closeTimeout(sucess, config.timeout);
        }
        this.boxShowAppendChield(sucess);
    }
    warning(config, callback) {
        let warning = this.messageElement({
            icon: "bi-exclamation-triangle color-orange",
            title: "Atenção",
            text: config.text,
            footer: `<div class="r-message-footer">
                <div class="cancel-ok">
                    <button class="ok">OK</button>
                    <button class="cancel">Cancel</button>
                </div>    
            </div>`,
            disableadFooter: config.disableadFooter
        });
        this.closeOKOrCancel(callback, warning);
        if (config.timeout) {
            this.closeTimeout(warning, config.timeout);
        }
        this.boxShowAppendChield(warning);
    }
    error(config, callback) {
        let warning = this.messageElement({
            icon: "bi-x-circle color-red",
            title: "Erro",
            text: config.text,
            footer: `<div class="r-message-footer">
                <div class="cancel-ok">
                    <button class="ok">OK</button>        
                </div>    
            </div>`,
            disableadFooter: config.disableadFooter
        });
        this.closeOKOrCancel(callback, warning);
        if (config.timeout) {
            this.closeTimeout(warning, config.timeout);
        }
        this.boxShowAppendChield(warning);
    }
}

class RuculaLogs {
    managmentObject;
    constructor(managmentObject) {
        this.managmentObject = managmentObject;
    }
    dependencies() {
        return this.managmentObject.tableDependency.getDependenciesNotResolded();
    }
    object() {
        return this.managmentObject.objectFull();
    }
}

class EventManagment {
    managmentObject;
    p;
    elementRoot;
    constructor(p, managmentObject, elementRoot) {
        this.p = p;
        this.managmentObject = managmentObject;
        this.elementRoot = elementRoot;
    }
    getFieldDetails(event) {
        let identity = event.detail.identity;
        return {
            identity: identity.element.getAttribute('identity'),
            name: identity.name,
            row: identity.row,
            value: this.managmentObject.getPropert(identity.name),
            targetPathWithRow: (targetPath) => {
                return `${targetPath}.${identity.row}`;
            }
        };
    }
    on(event, callback, query) {
        let rucula = this.elementRoot;
        if (query == undefined) {
            rucula.addEventListener(`${this.p}${event}`, (e) => callback(e));
            return;
        }
        let itens = rucula.querySelectorAll(query);
        itens.forEach((item) => {
            item.addEventListener(event, (e) => callback(e));
        });
    }
}

class FrameElement {
    managmentObject;
    field;
    frameEvent;
    button;
    fieldMenuContext;
    inputValueSnapshot = [];
    constructor(managmentObject, field, frameEvent, button, fieldMenuContext) {
        this.managmentObject = managmentObject;
        this.field = field;
        this.frameEvent = frameEvent;
        this.button = button;
        this.fieldMenuContext = fieldMenuContext;
    }
    createbase(frame) {
        const div = document.createElement('div');
        div.style.gridColumnStart = `${frame.layout.col.start}`;
        div.style.gridColumnEnd = `${frame.layout.col.end}`;
        div.style.gridRowStart = `${frame.layout.row.start}`;
        div.style.gridRowEnd = `${frame.layout.row.end}`;
        if (frame.type == constTypeFrame.BLOCK) {
            div.classList.add("r-q-b");
        }
        if (frame.type == constTypeFrame.LINE) {
            div.classList.add('r-q-l');
        }
        div.setAttribute('identity', frame.identity);
        const h3 = document.createElement('h3');
        h3.textContent = frame.name;
        h3.classList.add('r-t-f');
        div.appendChild(h3);
        if (frame?.style?.width)
            div.style.width = frame.style.width;
        if (frame?.style?.height)
            div.style.height = frame.style.height;
        return div;
    }
    setValuesDefined(frame, htmlElement) {
        frame.fields?.forEach(field => {
            let input = htmlElement.querySelector(field.identity);
            if (input) {
                this.managmentObject.setValueContextIdentity(field.identity, field.type, input.value);
            }
        });
    }
    revertToInit() {
        for (let index = 0; index < this.inputValueSnapshot.length; index++) {
            this.inputValueSnapshot[index].element.value = this.inputValueSnapshot[index].value;
        }
    }
}

class FrameElementBlock extends FrameElement {
    constructor(managmentObject, field, frameEvent, button, fieldMenuContext) {
        super(managmentObject, field, frameEvent, button, fieldMenuContext);
    }
    create(frame) {
        const frameElement = this.createbase(frame);
        const div = document.createElement("div");
        div.classList.add("r-q-i");
        if (frame.vertical) {
            div.style.flexDirection = "column";
        }
        frame.fields?.forEach(field => {
            if (field?.button) {
                let buttonElement = this.button.createButtonOrLink(field.button);
                let groupElement = this.field.createGroupOfButton(buttonElement);
                div.appendChild(groupElement);
                return;
            }
            let fieldElement = this.field.create(field);
            let groupElement = this.field.createGroupOfInput(field, fieldElement);
            div.appendChild(groupElement);
            this.fieldMenuContext.infoSet({
                identity: field.identity,
                field: field
            });
            this.inputValueSnapshot.push({
                element: fieldElement,
                value: fieldElement.value
            });
        });
        this.setValuesDefined(frame, div);
        frameElement.appendChild(div);
        if (frame.requerid == false) {
            this.managmentObject.tableDependency.moveNotResolvedToImbernate(frame.alias);
            this.frameEvent.managedFrame(div);
            this.frameEvent.cleanRequeridDependency(div);
        }
        return frameElement;
    }
}

let keyEvent = new Array();
function KeyEventClear() {
    keyEvent = [];
}
function KeyEventAdd(key) {
    if (keyEvent.filter(c => c == key).length == 0) {
        keyEvent.push(key);
    }
    keyEvent.sort();
}
function KeyEventGetIndex(index) {
    return keyEvent[index];
}

function convertValueType(value, type) {
    type = GetType(type);
    if (isBoolean()) {
        return convertToBoolean();
    }
    if (isNumeric()) {
        return convertToNumeric();
    }
    return value;
    function isNumeric() {
        return type == constTypeInput.CURRENCY ||
            type == constTypeInput.NUMBER;
    }
    function isBoolean() {
        return type == constTypeInput.BOOLEAN;
    }
    function convertToNumeric() {
        return Number(value);
    }
    function convertToBoolean() {
        if (value == "true") {
            return true;
        }
        else {
            return false;
        }
    }
    function GetType(type) {
        if (type.length == 2) {
            return type[1];
        }
        return type;
    }
}
function alignItem(field, item) {
    if (field.type == constTypeInput.TEXT || field.type == undefined || field.type[0] == constTypeInput.SELECT) {
        item.classList.add('r-t-align-left');
    }
    if (field.type == constTypeInput.NUMBER || field.type == constTypeInput.CURRENCY) {
        item.classList.add('r-t-align-right');
    }
    if (field.type[0] == constTypeInput.CHECKBOX) {
        item.classList.add('r-t-align-center');
    }
}

class FameLineTable {
    managmentObject;
    field;
    frameEvent;
    frameElementLine;
    callbackSetValuesDefined;
    fieldMenuContext;
    P;
    constructor(managmentObject, field, frameElementLine, frameEvent, callbackSetValuesDefined, fieldMenuContext, P) {
        this.managmentObject = managmentObject;
        this.field = field;
        this.frameEvent = frameEvent;
        this.frameElementLine = frameElementLine;
        this.callbackSetValuesDefined = callbackSetValuesDefined;
        this.fieldMenuContext = fieldMenuContext;
        this.P = P;
    }
    getCellActions(tr) {
        return tr.querySelector('td');
    }
    createHeader(frame) {
        let trColumns = document.createElement('tr');
        let trTitle = document.createElement('tr');
        let thTitle = document.createElement('th');
        trTitle.appendChild(thTitle);
        thTitle.style.textAlign = 'start';
        thTitle.classList.add('title');
        let thead = document.createElement('thead');
        thead.appendChild(trTitle);
        thead.appendChild(trColumns);
        const actions = document.createElement('th');
        trColumns.appendChild(actions);
        frame.fields?.forEach(field => {
            const th = document.createElement('th');
            th.textContent = field.description;
            if (field.requerid == true) {
                th.textContent = th.textContent;
                th.append(this.field.createSpanLabelIsRequerid().cloneNode(true));
            }
            alignItem(field, th);
            trColumns.appendChild(th);
        });
        let columnsLength = trColumns.querySelectorAll('th');
        thTitle.setAttribute('colspan', String(columnsLength.length));
        return thead;
    }
    createRowDetail(frame, inputSnapshot) {
        let tr = document.createElement('tr');
        const tdActions = document.createElement('td');
        tdActions.setAttribute('ruc-action', '');
        tr.appendChild(tdActions);
        if (frame.fields) {
            this.frameElementLine.addActionsInCell(tr, frame.fields[0].identity);
        }
        frame.fields?.forEach((field) => {
            const td = document.createElement('td');
            const elementInput = this.field.create(field);
            td.appendChild(elementInput);
            var alignInInput = elementInput.getAttribute('type') != "checkbox";
            if (alignInInput) {
                alignItem(field, elementInput);
            }
            if (alignInInput == false) {
                alignItem(field, td);
            }
            tr.appendChild(td);
            this.fieldMenuContext.infoSet({
                identity: field.identity,
                field: field
            });
            if (inputSnapshot) {
                inputSnapshot.push({
                    element: elementInput,
                    value: elementInput.value
                });
            }
        });
        let rowCount = this.managmentObject.count(frame.identity);
        this.callbackSetValuesDefined(frame, tr);
        if (frame.requerid == false && rowCount == 1) {
            this.frameEvent.managedFrame(tr);
            this.frameEvent.cleanRequeridDependency(tr);
            this.managmentObject.tableDependency.moveNotResolvedToImbernate(frame.identity);
        }
        if (frame.requerid == false && rowCount > 1) {
            this.managmentObject.tableDependency.moveImbernateToNotResolved(frame.identity);
        }
        return tr;
    }
    createNewRowDetail(identityObject) {
        let frame = configWindow.frame.get(identityObject, this.P);
        this.managmentObject.addLine(frame);
        const row = this.createRowDetail(frame);
        row.querySelector("input")?.focus();
        this.frameElementLine.eventKeyDownKeyUpLineFrame(row);
        return row;
    }
    deleteRowDetail(currentLineElement, inputTargetEvent) {
        let nextSibling = currentLineElement.nextSibling;
        let previousSibling = currentLineElement.previousSibling;
        let Tbody = currentLineElement.parentNode;
        let rowElement = currentLineElement;
        currentLineElement = rowElement;
        let identityInputTartget = inputTargetEvent.getAttribute("identity");
        let fragmentObject = this.managmentObject.getFragmentForIdentity(identityInputTartget);
        let field = this.managmentObject.fragment.fields_getForIdentity(identityInputTartget);
        let frame = configWindow.frame.get(field.config.fragmentObjectIdentity, this.P);
        moveActions(fragmentObject.config.fragmentObjectIdentity, this.getCellActions);
        let count = this.managmentObject.count(frame.identity);
        let actions = currentLineElement.querySelector('td div');
        currentLineElement.remove();
        this.managmentObject.removeLine(frame.identity, field.config.line);
        this.managmentObject.removeFragmentsLine(frame.identity, field.config.line);
        if (count <= 1) {
            let newLine = this.createNewRowDetail(frame.identity);
            let tdActions = this.getCellActions(newLine);
            tdActions?.appendChild(actions);
            Tbody.appendChild(newLine);
            newLine?.querySelector("input")?.focus();
        }
        function moveActions(fragmentObject, getCellActionsCallback) {
            let actions = document.getElementById(fragmentObject);
            if (previousSibling) {
                previousSibling?.querySelector("input")?.focus();
                let tdActions = getCellActionsCallback(previousSibling);
                tdActions?.appendChild(actions);
                return;
            }
            if (nextSibling) {
                nextSibling?.querySelector("input")?.focus();
                let tdActions = getCellActionsCallback(nextSibling);
                tdActions?.appendChild(actions);
            }
        }
    }
}

class FrameElementLine extends FrameElement {
    fameLineTable;
    constructor(managmentObject, field, frameEvent, button, fieldMenuContext, P) {
        super(managmentObject, field, frameEvent, button, fieldMenuContext);
        this.fameLineTable = new FameLineTable(managmentObject, field, this, frameEvent, this.setValuesDefined, fieldMenuContext, P);
    }
    createTDActions(identity) {
        const div = document.createElement('div');
        div.setAttribute('id', identity);
        div.setAttribute('class', 'f-l-actions r-text-nowrap');
        div.innerHTML = `<a class="add" id=${constFrameLineActions.ADD}><i class="bi bi-plus-lg"></i></a>
            <a class="remove" id=${constFrameLineActions.REMOVE}><i class="bi bi-trash"></i></a>`;
        this.eventActions(div);
        return div;
    }
    create(frame) {
        const frameLine = this.createbase(frame);
        const table = document.createElement('table');
        table.classList.add("f-t-line");
        let title = frameLine.querySelector('h3');
        const rowHeader = this.fameLineTable.createHeader(frame);
        let thTitle = rowHeader.querySelector('th');
        thTitle.appendChild(title);
        table.appendChild(rowHeader);
        const tbody = document.createElement('tbody');
        const rowDetail = this.fameLineTable.createRowDetail(frame, this.inputValueSnapshot);
        let td = this.fameLineTable.getCellActions(rowDetail);
        td?.appendChild(this.createTDActions(frame.identity));
        tbody.appendChild(rowDetail);
        table.appendChild(tbody);
        frameLine.appendChild(table);
        this.eventKeyDownKeyUpLineFrame(rowDetail);
        return frameLine;
    }
    currentLineElement;
    inputTargetEvent;
    createNewLine(currentLineElement, element) {
        let field = this.managmentObject.fragment.fields_getForIdentity(element.getAttribute("identity"));
        let newline = this.fameLineTable.createNewRowDetail(field.config.fragmentObjectIdentity);
        currentLineElement.after(newline);
    }
    deleteLine(currentLineElement, element) {
        this.fameLineTable.deleteRowDetail(currentLineElement, element);
    }
    crudLineQuadro(event) {
        const key = event.key;
        KeyEventAdd(key);
        let nextLine = null;
        let previousLine = null;
        this.inputTargetEvent = event.target;
        this.currentLineElement = event.currentTarget;
        let identity = this.inputTargetEvent.getAttribute("identity");
        let inputs = this.currentLineElement.querySelectorAll('input');
        let positionInput = 0;
        for (let index = 0; index < inputs.length; index++) {
            if (inputs[index].getAttribute("identity") == identity) {
                positionInput = index;
                break;
            }
        }
        if (KeyEventGetIndex(0) == "ArrowUp") {
            event.preventDefault();
            previousLine = this.currentLineElement.previousSibling;
            let inputs = previousLine?.querySelectorAll('input');
            if (inputs) {
                inputs[positionInput]?.focus();
            }
        }
        if (KeyEventGetIndex(0) == "ArrowDown") {
            event.preventDefault();
            nextLine = this.currentLineElement.nextSibling;
            let inputs = nextLine?.querySelectorAll('input');
            if (inputs) {
                inputs[positionInput]?.focus();
            }
        }
        if (KeyEventGetIndex(0) == undefined || KeyEventGetIndex(1) == undefined) {
            return;
        }
        if (KeyEventGetIndex(0) == "Control" && KeyEventGetIndex(1) == "Enter") {
            event.preventDefault();
            this.createNewLine(this.currentLineElement, this.inputTargetEvent);
        }
        if (KeyEventGetIndex(0) == "0" && KeyEventGetIndex(1) == "Control") {
            event.preventDefault();
            this.deleteLine(this.currentLineElement, this.inputTargetEvent);
        }
        KeyEventClear();
    }
    eventActions(actions) {
        let add = actions.querySelector(`#${constFrameLineActions.ADD}`);
        let remove = actions.querySelector(`#${constFrameLineActions.REMOVE}`);
        add?.addEventListener('click', (e) => {
            let params = TRAndInput(e);
            this.createNewLine(params.tr, params.input);
        });
        remove?.addEventListener('click', (e) => {
            let params = TRAndInput(e);
            this.deleteLine(params.tr, params.input);
        });
        function TRAndInput(e) {
            let anchor = e.currentTarget;
            let td = anchor?.parentElement?.parentElement;
            let tr = td?.parentElement;
            let input = td?.nextSibling?.querySelector('input,select');
            return {
                tr: tr,
                input: input
            };
        }
    }
    eventKeyDownKeyUpLineFrame(element) {
        element.addEventListener('keydown', (event) => {
            const key = event.key;
            KeyEventAdd(key);
            this.crudLineQuadro(event);
        });
        element.addEventListener('keyup', (event) => {
            KeyEventClear();
        });
    }
    addActionsInCell(tr, identity) {
        let tdActions = tr.querySelector('td');
        let fragmentObject = this.managmentObject.getFragmentForIdentity(identity);
        tr.addEventListener('mouseover', (e) => {
            let actions = document.getElementById(fragmentObject.config.fragmentObjectIdentity);
            tdActions?.appendChild(actions);
        });
    }
}

function generateUUID(sinal) {
    return `RUC${sinal}xxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

class ManagmentObject {
    fragment;
    tableDependency;
    constructor(fragment, tableDependency, frames) {
        this.fragment = fragment;
        this.tableDependency = tableDependency;
        if (frames.length > 0) {
            this.initObjects(frames);
            frames.forEach(frame => {
                if (frame.type === 'block') {
                    this.configFieldBlock(frame);
                }
                if (frame.type === 'line') {
                    this.addLine(frame);
                }
            });
        }
    }
    pathObjectBase = [];
    initObjects(frames) {
        this.pathObjectBase = [];
        frames?.forEach(frame => {
            frame.identity = generateUUID('F');
            if (frame.alias === undefined) {
                throw new Error('propert alias is Requerid');
            }
            let fragmentObject = {
                key: {
                    identity: frame.identity,
                    alias: frame.alias
                },
                config: {
                    objectDto: frame.objectDto,
                    identity: frame.identity,
                    object: frame.type == constTypeFrame.BLOCK ? {} : [],
                    getValueInObjectFragment: this.getValueInObjectFragment
                }
            };
            this.fragment.objects_add(fragmentObject);
            this.pathObjectBase.push({ parent: frame.parent, alias: frame.alias, configFrame: frame.identity });
        });
    }
    configFieldBlock(frame) {
        frame.fields?.forEach(field => {
            field.identity = generateUUID('I');
            let config = {
                key: {
                    identity: field.identity,
                },
                config: {
                    alias: frame.alias,
                    fragmentObjectIdentity: frame.identity,
                    identity: field.identity,
                    propertDto: field.propertDto,
                    line: undefined,
                    dependency: ''
                }
            };
            config.config.dependency = this.tableDependency.createExpectedDependency(field, config);
            this.tableDependency.toApplyOrRemoveDependency(config, field.value ??= "");
            this.fragment.fields_add(config);
        });
    }
    addLine(frame) {
        let object = this.fragment.objects_getForIdentity(frame.identity);
        let newLine = object.config.object.length + 1;
        object.config.object.push({ rucLine: newLine });
        frame.fields?.forEach(field => {
            field.identity = generateUUID('I');
            let config = {
                key: {
                    identity: field.identity,
                },
                config: {
                    alias: frame.alias,
                    fragmentObjectIdentity: frame.identity,
                    identity: field.identity,
                    propertDto: field.propertDto,
                    line: newLine,
                    dependency: ''
                }
            };
            config.config.dependency = this.tableDependency.createExpectedDependency(field, config);
            this.tableDependency.toApplyOrRemoveDependency(config, field.value ??= "");
            this.fragment.fields_add(config);
        });
    }
    createObject() {
        let configBase = this.pathObjectBase.find(c => c.parent === undefined || c.parent === '');
        let configFrameBase = this.fragment.objects_getForIdentity(configBase.configFrame);
        let newObject = Object.assign({}, configFrameBase?.config.object);
        this.pathObjectBase.forEach((config) => {
            let fragmentObject = this.fragment.objects_getForIdentity(config.configFrame);
            if (config.parent == '.') {
                insertObjectRoot();
                return;
            }
            if (config.parent != '.' && config.parent !== undefined && config.parent !== '') {
                insertObjectParent(config.parent.split('.'), newObject);
                return;
            }
            function insertObjectRoot() {
                newObject[fragmentObject.config.objectDto] = fragmentObject.config.object;
            }
            function insertObjectParent(parent, newObject) {
                if (parent.length == 0) {
                    return;
                }
                let propert = parent[0];
                if (parent.length == 1) {
                    createPropertForObject();
                    return;
                }
                if (parent.length > 1) {
                    createPropertForPath();
                    let newPath = parent.slice(1, parent.length);
                    insertObjectParent(newPath, newObject[propert]);
                    return;
                }
                function createPropertForObject() {
                    if (newObject[propert] === undefined) {
                        newObject[propert] = {};
                    }
                    newObject[propert][fragmentObject.config.objectDto] = fragmentObject.config.object;
                }
                function createPropertForPath() {
                    if (newObject[propert] === undefined) {
                        newObject[propert] = {};
                    }
                }
            }
        });
        return newObject;
    }
    createObjectSeparete() {
        let objectSeparate = {};
        this.pathObjectBase.forEach((config) => {
            let configFragment = this.fragment.objects_getForIdentity(config.configFrame);
            objectSeparate[config.alias] = configFragment.config.object;
        });
        return objectSeparate;
    }
    createObjectForAlias(alias) {
        let object = this.fragment.objects_getForAlias(alias);
        return object.config.object;
    }
    setValue(fragmentField, value) {
        let fragmentObject = this.fragment.objects_getForIdentity(fragmentField.config.fragmentObjectIdentity);
        if (isTypeObject()) {
            fragmentObject.config.object[fragmentField?.config.propertDto] = value;
        }
        if (isTypeLine()) {
            let line = fragmentField?.config.line;
            let item = fragmentObject.config.object.find((c) => c.rucLine == line);
            if (item == undefined) {
                item = { rucLine: line };
                fragmentObject.config.object.push(item);
            }
            item[fragmentField?.config.propertDto] = value;
        }
        function isTypeObject() {
            return fragmentField?.config.line == undefined;
        }
        function isTypeLine() {
            return fragmentField?.config.line != undefined;
        }
        this.tableDependency.toApplyOrRemoveDependency(fragmentField, value);
    }
    createConfigurationField(config) {
        let opt = config.split('.');
        let entityConfiguration = {
            aliasOrIDentity: opt[0],
            propertDto: opt[1],
            line: opt[2] == undefined ? undefined : Number(opt[2])
        };
        return entityConfiguration;
    }
    getValueInObjectFragment(object, propertDto, line) {
        for (var propert in object) {
            if (object.hasOwnProperty(propertDto) && line == undefined) {
                return object[propertDto];
            }
            if (Array.isArray(object) && line != undefined) {
                return this.getValueInObjectFragment(object[line], propertDto);
            }
            if (typeof object === 'object') {
                return this.getValueInObjectFragment(object[propert], propertDto);
            }
        }
    }
    fieldType(identityField) {
        let fragmentField = this.fragment.fields_getForIdentity(identityField);
        if (fragmentField.config.line == undefined) {
            return constTypeFrame.BLOCK;
        }
        return constTypeFrame.LINE;
    }
    convertAliasToIdenty(config) {
        let entityConfiguration = this.createConfigurationField(config);
        let fragmentField = this.fragment.fields_getForAliasAndPropert(entityConfiguration);
        return fragmentField.key.identity;
    }
    setValueContextAlias(config, value) {
        let entityConfiguration = this.createConfigurationField(config);
        let fragmentField = this.fragment.fields_getForAliasAndPropert(entityConfiguration);
        this.setValue(fragmentField, value);
    }
    setValueContextIdentity(identity, type, value) {
        value = convertValueType(value, type);
        let fragmentField = this.fragment.fields_getForIdentity(identity);
        this.setValue(fragmentField, value);
        this.tableDependency.toApplyOrRemoveDependency(fragmentField, value);
    }
    objectFull() {
        return this.createObject();
    }
    objectSeparate() {
        return this.createObjectSeparete();
    }
    objectUnique(alias) {
        return this.createObjectForAlias(alias);
    }
    objectUniqueLine(alias, line) {
        let object = this.createObjectForAlias(alias);
        object = object[line];
        return object;
    }
    count(identity) {
        let object = this.fragment.objects_getForIdentity(identity);
        if (Array.isArray(object.config.object) == false) {
            return -1;
        }
        return object.config.object.length;
    }
    removeLine(identity, line) {
        let objectFragment = this.fragment.objects_getForIdentity(identity);
        var indexOf = objectFragment.config.object.findIndex((c) => c.rucLine == line);
        objectFragment.config.object.splice(indexOf, 1);
    }
    getPropert(config) {
        let entityConfiguration = this.createConfigurationField(config);
        let fragmentField = this.fragment.fields_getForAliasAndPropert(entityConfiguration);
        let fragmentObject = this.fragment.objects_getForIdentity(fragmentField.config.fragmentObjectIdentity);
        let object = fragmentObject.config.object;
        return fragmentObject.config.getValueInObjectFragment(object, entityConfiguration.propertDto, entityConfiguration.line);
    }
    getFragmentForIdentity(identity) {
        return this.fragment.fields_getForIdentity(identity);
    }
    removeFragmentsLine(objectIDentity, line) {
        this.fragment.fields_removeLine(objectIDentity, line);
    }
    removeFragment(identity) {
        let _fragment = this.fragment.fields_getForIdentity(identity);
        this.fragment.fields_remove(_fragment);
        this.tableDependency.removeExpectedDependency(identity);
    }
}

class TableDependency {
    dependencyesNotResolved = [];
    REQUERID = '1';
    MAX_LENGHT = '2';
    MAX = '3';
    MIN = '4';
    REGEX = '5';
    moveImbernateToNotResolved(identityObject) {
        let dependency = this.dependencyesNotResolved.find(c => c.identityObject == identityObject);
        if (dependency) {
            dependency.isHibernate = false;
        }
    }
    moveNotResolvedToImbernate(identityObject) {
        let dependency = this.dependencyesNotResolved.find(c => c.identityObject == identityObject);
        if (dependency) {
            dependency.isHibernate = true;
        }
    }
    createExpectedDependency(field, fragmentField) {
        let REQUERID = this.REQUERID;
        let MAX_LENGHT = this.MAX_LENGHT;
        let MAX = this.MAX;
        let MIN = this.MIN;
        let REGEX = this.REGEX;
        let valueDependency = '';
        checkIsRequerid();
        checkMaxLength();
        checkMax();
        checkMin();
        checkRegex();
        function checkIsRequerid() {
            if (field.requerid)
                valueDependency += `${REQUERID},`;
        }
        function checkMaxLength() {
            if (field.maxLength > 0)
                valueDependency += `${MAX_LENGHT}:_:${field.maxLength},`;
        }
        function checkMax() {
            if (field.max > 0)
                valueDependency += `${MAX}:_:${field.max},`;
        }
        function checkMin() {
            if (field.min > 0)
                valueDependency += `${MIN}:_:${field.min},`;
        }
        function checkRegex() {
            if (field.regex) {
                valueDependency += `${REGEX}:_:${field.regex},`;
            }
        }
        valueDependency = this.removeLastComa(valueDependency);
        if (valueDependency) {
            let index = this.dependencyesNotResolved.findIndex(c => c.identityObject == fragmentField.config.fragmentObjectIdentity);
            if (index == -1) {
                let objectDependency = {
                    isHibernate: false,
                    identityObject: fragmentField.config.fragmentObjectIdentity,
                    fieldsNotResolved: [field.identity]
                };
                this.dependencyesNotResolved.push(objectDependency);
            }
            if (index != -1) {
                let indexDependency = this.dependencyesNotResolved[index].fieldsNotResolved.findIndex(c => c == field.identity);
                if (indexDependency == -1) {
                    this.dependencyesNotResolved[index].fieldsNotResolved.push(field.identity);
                }
            }
        }
        return valueDependency;
    }
    toApplyOrRemoveDependency(fragment, value) {
        let REQUERID = this.REQUERID;
        let MAX_LENGHT = this.MAX_LENGHT;
        let MAX = this.MAX;
        let MIN = this.MIN;
        let REGEX = this.REGEX;
        let dependencyExpected = fragment.config.dependency;
        let dependencyResolved = '';
        dependencyExpected
            .split(',')
            .forEach(expected => {
            let identification = expected.split(':_:')[0];
            if (identification == REQUERID) {
                let result = this.consistRequerid(value);
                if (result) {
                    dependencyResolved += `${REQUERID},`;
                }
            }
            if (identification == MAX_LENGHT) {
                let result = this.consistMaxLen(expected, value);
                if (result) {
                    dependencyResolved += `${MAX_LENGHT},`;
                }
            }
            if (identification == MAX) {
                let result = this.consistMax(expected, value);
                if (result) {
                    dependencyResolved += `${MAX},`;
                }
            }
            if (identification == MIN) {
                let result = this.consistMin(expected, value);
                if (result) {
                    dependencyResolved += `${MIN},`;
                }
            }
            if (identification == this.REGEX) {
                let result = this.consistRegex(expected, value);
                if (result) {
                    dependencyResolved += `${REGEX},`;
                }
            }
        });
        dependencyResolved = this.removeLastComa(dependencyResolved);
        let dependencyExpectedOnlyKeys = dependencyExpected.split(',').map(c => c.split(':_:')[0]);
        let dependencyResolvedOnlyKeys = dependencyResolved.split(',').map(c => c.split(':_:')[0]);
        let existDependecy = false;
        for (let index = 0; index < dependencyExpectedOnlyKeys.length; index++) {
            let indexOf = dependencyResolvedOnlyKeys.indexOf(dependencyExpectedOnlyKeys[index]);
            if (indexOf == -1) {
                existDependecy = true;
                break;
            }
        }
        let dependencyObject = this.dependencyesNotResolved.find(objectDep => objectDep.identityObject == fragment.config.fragmentObjectIdentity);
        let dependency = dependencyObject?.fieldsNotResolved.find(dependency => dependency == fragment.key.identity);
        if (existDependecy == true && dependency == undefined) {
            dependencyObject?.fieldsNotResolved.push(fragment.key.identity);
        }
        if (existDependecy == false && dependency != undefined) {
            let index = dependencyObject?.fieldsNotResolved.indexOf(dependency);
            dependencyObject?.fieldsNotResolved.splice(index, 1);
        }
        return existDependecy;
    }
    removeLastComa(value) {
        return value.replace(/, *$/, '');
    }
    getValueInDependency(dependencyExpected) {
        return dependencyExpected.split(':_:')[1];
    }
    consistRequerid(value) {
        if (value == undefined || value == 0) {
            return false;
        }
        return true;
    }
    consistMaxLen(dependencyExpected, value) {
        let maxLength = this.getValueInDependency(dependencyExpected);
        value = this.addValueDefault().typeString((value));
        if (value.length > Number(maxLength)) {
            return false;
        }
        return true;
    }
    consistMax(dependencyExpected, value) {
        let max = this.getValueInDependency(dependencyExpected);
        value = Number(this.addValueDefault().typeNumber((value)));
        if (Number.NaN == value) {
            alert('value not is number');
            return false;
        }
        if (value > Number(max)) {
            return false;
        }
        return true;
    }
    consistMin(dependencyExpected, value) {
        let max = this.getValueInDependency(dependencyExpected);
        value = Number(this.addValueDefault().typeNumber((value)));
        if (Number.NaN == value) {
            alert('value not is number');
            return false;
        }
        if (value < Number(max)) {
            return false;
        }
        return true;
    }
    consistRegex(dependencyExpected, value) {
        debugger;
        let regex = this.getValueInDependency(dependencyExpected);
        value = this.addValueDefault().typeString((value));
        let reg = new RegExp(`${regex}`);
        return reg.test(value);
    }
    addValueDefault() {
        return {
            typeString: (value) => {
                if (value == undefined) {
                    return '';
                }
                return value;
            },
            typeNumber: (value) => {
                if (value == undefined) {
                    return 0;
                }
                return value;
            }
        };
    }
    removeExpectedDependency(identity) {
        let dependency = this.dependencyesNotResolved.find(c => c.fieldsNotResolved.indexOf(identity) > -1);
        if (dependency) {
            let index = dependency.fieldsNotResolved.indexOf(identity);
            if (index > -1) {
                dependency.fieldsNotResolved.splice(index, 1);
            }
        }
    }
    getDependenciesNotResolded() {
        return this.dependencyesNotResolved;
    }
    dependenciesCount() {
        return this.dependencyesNotResolved
            .filter(c => c.fieldsNotResolved.length > 0).length;
    }
    snapshot() {
        for (let index = 0; index < this.dependencyesNotResolved.length; index++) {
            this.dependencyesNotResolved[index].isHibernateSnapshot = this.dependencyesNotResolved[index].isHibernate;
            if (this.dependencyesNotResolved[index].fieldsNotResolved.length > 0) {
                this.dependencyesNotResolved[index].fieldsNotResolvedSnapshot = [];
            }
            for (let indexField = 0; indexField < this.dependencyesNotResolved[index].fieldsNotResolved.length; indexField++) {
                let value = this.dependencyesNotResolved[index].fieldsNotResolved[indexField];
                this.dependencyesNotResolved[index].fieldsNotResolvedSnapshot?.push(value);
            }
        }
    }
    revertToInit() {
        for (let index = 0; index < this.dependencyesNotResolved.length; index++) {
            this.dependencyesNotResolved[index].isHibernate = this.dependencyesNotResolved[index].isHibernateSnapshot ?? false;
            let value = this.dependencyesNotResolved[index].fieldsNotResolvedSnapshot;
            if (value) {
                this.dependencyesNotResolved[index].fieldsNotResolved = value;
            }
        }
    }
}

function clone(obj) {
    var copy;
    if (null == obj || "object" != typeof obj)
        return obj;
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr))
                copy[attr] = clone(obj[attr]);
        }
        return copy;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
}

class Fragment {
    constructor(tableDependency) {
        this.tableDependency = tableDependency;
    }
    tableDependency;
    objects = new Array();
    fields = new Array();
    checkIdentity(identity) {
        if (identity === undefined) {
            throw new Error('identity is requerid');
        }
    }
    objects_add(object) {
        this.checkIdentity(object.key.identity);
        let exist = this.objects.find(c => c.key.identity == object.key.identity);
        if (exist) {
            throw new Error('Object identity exists!!!');
        }
        this.objects.push(object);
    }
    objects_getForFieldIdentity(identity) {
        let field = this.fields_getForIdentity(identity);
        return this.objects_getForIdentity(field.config.fragmentObjectIdentity);
    }
    objects_getForIdentity(identity) {
        if (identity === undefined) {
            throw new Error('identity requerid!');
        }
        let object = this.objects.find(c => c.key.identity == identity);
        if (object) {
            return object;
        }
        throw new Error("Object not Found");
    }
    objects_getForAlias(alias) {
        if (alias === undefined) {
            throw new Error('alias is requerid');
        }
        let object = this.objects.find((c) => c.key.alias == alias);
        if (object) {
            return object;
        }
        throw new Error('object not found');
    }
    fields_add(field) {
        this.checkIdentity(field.key.identity);
        let exist = this.fields.find(c => c.key.identity == field.key.identity);
        if (exist) {
            throw new Error('Field identity exists!!!');
        }
        this.fields.push(field);
    }
    fields_remove(fragment) {
        let index = this.fields.indexOf(fragment);
        if (index > -1) {
            this.fields.splice(index, 1);
        }
    }
    fields_removeLine(objectIDentity, line) {
        let _fields = this.fields.filter(item => item.config.fragmentObjectIdentity == objectIDentity && item.config.line == line);
        _fields.forEach(field => {
            let indexOf = this.fields.indexOf(field);
            if (indexOf > -1) {
                this.tableDependency.removeExpectedDependency(field.key.identity);
                this.fields.splice(indexOf, 1);
            }
        });
    }
    fields_getForIdentity(identity) {
        if (identity === undefined) {
            throw new Error('identity is requerid');
        }
        let field = this.fields.find(c => c.key.identity == identity);
        if (field) {
            return field;
        }
        throw new Error("field not Found");
    }
    fields_getForAliasAndPropert(config) {
        if (config === undefined) {
            throw new Error('entityConfiguration is requerid');
        }
        return this.fields.find((c) => c.config.alias == config.aliasOrIDentity &&
            c.config.propertDto == config.propertDto &&
            c.config.line == config.line);
    }
    snapshot() {
        for (let index = 0; index < this.objects.length; index++) {
            this.objects[index].config.objectSnapshot = clone(this.objects[index].config.object);
        }
        for (let index = 0; index < this.fields.length; index++) {
            this.fields[index].config.dependencySnapshot = this.fields[index].config.dependency;
        }
    }
    revertToInit() {
        for (let index = 0; index < this.objects.length; index++) {
            this.objects[index].config.object = clone(this.objects[index].config.objectSnapshot);
        }
        for (let index = 0; index < this.fields.length; index++) {
            this.fields[index].config.dependency = this.fields[index].config.dependencySnapshot ?? '';
        }
    }
}

let eventsCustom = (() => {
    let events = new Map();
    return {
        field: () => {
            function eventTypeLine(event) {
                return event.split(".").length == 4;
            }
            function removeLineNumber(eventName) {
                return eventName.replace(/\.[0-9]+$/, "");
            }
            function setEvent(eventName, event) {
                if (events.has(eventName) == false) {
                    events.set(eventName, event);
                }
            }
            return {
                set: (identity) => {
                    let beforeEventName = `${constPrefixEventField.BEFORE}.${identity.name}`;
                    let inputEventName = `${constPrefixEventField.INPUT}.${identity.name}`;
                    let afterEventName = `${constPrefixEventField.AFTER}.${identity.name}`;
                    let id = {
                        identity: identity
                    };
                    setEvent(beforeEventName, new CustomEvent(beforeEventName, { detail: id }));
                    setEvent(inputEventName, new CustomEvent(inputEventName, { detail: id }));
                    setEvent(afterEventName, new CustomEvent(afterEventName, { detail: id }));
                    setEventBaseTypeLine();
                    function setEventBaseTypeLine() {
                        if (eventTypeLine(beforeEventName)) {
                            let identity = {
                                identity: {}
                            };
                            let before = removeLineNumber(beforeEventName);
                            let input = removeLineNumber(inputEventName);
                            let after = removeLineNumber(afterEventName);
                            setEvent(before, new CustomEvent(before, { detail: identity }));
                            setEvent(input, new CustomEvent(input, { detail: identity }));
                            setEvent(after, new CustomEvent(after, { detail: identity }));
                        }
                    }
                },
                get: (eventName) => {
                    let result = null;
                    if (eventTypeLine(eventName)) {
                        let eventNameBase = removeLineNumber(eventName);
                        let eventBase = events.get(eventNameBase);
                        result = events.get(eventName);
                        eventBase.detail.identity = result.detail.identity;
                        return eventBase;
                    }
                    result = events.get(eventName);
                    if (result == null) {
                        throw new Error("event not found");
                    }
                    return result;
                }
            };
        }
    };
})();

class FieldInput {
    managmentObject;
    floatLabel = ruculaGlobal?.getConfigurationGlobal()?.floatLabel;
    field;
    input;
    ruculaForm;
    constructor(field, managmentObject, ruculaForm) {
        this.field = field;
        this.managmentObject = managmentObject;
        this.ruculaForm = ruculaForm;
    }
    setWidth() {
        if (this.field.width > 0) {
            this.input.style.width = `${this.field.width}px`;
        }
        if (this.field.width === undefined && (this.input.type == constTypeInput.TEXT ||
            this.input.type == constTypeInput.NUMBER ||
            this.input.type == constTypeInput.CHECKBOX ||
            this.input.type == constTypeInput.SELECT)) {
            this.input.classList.add("r-input-width-default");
        }
    }
    exec() {
        this.create();
    }
}

class FileEvent {
    input;
    field;
    ruculaForm;
    managmentObject;
    constructor(managmentObject, input, field, ruculaForm) {
        this.ruculaForm = ruculaForm;
        this.managmentObject = managmentObject;
        this.input = input;
        this.field = field;
        this.setEventListener();
    }
    dispatchEvent(prefixEvent) {
        let identity = this.input.getAttribute("identity");
        let fragment = this.managmentObject.getFragmentForIdentity(identity);
        let eventName = fragment.config.line ? `${prefixEvent}.${fragment.config.alias}.${fragment.config.propertDto}.${fragment.config.line}` : `${prefixEvent}.${fragment.config.alias}.${fragment.config.propertDto}`;
        let event = eventsCustom.field().get(eventName);
        this.ruculaForm?.dispatchEvent(event);
    }
    set() {
        let identity = this.input.getAttribute("identity");
        this.managmentObject.setValueContextIdentity(identity, this.field?.type, this.input.value);
    }
}

class FileEventCheckBox extends FileEvent {
    setEventListener() {
        this.input.addEventListener('ruculaChange', (e) => {
            let element = e.target;
            if (element.value == String(this.field.checkbox.on)) {
                element.checked = true;
            }
            if (element.value == String(this.field.checkbox.off)) {
                element.checked = false;
            }
            this.input.dispatchEvent(new Event('change'));
        });
        this.input.addEventListener('change', (e) => {
            let element = e.target;
            if (element.checked == true) {
                element.value = this.field.checkbox.on;
            }
            if (element.checked == false) {
                element.value = this.field.checkbox.off;
            }
            this.set();
        });
        this.input.addEventListener('blur', (e) => {
            let element = e.target;
            let identity = element.getAttribute("identity");
            let fragment = this.managmentObject.getFragmentForIdentity(identity);
            let line = fragment.config.line;
            let propert = `${fragment.config.alias}.${fragment.config.propertDto}${line == undefined ? '' : Number(line)}`;
            let value = this.managmentObject.getPropert(propert);
            if (value == this.field.checkbox.on) {
                element.checked = true;
            }
            if (value == this.field.checkbox.off) {
                element.checked = false;
            }
        });
    }
}

function maskInput(value, mask) {
    let valorFormatado = '';
    let i = 0;
    for (let char of mask) {
        if (char === '#') {
            if (value[i] != null) {
                valorFormatado += value[i];
                i++;
            }
            else {
                break;
            }
        }
        else {
            valorFormatado += char;
        }
    }
    return valorFormatado;
}
function maskOutput(value, mask) {
    let valorFormatado = '';
    let i = 0;
    for (let char of mask) {
        if (char === '#') {
            if (value[i] == null) {
                break;
            }
            valorFormatado += value[i];
        }
        i++;
    }
    return valorFormatado;
}

class FileEventCommon extends FileEvent {
    setEventListener() {
        this.input.addEventListener('focus', () => {
            if (this.field.mask && this.input.value) {
                this.input.value = maskOutput(this.input.value, this.field.mask);
            }
            this.dispatchEvent(constPrefixEventField.BEFORE);
            this.set();
        });
        this.input.addEventListener('input', () => {
            this.set();
            this.dispatchEvent(constPrefixEventField.INPUT);
        });
        this.input.addEventListener('focusout', () => {
            this.dispatchEvent(constPrefixEventField.AFTER);
            this.set();
        });
        this.input.addEventListener('blur', () => {
            if (this.field.mask && this.input.value) {
                this.input.value = maskInput(this.input.value, this.field.mask);
            }
        });
    }
}

class FieldCheckbox extends FieldInput {
    create() {
        var input = document.createElement("input");
        this.input = input;
        input.type = "checkbox";
        input.checked = false;
        if (this.field.value == this.field.checkbox.on) {
            input.checked = true;
        }
        this.setEvents();
        return input;
    }
    setEvents() {
        new FileEventCommon(this.managmentObject, this.input, this.field, this.ruculaForm);
        new FileEventCheckBox(this.managmentObject, this.input, this.field, this.ruculaForm);
    }
}

function formatCurrencyForNumber(valueCurrency) {
    valueCurrency = valueCurrency.replace(/[^-0-9,.\s]/g, "");
    let value = valueCurrency.split("");
    let decimal = false;
    for (let i = valueCurrency.length - 1; i >= 0; i--) {
        if ((value[i] == "," || value[i] == "." || value[i] == " ") && decimal) {
            value.splice(i, 1, "");
        }
        if ((value[i] == "," || value[i] == ".") && decimal == false) {
            decimal = true;
            value.splice(i, 1, ".");
        }
    }
    return Number(value.join(""));
}
function formatNumberWithLocalization(value) {
    if (typeof value === "string")
        value = Number(value);
    let localicationConfig = ruculaGlobal.getLocalization();
    return new Intl.NumberFormat(localicationConfig.locales, {
        style: 'currency',
        currency: localicationConfig.currency,
        maximumFractionDigits: 5
    }).format(value);
}

class FileEventCurrency extends FileEvent {
    setEventListener() {
        this.input.addEventListener('focusout', (e) => {
            let element = e.target;
            let valueFormated = formatCurrencyForNumber(element.value);
            this.input.value = String(valueFormated);
            this.set();
            this.input.value = formatNumberWithLocalization(element.value);
        });
    }
}

class FieldCommon extends FieldInput {
    create() {
        const input = document.createElement('input');
        this.input = input;
        if (this.floatLabel == true) {
            this.input.classList.add('did-floating-input');
        }
        input.setAttribute('placeholder', '');
        input.setAttribute(constAttrInput.ATTR_TYPE, this.field.type);
        if (this.field?.disable) {
            input.setAttribute("disabled", "");
        }
        input.type = this.field.type;
        if (this.field.type == "currency") {
            input.type = "text";
        }
        input.value = String(this.field.value);
        this.setWidth();
        input.classList.add("r-i-control");
        this.setEvents();
    }
    setEvents() {
        new FileEventCommon(this.managmentObject, this.input, this.field, this.ruculaForm);
        if (this.field.type == constTypeInput.CURRENCY) {
            new FileEventCurrency(this.managmentObject, this.input, this.field, this.ruculaForm);
        }
    }
}

class FieldRadio extends FieldInput {
    create() {
        let input = document.createElement("input");
        this.input = input;
        this.input.type = "radio";
        if (this.field.value === undefined || this.field.value === "") {
            throw new Error("Value in type radio is requerid");
        }
        this.input.value = this.field.value;
        this.setEvents();
    }
    setEvents() {
        new FileEventCommon(this.managmentObject, this.input, this.field, this.ruculaForm);
    }
}

class FileEventSelect extends FileEvent {
    setEventListener() {
        this.input.addEventListener('focusout', (e) => {
            this.dispatchEvent(constPrefixEventField.BEFORE);
            this.set();
        });
        this.input.addEventListener('change', (e) => {
            this.dispatchEvent(constPrefixEventField.BEFORE);
            this.set();
        });
        this.input.addEventListener('input', (e) => {
            this.dispatchEvent(constPrefixEventField.BEFORE);
            this.set();
        });
    }
}

class FieldSelect extends FieldInput {
    create() {
        const select = document.createElement('select');
        this.input = select;
        this.setWidth();
        if (this.floatLabel == true) {
            this.input.classList.add('did-floating-select');
        }
        this.field.combo?.forEach(item => {
            const option = document.createElement('option');
            option.text = item["representation"];
            option.value = item["value"];
            select.appendChild(option);
        });
        if (String(this.field.value) != '') {
            this.input.value = String(this.field.value);
        }
        if (String(this.field.value) === '') {
            this.input.querySelector('select')
                ?.setAttribute('selected', '');
        }
        this.setEvents();
        return select;
    }
    setEvents() {
        new FileEventSelect(this.managmentObject, this.input, this.field, this.ruculaForm);
    }
}

class FieldStrategy {
    field;
    setStrategy(field) {
        this.field = field;
    }
    create() {
        this.field.exec();
        return this.field.input;
    }
}

class FieldTextArea extends FieldInput {
    create() {
        const input = document.createElement('textarea');
        this.input = input;
        this.input.classList.add('r-i-control');
        input.setAttribute('placeholder', '');
        if (this.floatLabel == true) {
            this.input.classList.add('did-floating-input');
        }
        if (this.field?.disable) {
            input.setAttribute("disabled", "");
        }
        input.setAttribute("rows", String(this.field.textarea?.rows));
        if (this.field.textarea?.cols) {
            input.setAttribute("cols", String(this.field.textarea?.cols));
        }
        else {
            input.style.width = "100%";
        }
        this.setEvents();
        return input;
    }
    setEvents() {
        new FileEventCommon(this.managmentObject, this.input, this.field, this.ruculaForm);
    }
}

class Field {
    managmentObject;
    ruculaForm;
    constructor(managmentObject, ruculaForm) {
        this.managmentObject = managmentObject;
        this.ruculaForm = ruculaForm;
    }
    createSpanLabelIsRequerid(isRegex = false) {
        const span = document.createElement('span');
        span.innerText = " *";
        if (isRegex) {
            span.innerText = " *^";
        }
        span.style.color = "red";
        return span;
    }
    createGroupOfButton(element) {
        const div = document.createElement('div');
        div.classList.add('r-g-i-i');
        div.appendChild(element);
        return div;
    }
    createGroupOfInput(field, element) {
        const div = document.createElement('div');
        div.classList.add('r-g-i-i');
        const label = document.createElement('label');
        label.textContent = field.description;
        if (field.requerid == true) {
            label.textContent = label.textContent;
            label.append(this.createSpanLabelIsRequerid(field.regex != null).cloneNode(true));
        }
        const floatLabel = ruculaGlobal?.getConfigurationGlobal()?.floatLabel;
        if (floatLabel == true && (this.isSimple(field.type) || this.isTextArea(field.type) || this.isSelect(field.type))) {
            div.appendChild(element);
            div.classList.add('did-floating-label-content');
            label.classList.add('did-floating-label');
            div.appendChild(label);
            return div;
        }
        if (field.groupFormat == undefined) {
            label.classList.add('r-label-block');
            div.appendChild(label);
            div.appendChild(element);
        }
        if (field.groupFormat == constGroupFormat.DOWN) {
            label.classList.add('r-label-block');
            div.appendChild(element);
            div.appendChild(label);
        }
        if (field.groupFormat == constGroupFormat.LEFT) {
            label.classList.add('r-label-inline');
            element.style.marginRight = "8px";
            div.appendChild(element);
            div.appendChild(label);
        }
        if (field.groupFormat == constGroupFormat.RIGTH) {
            label.classList.add('r-label-inline');
            element.style.marginLeft = "8px";
            div.appendChild(label);
            div.appendChild(element);
        }
        return div;
    }
    checkTypeField(type) {
        let option = type;
        if (Array.isArray(type)) {
            option = type[1];
        }
        let types = [
            "text",
            "number",
            "select",
            "checkbox",
            "date",
            "currency",
            "textarea",
            "bool",
            "radio",
            "password"
        ];
        if (types.indexOf(option) == -1) {
            throw new Error(`Field type "${option}" is not allowed`);
        }
    }
    isSimple(type) {
        let condition = type == constTypeInput.NUMBER ||
            type == constTypeInput.TEXT ||
            type == constTypeInput.DATE ||
            type == constTypeInput.CURRENCY ||
            type == constTypeInput.PASS;
        return condition;
    }
    isTextArea(type) {
        return type == constTypeInput.TEXT_AREA;
    }
    isSelect(type) {
        return type[0] == constTypeInput.SELECT;
    }
    create(field) {
        let element;
        let fieldStrategy = new FieldStrategy();
        this.checkTypeField(field.type);
        if (this.isSimple(field.type)) {
            fieldStrategy.setStrategy(new FieldCommon(field, this.managmentObject, this.ruculaForm));
        }
        if (this.isSelect(field.type)) {
            fieldStrategy.setStrategy(new FieldSelect(field, this.managmentObject, this.ruculaForm));
        }
        if (isCheckBox()) {
            fieldStrategy.setStrategy(new FieldCheckbox(field, this.managmentObject, this.ruculaForm));
        }
        if (this.isTextArea(field.type)) {
            fieldStrategy.setStrategy(new FieldTextArea(field, this.managmentObject, this.ruculaForm));
        }
        if (isRadio()) {
            fieldStrategy.setStrategy(new FieldRadio(field, this.managmentObject, this.ruculaForm));
        }
        element = fieldStrategy.create();
        if (field.maxLength) {
            element.setAttribute('maxlength', `${field.maxLength}`);
        }
        element.setAttribute("identity", field.identity);
        let fragmentField = this.managmentObject.getFragmentForIdentity(field.identity);
        let identity = {
            name: fragmentField.config.line ? `${fragmentField.config.alias}.${field.propertDto}.${fragmentField.config.line}` : `${fragmentField.config.alias}.${field.propertDto}`,
            element: element,
            row: fragmentField.config.line
        };
        eventsCustom.field().set(identity);
        this.managmentObject.setValueContextIdentity(field.identity, field.type, element.value);
        function isRadio() {
            return field.type[0] == constTypeInput.RADIO;
        }
        function isCheckBox() {
            return field.type[0] == constTypeInput.CHECKBOX;
        }
        element.addEventListener('blur', () => {
            element.classList.remove(constInputClass.FOCUS_IN_INPUT_WITH_DEPENDENCY);
        });
        return element;
    }
    focusFieldsWithDependency() {
        this.managmentObject.tableDependency
            .getDependenciesNotResolded()
            .filter(c => c.isHibernate == false)
            ?.forEach(object => {
            object.fieldsNotResolved?.forEach(identity => {
                let input = document.querySelector('[identity=' + identity + ']');
                input?.classList.add(constInputClass.FOCUS_IN_INPUT_WITH_DEPENDENCY);
            });
        });
    }
}

class FrameEvent {
    managmentObject;
    constructor(managmentObject) {
        this.managmentObject = managmentObject;
    }
    managedFrame(frameElement) {
        frameElement?.addEventListener('input', (event) => this.valueInformed(event));
        frameElement?.addEventListener('change', (event) => this.valueInformed(event));
    }
    valueInformed(event) {
        let target = event.target;
        let identity = target.getAttribute('identity');
        let fragmentObject = this.managmentObject.fragment.objects_getForFieldIdentity(identity);
        let count = this.managmentObject.count(fragmentObject.key.identity);
        if (count > 1) {
            return;
        }
        if (target) {
            this.managmentObject.tableDependency.moveImbernateToNotResolved(fragmentObject.key.identity);
        }
    }
    cleanRequeridDependency(frameElement) {
        frameElement.addEventListener('keyup', (event) => {
            const key = event.key;
            let identity = event.target.getAttribute('identity');
            let fragmentObject = this.managmentObject.fragment.objects_getForFieldIdentity(identity);
            let count = this.managmentObject.count(fragmentObject.key.identity);
            if (count > 1) {
                this.managmentObject.tableDependency.moveImbernateToNotResolved(fragmentObject.key.identity);
            }
            if (key == 'Escape' && count == 1) {
                this.managmentObject.tableDependency.moveNotResolvedToImbernate(fragmentObject.key.identity);
                resetManageFrameTypeLine(frameElement);
                resetManageFrameTypeBlock(frameElement);
            }
        });
    }
}
function resetManageFrameTypeBlock(frameElement) {
    if (frameElement.classList.contains('r-q-b') == false) {
        return;
    }
    cleanFrame(frameElement);
}
function resetManageFrameTypeLine(element) {
    if (element.nodeName != 'TR') {
        return;
    }
    cleanFrame(element);
}
function cleanFrame(blockORLine) {
    blockORLine.querySelectorAll('input')
        .forEach(input => input.value = '');
    blockORLine.querySelectorAll('select')
        .forEach(select => {
        let option = select.querySelector('option');
        select.value = option?.value || '';
    });
}

class ComponentIconButton {
    constructor(propert) {
        this.propert = propert;
    }
    propert;
    create() {
        let icon = document.createElement('i');
        icon.textContent = ' ';
        if (this.propert.button.icon === undefined || this.propert.button.icon.trim() === "") {
            return icon;
        }
        this.propert.button.icon?.split(" ").forEach(item => icon.classList.add(item));
        return icon;
    }
}

class ElementBase {
    p;
    constructor(p) {
        this.p = p;
    }
    element;
    addDataIdAttribute(button) {
        this.element.setAttribute("id", `${this.p}${button.target}`);
    }
    addColor(color) {
        if (color)
            this.element.style.color = color;
    }
}

class ElementButton extends ElementBase {
    createElement(button) {
        if (button.target == null || button.target == "") {
            throw new Error("target is requerid!");
        }
        this.element = document.createElement('button');
        this.element.classList.add("r-b-i");
        this.element.setAttribute('type', 'button');
        if (button.fullWidth) {
            this.element.classList.add('r-button-full-width');
        }
        let _class = button?.class?.split(' ');
        _class?.forEach(item => {
            this.element.classList.add(item);
        });
        if ((button.icon ??= "").length > 0) {
            let icon = new ComponentIconButton({
                button: button
            }).create();
            this.element.appendChild(icon);
        }
        let span = document.createElement('span');
        span.textContent = button.text ?? "";
        this.element.appendChild(span);
        this.addColor(button.color);
        this.addDataIdAttribute(button);
        return this.element;
    }
}

class ElementLink extends ElementBase {
    createElement(button) {
        this.element = document.createElement('a');
        this.element.textContent = button.text + "";
        this.element.href = `${button.link}`;
        this.element.classList.add("btn-link");
        this.element.setAttribute('target', "_blank");
        if ((button.icon ??= "").length) {
            let icon = new ComponentIconButton({
                button: button
            }).create();
            this.element.appendChild(icon);
        }
        return this.element;
    }
}

class Button {
    callbackReaload;
    popup;
    P;
    constructor(callbackReaload, popup, P) {
        this.callbackReaload = callbackReaload;
        this.popup = popup;
        this.P = P;
    }
    elementStrategy;
    buttonIsNotDefault(target) {
        return target != constTargetButtonCrudDefault.SAVE &&
            target != constTargetButtonCrudDefault.ALTER &&
            target != constTargetButtonCrudDefault.DELETE;
    }
    createButtonOrLink(button) {
        if (button.type != "button" && button.type != "link") {
            throw new Error("tipo do botão deve ser button ou link");
        }
        if (button.type == "button") {
            this.elementStrategy = new ElementButton(this.P);
        }
        if (button.type == "link") {
            this.elementStrategy = new ElementLink(this.P);
        }
        return this.elementStrategy.createElement(button);
    }
    getButton(target) {
        return document.getElementById(target);
    }
    prepareLocalizations() {
        let globalization = document.getElementById(`${this.P}${constIdBaseWindow.GLOBALIZATION}`);
        let olliGlobalization = document.getElementById(`${this.P}${constIdBaseWindow.OLLI_GLOBALIZATION}`);
        globalization?.addEventListener("click", () => {
            olliGlobalization?.classList.toggle("r-display-none");
        });
        let globalConf = ruculaGlobal.getConfigurationGlobal();
        globalConf.localizations.forEach(loc => {
            const li = document.createElement("li");
            li.textContent = loc.language;
            olliGlobalization?.appendChild(li);
            li.addEventListener("click", () => {
                ruculaGlobal.setLocalization(loc.locales);
            });
        });
    }
    prepareEnviroments() {
        let baseEnvironments = document.getElementById(`${this.P}${constIdBaseWindow.ENVIROMENT}`);
        let olliEnviroment = document.getElementById(`${this.P}${constIdBaseWindow.OLLI_ENVIROMENT}`);
        let description = baseEnvironments.querySelector('.description');
        let icon = baseEnvironments.querySelector('i');
        let env = cookie.read('enviroment');
        if (env != "null" && env != null) {
            ruculaGlobal.setEnviroment(env);
        }
        let atualEnvironment = ruculaGlobal.getEnvironment();
        setDescription(atualEnvironment);
        baseEnvironments?.addEventListener("click", (e) => {
            olliEnviroment?.classList.toggle("r-display-none");
        });
        let globalConf = ruculaGlobal.getConfigurationGlobal();
        globalConf.environments.forEach(enviroment => {
            const li = document.createElement("li");
            li.setAttribute('env', enviroment.env);
            li.textContent = enviroment.description;
            olliEnviroment?.appendChild(li);
            li.addEventListener("click", (e) => {
                let reload = (yesNo) => {
                    if (yesNo) {
                        ruculaGlobal.setEnviroment(enviroment.env);
                        setDescription(enviroment);
                        let target = e.target;
                        let env = target.getAttribute('env');
                        document.cookie = `enviroment=${env}`;
                        this.callbackReaload();
                    }
                };
                this.popup.warning({
                    text: 'A alteração desejada reiniciará a interface. Deseja continuar?'
                }, reload);
            });
        });
        function setDescription(enviroment) {
            description.textContent = enviroment.description;
            if (enviroment.env.toLocaleLowerCase() == 'production') {
                icon.style.color = 'red';
            }
            if (enviroment.env != 'production') {
                icon.style.color = '';
            }
        }
    }
    prepareButtonsInLeftBox(button) {
        const ListRightButtons = document.getElementById(`${this.P}${constIdBaseWindow.BUTTONS_MENU_VERTICAL_LIST}`);
        let buttons = button?.filter(c => this.buttonIsNotDefault(c.target));
        if (buttons?.length == 0 || buttons == undefined) {
            document.querySelector(`.${this.P}r-vertical-actions`)?.classList.add('r-display-none');
        }
        buttons?.forEach(b => {
            const li = document.createElement("li");
            let button = this.createButtonOrLink(b);
            li.appendChild(button);
            ListRightButtons?.appendChild(li);
        });
        this.prepareLocalizations();
        this.prepareEnviroments();
    }
    disable(target) {
        let button = this.getButton(target);
        button?.classList.remove('r-display-none');
        button?.setAttribute('disabled', '');
    }
    enable(target) {
        let button = this.getButton(target);
        button?.classList.remove('r-display-none');
        button?.removeAttribute('disabled');
    }
    hide(target) {
        let button = this.getButton(target);
        button?.classList.add('r-display-none');
    }
    destroy(target) {
        let button = this.getButton(target);
        button?.remove();
    }
}

class FieldMenuContext {
    constructor(popup, menuContext, P) {
        this.popup = popup;
        this.menuContext = menuContext;
        this.P = P;
    }
    P;
    popup;
    fieldsInfo = [];
    lastDetail;
    menuContext;
    init() {
        let menuOInput = document.getElementById(`${this.P}${contextMenu.INPUT}`);
        menuOInput?.addEventListener('click', () => {
            if (this.lastDetail) {
                this.lastDetail.remove();
            }
            let ol = document.createElement('ol');
            this.lastDetail = ol;
            let identity = this.menuContext.elemetInFocus().getAttribute('identity');
            let field = this.infoGet(identity)?.field;
            let details = `  
            <table>
                <tr>
                    <td>Descrição</td>
                    <td>${field?.description ?? ''}</td>
                </tr>
                <tr>
                    <td>Propriedade</td>
                    <td>${field?.propertDto}</td>
                </tr>
                <tr>
                    <td>Obrigatório</td>
                    <td><input type="checkbox" ${(field?.requerid ?? false) == true ? 'checked' : ''} disabled/></td>
                </tr>
                <tr>
                    <td>Desabilitado</td>
                    <td><input type="checkbox" ${(field?.disable ?? false) == true ? 'checked' : ''} disabled/></td>
                </tr>
                <tr>
                    <td>Máximo</td>
                    <td>${field?.max ?? 0}</td>
                </tr>
                <tr>
                    <td>Minimo</td>
                    <td>${field?.min ?? 0}</td>
                </tr>
                <tr>
                    <td>Comprimento</td>
                    <td>${field?.maxLength ?? 0}</td>
                </tr>
                <tr>
                    <td>Informação</td>
                    <td>${field?.information ?? ''}</td>
                </tr>
            </table>
        `;
            ol.innerHTML = details;
            this.popup.info({
                text: 'Detalhamento',
                htmlBody: ol
            });
        });
    }
    infoSet(fieldInfo) {
        this.fieldsInfo.push(fieldInfo);
    }
    infoGet(identity) {
        return this.fieldsInfo.find(c => c.identity == identity);
    }
}

class PaginationEvents {
    globalWindow;
    p;
    constructor(p, globalWindow) {
        this.p = p;
        this.globalWindow = globalWindow;
    }
    headerSearch(gridSearch) {
        let search = document.getElementById(`${this.p}${constPagination.FIND}`);
        if (gridSearch == false) {
            search?.remove();
        }
        let body = {
            detail: {
                value: ''
            }
        };
        let event = new CustomEvent(`${this.p}r-pagination-find`, body);
        search?.addEventListener('submit', (e) => {
            e.preventDefault();
            var formData = new FormData(e.target);
            body.detail.value = String(formData.get('r-find-value'));
            this.globalWindow.dispatchEvent(event);
        });
    }
    fotter(gridFooter) {
        if (gridFooter == false) {
            document.getElementById('r-act-grid-footer')?.remove();
        }
        let pagination = {
            detail: {
                page: ''
            }
        };
        let event = new CustomEvent(`${this.p}r-pagination`, pagination);
        document.getElementById(`${this.p}${constPagination.FIRST}`)?.addEventListener('click', () => dispatchEvent('first', this.globalWindow));
        document.getElementById(`${this.p}${constPagination.LAST}`)?.addEventListener('click', () => dispatchEvent('last', this.globalWindow));
        document.getElementById(`${this.p}${constPagination.PREVIOUS}`)?.addEventListener('click', () => dispatchEvent('previous', this.globalWindow));
        document.getElementById(`${this.p}${constPagination.NEXT}`)?.addEventListener('click', () => dispatchEvent('next', this.globalWindow));
        function dispatchEvent(page, globalWindow) {
            pagination.detail.page = page;
            globalWindow.dispatchEvent(event);
        }
        let row = {
            detail: {
                row: 0
            }
        };
        let eventRow = new CustomEvent(`${this.p}r-pagination-row`, row);
        document.getElementById(`${this.p}${constPagination.ROW_NUMBER}`)?.addEventListener('change', (e) => {
            var select = e.target;
            row.detail.row = Number(select.value);
            this.globalWindow.dispatchEvent(eventRow);
        });
    }
}

class MenuContext {
    P;
    constructor(P) {
        this.P = P;
    }
    menusContext = [];
    elemetInFocu;
    createMenuContext(id) {
        let div = document.createElement('div');
        div.classList.add('context-menu');
        div.setAttribute('id', id);
        let ol = document.createElement('ol');
        div.appendChild(ol);
        this.menusContext.push({ id: id, element: div });
        return div;
    }
    findMenu(id) {
        let menu = this.menusContext.find(c => c.id == id);
        return menu.element;
    }
    addItem(idMenuContext, buttonConfig) {
        let menu = this.findMenu(idMenuContext).querySelector('ol');
        var li = document.createElement('li');
        var button = document.createElement('button');
        button.classList.add('r-b-i');
        button.setAttribute('id', buttonConfig.target);
        button.textContent = buttonConfig.text;
        li.appendChild(button);
        menu.appendChild(li);
    }
    menuContextInput() {
        let detailsInput = {
            target: 'input-check-details',
            text: 'detalhe do campo',
            type: 'button',
        };
        let menu = this.createMenuContext(contextMenu.INPUT);
        this.addItem(contextMenu.INPUT, detailsInput);
        return menu;
    }
    elemetInFocus() {
        return this.elemetInFocu;
    }
    init() {
        let menuInput = this.menuContextInput();
        let rw = document.querySelector(`.${this.P}r-w`);
        rw?.appendChild(menuInput);
        rw?.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            let target = event.target;
            this.elemetInFocu = target;
            if (target.classList.contains('r-q-b') || target.classList.contains('r-q-l')) {
                return;
            }
            if (target.classList.contains('r-head')) ;
            if (target.classList.contains('r-vertical-actions')) ;
            if (target.nodeName == 'INPUT' || target.nodeName == 'SELECT' || target.nodeName == 'TEXTAREA') {
                let menuActions = this.findMenu(contextMenu.INPUT);
                menuActions.style.display = 'block';
                menuActions.style.left = `${event.pageX}px`;
                menuActions.style.top = `${event.pageY}px`;
            }
        });
        document.addEventListener('click', (event) => {
            if (event.button !== 2) {
                let menuInput = this.findMenu(contextMenu.INPUT);
                menuInput.style.display = 'none';
            }
        });
    }
}

function P(prefixe, text) {
    return `${prefixe}${text}`;
}

class WindowAPI {
    url;
    constructor(url) {
        this.url = url;
    }
    async get(p) {
        var myHeaders = new Headers();
        var init = {
            method: "GET",
            headers: myHeaders,
            mode: "cors",
            cache: "default",
        };
        return await fetch(this.url, init)
            .then((response) => {
            if (response.ok) {
                return response.json();
            }
            alert('Não foi possível abrir a Janela desejada');
        })
            .then(json => {
            return JSON.parse(json);
        })
            .catch(() => {
            var pp = new Popup(p);
            pp.error({
                text: 'Não foi possível abrir a Janela desejada'
            });
        });
    }
}

class ButtonManaged {
    P;
    buttonsManeged;
    atualModel = 'init';
    modes = {
        init: 'init',
        delete: 'delete',
        save: 'save',
        alter: 'alter'
    };
    constructor(P, buttonsManeged) {
        this.P = P;
        this.buttonsManeged = buttonsManeged;
    }
    initTosave() {
        if (this.atualModel != this.modes.init) {
            return;
        }
        let options = [`${this.P}r-a-save`];
        this.set(options);
        this.atualModel = this.modes.save;
    }
    saveToAlter() {
        let options = [`${this.P}r-a-alter`, `${this.P}r-a-delete`];
        this.set(options);
        this.atualModel = this.modes.alter;
    }
    deleteToInit() {
        let options = [''];
        this.set(options);
        this.atualModel = this.modes.init;
    }
    disableAll() {
        let options = [''];
        this.set(options);
        this.atualModel = this.modes.init;
    }
    set(options) {
        this.buttonsManeged.forEach(b => {
            let index = options.indexOf(b.id);
            if (index != -1) {
                b.classList.remove('r-a-b-disable');
            }
            else {
                b.classList.add('r-a-b-disable');
            }
        });
    }
}

class Rucula {
    P = `ruculajs_${Date.now()}`;
    windowBaseDOM;
    window;
    globalWindow;
    elementFormRucula;
    menuContext;
    popup;
    event;
    managmentObject;
    tableDependency;
    button;
    layoutFrame;
    fragment;
    field;
    eventButton;
    frameEvent;
    config;
    fieldMenuContext;
    paginationEvents;
    domButtomCheck;
    frameBlock;
    frameLine;
    loader;
    buttonManaged;
    perspective;
    constructor(config) {
        this.perspective = config.perspective;
        config.id ??= 'rucula-js';
        this.config = config;
        ruculaGlobal.initGlobalConfiguration(config.global);
    }
    async init() {
        if (this.config.urlWindow) {
            let url = this.url(this.config.urlWindow).getURL();
            var windowApi = new WindowAPI(url);
            this.window = await windowApi.get(this.P);
        }
        else {
            this.window = this.config.window;
        }
        this.configurePerspective();
        this.globalWindow = document.getElementById(this.config.id);
        this.popup = new Popup(this.P);
        this.menuContext = new MenuContext(this.P);
        this.fieldMenuContext = new FieldMenuContext(this.popup, this.menuContext, this.P);
        this.layoutFrame = new LayoutFrame(this.P);
        this.tableDependency = new TableDependency();
        this.fragment = new Fragment(this.tableDependency);
        this.paginationEvents = new PaginationEvents(this.P, this.globalWindow);
        this.domButtomCheck = new DOMButtonsCheck(this.P, this.window?.crud);
        this.loader = new LoaderManagment(this.P);
        this.button = new Button(() => {
            let rucula = new Rucula(this.config);
            rucula.init();
            this.config?.reload();
        }, this.popup, this.P);
        defaultValues.setDefault(this.window);
        this.windowBaseDOM = new WindowBaseDOM(this.P, {
            globalWindow: this.globalWindow,
            openLeftGrid: this.window?.grid ?? false,
            windowName: this.window?.name,
            type: this.window.type
        });
        if (this.window == null) {
            let message = 'Não foi possível carregar janela informada. Considere entrar em contato com o administrador';
            this.popup.error({
                text: message
            });
            throw new Error(message);
        }
        this.managmentObject = new ManagmentObject(this.fragment, this.tableDependency, this.window.frames);
        this.event = new EventManagment(this.P, this.managmentObject, this.globalWindow);
        this.field = new Field(this.managmentObject, this.globalWindow);
        this.eventButton = new EventButton(this.field, this.managmentObject, this.P);
        this.frameEvent = new FrameEvent(this.managmentObject);
        this.frameBlock = new FrameElementBlock(this.managmentObject, this.field, this.frameEvent, this.button, this.fieldMenuContext);
        this.frameLine = new FrameElementLine(this.managmentObject, this.field, this.frameEvent, this.button, this.fieldMenuContext, this.P);
    }
    create() {
        let eventInit = new Event('rucula.init');
        let eventLoad = new Event('rucula.load');
        this.globalWindow.dispatchEvent(eventInit);
        configWindow.set(this.window, this.P);
        this.menuContext.init();
        this.fieldMenuContext.init();
        this.addHomeWindow();
        this.elementFormRucula = this.windowBaseDOM.getPrincipalElementRucula();
        let buttons = this.globalWindow.querySelectorAll(`#${this.P}action-crud button.managed`);
        this.buttonManaged = new ButtonManaged(this.P, buttons);
        let form = this.globalWindow.querySelector('form.r-window-work');
        form?.addEventListener('change', () => {
            this.buttonManaged.initTosave();
        });
        this.paginationEvents.headerSearch(this.window.gridSearch);
        this.paginationEvents.fotter(this.window.gridFooter);
        this.createButtons();
        if (this.window.type != 'header') {
            this.domButtomCheck.removeUnusedButtons();
        }
        if (this.window.type == 'crud') {
            this.layoutFrame.configureLayout(this.window, this.elementFormRucula);
            this.createFrames();
        }
        this.globalWindow.dispatchEvent(eventLoad);
        window.rucula = new RuculaLogs(this.managmentObject);
        this.tableDependency.snapshot();
        this.fragment.snapshot();
        this.event.on('erase-window', () => {
            this.buttonManaged.disableAll();
            this.revertToinit();
        });
    }
    addHomeWindow() {
        if (this.window?.iconHome) {
            let icon = document.getElementById(`${this.P}r-f-home-icon`);
            icon?.classList.add(this.window.iconHome);
        }
        if (this.window?.messageHome) {
            let title = document.getElementById(`${this.P}r-f-home-title`);
            title.textContent = this.window?.messageHome;
        }
        let titles = document.querySelectorAll(`.${this.P}${constIdBaseWindow.TITLE}`);
        titles?.forEach(title => {
            title.textContent = this.window.name;
        });
    }
    reload(callback) {
        callback();
    }
    createButtons(type = "CRUD") {
        if (type == "CRUD") {
            this.button.prepareButtonsInLeftBox(this.window.button);
        }
        this.eventButton.eventButton(this.globalWindow, this.window.pathController, this.window.button);
        this.eventButton.openCloseRightListButtonsActions();
    }
    createFrames() {
        this.window.frames?.forEach(frame => {
            if (frame.type == constTypeFrame.BLOCK) {
                const block = this.frameBlock.create(frame);
                this.elementFormRucula.appendChild(block);
                eventCreated(this.P, block, this.globalWindow);
            }
            if (frame.type == constTypeFrame.LINE) {
                const line = this.frameLine.create(frame);
                this.elementFormRucula.appendChild(line);
                eventCreated(this.P, line, this.globalWindow);
            }
            function eventCreated(p, frameElement, elementRoot) {
                var eventName = `${p}frame.${frame.alias}.complete`;
                let event = new CustomEvent(eventName, {
                    detail: {
                        element: frameElement,
                        height: frameElement.offsetHeight,
                        width: frameElement.offsetWidth
                    }
                });
                let rucula = elementRoot;
                rucula.dispatchEvent(event);
            }
        });
    }
    url(URL) {
        return new URLRucula(this.managmentObject, URL);
    }
    objectUnique(alias) {
        return this.managmentObject.objectUnique(alias);
    }
    getFullObject() {
        return this.managmentObject.objectFull();
    }
    getSepareteObject() {
        return this.managmentObject.objectSeparate();
    }
    eventRuculaChange = new Event('ruculaChange');
    eventFocusOut = new Event('focusout');
    setValue(targetPath, value) {
        const ATTR_DISABLED = 'disabled';
        let identity = this.managmentObject.convertAliasToIdenty(targetPath);
        let input = document.querySelector('[identity=' + identity + ']');
        let disabled = input.getAttribute(ATTR_DISABLED) == null ? null : ATTR_DISABLED;
        if (disabled) {
            input.removeAttribute(ATTR_DISABLED);
        }
        input.focus({ preventScroll: true });
        let onChange = input.value != value && input.getAttribute('type') === 'checkbox';
        input.value = value;
        input.blur();
        if (onChange) {
            input.dispatchEvent(this.eventRuculaChange);
        }
        input.dispatchEvent(this.eventFocusOut);
        if (disabled) {
            input.setAttribute(ATTR_DISABLED, '');
        }
    }
    getValue(config) {
        return this.managmentObject.getPropert(config);
    }
    p(text) {
        let newText = P(this.P, text);
        return newText;
    }
    revertToinit() {
        this.tableDependency.revertToInit();
        this.fragment.revertToInit();
        this.frameBlock.revertToInit();
        this.frameLine.revertToInit();
    }
    configurePerspective() {
        if (this.perspective == null) {
            return;
        }
        for (let index = 0; index < this.perspective?.frame.length; index++) {
            var frameAlias = this.perspective?.frame[index];
            var frame = this.window.frames.find(c => c.alias == frameAlias);
            if (frame == null) {
                continue;
            }
            let indexof = this.window.frames.indexOf(frame);
            this.window.frames.splice(indexof, 1);
        }
        this.perspective?.field.sort();
        let lastFrame;
        for (let index = 0; index < this.perspective?.field.length; index++) {
            let field = this.perspective?.field[index].split('.');
            if (lastFrame?.alias != field[0]) {
                let frame = this.window.frames.find(c => c.alias == field[0]);
                if (frame == null) {
                    continue;
                }
                lastFrame = frame;
            }
            remove(lastFrame, field[1]);
        }
        function remove(frame, propert) {
            var field = frame.fields?.find(c => c.propertDto == propert);
            if (field == null) {
                return;
            }
            let indexof = frame.fields?.indexOf(field);
            frame.fields?.splice(indexof, 1);
        }
    }
}

export { Rucula };
