# Générateur de Carte Étudiant

## Description

Le **Générateur de Carte Étudiant** est une application web simple et intuitive qui permet aux étudiants de créer leur carte étudiante numérique en quelques clics. Le projet génère une carte au format image (PNG) contenant les informations personnelles et une photo de l'étudiant, prête à être téléchargée.

## Fonctionnalités

- Formulaire d'entrée pour les informations personnelles (prénom, nom, filière, CIN, code Massar, email, téléphone).
    
- Ajout de la photo de profil de l'étudiant via un champ de téléchargement.
    
- Génération en temps réel de la carte étudiante avec style professionnel.
    
- Mode clair / mode sombre pour une meilleure lisibilité.
    
- Téléchargement de la carte au format PNG grâce à la librairie [dom-to-image](https://github.com/tsayen/dom-to-image).
    

## Technologies

- **HTML5**
    
- **CSS3** (avec variables CSS et animations)
    
- **JavaScript** (ES6+)
    
- **dom-to-image** pour la génération d'images côté client
    

## Structure du projet

```plaintext
index.html           # Point d'entrée de l'application
styles.css          # Styles et animations directement dans le head
script.js       # Gestion de l'interaction et du mode sombre
README.md             # Documentation du projet
student-card-background.jpg  # Image de fond de la carte étudiante (optionnel)
```

## Installation

1. Clonez ce dépôt :
    

git clone [https://github.com/votre-utilisateur/generateur-carte-etudiant.git](https://github.com/votre-utilisateur/generateur-carte-etudiant.git) cd generateur-carte-etudiant

```
2. Ouvrez simplement le fichier `index.html` dans votre navigateur (aucun serveur requis).

> **Astuce** : Vous pouvez également servir le projet depuis un serveur local (ex. avec `Live Server` de VS Code) pour de meilleures performances.

## Utilisation

1. Lancez l'application dans votre navigateur.
2. Cliquez sur le bouton **Créer une Carte Étudiant**.
3. Remplissez le formulaire avec vos informations : prénom, nom, filière, CIN, code Massar, email, téléphone.
4. Sélectionnez votre photo de profil.
5. Validez pour générer la carte.
6. Cliquez sur **Télécharger votre Carte** pour sauvegarder l'image PNG.

![Exemple de carte étudiante](student-card-screenshot.png)

## Mode Sombre / Mode Clair

- Un bouton placé dans la barre de navigation permet de basculer entre le mode clair et le mode sombre.
- Le texte et le fond s’adaptent automatiquement pour offrir un contraste optimal.
- Le libellé du bouton change selon le mode actif (`Switch to Night` / `Switch to Day`).

## Personnalisation

- **Style** : Modifiez les variables CSS dans `:root` pour changer les couleurs du thème.
- **Logo** : Remplacez le texte `UNIVERSITÉ FPT` par votre propre logo ou nom d’institution.
- **Validité** : Ajustez la date de validité de la carte dans la section `.valid-date` du HTML.
- **Background** : Changez l’image `student-card-background.jpg` pour personnaliser l’arrière-plan de la carte.

## Contribution

Les contributions sont les bienvenues ! Pour proposer des améliorations ou signaler un bug :

1. Forkez ce dépôt.
2. Créez une branche (`git checkout -b feature/nouvelle-fonctionnalite`).
3. Commitez vos modifications (`git commit -m "Ajout d'une nouvelle fonctionnalité"`).
4. Poussez la branche (`git push origin feature/nouvelle-fonctionnalite`).
5. Ouvrez une Pull Request.

## Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Contact

- **Email** : elfadiliyacine@gmail.com
- **Projet GitHub** : https://github.com/yacine20elfadili

*Généré par Mohamed Yacine Elfadili*
```