// Récupérer l'ID du produit à partir des paramètres de l'URL
const params = new URL (document.location).searchParams
const id = params.get("id")

// Fonction pour récupérer les données du produit depuis l'API
const getKanap = () => { 

// Créer l'URL de l'API à appeler pour récupérer les données du produit
 const url = `http://localhost:3000/api/products/${id}`

// Appeler l'API et traiter les données reçues
 fetch(url)
 .then (function(res) {
     return res.json()
 })
 .then (function(data) {
     console.log(data)

// Afficher le nom du produit
     const addTitle = (document.getElementById("title").innerHTML= data.name)

// Afficher le prix du produit 
     const addPrice = (document.getElementById("price").innerHTML= data.price)

// Créer une image du produit et l'affiche 
     const addImg = document.createElement("img")
     document.querySelector(".item__img").appendChild(addImg)
     addImg.setAttribute("src", `${data.imageUrl}`)

// Met une description du produit 
     const addDescription = (document.getElementById("description").innerHTML= data.description)

// Liste déroulante pour les couleurs et afficher les options disponibles
     const addOption = document.getElementById("colors")
// Parcourir les couleurs disponibles pour le produit
     for (color in data.colors) {
         addOption.innerHTML += `<option value="${data.colors[color]}">${data.colors[color]}</option>` // Ajouter des couleurs
     }
 })
}

// Récupérer le bouton "Ajouter au panier"
const addToCart = document.getElementById("addToCart")

// Ajouter le clic sur le bouton "Ajouter au panier"
addToCart.addEventListener("click", () =>{

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
// Ajouter le produit au panier
     const addProduct = {
     quantity : quantity,
     color : color,
     id : id
 }

// Créer un tableau pour stocker les produits ajoutés au panier
let addLocalStorage = []

// Vérifier si des produits ont déjà été ajoutés au panier
if(localStorage.getItem("addToCart") !== null){
// Si oui, récupérer les produits existants
 addLocalStorage = JSON.parse(localStorage.getItem("addToCart"))
}

// Ajouter le nouveau produit au tableau
addLocalStorage.push(addProduct)

// Enregistrer le tableau dans le stockage local
localStorage.setItem("addToCart", JSON.stringify(addLocalStorage))

// Alerte pour indiquer que le produit a été ajouté au panier
 alert("Le produit a été ajouté au panier")

})

getKanap()
