This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


This optimized version focuses on mobile devices with the following improvements:

Mobile-First Layout:

Reduced padding and margins throughout
Adjusted font sizes to be more readable on small screens
Made the card and elements take full width of the screen
Added a grid layout for question count options in the modal
Touch-Optimized Interactions:

Changed hover effects to tap/touch effects using whileTap
Added a new isButtonPressed state for better touch feedback
Increased tap target sizes for better accessibility
Added padding to the close button for an easier touch target
Performance Optimizations:

Simplified and reduced animations
Made background animations slower and less resource-intensive
Used reduced opacity and blur for decorative elements
Added viewport margins to improve lazy loading of animations
Used fixed positioning for some elements to reduce reflow
Content Adjustments:

Shortened some text to fit mobile screens better
Made feature list items more concise
Reduced icon sizes
Added horizontal scrolling with hidden scrollbar for stats
Visual Improvements:

Added a CSS snippet to hide scrollbars while keeping functionality
Optimized shadows for better mobile rendering
Reduced the intensity of background elements
Increased contrast for better readability
These changes make the page much more optimized for mobile devices while maintaining the visual style and functionality of the original design.


1. commente en francais
2. fix bugs
3. deploy on vercel


je veux un cours pratique qui couvre toutes les notions essentielles


#### Les Fondamentaux Réseau pour Dev/DevOps

Objectif : Comprendre les concepts de base des réseaux pour les développeurs et les ingénieurs DevOps.
il faudrait que ce soit un cours pratique avec des exemples concrets et des exercices
les mots doivent être simples et accessibles aux débutants avec des sur la vie d'un dev de tous les jours.

Faire des petites questions de compréhension à la fin de chaque section/exercices/notions
exemple:
**❓ Questions :**
- Combien de répliques sont mises à jour en même temps ?
- Quel est le délai entre chaque lot de mises à jour ?
  
et a la fin du cours, demander des faires des experiences pratiques ou observations sur son travail quotidien

sur le cours prend en compote que le public pourrait avoir des machine Windows, Linux ou Mac

Notation CIDR
- Notation CIDR
- Plage reseaux (CIDR BLOCK)
- Masques
- Plages d'adresses
- Addressage Ip: Différences IPv4 et IPv6 et Differences Publique/Privée
- Sous-réseaux
- IP privées
- IP publiques
- IP réservées
- IP Spéciales (localhost, loopback, any, broadcast, multicast, carrier-grade nat, auto private ip, etc....)

DNS
- Fonctionnement du DNS
- Types d'enregistrements (A, AAAA, CNAME, MX, TXT, SRV, PTR, SOA)
- Résolution DNS
- Serveurs DNS
- Types de zones DNS (primaire, secondaire, de transfert, de recherche inversée)
- Sécurité DNS (DNSSEC, DNS over HTTPS, DNS over TLS)
- nslookup, dig, host

PORTS et PROTOCOLES
- Qu'est ce qu'un port
- Plage de ports (bien connus, enregistrés, dynamiques/privés)
- Protocoles courants (TCP, UDP, ICMP, HTTP, HTTPS, FTP, SSH, DNS, DHCP, SNMP, NTP, etc...)
Bon port, bon protocole sur le bon groupement d'ip (Exemple: HTTP sur 80, HTTPS sur 443, FTP sur 21, SSH sur 22, DNS sur 53, etc...) sinon ca marche pas, c'est comme essayer de rentrer dans une maison par la cheminée....

TCP
- Fonctionnement de TCP
- rappels sur le model OSI et TCP/IP avec des exemples concrets, illustrations et analogies
- TCP = Fiable (HTTP, HTTPS, FTP, SSH, SMTP, IMAP, POP3, Telnet, etc...)
  
