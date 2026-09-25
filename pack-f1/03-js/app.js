/* =========================================================================
   MAILLON 3 — JAVASCRIPT : l'interface
   Les données arrivent du maillon Java, dans donnees.js :
     PILOTES = [{nom, ecurie, points, victoires}, ...]
     ECURIES = [{nom, points, victoires}, ...]
   Complétez les trois fonctions, puis ouvrez index.html dans le navigateur.
   ========================================================================= */

// 1. trierParPoints(liste) : renvoie une NOUVELLE liste triée par points
//    DÉCROISSANTS. La liste reçue ne doit pas être modifiée.
//    À points égaux, celui qui a le plus de victoires passe devant.
function trierParPoints(liste) {
  const copie = [...liste]; // nouvelle liste copier

  copie.sort((a, b) => {
    if (a.points !== b.points) {
      return b.points - a.points; // décroissant
    }
    return b.victoires - a.victoires; // départage au nombre de victoire
  });
  return copie;
}

// 2. remplirTableau(idCorps, liste) : remplit le <tbody> dont l'id est fourni.
//    Une ligne <tr> par entrée, avec dans l'ordre les cellules <td> :
//      rang (1, 2, 3...) | nom | écurie (chaîne vide si absente) | points | victoires
//    Chaque <tr> porte l'attribut data-nom. Un nouvel appel REMPLACE le contenu.
function remplirTableau(idCorps, liste) {
  const corps = document.getElementById(idCorps); // recupère l'element en paramète dans le html
  corps.innerHTML = ""; // on vide l'ancien contenu

  liste.forEach((entree, i) => {
    const ligne = document.createElement("tr");
    ligne.dataset.nom = entree.nom; // crée l'attribut data-nom

    const valeurs = [
      i + 1, // rang
      entree.nom,
      entree.ecurie ?? "", // vide si pas d'écurie
      entree.points,
      entree.victoires,
    ];

    valeurs.forEach((valeur) => {
      // complète le tableau avec ligne ( tr ) et celule (td)
      const cellule = document.createElement("td");
      cellule.textContent = valeur;
      ligne.appendChild(cellule);
    });

    corps.appendChild(ligne); // ajoute la ligne dans le html
  });
}

// 3. marquerPodium(idCorps) : ajoute la classe CSS "podium" aux TROIS PREMIÈRES
//    lignes du tableau, et la retire de toutes les autres.
function marquerPodium(idCorps) {
  const lignes = document.querySelectorAll("#" + idCorps + " tr"); // toutes les lignes du tab

  lignes.forEach((ligne, index) => {
    // pour les 3 première il ajoute la classe, sinon il la retire
    ligne.classList.toggle("podium", index < 3);
  });
}

/* --- FOURNI — NE PAS MODIFIER : affichage de la saison ------------------- */
function afficherSaison() {
  if (typeof PILOTES === "undefined") {
    return;
  }
  remplirTableau("corps-pilotes", trierParPoints(PILOTES));
  marquerPodium("corps-pilotes");
  remplirTableau("corps-ecuries", trierParPoints(ECURIES));
  marquerPodium("corps-ecuries");
}
