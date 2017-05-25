function visualize() {
    var voiceSelect = document.getElementById("voice");
    var source;
    var stream;

//les différents nœuds audio que nous utiliserons pour l'application
    var distortion = audioContext.createWaveShaper();
    var gainNode = audioContext.createGain();
    var biquadFilter = audioContext.createBiquadFilter();
    var convolver = audioContext.createConvolver();


// Configurer le contexte de la toile pour le visualiseur
    var canvas = document.querySelector('.visualizer');
    var canvasCtx = canvas.getContext("2d");
    visualSelect = document.getElementById("visual");

    WIDTH = canvas.width;
    HEIGHT = canvas.height;
    var visualSetting = visualSelect.value;
    console.log(visualSetting);
    if (visualSetting == "sinewave") {
        analyser.fftSize = 2048;
        var bufferLength = analyser.fftSize;
        console.log(bufferLength);
        var dataArray = new Uint8Array(bufferLength);

        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

        function draw() {
            drawVisual = requestAnimationFrame(draw);

            analyser.getByteTimeDomainData(dataArray);

            canvasCtx.fillStyle = 'rgb(200, 200, 200)';
            canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

            canvasCtx.beginPath();

            var sliceWidth = WIDTH * 1.0 / bufferLength;
            var x = 0;

            for (var i = 0; i < bufferLength; i++) {

                var v = dataArray[i] / 128.0;
                var y = v * HEIGHT / 2;

                if (i === 0) {
                    canvasCtx.moveTo(x, y);
                } else {
                    canvasCtx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            canvasCtx.lineTo(canvas.width, canvas.height / 2);
            canvasCtx.stroke();
            analyser.fftSize = bufferSize;
        }

        draw();

    } else if (visualSetting == "frequencybars") {
        analyser.fftSize = 256;
        var bufferLength = analyser.frequencyBinCount;
        console.log(bufferLength);
        var dataArray = new Uint8Array(bufferLength);

        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

        function draw() {
            drawVisual = requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);

            canvasCtx.fillStyle = 'rgb(0, 0, 0)';
            canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

            var barWidth = (WIDTH / bufferLength) * 2.5;
            var barHeight;
            var x = 0;

            for (var i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i];

                canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
                canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);

                x += barWidth + 1;
            }
            analyser.fftSize = bufferSize;
        }

        draw();

    } else if (visualSetting == "off") {
        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
        canvasCtx.fillStyle = "red";
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
    }

    // Les auditeurs d'événements modifient les paramètres de visualisation et de voix

    visualSelect.onchange = function () {
        window.cancelAnimationFrame(drawVisual);
        visualize();
    }

}

