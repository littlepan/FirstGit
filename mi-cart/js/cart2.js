// 购物车商品数量封装

// 全选
let checkAll = document.querySelector(".select-all");
// 商品的checkbox
let checkItems = document.querySelectorAll('.item-checkbox');

// 购物车总数量
let cartTotalNum = document.querySelector("#cartTotalNum");

// 购物车已选择商品的数量
let selTotalNum = document.querySelector("#selTotalNum");

// 购物车总金额
let cartTotalPrice = document.querySelector("#cartTotalPrice");


// window对象添加load事件，页面加载成功就更新购物车商品的数量
window.addEventListener("load",function(){
    // 购物车总数量
    cartCount();
});


// 全选事件
checkAll.addEventListener("change",function(e){
    if(this.checked){
        // 全选
        // 1. 所有商品全部选中
        checkItems.forEach(function(item){
            item.checked = true;
            let parentItem = item.parentElement.parentElement.parentElement;
            // 给当前商品的父元素 .item-box添加一个selected类名
            parentItem.classList.add("selected");
        });
        // 2. 更新购物车商品数量（购物车总商品数量和已选择商品的数量）
        // 购物车总数量
        cartCount();

        // 购物车已选择商品的数量和订单总金额
        selGoodsCountPrice();


    }else{
        // 全不选
        // 1. 所有商品全不选中
        checkItems.forEach(function(item){
            item.checked = false;
            let parentItem = item.parentElement.parentElement.parentElement;
            // 给当前商品的父元素 .item-box删除selected类名
            parentItem.classList.remove("selected");
        });

        // 购物车已选择商品的数量和订单总金额
        selTotalNum.innerHTML = 0;
        cartTotalPrice.innerHTML = 0;
    }

});

// 商品选择操作
checkItems.forEach(function(item){
    item.addEventListener("change",function(e){
        // 选中
        let parentItem = item.parentElement.parentElement.parentElement;
        if(e.target.checked){

            // 父元素添加selected类名
            // 给当前商品的父元素 .item-box添加一个selected类名
            parentItem.classList.add("selected");

            // 判断是否所有的商品都被选中了
            // 有多少商品是被选中的
            let selectedLen = document.querySelectorAll(".item-box.selected").length;
            // 
            let itemLen = document.querySelectorAll(".item-box").length;
            // 如果所有的商品都被选中了，全选也需要选中
            if(selectedLen == itemLen){
                checkAll.checked = true;
            }

        } else{

            // 不选中
            parentItem.classList.remove("selected");

            // 去除全选的checked
            if(checkAll.checked){
                checkAll.checked = false;
            }
        }
        // 2. 更新购物车商品数量（已选择商品的数量）
        selGoodsCountPrice();

    });
})

// 商品数量 -
let  num_minus = document.querySelectorAll(".num_minus");
num_minus.forEach(function(item){
    item.addEventListener("click",function(e){
        e.preventDefault();

        // 1. 获取商品原始数量
        let count = e.target.nextElementSibling.value.trim();
        // 2. 判断数量是否小于等于1
        if(count <=1){
            alert("亲，商品数量已经最小啦！");
            count = 1;
            return false;
        }
        // 3. 商品数量>1
        // 商品数量>1
        let num = parseInt(count)
        num--;
        // 4. 修改商品数量input
        e.target.nextElementSibling.value = num;


        //5. 计算商品小计
        let itemBox = e.target.parentElement.parentElement.parentElement.parentElement;
        let price = itemBox.querySelector('.col-price span').innerHTML;

        price = parseFloat(price);
        let totalPrice = price*num;//计算商品的小计

        // 小计
        let totalPriceItem = itemBox.querySelector('.col-total span');
        totalPriceItem.innerHTML = totalPrice.toFixed(2);

        // 6.修改购物车商品的总数量
        cartCount();
        //7 如果商品被选中，修改被选中商品的数量和订单金额
        if(itemBox.classList.contains("selected")){

            selGoodsCountPrice();
        }
    });
});

// 删除商品
let  delGoods = document.querySelectorAll(".del-goods");

delGoods.forEach(function(item){
    item.addEventListener("click",function(e){
        e.preventDefault();
        // 1.判断用户是否需要删除
        let isDel = confirm("亲，您确定要删除该商品吗？");
        if(isDel){
            // 1. 删除商品
            let itemBox = e.target.parentElement.parentElement.parentElement;
            let flag = itemBox.classList.contains("selected");//判断是否有selected类名
            itemBox.remove();

            // 2. 购物车总数量
            cartCount();

            // 3. 看商品是否被选中，如果被选中，需要修改购物车已选择商品的数量和订单总金额
            if(flag){
                selGoodsCountPrice();
            }
            // 4. 是否需要全选
            let selectedLen = document.querySelectorAll(".item-box.selected").length;

            let itemLen = document.querySelectorAll(".item-box").length;
            // 如果所有的商品都被选中了，全选也需要选中
            if(selectedLen == itemLen){
                checkAll.checked = true;
            }
        }
    });
});



 // 购物车总数量
function cartCount(){
    let goodsCounts = document.querySelectorAll(".goods-num");
    let count = 0;//商品总数量
    goodsCounts.forEach(function(item){
        count += parseInt(item.value);
    });
    cartTotalNum.innerHTML = count;
}
  // 购物车已选择商品数量和订单总金额
function selGoodsCountPrice(){
    let  selItemBox = document.querySelectorAll(".item-box.selected");
    let selItemCount = 0; //已选择商品的数量
    let selItemprice = 0;//已选择商品的金额
    selItemBox.forEach(function(item){
        let itemCount = item.querySelector(".goods-num").value;
        let itemPrice = item.querySelector(".col-total span").innerHTML;
        selItemCount += parseInt(itemCount);
        selItemprice += parseFloat(itemPrice);
    });
    // 购物车已选择商品数量和订单总金额
    selTotalNum.innerHTML = selItemCount;
    cartTotalPrice.innerHTML = selItemprice.toFixed(2);
}