var audioOpts = {
    mandatory: {
        "googEchoCancellation": "false",
        "googAutoGainControl": "false",
        "googNoiseSuppression": "false",
        "googHighpassFilter": "false"
    },
    optional: []
};

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
    /*var gainNode = audioCtx.createGain();
    var biquadFilter = audioCtx.createBiquadFilter();*/
    navigator.getUserMedia(
        {audio: audioOpts},
        function (e) {
            console.log("user consent");
            // creates the audio context
            context = new (window.AudioContext || window.webkitAudioContext)();
            // Ajout filtre 
            
            /*var analyser = window.AudioContext.createAnalyser();
            var distortion = window.AudioContext.createWaveShaper();
            var gainNode = window.AudioContext.createGain();
            var biquadFilter = window.AudioContext.createBiquadFilter();
            var convolver = window.AudioContext.createConvolver();*/
            
            
             // creates an audio node from the microphone incoming stream
            mediaStream = context.createMediaStreamSource(e);

           // connection  togther 

            
           /* mediaStream.connect(analyser);
            analyser.connect(distortion);
            distortion.connect(biquadFilter);
            biquadFilter.connect(convolver);
            convolver.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            // manipulation de biquadFilter
            

            biquadFilter.type = "lowshelf";
            biquadFilter.frequency.value = 1000;
            biquadFilter.gain.value = 25;*/
            
            //creation de l'audio context
            //context = new AudioContext();

            analyser = context.createAnalyser();
            // Size max is 16384 byte in ScripteeProcessor
            analyser.fftSize = 2048;


            // bufferSize: the onaudioprocess event is called when the buffer is full
            var bufferSize = 2048;
            var numberOfInputChannels = 2;
            var numberOfOutputChannels = 2;
            if (context.createScriptProcessor) {
                recorder = context.createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels);
            } else {
                recorder = context.createJavaScriptNode(bufferSize, numberOfInputChannels, numberOfOutputChannels);
            }
            recorder.connect(context.destination);
            recorder.onaudioprocess = function (e) {
                var buffer2 = new Uint8Array(analyser.fftSize);
                analyser.getByteTimeDomainData(buffer2);
                var fundalmentalFreq = findFundamentalFreq(buffer2, context.sampleRate);
                if (fundalmentalFreq != -1)
                {
                    console.log("freq trouve : " + fundalmentalFreq);
                    var note = toNote(fundalmentalFreq);
                    if(note)
                    {
                        console.log("Note trouvé : " + note);
                    }
                }
            };
            mediaStream.connect(analyser);
            analyser.connect(recorder);
            mediaStream.connect(context.destination);
        },
        function (e) {
            console.error(e);
        });
}
function stop(){
			alert("stoper");
			var stopRecordingButton = document.getElementById("stopRecordingButton");
  // stop recording
            recorder.disconnect(context.destination);
            mediaStream.disconnect(recorder);
            // we flat the left and right channels down
            // Float32Array[] => Float32Array
            var leftBuffer = flattenArray(leftchannel, recordingLength);
            var rightBuffer = flattenArray(rightchannel, recordingLength);
            // we interleave both channels together
            // [left[0],right[0],left[1],right[1],...]
            var interleaved = interleave(leftBuffer, rightBuffer);
            // we create our wav file
            var buffer = new ArrayBuffer(44 + interleaved.length * 2);
            var view = new DataView(buffer);
            // RIFF chunk descriptor
            writeUTFBytes(view, 0, 'RIFF');
            view.setUint32(4, 44 + interleaved.length * 2, true);
            writeUTFBytes(view, 8, 'WAVE');
            // FMT sub-chunk
            writeUTFBytes(view, 12, 'fmt ');
            view.setUint32(16, 16, true); // chunkSize
            view.setUint16(20, 1, true); // wFormatTag
            view.setUint16(22, 2, true); // wChannels: stereo (2 channels)
            view.setUint32(24, sampleRate, true); // dwSamplesPerSec
            view.setUint32(28, sampleRate * 4, true); // dwAvgBytesPerSec
            view.setUint16(32, 4, true); // wBlockAlign
            view.setUint16(34, 16, true); // wBitsPerSample
            // data sub-chunk
            writeUTFBytes(view, 36, 'data');
            view.setUint32(40, interleaved.length * 2, true);
            // write the PCM samples
            var index = 44;
            var volume = 1;
            for (var i = 0; i < interleaved.length; i++) {
                view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
                index += 2;
            }
            // our final blob
            blob = new Blob([view], { type: 'audio/wav' });
        };

        