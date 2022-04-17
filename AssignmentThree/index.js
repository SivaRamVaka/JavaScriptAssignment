function createProductPage(
    imageSrc,
    name,
    brand,
    price,
    description,
    img0,
    img1,
    img2,
    img3,
    img4,
    img5
  ) {
    // Product Image
    var productImg = document.getElementById("productImg");
    productImg.src = imageSrc;
  
    // Product Name
    var productName = document.getElementById("name");
    productName.innerHTML = name;
  
    // Product Barnd
    var productBrand = document.getElementById("brand");
    productBrand.innerHTML = brand;
  
    // Product Price
    var productPrice = document.getElementById("price");
    productPrice.innerHTML = price;
  
    // Product Description
    var productDescription = document.getElementById("description");
    productDescription.innerHTML = description;
  
    // Product Preview Image 0
    var photo0 = document.getElementById("img0");
    photo0.src = img0;
  
    // Product Preview Image 1
    var photo1 = document.getElementById("img1");
    photo1.src = img1;
  
    // Product Preview Image 2
    var photo2 = document.getElementById("img2");
    photo2.src = img2;
  
    // Product Preview Image 3
    var photo3 = document.getElementById("img3");
    photo3.src = img3;
  
    // Product Preview Image 4
    var photo4 = document.getElementById("img4");
    photo4.src = img4;
  
    // Product Preview Image 5
    var photo5 = document.getElementById("img5");
    photo5.src = img5;
  
    // ---------------- Change Preview Image OnClick -------
    function changeImage() {
      // Photo 0
      photo0.addEventListener("click", function() {
        productImg.src = img0;
      });
  
      // Photo 1
      photo1.addEventListener("click", function() {
        productImg.src = img1;
      });
      // Photo 2
      photo2.addEventListener("click", function() {
        productImg.src = img2;
      });
  
      // Photo 3
      photo3.addEventListener("click", function() {
        productImg.src = img3;
      });
  
      // Photo 4
      photo4.addEventListener("click", function() {
        productImg.src = img4;
      });
  
      // Photo 5
      photo5.addEventListener("click", function() {
        productImg.src = img5;
      });
  
      // Toggle Active Class
      $(document).on("click", ".previewImg img", function() {
        $(this)
          .addClass("active")
          .siblings()
          .removeClass("active");
      });
    }
    changeImage();
  }
  
  // ---------------- Insert Data into Local Storage > OnClick > Add To Cart Button -------
  
  var addToCartBtn = document.getElementById("add-to-cart");
  var cart = document.getElementById("cart-count");
  var myCartData = [];
  var cartIntialValue;
 
  if(localStorage.getItem('cart-count') == null) {
      localStorage.setItem('cart-count', '0');
  } else {
      var cartValue = localStorage.getItem('cart-count');
      localStorage.setItem('cart-count', cartValue);
  }
  
  
  // ---------------- Increase Cart Count -----------------------
  function cartCount() {
    if (window.localStorage.getItem("cart-count") === null) {
      cartIntialValue = 0;
    } else {
      cartIntialValue = JSON.parse(window.localStorage.getItem("cart-count"));
      cart.innerHTML = cartIntialValue;
    }
    var cartCurrentValue = cartIntialValue + 1;
    window.localStorage.setItem("cart-count", cartCurrentValue);
    cart.innerHTML = window.localStorage.getItem("cart-count");
  }
  cart.innerHTML = window.localStorage.getItem("cart-count");
  
  // ---------------- Add Data into List and then into Local Storage -----------------------
  
  function addDataIntoList(productData) {
    // If Local Storage Is Empty Then Set List To Empty
    if (window.localStorage.getItem("product-list") === null) {
      myCartData = [];
    }
    // If Local Storage Is Not Empty Then Set List To Value Of Local Storage
    else {
      myCartData = JSON.parse(window.localStorage.getItem("product-list"));
    }
  
    // If List Is Empty Then Push The Object In It
    if (myCartData.length === 0) {
      var myObj = {
        id: productData.id,
        title: productData.name,
        count: 1,
        price: productData.price,
        preview: productData.preview
      };
      myCartData.push(myObj);
    }
    // If List Is Not Empty Then
    else if (myCartData.length != 0) {
      var w = 0;
      // If Same Product Data == True Then List.Count++
      for (var i = 0; i < myCartData.length; i++) {
        if (myCartData[i].id == productData.id) {
          myCartData[i].count = parseInt(myCartData[i].count) + 1;
          w += 1;
        }
      }
      // Else Add New Data Into List
      if (w == 0) {
        var myObj = {
          id: productData.id,
          title: productData.name,
          count: 1,
          price: productData.price,
          preview: productData.preview
        };
        myCartData.push(myObj);
      }
    }
    // Store The List Into Local Storage
    window.localStorage.setItem("product-list", JSON.stringify(myCartData));
  }
  
  //------ Add-To-Cart-Btn Click Event Listner ------------------------
  
  addToCartBtn.addEventListener("click", function() {
    var productId = window.location.search.split("=")[1];
    var urlLink =
      "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + productId;
  
    function getDataForLocalStorage() {
      var http = new XMLHttpRequest();
      http.onreadystatechange = function() {
        if (this.readyState === 4) {
          if (this.status === 200) {
            var productData = JSON.parse(this.responseText);
            addDataIntoList(productData);
          }
        }
      };
      http.open("GET", urlLink, true);
      http.send();
    }
    cartCount();
    getDataForLocalStorage();
  });