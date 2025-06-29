# Rucula

```js
<div id="js">
</div>

<script>
    let targetId = 'js'

    let rucula = new Rucula({
        global: global,
        window: window,
        id:targetId,
        reload:callback
    });
</script>
```
## Objeto de Instancia
### global
Configuração Global
### window
Configuração da Janela
### id
Elemento Target
### reload
callback que é chamado sempre que a ação reload é iniciada

## Propriedades
### [managmentObject]()
### [tableDependency]()
  
### [popup](./popup.md)
### [event]()
### [buttons]()
### [url]()

## Métodos
### create
```js
rucula.create();
```
### setValue
```js
rucula.setValue('aliasObject.propert', 'value')
```
### getValue
```js
rucula.getValue('aliasObject.propert')
```
### objectUnique
```js
rucula.objectUnique('aliasObject');
```
### getFullObject
```js
rucula.objgetFullObjectectUnique();
```
### getSepareteObject
```js
rucula.getSepareteObject();
```
### UUID Generator
```js
rucula.UUID()
```
## Events
### Save
```js
rucula.event.on('r-a-save',(e:CustomEvent) => {
    rucula.buttonManaged.saveToAlter()
})
```
### Alter
```js
rucula.event.on('r-a-alter',(e:CustomEvent) => {
    rucula.buttonManaged.saveToAlter()
})
```

### Delete
```js
rucula.event.on('r-a-delete',(e:CustomEvent) => {       
})
```
### Field (Dinamic)

```js

// before.[Alias].[Field]
// input.[Alias].[Field]
// after.[Alias].[Field]
rucula.event.on('input.itensServico.quantidade',(e:CustomEvent) => {
      
        let identity = e.detail.identity
        
        let element = identity.element as HTMLInputElement

        let value = Number(element.value)
        
        if(value > 10){
            element.style.color = "blue"  
            element.style.fontWeight = "bold"

        }
        
        if(value < 0){
            element.style.color = "red"  
            element.style.fontWeight = "bold";
        }
        if(value < 10 && value >= 0){
            element.style.color = ""  
            element.style.fontWeight = ""
        }
    })
```

### Frame (Dinamic)
```js
// frame.[Alias].complete
```
### Button
```js
//button.target
rucula.event.on('finalll',(e:CustomEvent) => {
})
```
### Button Dependency
```js
//button.target
rucula.event.on('finalll.dependency',(e:CustomEvent) => {
})
```
frame
### Pagination
```js
rucula.event.on('r-pagination',(e:any) => console.log(e.detail.page)) 
```

### Pagination Row
```js   
rucula.event.on('r-pagination-row',(e:any) => console.log(e.detail.row))
```
### Pagination Find
```js
rucula.event.on('r-pagination-find',(e:any) => console.log(e.detail.value)) 
```

### Window Erase|Complete
```js
rucula.event.on('erase-window',(e:any) => console.log()) 
rucula.event.on('erase-window-complete',(e:any) => console.log()) 
```

### Window User
```js
rucula.event.on('r-user',(e:any) => console.log()) 
```

### Window User
```js
rucula.event.on('home',(e:any) => console.log()) 
```

### Window Chat
```js
rucula.event.on('r-chat',(e:any) => console.log()) 
```
