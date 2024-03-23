var cart = [];

// var product_name = "";
// var price = 0;
// var qty = 0;
document.getElementById("cart_amount").innerHTML = 0;
document.getElementById("proceed-btn-Notdisabled").style.display = "none";
document.getElementById("proceed-btn-disabled").style.display = "flex";
document.getElementById("loaderScreen").style.display = "none";

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

let preveiwContainer = document.querySelector(".products-preview");
let previewBox = preveiwContainer.querySelectorAll(".preview");

document.querySelectorAll(".products-container .product").forEach((product) => {
  product.onclick = () => {
    preveiwContainer.style.display = "flex";
    let name = product.getAttribute("data-name");
    previewBox.forEach((preview) => {
      let target = preview.getAttribute("data-target");
      if (name == target) {
        preview.classList.add("active");
      }
    });
  };
});

previewBox.forEach((close) => {
  close.querySelector(".fa-times").onclick = () => {
    close.classList.remove("active");
    preveiwContainer.style.display = "none";
  };
});

function addToCartFunction(id, item, price, image) {
  var clickedItem = {
    id,
    itemName: item,
    itemPrice: price,
    qty: 1,
    itemImage: image,
  };

  // check whether clicked item is already in the cart
  let oldItemIndex = cart.findIndex((el) => el.id == id);

  if (oldItemIndex != -1)
    updateQtyOnly(clickedItem, oldItemIndex); // update cart
  else addNewItemToTheCart(clickedItem); // add new item to the cart
}

function updateQtyOnly(item, oldItemIndex) {
  const newQty = cart[oldItemIndex].qty + 1;
  cart[oldItemIndex].qty = newQty;
}

function addNewItemToTheCart(item) {
  cart.push(item);

  document.getElementById("cart_amount").innerHTML = cart.length;
}
// When the user clicks on the button, open the modal
function viewCartFunction() {
  modal.style.display = "block";
  let table = document.getElementById("cart-details-table-header");
  table.className = "table-content";


  let tbody = document.createElement("tbody");
  tbody.id = "tBody";
  $("#tBody tr").remove();
 

  for (let i = 0; i < cart.length; i++) {
    document.getElementById("proceed-btn-Notdisabled").style.display = "flex";
    document.getElementById("proceed-btn-disabled").style.display = "none";
    let tr = document.createElement("tr");

    tr.style.width = "100%";
    tr.style.marginTop = "5px";
    var img = document.createElement("img");
    img.src = cart[i].itemImage;
    img.style.width = "50px";
    img.style.height = "50px";
    img.style.width = "10%";
    img.id = "picture";

    tr.appendChild(img);
    let td = document.createElement("td");
    td.style.fontSize = "16px";
    td.style.fontWeight = "500";
    td.style.padding = "5px";
    td.style.width = "30%";

    td.innerHTML = cart[i].itemName;
    tr.appendChild(td);
    let td1 = document.createElement("td");
    td1.style.fontSize = "16px";
    td1.style.fontWeight = "500";
    td1.style.padding = "5px";
    td1.style.textAlign = "right";
    td1.style.width = "15%";

    td1.innerHTML = cart[i].itemPrice;
    tr.appendChild(td1);

    $(tr).append(
      `<div style="font-size:16px;font-weight:500;display:flex; border: #000000 solid 1px;width:20%; margin:5x; background-color:gray">
          <div style="cursor:pointer;padding:5px;text-align: center;border-right: #000000 solid 1px; width:30%" onclick="addQty(${cart[i].qty},${i})">+</div>
          <div class="qty_" style="padding:5px;text-align: center;border-right: #000000 solid 1px;width:40%">${cart[i].qty}</div>
          <div style="cursor:pointer;padding:5px;text-align: center;width:30%" onclick="substratQty(${cart[i].qty},${i})">-</div>
        </div>`
    );
    // tr.appendChild("<div>+</div><div>1</div><div>+</div>");

    let td3 = document.createElement("td");
    td3.style.fontSize = "16px";
    td3.style.fontWeight = "500";
    td3.style.padding = "5px";
    td3.style.textAlign = "right";
    td3.className = "price_";
    td3.style.width = "15%";
    td3.innerHTML = (cart[i].itemPrice * cart[i].qty).toFixed(2);
    tr.appendChild(td3);
    let td4 = document.createElement("td");
    td4.style.fontSize = "16px";
    td4.style.fontWeight = "500";
    td4.style.padding = "5px";
    td4.style.width = "10%";

    td4.innerHTML = `<div class="remove-btn" onclick="removeItemFromCart(${cart[i].id})"><i class="fa fa-trash" aria-hidden="true"></i></div>`;
    tr.appendChild(td4);
    tbody.appendChild(tr);
  }

  table.appendChild(tbody);
  document.getElementById("net_total").innerHTML = getNetTotal();
}
function addQty(qty, i) {
  var allTDs = document.getElementsByClassName("qty_");
  for (var counter = 0; counter < allTDs.length; counter++) {
    if (counter == i) {
      cart[i].qty = cart[i].qty + 1;
      allTDs[counter].innerHTML = cart[i].qty;
      var el = document.getElementsByClassName("price_");
      el[i].innerHTML = (cart[i].itemPrice * cart[i].qty).toFixed(2);
    }
  }
  document.getElementById("net_total").innerHTML = getNetTotal();
}
function substratQty(qty, i) {
  var allTDs = document.getElementsByClassName("qty_");
  for (var counter = 0; counter < allTDs.length; counter++) {
    if (counter == i) {
      if (cart[i].qty > 1) {
        cart[i].qty = cart[i].qty - 1;
        allTDs[counter].innerHTML = cart[i].qty;
        var el = document.getElementsByClassName("price_");
        el[i].innerHTML = (cart[i].itemPrice * cart[i].qty).toFixed(2);
      }
    }
  }
  document.getElementById("net_total").innerHTML = getNetTotal();
}
function getNetTotal() {
  var all_amount = document.getElementsByClassName("price_");
  var total_price = 0;
  for (let i = 0; i < all_amount.length; i++) {
    total_price = total_price + parseFloat((cart[i].itemPrice * cart[i].qty).toFixed(2));
  }
  return "$ " + total_price.toFixed(2);
}
function removeItemFromCart(id) {
  // document.getElementsByTagName("tr").deleteRow(0);
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == id) {
      cart.splice(i, 1);
      let el = document.getElementsByClassName("table-content")[0];
      let tbody = el.getElementsByTagName("tbody")[1].deleteRow(i);
     document.getElementById("cart_amount").innerHTML = cart.length;
      document.getElementById("net_total").innerHTML = getNetTotal();
      if (cart.length == 0) {
        document.getElementById("proceed-btn-Notdisabled").style.display =
          "none";
        document.getElementById("proceed-btn-disabled").style.display = "flex";
      }
    }
  }
}
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function checkout() {
  document.getElementById("loaderScreen").style.display = "flex";

  // window.location.href = "loader.html";
  setTimeout(() => {
    window.location.href = "checkout.html";
  }, 2000);
}

