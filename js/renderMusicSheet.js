var VF;
var div;
var renderer;
var context;
var stave;
var dummNotes;

var clearVexCanvasBtn;

$(document).ready(function () {
    clearVexCanvasBtn = document.getElementById("clear-vex-canvas");

    clearVexCanvasBtn.addEventListener("click", function(){
        clearVexCanvas();
    });
    
    renderScore();
    dummNotes = [];

// Helper function to justify and draw a 4/4 voice
    VF.Formatter.FormatAndDraw(context, stave, dummNotes);
});

function newPatition(stave){
    var cavnas = document.getElementById("cavtest");
    var partition = document.createElement("div");
    cavnas.appendChild( partition);
}

function clearVexCanvas() {
    dummNotes = [];
    div.innerHTML = "";
    renderScore();
}

function renderScore() {
    VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element named "vex-canvas".
    div = document.getElementById("vex-canvas");
    renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Configure the rendering context.
    renderer.resize(1000, 230);
    context = renderer.getContext();
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

// Create a stave of width 400 at position 10, 40 on the canvas.
    stave = new VF.Stave(10, 40, 1000);
// Connect it to the rendering context and draw!
    stave.setContext(context).draw();
}

function render(note) {
    div.innerHTML = '';
    renderScore();

    dummNotes.push(new Vex.Flow.StaveNote({clef: "treble", keys: [note.note], duration: note.duration}));

// Helper function to justify and draw a 4/4 voice
    VF.Formatter.FormatAndDraw(context, stave, dummNotes);
}