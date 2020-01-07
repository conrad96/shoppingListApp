const DataStore = require('electron-store');
const storage = new DataStore();

function getItems(){
    return storage.get('shoppingList') || [];
}
function addItem(item){
    //add item to json storage
    // storage.set('shoppingList', [
    //  console.log(item) ;
    //const items = [...getItems, item];
    storage.set('shoppingList', item);
}
function editItem(itemId){

}
function deleteItem(itemId){

}
module.exports = {
    getItems, addItem, editItem, deleteItem
}