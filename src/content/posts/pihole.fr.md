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

Ensuite, on va devoir faire quelques configurations pour que unbound fonctionne correctement au coté de Pi-hole. On va commencer par créer un fichier de configuration pour unbound :

```bash
sudo nano /etc/unbound/unbound.conf.d/pi-hole.conf
```

Après ça, on va copier le fichier de configuration pour Unbound depuis la doc sur le site de Pi-hole : [https://docs.pi-hole.net/guides/dns/unbound/](https://docs.pi-hole.net/guides/dns/unbound/)

```bash
server:
    # If no logfile is specified, syslog is used
    # logfile: "/var/log/unbound/unbound.log"
    verbosity: 0

    interface: 127.0.0.1
    port: 5335
    do-ip4: yes
    do-udp: yes
    do-tcp: yes

    # May be set to no if you don't have IPv6 connectivity
    do-ip6: yes

    # You want to leave this to no unless you have *native* IPv6. With 6to4 and
    # Terredo tunnels your web browser should favor IPv4 for the same reasons
    prefer-ip6: no

    # Use this only when you downloaded the list of primary root servers!
    # If you use the default dns-root-data package, unbound will find it automatically
    #root-hints: "/var/lib/unbound/root.hints"

    # Trust glue only if it is within the server's authority
    harden-glue: yes

    # Require DNSSEC data for trust-anchored zones, if such data is absent, the zone becomes BOGUS
    harden-dnssec-stripped: yes

    # Don't use Capitalization randomization as it known to cause DNSSEC issues sometimes
    # see https://discourse.pi-hole.net/t/unbound-stubby-or-dnscrypt-proxy/9378 for further details
    use-caps-for-id: no

    # Reduce EDNS reassembly buffer size.
    # IP fragmentation is unreliable on the Internet today, and can cause
    # transmission failures when large DNS messages are sent via UDP. Even
    # when fragmentation does work, it may not be secure; it is theoretically
    # possible to spoof parts of a fragmented DNS message, without easy
    # detection at the receiving end. Recently, there was an excellent study
    # >>> Defragmenting DNS - Determining the optimal maximum UDP response size for DNS <<<
    # by Axel Koolhaas, and Tjeerd Slokker (https://indico.dns-oarc.net/event/36/contributions/776/)
    # in collaboration with NLnet Labs explored DNS using real world data from the
    # the RIPE Atlas probes and the researchers suggested different values for
    # IPv4 and IPv6 and in different scenarios. They advise that servers should
    # be configured to limit DNS messages sent over UDP to a size that will not
    # trigger fragmentation on typical network links. DNS servers can switch
    # from UDP to TCP when a DNS response is too big to fit in this limited
    # buffer size. This value has also been suggested in DNS Flag Day 2020.
    edns-buffer-size: 1232

    # Perform prefetching of close to expired message cache entries
    # This only applies to domains that have been frequently queried
    prefetch: yes

    # One thread should be sufficient, can be increased on beefy machines. In reality for most users running on small networks or on a single machine, it should be unnecessary to seek performance enhancement by increasing num-threads above 1.
    num-threads: 1

    # Ensure kernel buffer is large enough to not lose messages in traffic spikes
    so-rcvbuf: 1m

    # Ensure privacy of local IP ranges
    private-address: 192.168.0.0/16
    private-address: 169.254.0.0/16
    private-address: 172.16.0.0/12
    private-address: 10.0.0.0/8
    private-address: fd00::/8
    private-address: fe80::/10

    # Ensure no reverse queries to non-public IP ranges (RFC6303 4.2)
    private-address: 192.0.2.0/24
    private-address: 198.51.100.0/24
    private-address: 203.0.113.0/24
    private-address: 255.255.255.255/32
    private-address: 2001:db8::/32
```

Sauvegardez et quittez ( `Ctrl + O`, `Enter`, `Ctrl + X` ).

Ensuite, on va redémarrer unbound pour qu'il prenne en compte la nouvelle configuration :

```bash
sudo service unbound restart
```

Maintenant, on va vérifier que tout fonctionne correctement en lançant une requette DNS avec unbound :

```bash
 dig pi-hole.net @127.0.0.1 -p 5335
```

### Étape 5 : Configurer Pi-hole pour intéroger Unbound

Ok maintenant qu'on a installé Unbound, il faut qu'on configure Pi-hole pour qu'il utilise Unbound comme fournisseur DNS et non celui qu'on a choisit à l'étape 3. Pour ce faire, rendez-vous sur l'interface web de Pi-hole, dans le menu de gauche, cliquez sur `Settings`, puis sur `DNS`.

![Unbound DNS Settings](/Images/pihole/10unbound_dns_settings.png)

Dans ce menu, vous allez décocher les DNS de Google, Cloudflare, etc. Et dérouler la liste `Custom DNS servers`, il va vous demander une addresse IP, la voici `127.0.0.1#5335` c'est une addresse IP interne, en gros on dit a pihole de se parler a lui même pour les requettes DNS ( vous l'aurez compris, Pi-hole n'est pas schizophrène, c'est bien Unbound de l'autre coté qui va écouter sur le port `5335` et répondre à Pi-hole. )  
Cliquez sur `Save & Apply` en bas de la page et c'est tout bon !

> Et voilà ! Votre Pi-hole interroge maintenant votre instance locale Unbound. C'est propre, c'est privé, et ça tourne nickel sur le Pi 5.

### Étape 6 : Configurer vos appareils pour utiliser Unbound

Maintenant que Pi-hole est installé et configuré, vous pouvez configurer vos appareils pour utiliser Pi-hole comme fournisseur DNS et non le leur ou Google, Cloudflare, etc. La méthode varie selon les routeurs, mais en général, vous pouvez trouver cette option dans les paramètres réseau ou DHCP.  

Vous pouvez configurer chaque appareil individuellement pour utiliser Pi-hole comme fournisseur DNS, mais c'est moins pratique. Sur windows, rendez vous dans :  

`panneau de control` > `réseaux et internet` > `réseau et centre de partage` > `modifier les paramètres de la carte` > `clic droit sur votre carte réseau` > `propriétés` > `double clique sur protocole internet version 4 (TCP/IPv4)` > `utiliser l'adresse de serveur DNS suivante` et entrez l'adresse IP de votre Pi-hole.

![Pi-hole DNS Settings](/Images/pihole/11DNS_windows_config.png)

> Et voilà ! Votre routeur interroge maintenant votre instance locale Unbound. C'est propre, c'est privé, et ça tourne nickel sur le Pi 5.