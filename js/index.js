//* HTML Elements
let imputName = document.getElementById("name");
let imputPrice = document.getElementById("price");
let imputDescription = document.getElementById("description");
let imputCategory = document.getElementById("cat");
let myImage = document.getElementById("imgInput");

let rowData = document.getElementById("rowData");
let btnSend = document.getElementById("btnSend");
let btnUpdate = document.getElementById("btnUpdate");

//* App Variables
let products = []; // create array of same type (object)

//* Functions

if (localStorage.getItem("products")) { // if my data exist in local storage then return to based
  products = JSON.parse(localStorage.getItem("products")); // return to based (array)
  showData(products);
}

function addElement() { // add element to array if user click on send

  var product = { // create object to store data every time user click on send
    name: imputName.value,
    price: imputPrice.value,
    description: imputDescription.value,
    category: imputCategory.value,
    img:"images/"+myImage?.files[0]?.name
  };

  
  products.push(product);
  clearInput();
  showData(products);
  console.log(products);
  
  localStorage.setItem("products", JSON.stringify(products)); // return to string becouse local storage only accept string
}

function clearInput() { // clear input when user click on send
  imputName.value = "";
  imputPrice.value = "";
  imputDescription.value = "";
  imputCategory.value = "";
  myImage.value = "";
}

function showData(arr) { // show data in table 
  let box = "";
  for (var i = 0; i < arr.length; i++) {
    box += `
    <div class="col-md-4 ">
          <div class="card p-3 bg-light rounded shadow-lg">
            <div class="card-image">
            <img src="" alt="">
            </div>
            <div class="text-center mb-3" style="height:200px;"><img src="${arr[i].img}" class="w-100 h-100 object-fit-contain" alt="Not Found "></div>
            <h1 class="h4" >Product Name: <span class="text-danger">${arr[i].name}</span></ class="h4">
            <h2 class="h4">Product Price: <span class="text-danger">${arr[i].price} EGP</span></h2>
            <h4 class="h4">Product Category: <span class="text-danger">${arr[i].category}</span></h4>
            <h3 class="h4"> Description: <p class="text-danger " >${arr[i].description}</p></h3>
            <div class="btns d-flex justify-content-center mt-2 ">
              <div  onclick="setDataToForm(${i})" id="delBtn" class="btn btn-outline-warning p-2 me-2">Update</div>
              <div onclick="deleteElement(${i})"  id="updBtn" class="btn btn-outline-danger p-2 ">Remove</div> 
            </div>
          </div>
        </div>
    `;
    // i save in html
  }

  rowData.innerHTML = box; // inner one used better than every time called her
}

function deleteElement(index) { // delete element from array when user click on remove
  products.splice(index, 1);
  showData(products);
  localStorage.setItem("products", JSON.stringify(products)); //return to string
}


let current = null; // because i can not access index of setDataToForm
function setDataToForm(index) { // set data to form
  current = index;
  imputName.value = products[index].name;
  imputPrice.value = products[index].price;
  imputDescription.value = products[index].description;
  imputCategory.value = products[index].category;
  btnSend.classList.add("d-none");
  btnUpdate.classList.replace("d-none", "d-block");
}

function updateElement() { // update element 
  products[current].name = imputName.value;
  products[current].price = imputPrice.value;
  products[current].description = imputDescription.value;
  products[current].category = imputCategory.value;
  localStorage.setItem("products", JSON.stringify(products));
  clearInput();
  showData(products);
  btnSend.classList.remove("d-none");
  btnUpdate.classList.replace("d-block", "d-none");
}


function searchForProducts(searchKey){ // search for product by name 
  var res=[];
  for (let i = 0; i < products.length; i++) {
    if(products[i].name.toLowerCase().includes(searchKey.toLowerCase())){
      

      res.push(products[i]);

    }
  }
  showData(res);
}


//* Main in all Edit
// set New Product in array
// Display it in table
// Update LocalStorage