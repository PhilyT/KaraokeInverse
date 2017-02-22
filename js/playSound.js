function playSound()
{
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // Get an AudioBufferSourceNode.
    // This is the AudioNode to use when we want to play an AudioBuffer
    var source = audioCtx.createBufferSource();

    var file = document.getElementById("fileSound").files[0];

    var reader = new FileReader();
    reader.onload = function(){
        var text = reader.result;
        audioCtx.decodeAudioData(text, function(buffer) {
                // set the buffer in the AudioBufferSourceNode
                source.buffer = buffer;

                source.connect(audioCtx.destination);
                source.loop = true;

                // connect the AudioBufferSourceNode to the
                // destination so we can hear the sound
                source.connect(audioCtx.destination);

                // start the source playing
                source.start();
                source.stop(audioCtx.currentTime + 1);
        },
            function(e){ console.log("Error with decoding audio data" + e.err); });
    };
    reader.readAsArrayBuffer(file);
}