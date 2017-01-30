# Fonctions de lAPI WEB Audio

* enregistrement de son en utilisant le micro de lordinateur
    [softfluent](http://www.softfluent.fr/blog/expertise/2015/04/28/Enregistrer-du-son-via-le-Microphone-en-JavaScript)
* Autres fonctions
    [developer](https://developer.mozilla.org/fr/docs/Web/API/Web_Audio_API)
    [html5rocks](https://www.html5rocks.com/en/tutorials/webaudio/intro/)
    [dvcs.w3.org](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html)
    [webaudioapi](http://webaudioapi.com/)
    [developer.mozilla.org](https://developer.mozilla.org/fr/docs/Web/API/Web_Audio_API/Using_Web_Audio_API)
 
# Capture de l’audio en HTML5

Pendant de nombreuses années, nous étions obligés de compter sur des plugins de navigateur tels que Flash ou Silverlight pour capter le son. La montée de l’HTML5 a apporté une transition remarquable en puissance de l’accès au matériel du périphérique. La géolocalisation (GPS), L'API d'orientation et l'API Web Audio (matériel audio), sont des exemples de montée.
Ces fonctionnalités sont extrêmement puissantes, révélant des API JavaScript de haut niveau qui s'ajoutent aux fonctionnalités matérielles principales du système.

Notre chercher dans la nouvelle API se focalise sur ```navigator.getUserMedia()```, qui permet aux applications web d’accéder à camera et microphone de l’utilisateur.

## ```getUserMedia()```
Le rythme de développement pour trouver une API de capture plus adaptée a accéléré grâce à l’effort WebRTC (Web Real Time Communication). Cette spécification est supervisée par le groupe de W3C WebRTC. ```GetUserMedia ()``` est lié à WebRTC car elle est la passerelle pour cet ensemble d'API. Il fournit les moyens d'accéder au flux local de l'utilisateur notamment le microphone et la camera.

## Support des navigateurs :
getUserMedia() a été pris en charge depuis Chrome 21, Opera 18, and Firefox 17.

![support de getUserMedia](http://i.stack.imgur.com/8D401.png "support de getUserMedia")

## Les étapes pour commencer :
1. Vérifier le support sur le navigateur.
 * webkitGetUserMedia
 * mozGetUserMedia
 * msGetUserMedia

2. Accéder à un périphérique d'entrée

Pour utiliser le microphone, on doit demander la permission, d’une simple recherche dans l’API, on trouve que getUserMedia() prend en premier parametre l’objet qui determine les details de chaque type de media auquel on veut acceder : 
```
navigator.getUserMedia({video: true, audio: true}, …);
```

3. Sélectionner une source multimedia

`getUserMedia()` supporte aussi la selection de la source audio en utilisant l’API `MediaStreamTrack.getSources()`

## Utiliser getUserMedia avec l’API Web Audio
Le navigateur Google Chrome supporte l’entrée de micro en direct de getUserMedia () à l'API Web audio en temps réel. 
### Demo:
* [Live Input Visualizer](http://webaudiodemos.appspot.com/input/index.html)

### Doc:
* [W3C specification](https://w3c.github.io/mediacapture-main/getusermedia.html)
* [https://dev.opera.com/articles/getusermedia-access-camera-privacy-ui/](https://dev.opera.com/articles/getusermedia-access-camera-privacy-ui/)
