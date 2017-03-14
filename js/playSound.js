var audioOpts = {
    mandatory: {
        "googEchoCancellation": "false",
        "googAutoGainControl": "false",
        "googNoiseSuppression": "false",
        "googHighpassFilter": "false"
    },
    optional: []
};

var AudioContext = (window.AudioContext || window.webkitAudioContext);
var audioCtx = new AudioContext();

function playSound()
{
    // Get an AudioBufferSourceNode.
    // This is the AudioNode to use when we want to play an AudioBuffer
    var source = audioCtx.createBufferSource();

    var file = document.getElementById("fileSound").files[0];

    var reader = new FileReader();
    reader.onload = function(){
        var text = reader.result;
        audioCtx.decodeAudioData(text, function(buffer) {
                try{
                    var buffer1;
                    if(buffer.length <= 32768)
                    {
                        buffer1= buffer;
                    }
                    else
                    {
                        var arrayLeft = buffer.getChannelData(0).slice(0,32768);
                        var arrayRigth = buffer.getChannelData(1).slice(0,32768);
                        buffer1 = new AudioBuffer(audioCtx, {length:32768, numberOfChannels:2, sampleRate:audioCtx.sampleRate});
                        buffer1.copyToChannel(arrayLeft, 0, 0);
                        buffer1.copyToChannel(arrayRigth, 1, 0);
                    }

                    // set the buffer in the AudioBufferSourceNode
                    source.buffer = buffer;
                    var bufferSize = buffer1.length;
                    analyser = audioCtx.createAnalyser();
                    // Size max is 16384 byte in ScripteeProcessor
                    analyser.fftSize = bufferSize;
                    var ScriptProcessorNode = audioCtx.createScriptProcessor(16384);
                    ScriptProcessorNode.buffer = buffer1;
                    ScriptProcessorNode.connect(audioCtx.destination);

                    ScriptProcessorNode.onaudioprocess = function(e) {
                        var buffer2 = new Uint8Array(analyser.fftSize);
                        analyser.getByteTimeDomainData(buffer2);
                        console.log(buffer2);
                        var fundalmentalFreq = findFundamentalFreq(buffer2, audioCtx.sampleRate);
                        if (fundalmentalFreq != -1)
                        {
                            console.log("Note trouvé : " + toNote(fundalmentalFreq));
                        }
                        source.stop(buffer.duration);
                        ScriptProcessorNode.disconnect(audioCtx.destination);
                        source.disconnect(audioCtx.destination);
                    };

                    // connect the AudioBufferSourceNode to the
                    // destination so we can hear the sound
                    source.connect(analyser);
                    analyser.connect(ScriptProcessorNode);
                    source.connect(audioCtx.destination);

                    // start the source playing
                    source.start();

                }catch (e){
                    console.error(e);
                }
        },
            function(e){ console.log("Error with decoding audio data:\n" + e.err); });
    };
    reader.readAsArrayBuffer(file);
}

