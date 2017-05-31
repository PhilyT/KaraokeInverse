var oldNote = {cpt:0};


var updateNote = function () {
	if(oldNote.note != null && !oldNote.affiche)
	{
		/*if(actualNote.cpt == Math.floor(oldNote.cpt/2))
		{
			render(actualNote);
			$('#note').text(actualNote.fr);
		}*/
        render(actualNote);
        $('#note').text(actualNote.fr);
        $('#cents').text(actualNote.cent);
        oldNote.affiche = true;
	}
	else
	{
		/*if(actualNote.cpt==oldNote.cpt)
		{
			$('#note').text(actualNote.fr);

			render(actualNote);
		}
		else
		{
			$('#note').text("waiting");
			$('#cents').text("waiting");
		}*/
        $('#note').text("waiting");
        $('#cents').text("waiting");
	}
};