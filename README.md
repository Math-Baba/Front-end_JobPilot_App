# JobPilot (Front-end) - Gestion des Candidatures
JobPilot est une application web destiné à faciliter la gestion et le suivi des candidatures. Cette application est un prototype et est uniquement tourné vers les métiers de l'IT. 
Ici, la partie front end a été développé en React, Vite, Typescript et tailwind css. La partie back-end est disponible plus bas.

## Stack technique
* Vite: 5.4.5
* React: 18.3.1
* Typescript: 5.5.3
* Tailwind CSS: 3.4.1

## Prérequis
* Installer Node.js (version > 18.0.0)
* Installer npm
  
## Installation

1. Clôner le dépôt
```bash
git clone https://github.com/Math-Baba/Front-end_JobPilot_App.git
cd Front-end_JobPilot_App
```

2. Installer les dépendances
```bash
npm install
```

3. Lancer l'application
```bash
npm run dev
```

## Fonctionnalités principales 
* Recherche et filtrage de candidatures
* Formulaire dynamique pour créer ou modifier des candidatures
* Suppression, visualisation détaillée d'une candidature
* Affichage statistique des candidatures
* Système de Pagination 
* Système d'état centralisé via useAppLogic
* Communication avec une API backend via Axios
* Intégration d'un chatbot IA avec n8n

## Notes
⚠️Dans le fichier data.service.ts, changer le port 5555 en fonction du port par défaut utiliser par le backend⚠️<br>
⚠️ Le **workflow n8n n’est pas fourni** dans ce dépôt. Il s’agit d’un modèle expérimental, non finalisé, et il ne sera pas publié.⚠️

Lien vers le backend: [Backend JobPilot](https://github.com/Math-Baba/Back-end_JobPilot_App.git)<br>
Liens vers la démonstration Youtube du chatbot: [JobPilot AI: Démonstration](https://youtu.be/hbEBSmX3e1c)

# Auteur
**Math-Baba** - [GitHub](https://github.com/Math-Baba)
