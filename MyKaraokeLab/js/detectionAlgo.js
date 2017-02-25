// Obtenir le tableau des frequences qui correspond a f0 = 440Hz
var notesTable;
var notesArray;
var baseFreq = 440;
$.getJSON('js/notes.json', function (data) {
	notesTable = data;
	notesArray = notesTable[baseFreq.toString()];
});






var findCentsOffPitch = function(freq, refFreq) {
    // Nous devons trouver dans quelle mesure freq est de baseFreq en cents
    var log2 = 0.6931471805599453; // Math.log(2)
    var multiplicativeFactor = freq / refFreq;
    
    // Nous utilisons Math.floor pour obtenir la partie entière et ignorer les décimales
    var cents = Math.floor(1200 * (Math.log(multiplicativeFactor) / log2));
    return cents;
};