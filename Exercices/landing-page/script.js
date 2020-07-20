// Consignes exercices globaux:

// naviguez jusqu'à votre dossier: exercices landing page, lisez les consignes relatives à l'intégration de votre maquette. Ensuite dans le fichier script.js réalisez les consignes suivantes:

// 1. Définissez une nouvelle variable "myHeaders", contenant un objet global Headers, configuré avec la paire de clé/valeur suivante: "Content-Type": "application/json"
let myHeaders = new Headers({ 'Content-Type': 'application/json' });
// 2. Créez un formulaire dans votre index.html. Utilisez les balises "form", "label", "input", "button", passez comme ID "my-form" à votre balise form, ensuite pour les attributs "id" de vos input il est OBLIGATOIRE d'utiliser les clés attendues par l'API. C'est à dire une clé "auteur" et une clé "comment". Un de vos deux input aura donc comme valeur à l'attribut "id": "auteur", et le second "id":"comment". Pour finir, donnez comme ID "submit-btn" à votre bouton. Attention pour le bouton, il faut le sortir du formulaire sinon il rafraichit automatiquement la page.

//3. Vous disposez de vos headers, et de votre formulaire. Maintenant vous allez créer une écoute d'évenement sur le bouton ayant pour id "submit-btn".
document.getElementById('submit-button').addEventListener('click', () => {
  //4. A l'intérieur de cette écoute, vous allez créer une variable "formAuteurValue", une variable formCommentValue et aller pointer vers les inputs qui ont comme id auteur et comment, ensuite récupérer la valeur de ces input et stockez là dans les variables que vous venez de créer
  let auteurValue = document.getElementById('auteur').value;
  let commentValue = document.getElementById('comment').value;

  //5. Créez une variable "body" de type objet. Dans cette variable passé comme clé: auteur et comment, ensuite attribuez les valeurs de formAuteurValue et formCommentValue aux clés correspondantes

  let body = {
    "auteur": auteurValue,
    "comment": commentValue,
  };
  // vérifier que j'ai récupéré les données souhaitées
  console.log(body);
  console.log(JSON.stringify(body));

  //6. Maintenant que nous possédons tout le nécessaire à la rédaction de la méthode fetch(), lançons nous! Créez une méthode fetch qui utilise cette url : https://quotes-light-api.herokuapp.com/api/comments/
  fetch('https://quotes-light-api.herokuapp.com/api/comments/', {
    //7. Passez en deuxième argument un objet contenant la méthode, les headers et le body

    method: 'POST',
    headers: myHeaders,
    //8. Pour construire le body: utilisez la méthode JSON.stringify, passez lui la variable "myform" qui récupère les valeurs de votre formulaire
    body: JSON.stringify(body),
  }).then(res => console.log('hello'));
});

//9. Testez votre code, ouvrez votre index.html dans votre navigateur, ouvrez l'inspecteur d'élément, allez dans l'onglet "console". Maintenant, remplissez votre formulaire avec les valeurs demandées (l'auteur, et le commentaire). Clickez sur le bouton submit, une erreur est elle renvoyée? Si non allez dans l'onglet network et vérifier le statut de votre requête, si il est défini sur 200 c'est que votre requête a fonctionné!

//10. Maintenant, créez une méthode fetch qui va aller récupérer toutes les données de l'API, comme la semaine dernière. Elle va vous retourner un tableau d'objets. Pour chaque élément de ce tableau, créez dynamiquement une div pour afficher le commentaire dans votre index.html
let getComment = () => {
  fetch('https://quotes-light-api.herokuapp.com/api/comments/', {
    method: 'GET',
  })// chercher info de mon API
    .then(response => {
      return response.json();// json vous retourne seulement vos besoins dans API
    })
    .then(response => {
      console.log(response);// response peut être remplacé par ce que vous voulez
      let data = response;// recupérer var de reponse
      data.forEach(element => { // passer sur le tableau (=data) courant et performer une opération
        let newDivAuteur = document.createElement('div');// créer une div
        let newDivComment = document.createElement('div');
        let newContentAuteur = document.createTextNode(element.auteur);//créer du contenu (valeur) de div
        let newContentComment = document.createTextNode(element.comment);
        let currentDiv = document.getElementById('balise');// balise=id de la div de repère (fantôme)
        document.body.insertBefore(divAuteur, currentDiv.nextElementSibling);//inserer d'abord l'elmt courant avant la div créée
        document.body.insertBefore(divComment, currentDiv.nextElementSibling);
        divAuteur.setAttribute("class", "divAuteur")//ajout d'un attribut pour pointer vers l'elmt HTML
        divComment.setAttribute("class", "divComment")
        newDivAuteur.appendChild(newContentAuteur); /* greffer le contenu à l'auteur correspondant*/
        newDivComment.appendChild(newContentComment);
        currentDiv.appendChild(newDivAuteur);// préciser à quel endroit de mon HTML je veux insérer ce contenu
        currentDiv.appendChild(newDivComment);
      });
    });
};
getComment();// appeler la fonction js pour qu'il génére automatiquement les commentaire

