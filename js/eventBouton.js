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
            var gainNode =  window.AudioContext.createGain();
            var biquadFilter =  window.AudioContext.createBiquadFilter();
            context = new AudioContext();
            // creates an audio node from the microphone incoming stream
            mediaStream = context.createMediaStreamSource(e);

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
        