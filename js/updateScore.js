var updateNote = function (actualNote, oldNote) {
	if(actualNote.duration != "qr")
	{
		if(actualNote.cpt == Math.floor(oldNote.cpt/2))
		{
			render(actualNote);
			$('#note').text(actualNote.fr);
			$('#cents').text(actualNote.cent);
		}
	}
	else
	{
		if(actualNote.cpt==oldNote.cpt)
		{
			$('#note').text(actualNote.fr);

			render(actualNote);
		}
		else
		{
			$('#note').text("waiting");
			$('#cents').text("waiting");
		}

	}
};