UDP
- Fonctionnement de UDP
- UDP = Non Fiable (DNS, DHCP, TFTP, SNMP, NTP, VoIP, etc...)
- Utilisation de ports (bien connus, enregistrés, dynamiques/privés)
- Multiplexage et démultiplexage
- Datagrammes: C'EST UN PAQUET DE DONNÉES INDÉPENDANT QUI EST TRANSMIS SUR UN RÉSEAU
- 
ICMP
- Fonctionnement de ICMP
- Types de messages ICMP (Echo Request/Reply, Destination Unreachable, Time Exceeded, Redirect, Source Quench, etc...)
- Utilisation de ICMP pour le diagnostic réseau (ping, traceroute)
- Sécurité ICMP (bloquer certains types de messages ICMP pour prévenir les attaques réseau)
- ICMP et la fragmentation des paquets
- Attention: ping different de curl, ces deux outils n'ont pas le meme role dans le reseau, ping utilise ICMP et curl utilise HTTP (donne des explications concretes)
donner exemple: telnet towel.blinkenlights.nl

HTTP
- Fonctionnement de HTTP
- Méthodes HTTP (GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, CONNECT, TRACE)
- Codes de statut HTTP (1xx, 2xx, 3xx, 4xx, 5xx)
- En-têtes HTTP (généraux, de requête, de réponse, d'entité)
- Cookies et sessions
- Sécurité HTTP (HTTPS, TLS/SSL, HSTS, CORS, CSP)
- HTTP/2 et HTTP/3
- HTTP/3 et QUIC
  Faire un exemple avec: 
    telnet www.google.com 80
    Trying 2a00:1450:4007:80e::2004...
    Connected to www.google.com.
    Escape character is '^]'.
    GET / HTTP/1.1
    Host: www.google.com
  Refaire sans www
    telnet google.com 80
    Trying 2a00:1450:4007:80e::2004...
    Connected to google.com.
    Escape character is '^]'.
    GET / HTTP/1.1
    Host: google.com
  Avec curl
    curl www.google.com -v
    curl google.com -v
     
HTTPS
- Fonctionnement de HTTPS
- TLS/SSL (Transport Layer Security / Secure Sockets Layer)
- Certificats numériques (autorités de certification, certificats auto-signés)
- Chiffrement symétrique et asymétrique
- Handshake TLS
- Protocoles de chiffrement (AES, RSA, ECC, etc...)
- Sécurité HTTPS (HSTS, OCSP, Perfect Forward Secrecy)
- Let's Encrypt et certificats gratuits
- Proxies et passerelles


Load Balancer
- Fonctionnement d'un Load Balancer
- Types de Load Balancer (Layer 4, Layer 7)
- Algorithmes de répartition de charge (Round Robin, Least Connections, IP Hash, etc...)
- Health Checks
- SSL Termination
- Sticky Sessions
- Load Balancer et haute disponibilité
- Load Balancer et scalabilité
- SSL/TLS Offloading
- Exemples de Load Balancer (HAProxy, Nginx, AWS ELB, etc...)

Débugger

Dans les execices et exemples, utiliser des outils comme curl, wget, telnet, netcat, netstat -tpnl, nmap, wireshark, tcpdump, traceroute, dig, ss, ipconfi ou ifconfig, arp, route, tcpdump etc...


1. 
1. Faire une page pour les sessions/ateliers au now, rajoute un button proposer une idee d'atelier
2. Acheter un nom de domaine
3. Rajouter un system de paiement
4. ajouter une baniere pour mon compte linkedin sur site


aboubacar@vps-sandbox:~$ nmap -p- 37.59.118.195
Starting Nmap 7.93 ( https://nmap.org ) at 2025-11-01 21:10 UTC
Nmap scan report for vps-1e449487.vps.ovh.net (37.59.118.195)
Host is up (0.00014s latency).
Not shown: 65524 closed tcp ports (conn-refused)
PORT      STATE SERVICE
25/tcp    open  smtp
80/tcp    open  http
443/tcp   open  https
5355/tcp  open  llmnr
5432/tcp  open  postgresql
5433/tcp  open  pyrrho
7070/tcp  open  realserver
8000/tcp  open  http-alt
8081/tcp  open  blackice-icecap
11211/tcp open  memcache
53796/tcp open  unknown

Nmap done: 1 IP address (1 host up) scanned in 2.93 seconds


ya trop de mention de rfc dans les cours, enleve moi tous ca# santu-shop
