var updateNote = function (note) {
	if(note.success)
	{
		$('#note').text(note.note);
		$('#cents').text(note.cent);
	}
	else
	{
		$('#note').text("waiting");
		$('#cents').text("waiting");
	}
};