function payment() {
  var all_filled = true;
  var sub_elements = document.getElementById("checkout-form").getElementsByTagName("input");
  for(var i=0; i < sub_elements.length; i++) {
    var element = sub_elements[i];
    if (element.value == "") {
      all_filled = false;
      element.style.borderColor = "red";
    }
  }
  if (all_filled) {
    document.getElementById("success").style.display = "flex";
    setTimeout(() => {
      document.getElementById("success").style.display = "none";
      setTimeout(() => {
        document.getElementById("loaderScreen").style.display = "flex";
        setTimeout(() => {
          window.location.href = "productspage.html";
        }, 1000);
      }, 1000);
      // document.getElementById("loaderScreen").style.display = "flex";
      // window.location.href = "productspage.html";
    }, 2000);
  }
}



const textEl = document.getElementById('text');
const increaseBtn = document.getElementById('increase-btn');
const decreaseBtn = document.getElementById('decrease-btn');
// font size increasing
increaseBtn.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl).fontSize;
  fontSize = parseInt(fontSize) + 2 + 'px';
  textEl.style.fontSize = fontSize;
});
// font size decreasing
decreaseBtn.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl).fontSize;
  fontSize = parseInt(fontSize) - 2 + 'px';
  textEl.style.fontSize = fontSize;
});



const textEl2 = document.getElementById('text2');
const increaseBtn2 = document.getElementById('increase-btn2');
const decreaseBtn2 = document.getElementById('decrease-btn2');
// font size increasing
increaseBtn2.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl2).fontSize;
  fontSize = parseInt(fontSize) + 2 + 'px';
  textEl2.style.fontSize = fontSize;
});
// font size decreasing
decreaseBtn2.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl2).fontSize;
  fontSize = parseInt(fontSize) - 2 + 'px';
  textEl2.style.fontSize = fontSize;
});


const textEl3 = document.getElementById('text3');
const increaseBtn3 = document.getElementById('increase-btn3');
const decreaseBtn3 = document.getElementById('decrease-btn3');
// font size increasing
increaseBtn3.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl3).fontSize;
  fontSize = parseInt(fontSize) + 2 + 'px';
  textEl3.style.fontSize = fontSize;
});
// font size decreasing
decreaseBtn3.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl3).fontSize;
  fontSize = parseInt(fontSize) - 2 + 'px';
  textEl3.style.fontSize = fontSize;
});



