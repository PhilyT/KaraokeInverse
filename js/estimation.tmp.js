var updateNote = function (note) {
	if(typeof note !== 'undefined')
	{
		console.log("Note mise à jour : " + note);
	}

	$('#note').text(note);
};