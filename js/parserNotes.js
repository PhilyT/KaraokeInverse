//Return freq's note in string format
function toNote(freq)
{

	var octave = findOctave(freq);
	if (octave != null)
	{
        // retoure des notes au format américain
		if(estimation(freq, 16.3, octave))
		{
			return "C/" + (octave+1);
		}
		else if(estimation(freq, 18.3, octave))
		{
			return "D/" + (octave+1);
		}
		else if(estimation(freq, 20.5, octave))
		{
			return "E/" + (octave+1);
		}
		else if(estimation(freq, 21.8, octave))
		{
			return "F/" + (octave+1);
		}
		else if(estimation(freq, 24.5, octave))
		{
			return "G/" + (octave+1);
		}
		else if(estimation(freq, 27.5, octave))
		{
			return "A/" + (octave+1);
		}
		else if(estimation(freq, 30.8, octave))
		{
			return "B/" + (octave+1);
		}
		else
		{
			return;
		}
	}
	else
	{
		return;
	}
}

function estimation(freqFundamantal, freqBaseNote, octave)
{
	var freqNote = freqBaseNote*Math.exp(2, octave+1);
	return freqFundamantal < (freqNote+ Math.exp(2, octave+1)) && freqFundamantal > (freqNote- Math.exp(2, octave+1));
}

// return freq's octave, int[-1,9]
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
