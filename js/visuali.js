
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

if (navigator.getUserMedia) {
   console.log('getUserMedia supported.');
   navigator.getUserMedia (
      // Contraintes - seul l'audio requis pour cette application
      {
         audio: audioOpts
      },

      // Success callback
      function(stream) {
         source = audioContext.createMediaStreamSource(stream);
         source.connect(analyser);
         analyser.connect(distortion);
         distortion.connect(biquadFilter);
         biquadFilter.connect(convolver);
         convolver.connect(gainNode);
         gainNode.connect(audioContext.destination);
         visualize();
      },

      // Error callback
      function(err) {
         console.log('The following gUM error occured: ' + err);
      }
   );
} else {
   console.log('getUserMedia not supported on your browser!');
}




