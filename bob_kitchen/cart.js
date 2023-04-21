"use strict";
// coded by Deeya Sunilkumar Doshi with help from Bhuvaneshwari Sivasangaran


$(function () {
  // Processing the data from the local storage
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  let presentCart = [],
    reducedCart = [];
  if (typeof cart === "object" && !(cart instanceof Array)) {
    reducedCart.push(cart);
  } else {
    cart.forEach(function (arrayItem) {
      presentCart.push(arrayItem);
    });
    reducedCart = presentCart.reduce((items, item) => {
      const { name, price, imageSrc, count } = item;
      const itemIndex = items.findIndex((item) => item.name === name);
      if (itemIndex === -1) {
        items.push(item);
      } else {
        items[itemIndex].count += 1;
      }

      return items;
    }, []);
  }

  // Checking if the cart is empty
  if (reducedCart.length > 0) {
    let total = 0,
      tax = 0;
    for (let index = 0; index < reducedCart.length; index++) {
      //  display the cart item
      let newSpan1 = $("<span></span>").addClass("row cartItem").html(`
        <div class="col-2"></div>
        <div class="col-2"><img src="${reducedCart[index].imageSrc}" alt=""></div>
        <div class="col-4">
          <p class="cartItemName mb-1">${reducedCart[index].name}</p>
          <p id="itemPrice" class="mb-1">$ ${reducedCart[index].price}</p>
          <button class="deleteItem btn btn-primary">Delete</button></div>
          <div class="col-2 mt-3">
            <div id="buttonRow">
              <button class="minus btn btn-primary">-</button>
              <span id="itemCount">${reducedCart[index].count}</span>
              <button class="plus btn btn-primary">+</button>
            </div>
          </div>
        </div>
        <div class="col-2">`);

      total += reducedCart[index].price * reducedCart[index].count;
      tax += reducedCart[index].price * reducedCart[index].count * 0.15;
      $("#added_items_to_cart").append(newSpan1);
    }

    // function to minus item from the cart
    $(".minus").on("click", function () {
      let quantityUnit = this.parentElement.children[1].textContent;
      let priceUnit =
        this.parentElement.parentElement.previousElementSibling.children[1].textContent.split(
          " "
        )[1];

      if (quantityUnit == 1) {
        $(this).parent().parent().parent().remove();
        total = (parseFloat(total) - parseFloat(priceUnit)).toFixed(2);
        tax = (parseFloat(tax) - parseFloat(priceUnit) * 0.15).toFixed(2);
        $("#totalCost").text(`CAD $${total}`);
        $("#totalTax").text(`CAD $${tax}`);
        $("#total").text(
          `CAD $${(parseFloat(tax) + parseFloat(total)).toFixed(2)}`
        );
        if (total <= 0) {
          let emptyCart = "<span id='emptyCart'>Your cart is empty</span>";
          $("#added_items_to_cart").append(emptyCart);
          $(".cartTotalCard").css("display", "none");
        }
      } else {
        quantityUnit = parseFloat(quantityUnit) - 1;
        total = (parseFloat(total) - parseFloat(priceUnit)).toFixed(2);
        tax = (parseFloat(tax) - parseFloat(priceUnit) * 0.15).toFixed(2);
        this.parentElement.children[1].textContent = quantityUnit;
        $("#totalCost").text(`CAD $${total}`);
        $("#totalTax").text(`CAD $${tax}`);
        $("#total").text(
          `CAD $${(parseFloat(tax) + parseFloat(total)).toFixed(2)}`
        );
      }
    });

    // function to plus item from the cart
    $(".plus").on("click", function () {
      let quantityUnit = this.parentElement.children[1].textContent;
      let priceUnit =
        this.parentElement.parentElement.previousElementSibling.children[1].textContent.split(
          " "
        )[1];
      quantityUnit = parseFloat(quantityUnit) + 1;
      total = (parseFloat(total) + parseFloat(priceUnit)).toFixed(2);
      tax = (parseFloat(tax) + parseFloat(priceUnit) * 0.15).toFixed(2);
      this.parentElement.children[1].textContent = quantityUnit;
      $("#totalCost").text(`CAD $${total}`);
      $("#totalTax").text(`CAD $${tax}`);
      $("#total").text(
        `CAD $${(parseFloat(tax) + parseFloat(total)).toFixed(2)}`
      );
    });

    // function to delete item from the cart
    $(".deleteItem").on("click", function () {
      $(this).parent().parent().remove();
      let priceUnit = this.parentElement.children[1].textContent.split(" ")[1];
      let quantityUnit = this.parentElement.nextElementSibling.children[0].children[1].textContent
      total = (parseFloat(total) - parseFloat(priceUnit) * parseFloat(quantityUnit)).toFixed(2);
      tax = (parseFloat(tax) - parseFloat(priceUnit) * 0.15).toFixed(2);
      $("#totalCost").text(`CAD $${total}`);
      $("#totalTax").text(`CAD $${tax}`);
      $("#total").text(
        `CAD $${(parseFloat(tax) + parseFloat(total)).toFixed(2)}`
      );
      if (total <= 0) {
        let emptyCart = "<span id='emptyCart'>Your cart is empty</span>";
        $("#added_items_to_cart").append(emptyCart);
        $(".cartTotalCard").css("display", "none");
      }
    });

    // element to display the total cost
    let newSpan2 = $("<span></span>").addClass("cartTotalCard")
      .html(`<div class="row totalRow">
      <div class="col-3"></div>
      <div class="col-6 row">
      <div class="col-6 divLeft">Cost:</div>
      <div id="totalCost" class="col-6 divRight">CAD $${total.toFixed(2)}</div>
      <div class="col-6 divLeft">Tax:</div>
      <div id="totalTax" class="col-6 divRight">CAD $${tax.toFixed(2)}</div>
      <div class="col-6 divLeft">Total Cost:</div>
      <div id="total" class="col-6 divRight">CAD $${(
        parseFloat(tax) + parseFloat(total)
      ).toFixed(2)}</div>
      </div>
      </div>
      <div class="col-3"></div>
      </div>
    <button class="btn btn-primary payButton">Pay Now</button>`);

    $("#added_items_to_cart").append(newSpan2);
  } else {
    let emptyCart = "<span id='emptyCart'>Your cart is empty</span>";
    $("#added_items_to_cart").append(emptyCart);
  }

  $(".payButton").click(function() {
    $(this).animate({opacity: 0.5}, 500).animate({opacity: 1}, 500).animate({opacity: 0.5}, 500).animate({opacity: 1}, 500);
  });

});
