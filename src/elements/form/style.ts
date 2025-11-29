export function setCssClass(cssClass?:string, input?:HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement|HTMLImageElement|HTMLDivElement){
    cssClass?.split(' ').forEach(css => {
        input?.classList.add(css)
    })
}