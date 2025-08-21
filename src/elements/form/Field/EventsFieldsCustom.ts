import { constPrefixEventField } from "../../../const";

export type identity = {
    name:string, 
    element:HTMLElement, 
    row:number | undefined
}

export let eventsCustom = (() => {
    
    let events = new Map();

    return {

        field:()=> {

            function eventTypeLine(event:string){
                return event.split(".").length == 4
            }

            function removeLineNumber(eventName:string){
                return eventName.replace(/\.[0-9]+$/,"")
            }
            
            function setEvent(eventName:string, event:CustomEvent){
                if(events.has(eventName) == false){
                
                    events.set(eventName, event)   
                }
            }

            return {
                set:(p:string,  identity:identity)=> {

                    let beforeEventName = `${p}${constPrefixEventField.BEFORE}.${identity.name}`
                    let inputEventName = `${p}${constPrefixEventField.INPUT}.${identity.name}`
                    let afterEventName = `${p}${constPrefixEventField.AFTER}.${identity.name}`
    
                    let id = {
                        identity: identity
                    }

                    setEvent(beforeEventName, new CustomEvent(beforeEventName, {detail: id}))
                    setEvent(inputEventName, new CustomEvent(inputEventName, {detail: id}))
                    setEvent(afterEventName, new CustomEvent(afterEventName, {detail: id}))

                    setEventBaseTypeLine()

                    function setEventBaseTypeLine(){

                        if(eventTypeLine(beforeEventName)){

                            let identity = {
                                identity: {}
                            } 
                            
                            let before = removeLineNumber(beforeEventName)
                            let input = removeLineNumber(inputEventName)
                            let after = removeLineNumber(afterEventName)
                            
                            setEvent(before, new CustomEvent(before, {detail: identity}))
                            setEvent(input, new CustomEvent(input, {detail: identity}))
                            setEvent(after, new CustomEvent(after, {detail: identity}))
                        }
                    }
                },

                get: (eventName:string)=> {
                    
                    let result = null;
                    
                    if(eventTypeLine(eventName)){
                        
                        let eventNameBase = removeLineNumber(eventName)

                        let eventBase = events.get(eventNameBase) as CustomEvent
                                
                        result = events.get(eventName) as CustomEvent
                    
                        eventBase.detail.identity = result.detail.identity
                
                        return eventBase;
                    }
                    
                    result = events.get(eventName)
                
                    if(result == null){
                        throw new Error("event not found");
                    }
                
                    return result
                }
            }
        }
    }
})()

