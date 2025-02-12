# 📂 Application de Gestion des Archives

## 📝 Introduction  
Bienvenue dans **l’Application de Gestion des Archives**, une solution conçue pour faciliter l'organisation, la consultation et la gestion des archives d’un établissement.  

### 🎯 **Objectifs**  
✅ Permettre aux **chefs de département** d’accéder aux archives de leur département.  
✅ Offrir aux **super utilisateurs** un accès global et la gestion des utilisateurs.  
✅ Ajouter, rechercher et **trier les archives** par **Type, Département et Auteur**.  
✅ Sécuriser l’accès avec gestion des mots de passe.  

---

## 🖥️ **Aperçu de l’Application**  

### 🔐 **Page de Connexion**  
![Screenshot 2025-02-11 232606](https://github.com/user-attachments/assets/221cfe3e-ae29-4b02-8b0e-3e5488df05f0)



### 🏠 **Page Principale**  
![Screenshot 2025-02-11 232654](https://github.com/user-attachments/assets/ebc3bf54-ffff-4ee7-b8c2-ea535832bf62)

 

### ➕ **Ajout d’un Utilisateur**  
![Screenshot 2025-02-11 232751](https://github.com/user-attachments/assets/81844531-7034-4d88-aec2-38c6853e6446)


### 📄 **Ajout d’une Archive**  
  ![Screenshot 2025-02-11 232723](https://github.com/user-attachments/assets/f55dc5cd-dbb4-47b5-bc14-dd9a91f0190c)


### 🔑 **Changement de Mot de Passe** 
![Screenshot 2025-02-12 114259](https://github.com/user-attachments/assets/6605c0f9-d8dc-4b01-8c8c-140dcd1b050f)



---

## ⚙️ **Technologies Utilisées**  
🚀 **Backend** :  Node.js (Express)  
🎨 **Frontend** : React.js  
🗄 **Base de données** : mongodb     

---

## 🔧 **Installation & Configuration**  

### 📌 **Prérequis**  
- **Node.js **  
- **Git**  
- **Une base de données** mongodb 

  ### 📥 **Cloner le projet**  
  ```bash
  git clone https://github.com/votre-repo/gestion-archives.git
  cd gestion-archives
  npm i
### **take care to look if the version of node you are using is compatible**


  ###🚀 **  Lancer l’application **
  Backend :
  
  `cd backend`
  `node index.js`


Frontend :
`npm start`  

#❗ Création du Premier Utilisateur<br>
⚠️ Aucun utilisateur n'est créé par défaut dans la base de données.<br>
➡ Après avoir lancé l’application, vous devez créer un premier utilisateur via Postman.

#🔹 Étapes :
1️⃣ Ouvrir Postman ou un autre client API<br>
2️⃣ Effectuer une requête POST vers l’endpoint d’inscription :<br>


![Screenshot 2025-02-12 114526](https://github.com/user-attachments/assets/dea7ac5b-8fc7-463c-b410-9478a4b25a77)

