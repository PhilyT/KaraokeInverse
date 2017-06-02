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
        "googNoiseSuppression": "true",
        "googHighpassFilter": "false"
    },
    optional: []
};
var thebuffer = null;
var audioSource = null;
var didConnect = null;
var streamer;
var frameId;

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
            var microphoneSettings = $('#microphone-settings');
            var availableInputs =  $("#available-inputs");

            microphoneSettings.modal("show");

            microphoneSettings.on('hidden.bs.modal', function (e) {
                availableInputs.css("font-weight","Bold");
                availableInputs.css("font-size","25px");
                availableInputs.text("Attention : Lecture à partir d'un fichier audio uniquement.");
            });
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
            if(!didConnect){
                window.cancelAnimationFrame(frameId);
                clearInterval(timer1);
                metronome_off();
            }
        } else if(!didConnect){
            track.enabled = true;
            isPlaying = true;
            $(this).text("Pause");
            actualNote = pause();
            timer1 = setInterval(runDetectNote, tempo1);
            metronome_on();
            connectStream();
            detectPitch();
        }
    });

    $(".bpm-input").on("change",function(){
        window.cancelAnimationFrame(frameId);
        tempo1 = 60000.0/parseInt($(".bpm-input").val()) - 71;
        tempo2= 142;
        clearInterval(timer1);
        if(isPlaying || didConnect){
            timer1 = setInterval(runDetectNote, tempo1);
            connectStream();
            detectPitch();
        }
    });
};

/*
 * Implémenter l'algorithme qui permet de retrouver la fréquence fondamentale
 * inspiré de pitchdetect.js
 * voir: https://webaudiodemos.appspot.com/pitchdetect/js/pitchdetect.js
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
    analyser = audioContext.createAnalyser();
    analyser.fftSize = bufferSize;
    analyser.smoothingTimeConstant = 1;
    track.enabled = false;
    window.cancelAnimationFrame(frameId);
    metronome_on();
    clearInterval(timer1);
    timer1 = setInterval(runDetectNote, tempo1);
    aud.connect(analyser);
    analyser.connect(audioContext.destination);
    detectPitch();
    didConnect = true;
    return aud;
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
        didConnect = false;
        clearInterval(timer1);
        if(isPlaying){
            connectStream();
            track.enabled = true;
            timer1 = setInterval(runDetectNote, tempo1);
            detectPitch();
        }
        else
        {
            window.cancelAnimationFrame(frameId);
            metronome_off();
        }
        return aud;
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
    if(detectNote){

        var fundalmentalFreq = findFundamentalFreq(freqByteData, audioContext.sampleRate);
        var noteTrouve =  pause();
        if (fundalmentalFreq !== -1) {
            noteTrouve = toNote(fundalmentalFreq);
            if(noteTrouve.duration != "qr")
            {

                tabNote.push(noteTrouve);
            }
        }
    }

    frameId = window.requestAnimationFrame(detectPitch);
};

/*
 * Obtenir le flux d'audio à partir du microphone de l'utilisateur,
 * traiter ce flux en temps réel,
 * créer un nœud audio à partir du flux et tenter de détecter la note
 */
function getStream(stream){
    tempo1 = 60000.0/parseInt($(".bpm-input").val()) - 71;
    tempo2= 42;
    timer1 = setInterval(runDetectNote, tempo1);
    metronome_on();
    pendulum_speed();
    streamer = stream;
    track = stream.getTracks()[0];
    mediaStreamSource = audioContext.createMediaStreamSource(stream);
    visualize();
    connectStream();
    detectPitch();
}

/*
 * Connecter le flux à l'analyser
 */
function connectStream(){
    analyser = audioContext.createAnalyser();
    analyser.fftSize = bufferSize;
    analyser.smoothingTimeConstant = 1;
    mediaStreamSource.connect(analyser);
}

