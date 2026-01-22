import {menuArray} from "./data.js";
const dishList = document.getElementById('dishList')

function renderMenu(arr) {
    let htmlStringDishes = ''
    menuArray.forEach((dish) => {
        htmlStringDishes +=
            `
            <li class="list-item">
                <div class="menu-section">
                    <div class="menu-content">
                        <div class="emoji">${dish.emoji}</div>
                        <div class="dish-el">
                            <h3 class="dish-name">${dish.name}</h3>
                            <p class="dish-cursive">${dish.ingredients}</p>
                            <p class="dish-price">$${dish.price}</p>
                        </div>
                    </div>
                    <button class="add-to-cart" data-add="${dish.id}">+</button>
                </div>

            </li>
            `
    })

    dishList.innerHTML = htmlStringDishes
}

let orderArray = [] // Здесь будем хранить объекты добавленных блюд

document.addEventListener('click', function(e) {
    if (e.target.dataset.add) {
        handleAddClick(e.target.dataset.add)
    } 
    
    else if(e.target.dataset.remove){
        console.log(e.target.dataset.remove)
        handleRemoveClick(e.target.dataset.remove)
    }

    else if (e.target.id =="completeOrderBtn" && countTotalPrice(orderArray)) {
        document.getElementById('modal').classList.remove('hidden')
    }

    else if (e.target.id =="submitBtn") {
        e.preventDefault()
        document.getElementById('modal').classList.add('hidden')
        document.getElementById('menuRecap').classList.add('hidden')
        document.getElementById('orderMessage').classList.remove('hidden')
    }

})

function handleAddClick(dishId) {
    let targetDishObj = menuArray.filter(function(dish) {
        return dish.id == dishId
    })[0]

    orderArray.push(targetDishObj)

    renderOrder()
    document.getElementById('totalPrice').innerText = '$' + countTotalPrice(orderArray)
}

function handleRemoveClick(itemIndex) {
    orderArray.splice(itemIndex, 1) 
    renderOrder()
    document.getElementById('totalPrice').innerText = '$' + countTotalPrice(orderArray)
}

function renderOrder() {
    let orderHtml = ''

    orderArray.forEach(function(item, index){
        orderHtml +=
            `
            <li class="order-list-element">
                <div class="order-list-wrapper">
                    <h3 class="dish-name">${item.name}</h3>
                    <button class="remove-button" data-remove="${index}">remove</button>
                </div>
                <p class="dish-price">$${item.price}</p>
            </li>
            `
    })

    document.getElementById('orderList').innerHTML = orderHtml

}

function countTotalPrice(orderArray) {
    let total = 0
    orderArray.forEach(function(dish) {
        total += dish.price
    })

    return total
}


renderMenu(menuArray)