const textEl4 = document.getElementById('text4');
const increaseBtn4 = document.getElementById('increase-btn4');
const decreaseBtn4 = document.getElementById('decrease-btn4');
// font size increasing
increaseBtn4.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl4).fontSize;
  fontSize = parseInt(fontSize) + 2 + 'px';
  textEl4.style.fontSize = fontSize;
});
// font size decreasing
decreaseBtn4.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl4).fontSize;
  fontSize = parseInt(fontSize) - 2 + 'px';
  textEl4.style.fontSize = fontSize;
});



const textEl5 = document.getElementById('text5');
const increaseBtn5 = document.getElementById('increase-btn5');
const decreaseBtn5 = document.getElementById('decrease-btn5');
// font size increasing
increaseBtn5.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl5).fontSize;
  fontSize = parseInt(fontSize) + 2 + 'px';
  textEl5.style.fontSize = fontSize;
});
// font size decreasing
decreaseBtn5.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl5).fontSize;
  fontSize = parseInt(fontSize) - 2 + 'px';
  textEl5.style.fontSize = fontSize;
});



const textEl6 = document.getElementById('text6');
const increaseBtn6 = document.getElementById('increase-btn6');
const decreaseBtn6 = document.getElementById('decrease-btn6');
// font size increasing
increaseBtn6.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl6).fontSize;
  fontSize = parseInt(fontSize) + 2 + 'px';
  textEl6.style.fontSize = fontSize;
});
// font size decreasing
decreaseBtn6.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl6).fontSize;
  fontSize = parseInt(fontSize) - 2 + 'px';
  textEl6.style.fontSize = fontSize;
});



const textEl7 = document.getElementById('text7');
const increaseBtn7 = document.getElementById('increase-btn7');
const decreaseBtn7 = document.getElementById('decrease-btn7');
// font size increasing
increaseBtn7.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl7).fontSize;
  fontSize = parseInt(fontSize) + 2 + 'px';
  textEl7.style.fontSize = fontSize;
});
// font size decreasing
decreaseBtn7.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl7).fontSize;
  fontSize = parseInt(fontSize) - 2 + 'px';
  textEl7.style.fontSize = fontSize;
});

const textEl8 = document.getElementById('text8');
const increaseBtn8 = document.getElementById('increase-btn8');
const decreaseBtn8 = document.getElementById('decrease-btn8');
// font size increasing
increaseBtn8.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl8).fontSize;
  fontSize = parseInt(fontSize) + 2 + 'px';
  textEl8.style.fontSize = fontSize;
});
// font size decreasing
decreaseBtn8.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl8).fontSize;
  fontSize = parseInt(fontSize) - 2 + 'px';
  textEl8.style.fontSize = fontSize;
});

const textEl9 = document.getElementById('text9');
const increaseBtn9 = document.getElementById('increase-btn9');
const decreaseBtn9 = document.getElementById('decrease-btn9');
// font size increasing
increaseBtn9.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl9).fontSize;
  fontSize = parseInt(fontSize) + 2 + 'px';
  textEl9.style.fontSize = fontSize;
});
// font size decreasing
decreaseBtn9.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl9).fontSize;
  fontSize = parseInt(fontSize) - 2 + 'px';
  textEl9.style.fontSize = fontSize;
});

const textEl10 = document.getElementById('text10');
const increaseBtn10 = document.getElementById('increase-btn10');
const decreaseBtn10 = document.getElementById('decrease-btn10');
// font size increasing
increaseBtn10.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl10).fontSize;
  fontSize = parseInt(fontSize) + 2 + 'px';
  textEl10.style.fontSize = fontSize;
});
// font size decreasing
decreaseBtn10.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl10).fontSize;
  fontSize = parseInt(fontSize) - 2 + 'px';
  textEl10.style.fontSize = fontSize;
});


const textEl11 = document.getElementById('text11');
const increaseBtn11 = document.getElementById('increase-btn11');
const decreaseBtn11 = document.getElementById('decrease-btn11');
// font size increasing
increaseBtn11.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl11).fontSize;
  fontSize = parseInt(fontSize) + 2 + 'px';
  textEl11.style.fontSize = fontSize;
});
// font size decreasing
decreaseBtn11.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl11).fontSize;
  fontSize = parseInt(fontSize) - 2 + 'px';
  textEl11.style.fontSize = fontSize;
});


const textEl12 = document.getElementById('text12');
const increaseBtn12 = document.getElementById('increase-btn12');
const decreaseBtn12 = document.getElementById('decrease-btn12');
// font size increasing
increaseBtn12.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl12).fontSize;
  fontSize = parseInt(fontSize) + 2 + 'px';
  textEl12.style.fontSize = fontSize;
});
// font size decreasing
decreaseBtn12.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl12).fontSize;
  fontSize = parseInt(fontSize) - 2 + 'px';
  textEl12.style.fontSize = fontSize;
});

