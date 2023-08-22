import { field } from "../../entities/form/field";
import { createNewLine } from "../../table-dependency/TableDependency";
import { createField, createSpanLabelIsRequerid } from "../form/ElementsInput";
import { CountIsZero, getLine, setLine } from "./FrameControl";

export function prepareLineHeaderTable(fields:Array<field>):HTMLTableSectionElement{
    let tr = document.createElement('tr');
    let thead = document.createElement('thead');
    thead.appendChild(tr);
    fields.forEach(field => {
        const th = document.createElement('th');
        th.textContent = field.description
        if(field.requerid == true){
        th.textContent = th.textContent
        th.append(createSpanLabelIsRequerid().cloneNode(true))
        }
        alignColumnOfTable(field,th)
        tr.appendChild(th)
    })
    return thead;
}
export  function prepareTBody(){
    return document.createElement('tbody');
}
export function prepareTR(fields:Array<field>,frame:{type:string,objectDto:string,line?:number}){
    if(CountIsZero(frame.objectDto)){
        frame.line = 0;
        setLine({objectDto:frame.objectDto, row:0})
    }else{
        let line = getLine(frame.objectDto);
        frame.line = line?.row!+1
        setLine({objectDto:frame.objectDto, row:line?.row!+1})
    }
    createNewLine({
        type:frame.type,
        objectDto:frame.objectDto,
        line:frame.line!
    })    
    let tr = document.createElement('tr');
    tr.setAttribute('data-objecdto',frame.type)
    fields.forEach((field) =>{
        const td = document.createElement('td');
        const input = createField(field,frame);
        td.appendChild(input);
        alignColumnOfTable(field,td)
        tr.appendChild(td)
    })
    return tr;
}
function alignColumnOfTable(field:field, cell: HTMLTableCellElement){
    if(field.type == "text")
        cell.style.textAlign = "left"
    if(field.type == "number")
        cell.style.textAlign = "right"
    if(field.type == "select" || field.type == "checkbox")
        cell.style.textAlign = "center"
}
