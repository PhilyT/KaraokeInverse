var oldNote = {};


var updateNote = function () {
	if(oldNote.note != null && !oldNote.affiche)
	{
        render(oldNote);
        $('#note').text(oldNote.fr);
        $('#cents').text(oldNote.cent);
        oldNote.affiche = true;
	}
	else
	{
        $('#note').text("waiting");
        $('#cents').text("waiting");
	}
};