const textEl13 = document.getElementById('text13');
const increaseBtn13 = document.getElementById('increase-btn13');
const decreaseBtn13 = document.getElementById('decrease-btn13');
// font size increasing
increaseBtn13.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl13).fontSize;
  fontSize = parseInt(fontSize) + 2 + 'px';
  textEl13.style.fontSize = fontSize;
});
// font size decreasing
decreaseBtn13.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl13).fontSize;
  fontSize = parseInt(fontSize) - 2 + 'px';
  textEl13.style.fontSize = fontSize;
});

const textEl14 = document.getElementById('text14');
const increaseBtn14 = document.getElementById('increase-btn14');
const decreaseBtn14 = document.getElementById('decrease-btn14');
// font size increasing
increaseBtn14.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl14).fontSize;
  fontSize = parseInt(fontSize) + 2 + 'px';
  textEl14.style.fontSize = fontSize;
});
// font size decreasing
decreaseBtn14.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl14).fontSize;
  fontSize = parseInt(fontSize) - 2 + 'px';
  textEl14.style.fontSize = fontSize;
});

const textEl15 = document.getElementById('text15');
const increaseBtn15 = document.getElementById('increase-btn15');
const decreaseBtn15 = document.getElementById('decrease-btn15');
// font size increasing
increaseBtn15.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl15).fontSize;
  fontSize = parseInt(fontSize) + 2 + 'px';
  textEl15.style.fontSize = fontSize;
});
// font size decreasing
decreaseBtn15.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl15).fontSize;
  fontSize = parseInt(fontSize) - 2 + 'px';
  textEl15.style.fontSize = fontSize;
});


const textEl16 = document.getElementById('text16');
const increaseBtn16 = document.getElementById('increase-btn16');
const decreaseBtn16 = document.getElementById('decrease-btn16');
// font size increasing
increaseBtn16.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl16).fontSize;
  fontSize = parseInt(fontSize) + 2 + 'px';
  textEl16.style.fontSize = fontSize;
});
// font size decreasing
decreaseBtn16.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl16).fontSize;
  fontSize = parseInt(fontSize) - 2 + 'px';
  textEl16.style.fontSize = fontSize;
});

const textEl17 = document.getElementById('text17');
const increaseBtn17 = document.getElementById('increase-btn17');
const decreaseBtn17 = document.getElementById('decrease-btn17');
// font size increasing
increaseBtn17.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl17).fontSize;
  fontSize = parseInt(fontSize) + 2 + 'px';
  textEl17.style.fontSize = fontSize;
});
// font size decreasing
decreaseBtn17.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl17).fontSize;
  fontSize = parseInt(fontSize) - 2 + 'px';
  textEl17.style.fontSize = fontSize;
});

const textEl18 = document.getElementById('text18');
const increaseBtn18 = document.getElementById('increase-btn18');
const decreaseBtn18 = document.getElementById('decrease-btn18');
// font size increasing
increaseBtn18.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl18).fontSize;
  fontSize = parseInt(fontSize) + 2 + 'px';
  textEl18.style.fontSize = fontSize;
});
// font size decreasing
decreaseBtn18.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl18).fontSize;
  fontSize = parseInt(fontSize) - 2 + 'px';
  textEl18.style.fontSize = fontSize;
});

const textEl19 = document.getElementById('text19');
const increaseBtn19 = document.getElementById('increase-btn19');
const decreaseBtn19 = document.getElementById('decrease-btn19');
// font size increasing
increaseBtn19.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl19).fontSize;
  fontSize = parseInt(fontSize) + 2 + 'px';
  textEl19.style.fontSize = fontSize;
});
// font size decreasing
decreaseBtn19.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl19).fontSize;
  fontSize = parseInt(fontSize) - 2 + 'px';
  textEl19.style.fontSize = fontSize;
});


// font size increasing
increaseBtn19.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl19).fontSize;
  fontSize = parseInt(fontSize) + 2 + 'px';
  textEl19.style.fontSize = fontSize;
});
// font size decreasing
decreaseBtn19.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl19).fontSize;
  fontSize = parseInt(fontSize) - 2 + 'px';
  textEl19.style.fontSize = fontSize;
});


const textEl20 = document.getElementById('text20');
const increaseBtn20 = document.getElementById('increase-btn20');
const decreaseBtn20 = document.getElementById('decrease-btn20');
// font size increasing
increaseBtn20.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl20).fontSize;
  fontSize = parseInt(fontSize) + 2 + 'px';
  textEl20.style.fontSize = fontSize;
});
// font size decreasing
decreaseBtn20.addEventListener('click', () => {
  let fontSize = window.getComputedStyle(textEl20).fontSize;
  fontSize = parseInt(fontSize) - 2 + 'px';
  textEl20.style.fontSize = fontSize;
});