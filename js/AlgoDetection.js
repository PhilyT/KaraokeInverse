window.onload = function() {
    
    /*
    * Vérifier la prise en charge de l'API par le navigateur 
    */
    (function(){
    	if (window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext, navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia, "undefined" == typeof window.AudioContext || "undefined" == typeof navigator.getUserMedia) {
    		return void requestAnimationFrame(function() {
    	    	document.body.classList.add("unsupported")
    		});
    	}
    })();	

    /*
    * Les variables essentielles
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
    var audioSource = null; 
    var didConnect = null;

    /*
    * Initialisation ..
    */
    var mp3 = '../sound/test.wav';
    var ogg = '../sound/test.ogg';
    var audio = new Audio();
    audioContext = new AudioContext();

    /*
    * Préparer le UserMedia en déterminant les périphériques auxquels on veut y accéder,
    * ici on est besoin d'accéder au microphone de l'utilisateur,
    * on obtient ensuite le media de l'utilisateur sous forme d'un flux audio,
    * on peut manipuler les erreurs liées à la capture du son ...
    */
    navigator.getUserMedia(
        {audio: audioOpts},
        getStream,
        function(e){
            alert("Erreur : problème dans la capture du son");
            console.log(e);
        }
    );
    
    /*
    * Obtenir le flux d'audio à partir du microphone de l'utilisateur, 
    * traiter ce flux en temps réel,
    * créer un nœud audio à partir du flux et tenter de détecter la note
    */
    function getStream(stream){
        track = stream.getTracks()[0];
        mediaStreamSource = audioContext.createMediaStreamSource(stream);
        connectStream();    
        detectPitch();
    }

    /*
    * Connecter le flux à l'analyser
    */
    function connectStream(){
        analyser = audioContext.createAnalyser();
        analyser.fftSize = bufferSize;
        mediaStreamSource.connect(analyser);
    }

    /*
    * Méthode qui détecte les notes, 
    * elle utilise les différents méthodes telles que 
    * findFundamentalFreq, findCentsOffPitch, findClosestNote
    */
    var detectPitch = function () {
       var freqByteData = new Uint8Array(2048);
        analyser.getByteTimeDomainData(freqByteData);
        var fundalmentalFreq = findFundamentalFreq(freqByteData, audioContext.sampleRate);
        if (fundalmentalFreq !== -1) {
            var note = findClosestNote(fundalmentalFreq, notesArray);
            var cents = findCentsOffPitch(fundalmentalFreq, note.frequency);
            updateNote(note.note);
            updateCents(cents);
        } else {
            updateNote('undefined');
            updateCents(-50);
        }
        frameId = window.requestAnimationFrame(detectPitch);
    }

    /*
    * Connecter le fichier audio à l'analyser
    */
    function connectAudio() {
        if (didConnect) {
          return false;
        }
        audioSource = audioContext.createMediaElementSource(audio);
        analyser = audioContext.createAnalyser();
        audioSource.connect(analyser);
        analyser.connect(audioContext.destination);
        detectPitch();
        didConnect = true;
    }
    
    /*
    * Préparer la lecture de fichier audio
    */

    (function setup() {
		var demo = document.getElementById('demo');
		audio.volume = 1;
		audio.controls = true;
		audio.src = audio.canPlayType('audio/mpeg') ? mp3 : ogg;
		audio.addEventListener('play', function() {
			window.setTimeout(function() {
				connect();
			}, 20);
		}, false);
		audio.addEventListener('pause', function() {
			connectStream();
			
		});
		demo.appendChild(audio);
	})();


};

