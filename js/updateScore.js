var updateNote = function (note) {
	if(note.success)
	{
		$('#note').text(note.fr);
		$('#cents').text(note.cent);

		render(note);
	}
	else
	{
		$('#note').text("waiting");
		$('#cents').text("waiting");
	}
};