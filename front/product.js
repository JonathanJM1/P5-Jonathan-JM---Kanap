// Récupérer l'ID du produit dans l'URL de la page
const params = new URL (document.location).searchParams;
const id = params.get("id");

// Créer l'URL de l'API à appeler pour récupérer les données du produit
const api = `http://localhost:3000/api/products/${id}`
  
// Appeler l'API et traiter les données reçues
fetch(api)
.then((res) => res.json())
.then((data) => {
        console.log(data)

// Afficher le nom du produit + prix 
  const addTitle = document.getElementById("title");
  const addPrice = document.getElementById("price");
  addTitle.textContent= data.name
  addPrice.textContent= data.price

// Créer une image du produit et l'affiche 
   const addImg = document.createElement("img");
   addImg.setAttribute('src',data.imageUrl);
   addImg.setAttribute('alt',data.altTxt);
   document.querySelector(".item__img").appendChild(addImg);

// Ajouter une description du produit 
   const addDescription = document.getElementById("description");
   addDescription.textContent= data.description

   const addColors = document.getElementById("colors");
   // console.log(data.colors);
// Parcourir les couleurs disponibles pour le produit
for ( const item of data.colors) {
   // console.log(item);
   const option = document.createElement("option")
   option.value = item 
   option.innerHTML = item;
   addColors.appendChild(option);
   }
})

// Récupérer le bouton "Ajouter au panier"
const addToCart = document.getElementById("addToCart");

// Ajouter le clic sur le bouton "Ajouter au panier"
addToCart.addEventListener("click", () =>{

// Ajouter le produit au panier
    const addProduct = {
        quantity : document.getElementById("quantity").value,
        color: document.getElementById("colors").value,
        id : id
    }

// Vérifier si une couleur a été sélectionnée avec une alerte
    const color = document.getElementById("colors").value
    if (color === "") {
        alert("Veuillez sélectionner une couleur")
        return
    }

// Vérifier si une quantité a été saisie avec une alerte
    const quantity = document.getElementById("quantity").value
    if (quantity <= 0 || quantity > 100) {
        alert("Veuillez saisir une quantité comprise entre 1 et 100")
        return
    }
// Récupérer les produits existants dans le panier
const addLocalStorage = JSON.parse(localStorage.getItem("addToCart")) || [];

// Trouver le produit existant dans le panier (s'il y en a un)
const existingProduct = addLocalStorage.findIndex(item => item.id === addProduct.id && item.color === addProduct.color);

// Ajouter le nouveau produit ou augmenter la quantité du produit existant
if (existingProduct !== -1) {
    const newQuantity = parseInt(addLocalStorage[existingProduct].quantity) + parseInt(addProduct.quantity);
    if (newQuantity > 100) {
        alert("La quantité totale ne doit pas dépasser 100");
        return;
    }
    addLocalStorage[existingProduct].quantity = newQuantity;
} else {
    if (addProduct.quantity > 100) {
        alert("La quantité totale ne doit pas dépasser 100");
        return;
    }
    addLocalStorage.push(addProduct);
}

// Enregistrer le tableau dans le stockage local
localStorage.setItem("addToCart", JSON.stringify(addLocalStorage));

// Alerte pour indiquer que le produit a été ajouté au panier
alert("Le produit a été ajouté au panier");
})
