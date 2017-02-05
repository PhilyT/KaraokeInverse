# Son et Solfège

### Qu'est-ce qu'un son ?
Sensation auditive engendrée par une vibration acoustique.  
Un son est caractérisé par son intensité (exprimée en décibel dB), par sa hauteur (liée à sa fréquence exprimée en Hertz Hz) et par son timbre, qui dépend du nombre, de la hauteur et de l'intensité de ses harmonics.  
Un son a pour autre caractéristique sa durée (exprimée en seconde s).

## Le Solfège
<img src = "./Solfège.jpg" title = "solfège illustration" alt = "Solfège Illustration">

## La note

### Hauteur d’une note
Une note musicale est composée de plusieurs fréquences. La fréquence la plus basse, appelée fréquence fondamentale, est celle qui permet de définir la hauteur du son. Plus la fréquence fondamentale est basse, plus le son perçu est grave. Plus elle est haute, plus le son perçu est aigu.

### Durée d’une note
La durée d’une note correspond au temps pendant lequel la note est tenue et perçue. Par exemple, pour marquer la fin d’une œuvre, la plupart des morceaux s’achèvent sur une note tenue.

## Les harmoniques
En acoustique, un partiel harmonique est une composante d’un son périodique (et plus généralement d'une onde), dont la fréquence est un multiple entier d'une fréquence fondamentale1.  
En prenant comme note fondamentale le « la3 » (440 Hz) du piano, les harmoniques sont toutes les notes ayant pour fréquence un multiple de 440.

Le son est une notion tellement complexe qu'il faut plusieurs paramètres pour le décrire. Le phénomène physique du son peut être étudié de manière quantitative et les propriétés de l'onde acoustique peuvent être exprimées sous la forme de grandeurs objectives. Nous allons en analyser quatre: hauteur tonale, intensité, timbre et durée. Ces quatre paramètres suffisent à décrire globalement un son.

## Ton ou hauteur tonale
La notion de ton est intimement liée à celle de fréquence.
### Définition : 
Le nombre d'oscillations d'un son dans un temps donné est sa fréquence. C'est la hauteur tonale ou ton du son perçu.
Le temps au bout duquel une fréquence se répète est une période. Une onde est dite périodique quand elle est composée de telles répétitions. La valeur de la fréquence est évaluée en fonction du nombre de ses périodes dans un temps donné.

Une fréquence de 1000 [Hz] est donc une fréquence dont le cycle se reproduit 1000 fois par seconde. La figure illustre ces notions.

<img src = "./periode.gif" title = "periode" alt = "periode">

La période est ainsi inversement proportionnelle à la fréquence (c'est-à-dire égale à 1/f): si la fréquence est de 3 [Hz], la période est de 1/3 seconde.

En principe, il n'y a pas de limitation dans la gamme des fréquences des sons possibles.
La limitation de la perception est importante pour tous les traitements liés au son; on part du principe qu'il est inutile d'enregistrer ou de stocker un son imperceptible. Nous reviendrons plus loin sur cette limitation et analyserons l'impact sur la phase de numérisation.

Les fréquences ont permis de définir les notes. Ainsi le do moyen qui se trouve au milieu du clavier d'un piano a une fréquence de 264 [Hz]. Un diapason produit le son la (pur) à 440 [Hz].

## Intensité
L'amplitude des variations de pression donne la seconde composante du son: l'intensité avec laquelle notre oreille percevra une note. L'intensité correspond au volume d'énergie d'une onde. L'amplitude du son est la mesure du changement de pression par rapport à une valeur moyenne. Cette mesure est l'intensité acoustique I qui est la puissance transportée par unité de surface du front d'onde et s'exprime, par exemple, en [W/cm2]. De telles grandeurs sont certes fort utiles, mais lorsqu'il s'agit de déterminer les conditions de bonne transmission de signaux sonores, il apparaît nécessaire de tenir compte des propriétés perceptives très particulières de l'ouïe. On fait alors appel à des grandeurs subjectives qui expriment ce que ressent l'être humain.

## Timbre
Un ensemble de fréquences et leurs variations d'intensité permettent d'avoir une sorte de carte d'identité du son, une forme d'onde générale, le timbre ou spectre. Il montre la proportion dans laquelle la fréquence fondamentale du son est mélangée à d'autres fréquences multiples de la fréquence fondamentale et appelées sons harmoniques. Un son qui n'est accompagné d'aucune harmonique est appelé son pur. Le timbre permet donc d'identifier la source sonore car chaque instrument produit un spectre de fréquences qui lui est propre.

## Durée
Enfin, la répétition d'une onde sonore donne à son tour la durée du son. Elle s'exprime en secondes et correspond au temps pendant lequel l'énergie du son est perceptible. Sur le diagramme 2.3, la durée du son est de 2 secondes.

Avec ces quatre paramètres, on dispose d'une description suffisante pour, par exemple, générer des sons. Produire de la musique de synthèse implique que l'on passe de la simple notation des sons à leur transcription dans la tonalité d'un instrument. Il faut pour cela prendre en compte le timbre, toutes les harmoniques qui accompagnent la production d'un son pur.

Le problème principal consiste à trouver la fréquence d'un son. on a pour cela utilisé un objet AudioAnalyser qui doit analyser le son qu'on récupère du microphone.

L' interface AnalyserNode représente un noeud capable de fournir en temps réel des informations d'analyse de la fréquence et du domaine temporel. C'est un AudioNode qui transmet le flux audio inchangé depuis l'entrée vers la sortie, mais permet de capturer les données générées pour les traiter et/ou les visualiser.

Il a exactement une entrée et une sortie. Le noeud fonctionne même si la sortie n'est pas connectée.

<img src = "./fttaudiodata.png" title = "fttaudiodata" alt = "fttaudiodata">

| Nombre d'entrées | 1 |  
|:---:|:---:|
| Nombre de sorties | 1 (mais peut être laissée non connectée). |
| Mode de comptage des canaux | "explicit" |
| Nombre de canaux | 1 |
| Interprétation du canal | "speakers" |

### Sources

* http://www.telecom.ulg.ac.be/teaching/notes/total0/elen036/node15_ct.html
* https://developer.mozilla.org/fr/docs/Web/API/AnalyserNode

### Sources
* http://www.cochlea.org/entendre
* https://fr.wikipedia.org/wiki/Harmonique_(musique)
* Dictionnaire Hachette edition 2004