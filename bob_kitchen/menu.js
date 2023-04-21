"use strict";
// coded by Bhuvaneshwari Sivasangaran

$( function() {

    localStorage.setItem("cart", "");

    // initiating UI tabs
    $( "#tabs" ).tabs();

    // adding on click event to add to card button and add item to cart
    $(".addToCard").click(function(event) {
        let currentCart = localStorage.getItem("cart");
        let selectedItem = event.target.parentNode;
        let selectedItemName = selectedItem.firstChild.nextElementSibling.textContent;
        let selectedItemPrice = selectedItem.lastChild.previousElementSibling.previousElementSibling.firstChild.nextElementSibling.textContent;
        let selectedImageSrc = selectedItem.parentNode.firstChild.nextElementSibling.src;
        let data = { name: selectedItemName, price: parseFloat(selectedItemPrice), imageSrc: selectedImageSrc, count : 1 };
        if ( currentCart === "" ) {
            localStorage.setItem("cart", JSON.stringify(data));
            $("#cart")[0].innerHTML = `Cart (1)`;
        } else {
            let cart = JSON.parse(localStorage.getItem("cart") || "[]");
            let presentCart = [];
            if ( cart.length == undefined ) {
                presentCart.push(cart);
            } else {
                cart.forEach(function (arrayItem) {
                    presentCart.push(arrayItem);
                });
            }
            presentCart.push(data)
            localStorage.setItem("cart", JSON.stringify(presentCart));
            $("#cart")[0].innerHTML = `Cart (${presentCart.length})`;
        }
    });

} );