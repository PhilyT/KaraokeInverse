# Affichage de partitions :

## Projets d'affichage d'une partition en HTML5/ JavaScript :
- [VexFlow] (http://www.vexflow.com/) 
- [alphaTab] (http://www.alphatab.net)
- [abcjs](https://github.com/paulrosen/abcjs)
- [abcweb] (http://wim.vree.org/js/)

## Formats de notation musicale : 
- [MusicXML] (https://www.musicxml.com)
- [ABC] (http://abcnotation.com)

## Comparatif  des projets :
|                   | [VexFlow] (http://www.vexflow.com/) |[alphaTab] (http://www.alphatab.net) | [abcjs] (https://github.com/paulrosen/abcjs) | [abcweb] (http://wim.vree.org/js/) |
| ------------- |:-------------:| -----:| -----:| -----:|
| Méthodes d'affichage | HTML5 Canvas et SVG |  HTML5 Canvas et SVG | SVG  | SVG |
| Formats d'entrée      | VexTab | AlphaTex markup | ABC| ABC ou MusicXML |
| Documentation / communauté | [VexFlow wiki de 19 pages] (https://github.com/0xfe/vexflow/wiki) et [tutoriel] (https://github.com/0xfe/vexflow/wiki/The-VexFlow-Tutorial) | [Documentation en ligne sommaire] (http://www.alphatab.net/documentation/) et [API] (http://api.alphatab.net/alphatab/index.html) | [API] (https://github.com/paulrosen/abcjs/blob/master/api.md) | [documentation] (http://wim.vree.org/js/readme.html) |

## Synthèse 

D'une part, on souhaite travailler avec un format  standard pour la notation de musique. D'autre part, on souhaite pouvoir générer ce format à l'aide d'un framework.
Quel est le framework le plus adapté à notre projet ?

Les formats MusicXML et ABC sont des formats stantards mais il n'existe pas de librairie en JavaScript pour les générer.
Vexflow  propose un format ouvert, même si non standard. On peut le générer à l'aide de JavaScript. C'est pour cela que nous avons choisit d'utiiser Vexflow comme framework pour notre projet.
