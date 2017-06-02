var tabNote = [];
var detectNote = false;
var timer1;
var timer2;
var tempo1;
var tempo2;

var runDetectNote = function(){
  	detectNote = true;
  	tabNote = [];
    timer2 = setTimeout(updateNote, tempo2);
};

var updateNote = function () {
	if(tabNote.length > 0)
	{
		var noteAffiche = {cpt:0};
        var tab = [];
		for(var i=0; i < tabNote.length; i++){
			tab = appartien(tabNote[i], tab);
		}
        for(var i=0; i < tab.length; i++){
            if(tab[i].cpt>noteAffiche.cpt){
            	noteAffiche = tab[i];
			}
        }
        render(noteAffiche);
	}
	detectNote =false;
};

function appartien(valeur, tab){
	var trouve = false;
	for(var j = 0; j<tab.length;j++){
		if(tab[j].note == valeur.note)
		{
			tab[j].cpt++;
			trouve = true;
		}
	}
	if(!trouve){
		tab.push(valeur);
	}
	return tab;
}