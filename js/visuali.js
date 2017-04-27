
var voiceSelect = document.getElementById("voice");
var source;
var stream;
//les différents nœuds audio que nous utiliserons pour l'application
var analyser = audioContext.createAnalyser();
var distortion = audioContext.createWaveShaper();
var gainNode = audioContext.createGain();
var biquadFilter = audioContext.createBiquadFilter();
var convolver = audioContext.createConvolver();

// Configurer le contexte de la toile pour le visualiseur
var canvas = document.querySelector('.visualizer');
var canvasCtx = canvas.getContext("2d");
var intendedWidth = document.querySelector('.wrapper').clientWidth;
canvas.setAttribute('width',intendedWidth);
var visualSelect = document.getElementById("visual");
var drawVisual;




