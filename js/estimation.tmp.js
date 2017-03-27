var updateNote = function (note) {
	if(typeof note !== 'undefined')
	{
		console.log("cent : " + note.cent);
	}

	$('#note').text(note);
};