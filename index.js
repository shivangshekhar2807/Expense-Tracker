

let expAmount = document.querySelector('#expenseamount');
let description = document.querySelector('#description');
let category = document.querySelector('#category');
let addbtn = document.querySelector('form');
let ulList = document.querySelector('#additems');
let editingItem = null;

category.addEventListener('change', function() {
    console.log("Updated Category:", category.value);
})

addbtn.addEventListener('submit', function(e) {
    e.preventDefault();

    let expenseValue = expAmount.value;
    let descriptionValue = description.value;
    let categoryValue = category.value;

    if (editingItem) {
       
        editingItem.querySelector('.expense').textContent = expenseValue;
        editingItem.querySelector('.description').textContent = descriptionValue;
        editingItem.querySelector('.category').textContent = categoryValue;


        let existingItems = JSON.parse(localStorage.getItem("User Details"));
        if (!Array.isArray(existingItems)) {
            existingItems = [];
        }

        
        let updatedItem = { expense: expenseValue, description: descriptionValue, category: categoryValue };
        existingItems = existingItems.map(item =>
            item.expense === editingItem.querySelector('.expense').textContent ? updatedItem : item
        );

        
        localStorage.setItem("User Details", JSON.stringify(existingItems));

     
        expAmount.value = '';
        description.value = '';
        category.value = '';

        
        editingItem = null;
    } else {
     
        let itemsObj = {
            expense: expenseValue,
            description: descriptionValue,
            category: categoryValue
        };

        let newLi = document.createElement('li');
        newLi.innerHTML = `
            <span class="expense">${expenseValue}</span> - 
            <span class="description">${descriptionValue}</span> - 
            <span class="category">${categoryValue}</span>
            <button class="delbtn">Delete</button>
            <button class="editbtn">Edit Response</button>
        `;

        ulList.appendChild(newLi);

       
        let existingItems = JSON.parse(localStorage.getItem("User Details"));
        if (!Array.isArray(existingItems)) {
            existingItems = [];
        }

        
        existingItems.push(itemsObj);

        
        localStorage.setItem("User Details", JSON.stringify(existingItems));

        
        expAmount.value = '';
        description.value = '';
        category.value = '';
    }
})

ulList.addEventListener('click', function(e) {
    if (e.target.classList.contains('delbtn')) {
        let deleteItem = e.target.parentElement;
        ulList.removeChild(deleteItem);

        let expenseValue = deleteItem.querySelector('.expense').textContent;
        let existingItems = JSON.parse(localStorage.getItem("User Details"));
        if (!Array.isArray(existingItems)) {
            existingItems = [];
        }

        
        existingItems = existingItems.filter(item => item.expense !== expenseValue);

       
        localStorage.setItem("User Details", JSON.stringify(existingItems));
    }
    if (e.target.classList.contains('editbtn')) {
        let editItem = e.target.parentElement;
        let expenseValue = editItem.querySelector('.expense').textContent;
        let descriptionValue = editItem.querySelector('.description').textContent;
        let categoryValue = editItem.querySelector('.category').textContent;

       
        expAmount.value = expenseValue;
        description.value = descriptionValue;
        category.value = categoryValue;

        
        editingItem = editItem;
    }
})