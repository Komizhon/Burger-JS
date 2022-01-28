const product = {
    plainBurger: {
        name: "GAMBURGER",
        price: 10000,
        amount: 0,
        kkal: 200,
        get Sum() {
            return this.amount * this.price
        },
        get kkalSum() {
            return this.amount * this.kkal
        }
    },

    freshBurger: {
        name: "GAMBURGER FRESH",
        price: 20500,
        amount: 0,
        kkal: 350,
        get Sum() {
            return this.amount * this.price
        },
        get kkalSum() {
            return this.amount * this.kkal
        }
    },

    freshCombo: {
        name: "FRESH COMBO",
        price: 31900,
        amount: 0,
        kkal: 600,
        get Sum() {
            return this.amount * this.price
        },
        get kkalSum() {
            return this.amount * this.kkal
        }
    },

}


const btn = document.querySelectorAll('.main__product-btn')

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', function () {
        plusOrMinus(this)
    })
}
function plusOrMinus(el) {
    const parent = el.closest('.main__product'),
        num = parent.querySelector('.main__product-num'),
        price = parent.querySelector('.main__product-price span'),
        kkal = parent.querySelector('.main__product-kcall span'),
        symbol = el.getAttribute('data-symbol'),
        parentId = parent.getAttribute('id')
    if (symbol == '+' && product[parentId].amount < 10) {
        product[parentId].amount++
    } else if (symbol == '-' && product[parentId].amount > 0) {
        product[parentId].amount--
    }

    num.innerHTML = product[parentId].amount
    price.innerHTML = product[parentId].Sum
    kkal.innerHTML = product[parentId].kkalSum
}

const lvl = document.querySelector('.header__timer-extra')
lvlBoost()
function lvlBoost() {
    for (let i = 0; i < 1; i++) {
        if (lvl.innerHTML == 100) {
            stop
        }else if (lvl.innerHTML <= 100) {
            lvl.innerHTML++
        }
                
    }
    if (lvl.innerHTML <= 70) {
        setTimeout(() => {
            lvlBoost()
        }, 30);
    }else{
        setTimeout(() => {
           lvlBoost() 
        }, 100);
    }
  
}


const mainProductInfo = document.querySelectorAll('.main__product-info'),
    view = document.querySelector('.view'),
    viewClose = document.querySelector('.view__close')

for (let i = 0; i < mainProductInfo.length; i++) {
    mainProductInfo[i].addEventListener('dblclick', function () {
        view.classList.add('active')
        Img(this)
    })
}
let el = 2
function Img(el) {
    const parent = el.closest('.main__product'),
        img = parent.querySelector('.main__product-img'),
        imgAtt = img.getAttribute('src'),
        viewImg = document.querySelector('.view img')
    viewImg.setAttribute('src', imgAtt)


}

viewClose.onclick = () => view.classList.remove('active')


const addCart = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receiptWindow = document.querySelector('.receipt__window'),
    receiptWindowOut = document.querySelector('.receipt__window-out')

addCart.addEventListener('click', function () {
    receipt.style = `display:flex`
    setTimeout(() => {
        receipt.style.opacity = '1'
        receiptWindow.style = `top:20%`
    }, 500);
    const objValue = Object.values(product).filter(item => item.amount)
    let text = ''
    let allPrice = 0
    let allKkcal = 0
    for (let k = 0; k < objValue.length; k++) {
        allPrice += objValue[k].Sum
        allKkcal += objValue[k].kkalSum
    }
    let total = `   
        <div class="total" >            
    <div class="total_name">Total Price</div>  
    <div class="total_price">${allPrice}</div>
    </div>
    <div class="total_kkcal">
    <div class="total_name">Total kkcal</div>
    <div class="total_price">${allKkcal}</div>
        </div>`
    for (let i = 0; i < objValue.length; i++) {
        if (objValue[i].amount > 0) {
            text += `
            <div class="receipt_product">
                <span>${i + 1}</span>
                <div class="receipt_name">${objValue[i].name}</div>
                <div class="receipt_amount">${objValue[i].price} x ${objValue[i].amount} =  </div>
                <div class="receipt_price">${objValue[i].Sum}</div>
            </div>`



        }
        
    }
    receiptWindowOut.innerHTML = text + total

  
    console.log(allPrice);
    console.log(allKkcal);
})