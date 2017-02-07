function enregistrement() {
    var startRecordingButton = document.getElementById("startRecordingButton");

    var leftchannel = [];
    var rightchannel = [];
    var recorder = null;
    var recordingLength = 0;
    var volume = null;
    var mediaStream = null;
    var sampleRate = 44100;
    var context = null;
    var blob = null;
    

    // Initialize recorder
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    var gainNode = audioCtx.createGain();
    var biquadFilter = audioCtx.createBiquadFilter();
    navigator.getUserMedia(
        {
            audio: true
        },
        function (e) {
            console.log("user consent");
            // creates the audio context
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            // Ajout filtre 
            
            var analyser = window.AudioContext.createAnalyser();
            var distortion = window.AudioContext.createWaveShaper();
            var gainNode = window.AudioContext.createGain();
            var biquadFilter = window.AudioContext.createBiquadFilter();
            var convolver = window.AudioContext.createConvolver();
            
            
             // creates an audio node from the microphone incoming stream
            mediaStream = context.createMediaStreamSource(e);

           // connection  togther 

            
            mediaStream.connect(analyser);
            analyser.connect(distortion);
            distortion.connect(biquadFilter);
            biquadFilter.connect(convolver);
            convolver.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            //creation de l'audio context
            context = new AudioContext();
           

            // bufferSize: the onaudioprocess event is called when the buffer is full
            var bufferSize = 2048;
            var numberOfInputChannels = 2;
            var numberOfOutputChannels = 2;
            if (context.createScriptProcessor) {
                recorder = context.createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels);
            } else {
                recorder = context.createJavaScriptNode(bufferSize, numberOfInputChannels, numberOfOutputChannels);
            }
            recorder.onaudioprocess = function (e) {
                leftchannel.push(new Float32Array(e.inputBuffer.getChannelData(0)));
                rightchannel.push(new Float32Array(e.inputBuffer.getChannelData(1)));
                recordingLength += bufferSize;
            };

            mediaStream.connect(recorder);
            recorder.connect(context.destination);
        },
        function (e) {
            console.error(e);
        });
}
        