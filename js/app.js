let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productCategory = document.getElementById("productCategory");
let productDesc = document.getElementById("productDesc");
let addButton = document.getElementById("addButton");
let tBody = document.getElementById("tBody");
let searchInput = document.getElementById("search");
let productsArr = [];
let index;
let update = false;
let productNameRegex = /^[a-zA-Z][a-zA-Z\d +]{1,20}$/;
let productPriceRegex = /^[1-9][\d]{3,7}$/;
let productCategoryRegex = /^[a-z]{1,12}$/i;
let productDescRegex = /^[\w ]+$/;
if (localStorage.getItem("productsArr") != null) {
  productsArr = JSON.parse(localStorage.getItem("productsArr"));
  displayProduct();
}
function addProduct() {
  if (
    productNameRegex.test(productName.value) &&
    productPriceRegex.test(productPrice.value) &&
    productCategoryRegex.test(productCategory.value) &&
    productDescRegex.test(productDesc.value)
  ) {
    let obj = {
      proName: productName.value,
      proPrice: productPrice.value,
      proCategory: productCategory.value,
      proDesc: productDesc.value,
    };
    if (update) {
      addButton.innerHTML = "Add Product";
      productsArr.splice(index, 1, obj);
      update = false;
    } else {
      productsArr.push(obj);
    }

    localStorage.setItem("productsArr", JSON.stringify(productsArr));
    displayProduct();
    clearInputs();
  } else {
    Swal.fire({
      title: "Error!",
      text: `There is an invalid, Please try again`,
      icon: "error",
      confirmButtonText: "Try again",
    });
  }
}
function clearInputs() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDesc.value = "";
}
function displayProduct() {
  tBody.innerHTML = "";
  for (let i = 0; i < productsArr.length; i++) {
    if (
      productsArr[i].proName
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    ) {
      tBody.innerHTML += `
      <tr>
        <td>${i}</td>
        <td>${productsArr[i].proName}</td>
        <td>${productsArr[i].proPrice}</td>
        <td>${productsArr[i].proCategory}</td>
        <td>${productsArr[i].proDesc}</td>
        <td><button onclick="updateProduct(${i})" type="button" class="btn btn-outline-warning">Update</button></td>
        <td><button onclick="deleteProduct(${i})" type="button" class="btn btn-outline-danger">Delete</button></td>
      </tr>
    `;
    }
  }
}
function deleteProduct(productIndex) {
  productsArr.splice(productIndex, 1);
  localStorage.setItem("productsArr", JSON.stringify(productsArr));
  displayProduct();
}
function updateProduct(productIndex) {
  index = productIndex;
  productName.value = productsArr[productIndex].proName;
  productPrice.value = productsArr[productIndex].proPrice;
  productCategory.value = productsArr[productIndex].proCategory;
  productDesc.value = productsArr[productIndex].proDesc;
  addButton.innerHTML = "Update The Product";
  update = true;
}
