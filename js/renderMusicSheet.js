var VF;
var div;
var renderer;
var context;
var stave;
var stave2;
var dummNotes;

$(document).ready(function () {
    renderScore();
    dummNotes = [];

// Helper function to justify and draw a 4/4 voice
    VF.Formatter.FormatAndDraw(context, stave, dummNotes);
});

function renderScore() {
    VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element named "boo".
    div = document.getElementById("boo");
    renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Configure the rendering context.
    renderer.resize(1000, 500);
    context = renderer.getContext();
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

// Create a stave of width 400 at position 10, 40 on the canvas.
    stave = new VF.Stave(10, 40, 400);
// Create a stave of width 400 at position 410, 40 on the canvas.
    stave2 = new VF.Stave(410, 40, 400);

// Add a clef and time signature.
    stave.addClef("treble").addTimeSignature("4/4");

// Connect it to the rendering context and draw!
    stave.setContext(context).draw();
    stave2.setContext(context).draw();
}

function render(note) {
    div.innerHTML = '';
    renderScore();
    dummNotes.push(new Vex.Flow.StaveNote({clef: "treble", keys: [note], duration: "h"}));

    var otherNotes = [];
    otherNotes.push(new Vex.Flow.StaveNote({clef: "treble", keys: ["g/4"], duration: "q"}));

// Helper function to justify and draw a 4/4 voice
    VF.Formatter.FormatAndDraw(context, stave, dummNotes);
    VF.Formatter.FormatAndDraw(context, stave2, otherNotes);
}