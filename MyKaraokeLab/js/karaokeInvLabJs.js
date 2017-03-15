// Verifier la prise en charge de l'API par le navigateur 
(function(){
	if (window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext, navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia, "undefined" == typeof window.AudioContext || "undefined" == typeof navigator.getUserMedia) {
		return void requestAnimationFrame(function() {
	    	document.body.classList.add("unsupported")
		});
	}
})();

// La fonction detect pitch pour obtenir la frequence fendamentale
// en plus de la precision de la note jouee
var detectPitch = function () {
	var buffer = new Uint8Array(analyser.fftSize);
	analyser.getByteTimeDomainData(buffer); 
	var fundalmentalFreq = findFundamentalFreq(buffer, audioContext.sampleRate);
	if (fundalmentalFreq !== -1) {
		var note = findClosestNote(fundalmentalFreq, notesArray);
		var cents = findCentsOffPitch(fundalmentalFreq, note.frequency);
		updateNote(note.note);
		updateCents(cents);
	}
	else {
		updateNote('undefined');
		updateCents(-50);
	}

	frameId = window.requestAnimationFrame(detectPitch);

};

// définir les variables qu'on va utiliser
var isPlaying = true;
var audioContext = null;
var analyser = null;
var frequencyData = null;
var track = null;
var mediaStreamSource = null;
var bufferSize = 2048;
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
			track.enabled = false;
			isPlaying = false;
			$(this).text("Démarrer");
		} else {
			track.enabled = true;
			isPlaying = true;
			$(this).text("Stop");
		} 

	});
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

	frequencyData = new Uint8Array(analyser.frequencyBinCount);

	analyser.getByteFrequencyData(frequencyData)
	
	detectPitch();
}

// dev 04/03/2017
function obtainMp3BytesInArrayBufferUsingFileAPI(selectedFile, callback) {

	var reader = new FileReader(); 
	reader.onload = function (ev) {
		var mp3BytesAsArrayBuffer = reader.result; 
		callback(mp3BytesAsArrayBuffer); 
	}
	reader.readAsArrayBuffer(selectedFile);

}


function decodeMp3BytesFromArrayBufferAndPlay(mp3BytesAsArrayBuffer) {
	audioContext.decodeAudioData(mp3BytesAsArrayBuffer, function (decodedSamplesAsAudioBuffer) {
		if (source != null) {
			source.disconnect(audioContext.destination);
			source = null;
		}
		source = audioContext.createBufferSource();
		source.buffer = decodedSamplesAsAudioBuffer;
		source.connect(audioContext.destination);
		source.start(0);
	}); 

}