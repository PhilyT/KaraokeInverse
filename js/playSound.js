function playSound()
{
    // Get an AudioBufferSourceNode.
    // This is the AudioNode to use when we want to play an AudioBuffer
    var source = audioContext.createBufferSource();
    var file = document.getElementById("fileSound").files[0];
    var fileTypes = ['wav', 'mp3'];
    // Restreindre les type de fichiers a accepter
    // Empecher de lancer un fichier inadequat ou de lancer sans fichier 
    if (file) {
        var extension = file.name.split('.').pop().toLowerCase();
        var accepted = fileTypes.indexOf(extension) > -1;
        if (accepted) {
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
                            var millisecondsToWait = buffer.duration*1000;
                            setTimeout(function() {
                                disconnectAudio(source);
                            }, millisecondsToWait);

                        }catch (e){
                            console.error(e);
                        }
                },
                    function(e){ console.log("Error with decoding audio data:\n" + e.err); });
            };
            reader.readAsArrayBuffer(file);

        }else{
            alert("Fichier inadequat:\nFichier n'est pas de type wav ou mp3.");
        }    
    }else{
        alert("Fichier introuvable:\nVeuillez selection un fichier wav ou mp3.")
    }
   
    
    

}

