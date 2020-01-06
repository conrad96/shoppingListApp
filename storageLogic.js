const renderer = require('electron').ipcRenderer;    

renderer.on('get-items', (event, items)=>{    
    
    const itemsList = items.reduce((previous, current)=>{
        isChecked = (current.checked)? 'checked' : '';
        previous += '<li class="list-group-item"><input type="checkbox" id="'+current.id+'" '+isChecked+' />'+current.item+'</li>';
        return previous;
    }, '');
    //render html to DOM 
    document.getElementById("shoppingList-list").innerHTML = itemsList;

});
