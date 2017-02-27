function toNote(freq)
{

	var octave = findOctave(freq);
	if (octave != null)
	{
		switch (freq)
		{
			case 16.3*Math.exp(2,db+1):
				return "do" + octave;
			case 18.3*Math.exp(2,db+1):
				return "re" + octave;
			case 20.5*Math.exp(2,db+1):
				return "mi" + octave;
			case 21.8*Math.exp(2,db+1):
				return "fa" + octave;
			case 24.5*Math.exp(2,db+1):
				return "sol" + octave;
			case 27.5*Math.exp(2,db+1):
				return "la" + octave;
			case 30.8*Math.exp(2,db+1):
				return "si" + octave;
			default:
				return;
		}
	}
	else
	{
		return;
	}
}

function findOctave(freq)
{
	if(freq <= 30.8 && freq >= 16.3)
	{
		return -1;
	}
	else if(freq <= 62 && freq >= 32.7)
	{
		return 0;
	}
	else if(freq <= 123 && freq >= 65)
	{
		return 1;
	}
	else if(freq <= 247 && freq >= 131)
	{
		return 2;
	}
	else if(freq <= 494 && freq >= 262)
	{
		return 3;
	}
	else if(freq <= 988 && freq >= 523)
	{
		return 4;
	}
	else if(freq <= 1975 && freq >= 1046)
	{
		return 5
	}
	else if(freq <= 3951 && freq >= 2092)
	{
		return 6;
	}
	else if(freq <= 7902 && freq >= 4184)
	{
		return 7;
	}
	else if(freq <= 15804 && freq >= 8368)
	{
		return 8;
	}
	else if(freq <= 21098 && freq >= 16736)
	{
		return 9;
	}
	else
	{
		return;
	}
}
