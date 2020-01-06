const DataStore = require('electron-store');
const storage = new DataStore();

function getItems(){
    return storage.get('shoppingList') || [];
}
function addItem(item){
    //add item to json storage
    // storage.set('shoppingList', [
    //     {
    //         id: 1, item: "entry 1", checked: false
    //     },
    //     {
    //         id: 2, item: "entry 2", checked: false
    //     },
    //     {
    //         id: 3, item: "entry 3", checked: false
    //     }
    // ]);    
    const items = [...getItems, item];
    storage.set('shoppingList', items);
}
function editItem(itemId){

}
function deleteItem(itemId){

}
module.exports = {
    getItems, addItem, editItem, deleteItem
}