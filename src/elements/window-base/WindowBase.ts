import { cookie } from "../../common/coockie";
import { constIdBaseWindow, constPagination, eventIstance } from "../../const";

export class WindowBaseDOM {

    private P:string
    private ruculaWindow = document.createElement("div");
    private globalWindow:HTMLElement
    private evIstance

    constructor(prefix:string, config: {
        globalWindow:HTMLElement,
        openLeftGrid:boolean,
        windowName:string,
        type?:string
    }){
        this.P = prefix
        this.evIstance = eventIstance(this.P)
        this.globalWindow = config.globalWindow
        
        if(config.type === 'header'){
            config.openLeftGrid = false
        }
        
        this.create(config)
    }

    private create(config: {
        globalWindow:HTMLElement,
        openLeftGrid:boolean,
        windowName:string,
        type?:string        
    }){
        
        config.type ??= 'crud'
        this.cleanGlobalWindow()
    
        this.ruculaWindow.classList.add("r-w");
        this.ruculaWindow.classList.add(`${this.P}r-w`);

        const actions = this.leftGrid(config.type);
        this.ruculaWindow.appendChild(actions)
        config.globalWindow?.appendChild(this.ruculaWindow);

        this.createMold(config.type)
        this.alterTheme()
        this.eraseForm()
        this.openActionswindow()
        this.actionCrudpreventDefault()
        this.widthAndHeigth()
        this.maximizeForm()
        this.openCloseForm()
        this.closeLeftGrid(config.openLeftGrid)
        this.createNameWindow(config.windowName)
        this.setEventClickById(constIdBaseWindow.USER, constIdBaseWindow.USER)
        this.setEventClickById(constIdBaseWindow.CHAT, constIdBaseWindow.CHAT)
        this.setEventClickQuerySelectorAll(constIdBaseWindow.HOME, `#${this.P}${constIdBaseWindow.HOME}`)   
        this.setEventClickQuerySelectorAll(constIdBaseWindow.PAGE_LEFT, `#${this.P}${constIdBaseWindow.PAGE_LEFT}`, () => {
            history.back()
        })   
        this.setEventClickQuerySelectorAll(constIdBaseWindow.PAGE_RIGHT, `#${this.P}${constIdBaseWindow.PAGE_RIGHT}`, () => {
            history.forward()
        })
    }

    private widthAndHeigth(){
        let offsetTop = Number(this.ruculaWindow.offsetTop)
        let height = Number(window.innerHeight)
        this.ruculaWindow.style.height = `${height-offsetTop}px`
    }
    
    private createNameWindow(name:string){
        let window = this.ruculaWindow.querySelector(".r-w-t") as HTMLElement
        
        if(window){
            window.innerHTML = name
        }
    }

    private cleanGlobalWindow(){
        for (let index = 0; index < this.globalWindow.childNodes.length; index++) {            
            this.globalWindow.childNodes[index].remove();
        }
    }
    private openCloseForm(){

        let rNew = this.ruculaWindow.querySelector(`#${this.P}${constIdBaseWindow.NEW}`)!
        let itemContainer = document.querySelectorAll(`.${this.P}js-open-close-container`)
        
        rNew.addEventListener("click", () => {

            itemContainer.forEach(item => {
                item.classList.toggle("r-display-none")
                indicateBoxFrameOpend(rNew!, item!)
            })

            function indicateBoxFrameOpend(rNew:Element, item:Element){

                var isBoxFrame = item.classList.contains("box-frame")
                var isBoxFrameOpened = item.classList.contains("r-display-none")

                if(isBoxFrame && isBoxFrameOpened == false){
                    rNew.classList.add("r-box-frame-opened")
                }

                if(isBoxFrame && isBoxFrameOpened){
                    rNew.classList.remove("r-box-frame-opened")
                }
            }
        })

        let rCloseGrid = this.ruculaWindow.querySelector(`#${this.P}${constIdBaseWindow.CLOSE_GRID}`)

        rCloseGrid?.addEventListener("click", () => {

            let div = document.querySelector(`.${this.P}r-f`) as HTMLDivElement
            div.classList.toggle('r-mobile')
            
            let leftGrid = document.getElementById(`${this.P}r-left-block`) as HTMLDivElement
            leftGrid.classList.toggle('r-display-block')        
        })

    }
    
    private leftGrid(type:string){

        const actions = document.createElement("div");
        actions.className = "r-left-block"
        actions.id = `${this.P}r-left-block`

        const ACTIONS =`
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
                ${ type == 'crud' ? this.grid() : ''}
             </div>`

        actions.innerHTML = ACTIONS;

        return actions.cloneNode(true);
    }

    grid():string {
        return `                
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
        </div>`
    }

