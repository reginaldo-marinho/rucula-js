import { frame } from "../../entities/form/frame";

export function createFrame(frame:frame){
    const div = document.createElement('div');
    if (frame.type == "block")div.classList.add("r-q-b")
    if (frame.type == "line")div.classList.add('r-q-l')
    div.setAttribute('data-objectDto',frame.objectDto)
    const h3 = document.createElement('h3');
    h3.textContent = frame.name
    h3.classList.add('r-t-f')
    div.appendChild(h3)
    return div
}