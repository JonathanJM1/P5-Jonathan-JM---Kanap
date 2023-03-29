  // Récupérer les produits ajoutés au panier dans le stockage local 
  const productsInCart = JSON.parse(localStorage.getItem("addToCart")) || [];

  // Sélectionner l'élément du DOM où afficher les produits du panier
  const cartItemsContainer = document.getElementById("cart__items");

  // Fonction pour afficher les produits dans le panier
  function displayCartProducts(products) {
    // Réinitialiser l'affichage du panier
    // cartItemsContainer.innerHTML = "";

    // Afficher chaque produit ajouté au panier
    products.forEach(product => {
      const { id, color, quantity } = product;
      const productUrl = `http://localhost:3000/api/products/${id}`;

      // Appeler l'API pour récupérer les informations détaillées du produit
      fetch(productUrl)
        .then(res => res.json())
        .then(data => {
          // Créer la structure HTML pour afficher le produit dans le panier
          const cartProduct = document.createElement("article");
          cartProduct.classList.add("cart__item");
          cartProduct.dataset.productId = id;
          cartProduct.dataset.productColor = color;
          cartItemsContainer.appendChild(cartProduct);

          const cartProductImgContainer = document.createElement("div");
          cartProductImgContainer.classList.add("cart__item__img");
          cartProduct.appendChild(cartProductImgContainer);

          const cartProductImg = document.createElement("img");
          cartProductImg.src = data.imageUrl;
          cartProductImg.alt = data.altTxt;
          cartProductImgContainer.appendChild(cartProductImg);

          const cartProductContent = document.createElement("div");
          cartProductContent.classList.add("cart__item__content");
          cartProduct.appendChild(cartProductContent);

          const cartProductTitle = document.createElement("h2");
          cartProductTitle.classList.add("cart__item__title");
          cartProductTitle.textContent = data.name;
          cartProductContent.appendChild(cartProductTitle);

          const cartProductColor = document.createElement("p");
          cartProductColor.classList.add("cart__item__color");
          cartProductColor.textContent = `Couleur : ${color}`;
          cartProductContent.appendChild(cartProductColor);

          const cartProductQty = document.createElement("p");
          cartProductQty.classList.add("cart__item__quantity");
          cartProductQty.textContent = `Quantité : ${quantity}`;
          cartProductContent.appendChild(cartProductQty);

          const cartProductPrice = document.createElement("p");
          cartProductPrice.classList.add("cart__item__price");
          cartProductPrice.textContent = `${data.price} €`;
          cartProductContent.appendChild(cartProductPrice);

          // Quantité 
          const cartItemContentSettings = document.createElement("div");
          cartItemContentSettings.classList.add("cart__item__content__settings");
          cartProductContent.appendChild(cartItemContentSettings);

          const cartItemContentSettingsQuantity = document.createElement("div");
          cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
          cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

          const cartItemContentSettingsQuantityLabel = document.createElement("p");
          cartItemContentSettingsQuantityLabel.textContent = "Qté : ";
          cartItemContentSettingsQuantity.appendChild(cartItemContentSettingsQuantityLabel);

          const cartProductQtyInput = document.createElement("input");
          cartProductQtyInput.setAttribute("type", "number");
          cartProductQtyInput.classList.add("itemQuantity");
          cartProductQtyInput.setAttribute("name", "itemQuantity");
          cartProductQtyInput.setAttribute("min", "1");
          cartProductQtyInput.setAttribute("max", "100");
          cartProductQtyInput.setAttribute("value", "42");
          cartItemContentSettingsQuantity.appendChild(cartProductQtyInput);
          // fin quantité 

          // supprimer 
          const cartItemContentSettingsDelete = document.createElement("div");
          cartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");
          cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
          const cartItemContentSettingsDeleteLabel = document.createElement("p");
          cartItemContentSettingsDeleteLabel.textContent = "Supprimer";
          cartItemContentSettingsDeleteLabel.classList.add("deleteItem");
          cartItemContentSettingsDelete.appendChild(cartItemContentSettingsDeleteLabel);
        });
    });
    deleteItem();
  }

  // Appeler la fonction pour afficher les produits dans le panier
  displayCartProducts(productsInCart);

  function deleteItem(){
      const btnDelete = document.getElementsByClassName('deleteItem');
      
      console.log(btnDelete);
      btnDelete.forEach(element => {
        element.addEventListener("click", function (params) {
          console.log('test');
        });
      });


      
  }
