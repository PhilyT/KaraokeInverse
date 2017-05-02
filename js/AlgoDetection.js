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
var actualNote = pause();
var oldNote = {cpt:0};
var streamer;

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
 * Initialisation ..
 */
audioContext = new AudioContext();

window.onload = function() {

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
    * Controler le start/pause du flux audio
    */
    $("#toggle-stream").click(function() {
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

/*
 * Implémenter l'algorithme qui permet de retrouver la fréquence fondamentale
 *
 */
var findFundamentalFreq = function(buffer, sampleRate) {
    var n = 1024, bestR = 0, bestK = -1;
    for(var k = 8; k <= 1000; k++){
        var sum = 0;
        for(var i = 0; i < n; i++){
            sum += ((buffer[i] - 128) / 128) * ((buffer[i + k] - 128) / 128);
        }
        var r = sum / (n + k);
        if(r > bestR){
            bestR = r;
            bestK = k;
        }
        if(r > 0.9) {
            break;
        }
    }
    if(bestR > 0.0025) {
        var fundamentalFreq = sampleRate / bestK;
        return fundamentalFreq;
    } else {
        return -1;
    }
};

/*
 * Connecter le fichier audio a analyser
 */
function connectAudio(aud) {
    if (didConnect) {
        return false;
    }
    if(!analyser)
    {
        analyser = audioContext.createAnalyser();
    }
    aud.connect(analyser);
    analyser.connect(audioContext.destination);
    detectPitch();
    didConnect = true;
}

/**
 * Deconnecter le fichier audio a analyser
 * @param aud
 */
function disconnectAudio(aud) {
    if(didConnect)
    {
        aud.disconnect(analyser);
        analyser.disconnect(audioContext.destination);
        mediaStreamSource.connect(analyser);
        getStream(streamer);
        didConnect = false;
    }
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
    var noteTrouve =  pause();
    if (fundalmentalFreq !== -1) {
        noteTrouve = toNote(fundalmentalFreq);
        if(noteTrouve.note != actualNote.note)
        {
            if(actualNote.duration != "qr")
            {
                oldNote = actualNote;
            }
            actualNote = noteTrouve;
        }
        else
        {
            actualNote.cpt++;
        }

    } else {
        if(actualNote.duration == "qr")
        {
            actualNote.cpt++;
        }
        else
        {
            actualNote = noteTrouve;
        }
    }
    updateNote(actualNote, oldNote);
    frameId = window.requestAnimationFrame(detectPitch);
};

/*
 * Obtenir le flux d'audio à partir du microphone de l'utilisateur,
 * traiter ce flux en temps réel,
 * créer un nœud audio à partir du flux et tenter de détecter la note
 */
function getStream(stream){
    streamer = stream;
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

