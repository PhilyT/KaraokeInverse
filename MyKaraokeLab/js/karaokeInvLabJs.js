// Verifier la prise en charge de l'API par le navigateur 
(function(){
	if (window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext, navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia, "undefined" == typeof window.AudioContext || "undefined" == typeof navigator.getUserMedia) {
		return void requestAnimationFrame(function() {
	    	document.body.classList.add("unsupported")
		});
	}
})();
// definier les variables qu'on va utiliser

var audioContext = null;
var analyser = null;
var frequencyData = null;
var mediaStreamSource = null;
var bufferSize = 4096;
var audioOpts = {
    mandatory: {
        googEchoCancellation: false,
        googAutoGainControl: true,
        googNoiseSuppression: true,
        googHighpassFilter: true,
        googTypingNoiseDetection: true
    },
    optional: []
};

window.onload = function() {
	audioContext = new AudioContext();
 	navigator.getUserMedia(

		// Les détails à-propos du UserMedia auxquelles on veut y accéder
		{audio: audioOpts},

		// Obtenir le media de l'utilisateur sous forme d'un flux
		stream => {
			// Celui est le flux de l'audio obtenu à partir du microphone de l'utilisateur
			// On va traiter ce flux en temps réel

			mediaStreamSource = audioContext.createMediaStreamSource(stream);

			analyser = audioContext.createAnalyser();
		    analyser.fftSize = bufferSize;
			mediaStreamSource.connect(analyser);
			
			//analyser.connect(audioContext.destination);
			
			frequencyData = new Uint8Array(analyser.frequencyBinCount);
			console.log(frequencyData)
			analyser.getByteFrequencyData(frequencyData)

		    
			
		},

		// Manipuler une erreur
		err => console.log(err)
	);
	function update() {
	    // Schedule the next update
	    requestAnimationFrame(update);

	    // Get the new frequency data
	    analyser.getByteFrequencyData(frequencyData);

	    // Update the visualisation
	    for (var i = 0; i < frequencyData.length; i++) {
	    	$("#frequency-visualizer-canvas").text(frequencyData[i]);
	    }
	        

	};

	// Kick it off...
	update();

};

