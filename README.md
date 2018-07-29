# crispy-guacamole
Is small project that show ads stats getting by REST api call with redux in react
### Installation

``` bash
git clone git@github.com:benoitjolly/crispy-guacamole.git
cd crispy-guacamole
npm install
```

Wait few minutes and all necessary dependencies will be installed in `./node_modules`.

``` bash
npm start
```
By default the server runs on localhost:3000

### Notes et problèmes rencontrés:

- Pour effectuer cette application ReactJs j'ai travaillé environ 2h/jour pendant 6 jours.
- J'ai passé beaucoup de temps à essayer d'avoir un retour de l'API monetization, j'ai compris la nuance qu'il y avait entre les deux API, l'une fonctionne avec un token dans le header et l'autre avec la clé d'authentification dans les paramètres.
Cependant je n'ai pas reussi à la faire fonctionner puisqu'il semble que le serveur renvoie une 405 l'hors d'un appel OPTIONS, le problème est qu'en incluant la clé d'authentification dans l'header les browser récents envoient automatiquement une requête OPTIONS avant un GET par exemple.
- Sans le header j'ai bien un retour 403 forbiden comme je m'y attendais.
- Je n'ai pas eu ce problème avec l'application Postman dans lequel j'ai bien eu un retour en ajoutant la clé aux headers, étant donné que l'application se comporte différemment d'un browser.
- Effectivement je n'avais pas totalement compris le sujet du test au départ, qui avait pour but de comparer les couts dépensés et les bénéfices.
- J'ai donc pris l'initiative de concaténer les datas pour les afficher en Tree View (arbre), chaque click sur l'element déplit son sous-ensemble.
- La possibilité de trier par applications, évoqué dans l'énoncé m'a fait réfléchir à un système de tri par clé, c'est pour cela qu'un select permet de modifier l'ordre du Tree view en fonction du pramètre souhaité.
- Malgré le fait que l'api monetization ne fonctionne pas, le systeme reste senssiblement le même et donc il pourra s'integrer parfaitement à l'architecture mise en place.
- Dans un souci de temps l'application n'est pas "fini", on pourra par la suite améliorer l'architecture en sub-divisant différents composants, ajouter les tests, SCSS, etc...


