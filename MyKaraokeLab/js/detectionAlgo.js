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

var findClosestNote = function(freq, notes) {
  /*
  ** Cette méthode utilise la recherche dichotomique pour
  ** accélérer la recherche dans le fichier json
  */
  var low = -1, high = notes.length;
  while (high - low > 1) {
      var pivot = Math.round((low + high) / 2);
      if (notes[pivot].frequency <= freq) {
          low = pivot;
      } else {
          high = pivot;
      }
  }
   if(Math.abs(notes[high].frequency - freq) <= Math.abs(notes[low].frequency - freq)) {
      // Notes [high] est plus proche de la fréquence que nous avons trouvée
      return notes[high];
  }
  return notes[low];
};

var updateNote = function (note) {
	$('#note').text(note);
};

var updateCents = function (cents) {
	// la veleur de la cent peut etre négative ..
	$('#cents').text(cents);
};

var findFundamentalFreq = function(buffer, sampleRate) {
	// TODO
	// Implémenter l'algorithme qui permet de retrouver la fréquence fondamentale

	var n = 1024, bestR = 0, bestK = -1;
	for(var k = 8; k <= 1000; k++){
		var sum = 0;
		
		for(var i = 0; i < n; i++){
			sum += ((buffer[i] - 128) / 128) * ((buffer[i + k] - 128) / 128);
		}
		
		var r = sum / (n + k);
		if(r > bestR){

			bestR = r;
			bestK = k;
		}

		if(r > 0.9) {
			
			// Supposons que c'est assez bon et arret
			break;

		}
	}
};