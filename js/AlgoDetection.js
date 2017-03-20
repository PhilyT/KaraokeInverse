window.onload = function() {
/*
* Verifier la prise en charge de l'API par le navigateur 
*/
(function(){
	if (window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext, navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia, "undefined" == typeof window.AudioContext || "undefined" == typeof navigator.getUserMedia) {
		return void requestAnimationFrame(function() {
	    	document.body.classList.add("unsupported")
		});
	}
})();	
/*
* les variables essentielles
*/
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
var thebuffer = null;

};


var audioSource = null; 
var didConnect = null;
	    mp3 = '../sound/test.wav',
	    ogg = '../sound/test.ogg',
	    audio = new Audio();