    private createMold(type?:string){

        var body = ''
 
        switch (type) {
            case 'crud':
                body = this.bodyForm()
                break;
            case 'grid':
                body = this.grid()
            break
            case 'header':
                body = ''
            break;
                default:
                body = this.bodyForm()
                break;
        }

        const contentForm = document.createElement("div");

        const CREATE_OR_EDIT =
        `<div class="container-r-f  box-home ${this.P}js-open-close-container">
            <div class="r-act-opt r-head" id="${this.P}w-title">
                <div class="r-display-inline-block">
                    <button id="${this.P}${constIdBaseWindow.HOME}" class="r-a-b r-background-theme-itens r-b-header-icon"><i class="bi bi-house"></i></button>
                    <button id="${this.P}${constIdBaseWindow.PAGE_LEFT}" class="r-a-b r-background-theme-itens r-b-header-icon"><i class="bi bi-arrow-left"></i></button>
                    <button id="${this.P}${constIdBaseWindow.PAGE_RIGHT}" class="r-a-b r-background-theme-itens r-b-header-icon"><i class="bi bi-arrow-right"></i></button>
                </div>
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
                            <button id="${this.P}${constIdBaseWindow.HOME}" class="r-a-b r-background-theme-itens r-b-header-icon"><i class="bi bi-house"></i></button>
                            <button id="${this.P}${constIdBaseWindow.PAGE_LEFT}" class="r-a-b r-background-theme-itens r-b-header-icon"><i class="bi bi-arrow-left"></i></button>
                            <button id="${this.P}${constIdBaseWindow.PAGE_RIGHT}" class="r-a-b r-background-theme-itens r-b-header-icon"><i class="bi bi-arrow-right"></i></button>
                            <button id="${this.P}${constIdBaseWindow.MAXIMIZE_WINDOW}" class="r-a-b open-box-frame"><i class="bi bi-fullscreen"></i></button>
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
                ${body}
            </div>
            <div class="r-facede-action bottom">
            </div>
        </div>
        `
        contentForm.innerHTML = CREATE_OR_EDIT;

        this.ruculaWindow.appendChild(contentForm.childNodes[0] as HTMLDivElement)
        this.ruculaWindow.appendChild(contentForm.childNodes[1] as HTMLDivElement)

    }

    private bodyForm(){


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
                </div>`

    }

    private closeLeftGrid(grid:boolean){

        if(grid == false){
            
            let rf = this.globalWindow.querySelector(`.${this.P}r-f.r-display-none`)

            if(rf != null){
                let buttonNew = this.globalWindow.querySelector(`#${this.P}${constIdBaseWindow.NEW}`);
                (buttonNew as HTMLElement).click()
            }

            let actions = this.globalWindow.querySelector(`#${this.P}actions`);
            actions?.remove()

            let maximizeWindow = this.globalWindow.querySelector(`#${this.P}${constIdBaseWindow.MAXIMIZE_WINDOW}`)
            maximizeWindow?.remove()

        }
    }

    maximizeForm(){

        let buttonMaximizeWindow = document.getElementById(`${this.P}${constIdBaseWindow.MAXIMIZE_WINDOW}`);
        
        buttonMaximizeWindow?.addEventListener('click',(e) => {
            let actions = document.getElementById(`${this.P}actions`);
            actions?.classList.toggle("r-close-grid");
            
            let icon = buttonMaximizeWindow?.querySelector('i') as HTMLElement 
            icon?.classList.toggle("bi-fullscreen"); // icon bootstrap
            icon?.classList.toggle("bi-fullscreen-exit"); // icon bootstrap
        })
        
        let buttonMaximizeGrid = document.getElementById(`${this.P}${constIdBaseWindow.MAXIMIZE_GRID}`);
        buttonMaximizeGrid?.addEventListener('click',() => {

            let actions = document.getElementById(`${this.P}r-left-block`);
            actions?.classList.toggle("r-display-block");
            let formFrames = document.querySelector(`.${this.P}r-f`) as HTMLDivElement
            formFrames.classList.toggle("r-mobile")

        })
    }

    eraseForm(){
        
        document.getElementById(`${this.P}${constIdBaseWindow.ERASE_WINDOW}`)?.addEventListener('click', () => {
            this.globalWindow.dispatchEvent(this.evIstance.ERASE_WINDOW)
        })
    }

    private actionCrudpreventDefault(){
        let facedeActionCrud = document.getElementById(`${this.P}r-facede-action-crud`)
        facedeActionCrud?.addEventListener('click', (e) => e.preventDefault())
    }

    private  openActionswindow(){

        let actions = document.getElementById(`${this.P}${constIdBaseWindow.ACTIONS_WINDOW}`)

        actions?.addEventListener('click', (e) => {
            actions?.nextElementSibling?.classList.toggle('r-actions-window-active')
            actions?.nextElementSibling?.classList.toggle('r-actions-window')
        })
    }

    private alterTheme(){

        let rw = document.querySelector(`.${this.P}r-w`)

        let actions = document.getElementById(`${this.P}${constIdBaseWindow.ALTER_THEME}`)

        let theme = cookie.read('theme')

        if(theme == 'dark'){
            rw?.classList.add('dark-theme')
        }

        actions?.addEventListener('click', (e) => {

            rw?.classList.toggle('dark-theme')

            if(rw?.classList.contains('dark-theme')){
                document.cookie = "theme=dark"
            }
            else{
                document.cookie = "theme=light"
            }
        })
    }

    private setEventClickQuerySelectorAll(eventName:string, selector:string, callback?:Function){

        const evtName = `${this.P}${eventName}`
        let evt = new Event(evtName)

        document.querySelectorAll(selector)?.forEach(e => {
            e.addEventListener('click', () => {
                if(callback){
                    callback()
                }
                this.globalWindow.dispatchEvent(evt)
            })
        })
    }

     private setEventClickById(eventName:string, id:string){

        const evtName = `${this.P}${eventName}`
        let evt = new Event(evtName)

        document.getElementById(`${this.P}${id}`)?.addEventListener('click', () => {
            this.globalWindow.dispatchEvent(evt)
        })
    }
    

    getPrincipalElementRucula(){
        return document.getElementById(`${this.P}${constIdBaseWindow.FORM_RUCULA_JS}`) as HTMLFormElement
    }
}