var tabNote;
var detectNote = false;
var timer1;
var timer2;
var tempo1;
var tempo2;

var runDetectNote1 = function(){
    detectNote = true;
    tabNote = [];
    tempo2=60000/parseInt($(".bpm-input").val())/4.0;
    timer2 = setTimeout(updateNote, tempo2);
};

var runDetectNote2 = function(){
  	detectNote = true;
  	tabNote = [];
  	tempo2=60000/parseInt($(".bpm-input").val())/2.0;
    timer2 = setTimeout(updateNote, tempo2);
};

var updateNote = function () {
	if(tabNote.length > 0)
	{
		var noteAffiche = {cpt:0, amplitude:0};
        for(var i=0; i < tabNote.length; i++){
            if(tabNote[i].amplitude>noteAffiche.amplitude){
            	noteAffiche = tabNote[i];
			}
        }
        render(noteAffiche);
	}
	detectNote =false;
};

var runTimers = function () {
	timer1 = setTimeout(runDetectNote2, tempo1);
};