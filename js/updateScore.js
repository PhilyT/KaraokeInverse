var updateNote = function (note) {
	if(note.success)
	{
		$('#note').text(note.note);
		$('#cents').text(note.cent);

		render(note.note);
	}
	else
	{
		$('#note').text("waiting");
		$('#cents').text("waiting");
	}
};