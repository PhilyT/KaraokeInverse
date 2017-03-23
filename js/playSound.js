

var AudioContext = (window.AudioContext || window.webkitAudioContext);

function playSound()
{
    // Get an AudioBufferSourceNode.
    // This is the AudioNode to use when we want to play an AudioBuffer
    var source = audioContext.createBufferSource();

    var src = document.getElementById("fileSound").value.toString().split('\\');
    console.log(src);
    taillesrc = src.length;
    var file = "./Sound/"+ src[taillesrc-1];

    /*var reader = new FileReader();
    reader.onload = function(){
        var text = reader.result;
        audioContext.decodeAudioData(text, function(buffer) {
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
                        buffer1 = new AudioBuffer(audioContext, {length:32768, numberOfChannels:2, sampleRate:audioContext.sampleRate});
                        buffer1.copyToChannel(arrayLeft, 0, 0);
                        buffer1.copyToChannel(arrayRigth, 1, 0);
                    }

                    // set the buffer in the AudioBufferSourceNode
                    source.buffer = buffer;
                    var bufferSize2 = buffer1.length;
                    var analyser2 = audioContext.createAnalyser();
                    // Size max is 16384 byte in ScripteeProcessor
                    analyser2.fftSize = bufferSize2;
                    var ScriptProcessorNode = audioContext.createScriptProcessor(16384);
                    ScriptProcessorNode.buffer = buffer1;
                    ScriptProcessorNode.connect(audioContext.destination);

                    ScriptProcessorNode.onaudioprocess = function(e) {
                        var buffer2 = new Uint8Array(analyser2.fftSize);
                        analyser2.getByteTimeDomainData(buffer2);
                        //console.log("playSound");
                        var fundalmentalFreq = findFundamentalFreq(buffer2, audioContext.sampleRate);
                        if (fundalmentalFreq != -1)
                        {
                            console.log("Note trouvé : " + toNote(fundalmentalFreq));
                        }
                        source.stop(buffer.duration);
                        ScriptProcessorNode.disconnect(audioContext.destination);
                        source.disconnect(audioContext.destination);
                    };

                    // connect the AudioBufferSourceNode to the
                    // destination so we can hear the sound
                    source.connect(analyser2);
                    analyser.connect(ScriptProcessorNode);
                    source.connect(audioContext.destination);

                    // start the source playing
                    source.start();
                    source.buffer = buffer;



                }catch (e){
                    console.error(e);
                }
        },
            function(e){ console.log("Error with decoding audio data:\n" + e.err); });
    };
    reader.readAsArrayBuffer(file);*/
    audio.src = file;
    connectAudio(audio);
}

