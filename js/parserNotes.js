function toNote(tone)
{
	var freq = tone.freq;
	var db = tone.db;
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
	else if(freq <= 30.8 && freq >= 16.3)
	{
		return 0;
	}
	else if(freq <= 30.8 && freq >= 16.3)
	{
		return 2;
	}
	else if(freq <= 30.8 && freq >= 16.3)
	{
		return 3;
	}
	else if(freq <= 30.8 && freq >= 16.3)
	{
		return 4;
	}
	else if(freq <= 30.8 && freq >= 16.3)
	{
		return 5;
	}
	else if(freq <= 30.8 && freq >= 16.3)
	{
		return 6
	}
	else if(freq <= 30.8 && freq >= 16.3)
	{
		return 7;
	}
	else if(freq <= 30.8 && freq >= 16.3)
	{
		return 8;
	}
	else if(freq <= 30.8 && freq >= 16.3)
	{
		return 9;
	}
	else
	{
		return;
	}
}
