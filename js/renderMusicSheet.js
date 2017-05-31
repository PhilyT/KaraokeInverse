var VF;
var div;
var renderer;
var context;
var stave;
var dummNotes;
var cptnotedanspartition = 0;
var nombredepartition = 1;
var clearVexCanvasBtn;

$(document).ready(function () {
    clearVexCanvasBtn = document.getElementById("clear-vex-canvas");

    clearVexCanvasBtn.addEventListener("click", function(){
        clearVexCanvas();
    });
    
    renderScore();
    dummNotes = [];
    dummNotes.push([]);
// Helper function to justify and draw a 4/4 voice
    VF.Formatter.FormatAndDraw(context, stave[0], dummNotes[nombredepartition-1]);
});

function newPatition(stave){
    var cavnas = document.getElementById("cavtest");
    var partition = document.createElement("div");
    cavnas.appendChild( partition);
}

function clearVexCanvas() {
    dummNotes = [];
    dummNotes.push([]);
    cptnotedanspartition =0;
    nombredepartition=1;
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
    stave = [];
    for(var i=0;i<nombredepartition;i++){
        if(i==0)
        {
            stave.push(new VF.Stave(10, 40, 1000));
        }
        else
        {
            stave.push(new VF.Stave(10, ((i+1)*120), 1000));
        }
        // Connect it to the rendering context and draw!
        stave[i].setContext(context).draw();
    }


}

function render(note) {
    cptnotedanspartition++;
    div.innerHTML = '';

    if(cptnotedanspartition%12 == 0){
        nombredepartition++;
        dummNotes.push([]);
        dummNotes[nombredepartition-1].push(new Vex.Flow.StaveNote({clef: "treble", keys: [note.note], duration: note.duration}));
    }else{
        dummNotes[nombredepartition-1].push(new Vex.Flow.StaveNote({clef: "treble", keys: [note.note], duration: note.duration}));
    }

    renderScore();

    for(var i=0; i<nombredepartition; i++){
        // Helper function to justify and draw a 4/4 voice
        VF.Formatter.FormatAndDraw(context, stave[i], dummNotes[i]);
    }


}