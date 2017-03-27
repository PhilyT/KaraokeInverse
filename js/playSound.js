

var AudioContext = (window.AudioContext || window.webkitAudioContext);

function playSound()
{
    // Get an AudioBufferSourceNode.
    // This is the AudioNode to use when we want to play an AudioBuffer
    var source = audioContext.createBufferSource();
    var file = document.getElementById("fileSound").files[0];


    var reader = new FileReader();
    reader.onload = function(){
        var text = reader.result;
        audioContext.decodeAudioData(text, function(buffer) {
                try{


                    // set the buffer in the AudioBufferSourceNode
                    source.buffer = buffer;


                    // start the source playing
                    connectAudio(source);
                    source.start();



                }catch (e){
                    console.error(e);
                }
        },
            function(e){ console.log("Error with decoding audio data:\n" + e.err); });
    };
    reader.readAsArrayBuffer(file);

}

