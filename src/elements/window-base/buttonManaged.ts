import { constIdBaseWindow, constTargetButtonCrudDefault } from "../../const"

export class ButtonCrud {
    
    private P:string
    
    private atualModel = 'init'
    
    private modes = {
        init:'init',
        delete:'delete',
        save:'save',
        alter:'alter'
    } 
    constructor(P:string,crud:string, globalwindow:HTMLElement) {
        this.P = P
        this.crud = crud
        this.buttonCreate = globalwindow.querySelector(`#${this.P}${constTargetButtonCrudDefault.SAVE}`) as HTMLButtonElement
        this.buttonAlter = globalwindow.querySelector(`#${this.P}${constTargetButtonCrudDefault.ALTER}`) as HTMLButtonElement
        this.buttonDelete = globalwindow.querySelector(`#${this.P}${constTargetButtonCrudDefault.DELETE}`) as HTMLButtonElement   
    }

    private buttonCreate!:HTMLButtonElement
    private buttonAlter!:HTMLButtonElement
    private buttonDelete!:HTMLButtonElement

    private buttonsPlus!:HTMLButtonElement
    private olButtonsPlus!:HTMLOListElement
    
    private crud:string
   
    private SpecificRightButtons (){
        this.buttonsPlus = document.getElementById(`${this.P}${constIdBaseWindow.BUTTONS_MENU_VERTICAL}`) as HTMLButtonElement
        this.olButtonsPlus = document.getElementById(`${this.P}${constIdBaseWindow.BUTTONS_MENU_VERTICAL_LIST}`) as HTMLOListElement     

        const countButtons = this.olButtonsPlus?.querySelectorAll("button,a")?.length

        if( countButtons === 0 || countButtons === undefined){
            this.buttonsPlus?.remove();
            this.olButtonsPlus?.remove()
        }
    }
           
    removeUnusedButtons () {
        
        this.SpecificRightButtons();

        if(this.crud == "" || this.crud == undefined){
            this.buttonCreate.remove()
            this.buttonAlter.remove()
            this.buttonDelete.remove()
            return
        }

        let options = "crud";
        
        for (let index = 0; index < this.crud.length; index++) {
            
            let indexof = options.indexOf(this.crud[index])

            options = options.replace(options[indexof],"")
        }

        if(options.length < 1 || (options.length == 1 && options[0] == "r")){
            return
        }

        for (let i = 0; i < options.length; i++) {
            
            if(options[i] == "c"){
                this.buttonCreate.remove()
            }

            if(options[i] == "u"){
                this.buttonAlter.remove()
            }

            if(options[i] == "d"){
                this.buttonDelete.remove()
            }
        }   
    }

    initTosave(){
        if(this.atualModel != this.modes.init) {
            return
        }

        let options = [`${this.P}r-a-save`]
        this.set(options)
        this.atualModel = this.modes.save
    }

    saveToAlter(){
        
        let options = [`${this.P}r-a-alter`, `${this.P}r-a-delete`]
        this.set(options)
        this.atualModel = this.modes.alter
    }
    
    deleteToInit(){
        let options = ['']
        this.set(options)
        this.atualModel = this.modes.init
    }    

    disableAll(){
        let options = ['']
        this.set(options)
        this.atualModel = this.modes.init
    }

    private set(options:string[]){
        
        var buttons = [this.buttonCreate, this.buttonAlter, this.buttonDelete];

        for (let i = 0; i < buttons.length; i++) {
            
            const button = buttons[i];

            let indexOf = options.indexOf(button.id)
            
            if(indexOf === -1 ){
                button.classList.add('r-a-b-disable')
                continue
            }
            
            button.classList.remove('r-a-b-disable')
        }
    }

    disableCreate() {
        this.buttonCreate.classList.add('r-a-b-disable')
    }

    disableAlter(){
        this.buttonAlter.classList.add('r-a-b-disable')
    } 

    disableDelete(){
        this.buttonDelete.classList.add('r-a-b-disable')
    } 

    enableCreate() {
        this.buttonCreate.classList.remove('r-a-b-disable')
    }

    enableAlter(){
        this.buttonAlter.classList.remove('r-a-b-disable')
    } 

    enableDelete(){
        this.buttonDelete.classList.remove('r-a-b-disable')
    } 
}
        
    