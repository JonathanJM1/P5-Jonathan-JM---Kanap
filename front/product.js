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
    if (quantity === "" || quantity < 1) {
        alert("Veuillez saisir une quantité valide")
        return
    }
// Créer un tableau pour stocker les produits ajoutés au panier
let addLocalStorage = []

// Vérifier si des produits ont déjà été ajoutés au panier
if(localStorage.getItem("addToCart") !== null){
// Si oui, récupérer les produits existants
    addLocalStorage = JSON.parse(localStorage.getItem("addToCart"))
// Ajouter le nouveau produit au tableau
    addLocalStorage.push(addToCart)
// Enregistrer le tableau dans le stockage local
    localStorage.setItem("addToCart", JSON.stringify(addLocalStorage))
} else {
    addLocalStorage.push(addProduct)
    localStorage.setItem("addToCart", JSON.stringify(addLocalStorage))
}
// Alerte pour indiquer que le produit a été ajouté au panier
    alert("Le produit a été ajouté au panier")
})
