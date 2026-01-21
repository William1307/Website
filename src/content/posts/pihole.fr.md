---
id: 1
title: "Pi-hole + Unbound : Le DNS Ultime sur Raspberry Pi 5"
date: "Dec 08, 2025"
readTime: "10 min"
tag: "Network"
---

Aujourd'hui, on s'attaque à un gros morceau : reprendre le contrôle total de nos requêtes internet. On va installer **Pi-hole** (le bloqueur de pub) couplé à **Unbound** (un résolveur DNS récursif). Le tout sur mon Raspberry Pi 5 8GB. Spoiler : c'est totalement overkill (un Pi Zero suffirait), mais on adore ça.

### Pourquoi on fait ça ? (La minute théorie)

#### 1. C'est quoi un DNS ?
Imaginez que le DNS (Domain Name System), c'est l'annuaire téléphonique d'Internet. Quand vous tapez `google.com`, votre ordi ne sait pas où c'est. Il demande à un serveur DNS : "Eh, c'est quoi l'adresse IP de Google ?". Le serveur répond `142.250.xxx.xxx`, et hop, la page s'affiche.

#### 2. Pourquoi un DNS "Récursif" ?
Par défaut, votre box internet utilise les DNS de votre opérateur (ou Google 8.8.8.8). En gros, vous demandez à un intermédiaire de chercher pour vous. Il sait donc tout ce que vous visitez.

Avec **Unbound** en mode récursif, on vire l'intermédiaire. Votre Raspberry Pi va discuter directement avec les "Root Servers" (les grands patrons d'Internet).

* **Confidentialité :** Personne (ni Google, ni votre FAI) ne voit vos requêtes DNS.
* **Sécurité :** On utilise DNSSEC pour valider que les réponses sont authentiques.
* **Zéro Pub :** Pi-hole filtre les requêtes avant même qu'elles ne partent.

---

### Étape 1 : Préparer la bête
On est sur un Raspberry Pi 5. Assurez-vous d'avoir Raspberry Pi OS installé et à jour. On ouvre le terminal (ou on se connecte en SSH) et on lance la classique mise à jour :

```bash
sudo apt update && sudo apt upgrade -y
```

### Étape 2 : Installer Pi-hole
L'installation de Pi-hole est automatisée. C'est le "Network-wide Ad Blocking" qui va protéger tous les appareils de la maison.

```bash
curl -sSL https://install.pi-hole.net | bash
```

### Étape 3 : Installer Unbound
C'est là que la magie opère. On installe Unbound pour ne plus dépendre des DNS de Google.

```bash
sudo apt install unbound
```

> Et voilà ! Votre Pi-hole interroge maintenant votre instance locale Unbound. C'est propre, c'est privé, et ça tourne nickel sur le Pi 5.
