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
    stave = new VF.Stave(10, 40, 1000);

// Connect it to the rendering context and draw!
    stave.setContext(context).draw();
}

function render(note) {
    div.innerHTML = '';
    renderScore();
    //  ## = pause
    //dummNotes.push(new Vex.Flow.StaveNote({clef: "treble", keys: [note], duration: "h"}));
    if(note != "##")
    {
        dummNotes.push(new Vex.Flow.StaveNote({clef: "treble", keys: [note], duration: "h"}));
    }


// Helper function to justify and draw a 4/4 voice
    VF.Formatter.FormatAndDraw(context, stave, dummNotes);
}