// Verifier la prise en charge de l'API par le navigateur 
(function(){
	if (window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext, navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia, "undefined" == typeof window.AudioContext || "undefined" == typeof navigator.getUserMedia) {
		return void requestAnimationFrame(function() {
	    	document.body.classList.add("unsupported")
		});
	}
})();
// définir les variables qu'on va utiliser
var isPlaying = true;
var audioContext = null;
var analyser = null;
var frequencyData = null;
var track = null;
var mediaStreamSource = null;
var bufferSize = 4096;
var audioOpts = {
    mandatory: {
        "googEchoCancellation": "false",
        "googAutoGainControl": "false",
        "googNoiseSuppression": "false",
        "googHighpassFilter": "false"
    },
    optional: []
};

window.onload = function() {
	audioContext = new AudioContext();
 	navigator.getUserMedia(

		// Les détails à-propos du UserMedia auxquelles on veut y accéder
		{audio: audioOpts},

		// Obtenir le media de l'utilisateur sous forme d'un flux audio
		getStream,

		// Manipuler une erreur
		function(e){
			alert("Erreur : problème dans la capture du son");
			console.log(e);
		}
	);
	
 	// Controler le start/pause
 	$("#toggle-visualizer").click(function() {
		if (isPlaying) {
			track.stop();
			isPlaying = false;
		} else {
			track.start();
			isPlaying = true;
		} 

	})
};
function getStream(stream){
	track = stream.getTracks()[0];
	// Celui est le flux de l'audio obtenu à partir du microphone de l'utilisateur
	// On va traiter ce flux en temps réel

	//créer un nœud audio à partir du flux
	mediaStreamSource = audioContext.createMediaStreamSource(stream);

	analyser = audioContext.createAnalyser();
    analyser.fftSize = bufferSize;
	mediaStreamSource.connect(analyser);
	
	//analyser.connect(audioContext.destination);

	frequencyData = new Uint8Array(analyser.frequencyBinCount);

	analyser.getByteFrequencyData(frequencyData)
	
	update();
}

function update() {
    // Schedule the next update
    requestAnimationFrame(update);

    // Get the new frequency data
    analyser.getByteFrequencyData(frequencyData);

	//console.log(frequencyData)
    // Update the visualisation
    for (var i = 0; i < 4; i++) {
		$("#frequency-visualizer-canvas h2").text(frequencyData[i] + " | " + frequencyData[i+1] + " | " + frequencyData[i+2]  + " | " + frequencyData[i+3]);
    }
};