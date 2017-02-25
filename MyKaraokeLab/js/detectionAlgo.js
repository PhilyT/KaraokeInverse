// Obtenir le tableau des frequences qui correspond a f0 = 440Hz
var notesTable;
var notesArray;
var baseFreq = 440;
$.getJSON('js/notes.json', function (data) {
	notesTable = data;
	notesArray = notesTable[baseFreq.toString()];
});
