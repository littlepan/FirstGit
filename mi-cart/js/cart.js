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
        let goodsCounts = document.querySelectorAll(".goods-num");
        let count = 0;//商品总数量
        goodsCounts.forEach(function(item){
            count += parseInt(item.value);
        });
        cartTotalNum.innerHTML = count;

        // 购物车已选择商品的数量和订单总金额
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

    });
})