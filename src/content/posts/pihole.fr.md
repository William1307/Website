---
id: 1
title: "Pi-hole + Unbound : Le DNS Ultime sur Raspberry Pi 5"
date: "Dec 08, 2025"
readTime: "10 min"
tag: "Network"
---

![Pi-hole Banner](/Images/Pi_hole_article_banner.png)

Aujourd'hui, on s'attaque à un gros morceau : reprendre le contrôle total de nos requêtes internet. On va installer **Pi-hole** (un bloqueur de pub) couplé à **Unbound** (un résolveur DNS récursif). Le tout sur mon Raspberry Pi 5 8GB. Spoiler : c'est totalement overkill (un Pi Zero suffirait), mais on adore ça.

Je vous invite à aller sur le [site](https://pi-hole.net/) de Pihole si vous voulez en savoir plus sur cet outil génial.

### Pourquoi on fait ça ? (La minute théorie)

#### 0. Hein Pi-hole qui ?
Pi-hole cest ce qu'on appelle un `Network-wide Ad Blocker`, comprenez "Bloqueur de pub a l'échellle du réseau" il va filtrer le flux entrant du réseau ( les pages web, articles, etc.. ), il va udentifier les noms de domaines associés à des pubs et il va leur interdire l'accès, c'est comme le videur devant la boite de nuit, il va pas les laisser entrer.

Et ducoup tous les appareils de votre réseau en bénéficient : la télé, votre ordi, et même le frigo.

#### 1. C'est quoi un DNS ?
Imaginez que le DNS (Domain Name System), c'est l'annuaire téléphonique d'Internet. Quand vous tapez `google.com`, votre ordi ne sait pas où c'est. Il demande à un serveur DNS : "Eh, c'est quoi l'adresse IP de Google ?". Le serveur répond `142.250.xxx.xxx`, votre ordinateur sait alors où chercher et hop, la page s'affiche.

#### 2. Pourquoi un DNS "Récursif" ?
Par défaut, votre box internet utilise les DNS de votre opérateur (ou Google : 8.8.8.8). En gros, vous demandez à un intermédiaire de chercher pour vous. Il sait donc tout ce que vous visitez ( et si vous tenez a votre vie privée, je vous conseil de vite fuir ).

Avec **Unbound** en mode récursif, on vire l'intermédiaire. Votre Raspberry Pi va discuter directement avec les "Root Servers" (les grands patrons d'Internet) en gros c'est les servers qui savent où sont TOUS les sites en .com, .fr, .horse, etc. C'est comme si je demandais a la mairie où se trouvais le Burger King au lieux de demander à Google Maps. C'est plus long au début, mais une fois qu'on sait, alors on peut y aller direct. Et c'est exactement ce qu'il ce passe ici avec unbound.

* **Confidentialité :** Personne (ni Google, ni votre FAI) ne voit vos requêtes DNS.
* **Sécurité :** On utilise DNSSEC pour valider que les réponses sont authentiques.
* **Zéro Pub :** Pi-hole filtre les requêtes avant même qu'elles ne partent.

---

### Étape 1 : Préparer la bête
Assurez-vous d'avoir [Raspberry Pi OS](https://www.raspberrypi.com/software/operating-systems/) installé et à jour, si vous ne l'avez pas fait vous pouvez utiliser le [Raspberry Pi Imager](https://www.raspberrypi.com/software/) pour vous faire une carte SD bootable. Si vous comptez cacher votre Raspberry derrière la box internet et l'oublier je vous conseille d'installer la version "Headless", ça veut dire qu'on a pas d'interface graphique mais ça permet d'économiser des performances.

On ouvre le terminal (ou on se connecte en SSH : `ssh ip.de.votre.pi@username`)  
et on lance la classique mise à jour :

```bash
sudo apt update && sudo apt upgrade -y
```

Ensuite, il est **fortement** recommendé de donner une addresse IP statique à votre PI. [voici](https://raspberry-pi.fr/ip-locale-fixe/) un super article détaillant la procédure. Il est important de donner une IP statique au Raspberry pi pour les étapes suivantes.

### Étape 2 : Installer Pi-hole
L'installation de Pi-hole est automatisée. C'est super simple, en une commande c'est bon. Vous pourez retrouver d'autres méthodes d'installation [ici](https://docs.pi-hole.net/main/basic-install/).

```bash
curl -sSL https://install.pi-hole.net | bash
```

### Étape 3 : Configurer Pi-hole
Après avoir lancé la commande précédente, Pi-hole va automatiquement installer ce dont il a besoin pour fonctionnner ( dépendences, etc.. ). Ensuite il va vous demander de confirmer que votre Pi as bien une IP statique, cliquez `Continue`.
![Static IP Warning](/Images/pihole/1static_ip_message.png)

Il faut maintenant sélectionner un fournisseur DNS ( pas d'inquiétude, on va rapidement devenir notre propre fournisseur DNS ) afin que Pi-hole puisse finire sa configuration. Personnellement j'ai choisit Cloudflare ( c'est l'affaire de 10-15 min ).  
![Select Upstream Provider](/Images/pihole/2select_upstream_provider.png)

On va pouvoir installer notre première block-list, celle-ci est une recommendation ( je vous la conseille pour une première block-list éfficace ). Cliquez `Yes`  
![Block List](/Images/pihole/3block_list.png)

Ensuite, on peut ( ou non ) activer le log des requettes DNS, à vous de choisir, moi je vote oui.  
![Enable query](/Images/pihole/4enable_query.png)

Après ça ducoup je dois choisir qu'est ce que je veux loger exactement dans les requettes, je veux tout alors je navigue avec les flèches sur `Show everything`  
![Privacy Mode](/Images/pihole/5_privacy%20mode.png)

Enfin, la configuration est finie, on va pouvoir se connecter à l'interface web !! ( **IMPORTANT :** notez le mot de passe qui s'affiche pour le compte admin de la page web. )  
![Configure Devices](/Images/pihole/6configure_devices_to_use_pihole.png)

Rendez-vous sur `http://ip.de.votre.pi/admin/` dans votre navigateur favoris et entrez le mot de passe affiché précédement.  
![Login Page](/Images/pihole/8login_page.png)

Et voila ! bienvenue sur le dashboard d'administration de votre installation Pi-hole !  
Ici vous retrouverez le nombre total de requettes DNS, le nombre de requettes bloquées, le type de requettes ( A, AAAA, HTTPS, etc... ), les appareils connectés, et bien plus ! n'hésitez pas a explorer !  
![Pi-Hole Dashboard](/Images/pihole/9piholehomepage.png)

### Étape 4 : Installer Unbound
C'est là que la magie opère. On installe Unbound pour ne plus dépendre des DNS de Google, Cloudflare, etc.

```bash
sudo apt install unbound
```

### Étape 4 : Configurer Pi-hole pour intéroger Unbound

> Et voilà ! Votre Pi-hole interroge maintenant votre instance locale Unbound. C'est propre, c'est privé, et ça tourne nickel sur le Pi 5.
