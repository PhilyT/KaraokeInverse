//Return freq's note in string format
function toNote(freq)
{

	var octave = findOctave(freq);
	if (typeof octave!== 'undefined')
	{
		console.log(freq);
        // retoure des notes au format américain
		if(estimation(freq, 16.3, octave))
		{
			return "C/" + (octave+1);
		}
		else if(estimation(freq, 17.3, octave))
		{
			return "C#/" + (octave+1);
		}
		else if(estimation(freq, 18.3, octave))
		{
			return "D/" + (octave+1);
		}
		else if(estimation(freq, 19.4, octave))
		{
			return "D#/" + (octave+1);
		}
		else if(estimation(freq, 20.5, octave))
		{
			return "E/" + (octave+1);
		}
		else if(estimation(freq, 21.8, octave))
		{
			return "F/" + (octave+1);
		}
		else if(estimation(freq, 23.1, octave))
		{
			return "F#/" + (octave+1);
		}
		else if(estimation(freq, 24.5, octave))
		{
			return "G/" + (octave+1);
		}
		else if(estimation(freq, 26.0, octave))
		{
			return "G#/" + (octave+1);
		}
		else if(estimation(freq, 27.5, octave))
		{
			return "A/" + (octave+1);
		}
		else if(estimation(freq, 29.1, octave))
		{
			return "A#/" + (octave+1);
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
	var freqNote = freqBaseNote*Math.pow(2, octave+1);
	console.log("octave : " + octave + " freq : " +freqNote);
	return freqFundamantal < (freqNote+ Math.exp(2, octave)) && freqFundamantal > (freqNote- Math.exp(2, octave));
}

// return freq's octave, int[-1,9]
function findOctave(freq)
{
	if(freq < 31.3 && freq > 15.8)
	{
		return -1;
	}
	else if(freq < 63 && freq > 31.7)
	{
		return 0;
	}
	else if(freq < 125 && freq > 63)
	{
		return 1;
	}
	else if(freq < 251 && freq > 127)
	{
		return 2;
	}
	else if(freq < 502 && freq > 254)
	{
		return 3;
	}
	else if(freq < 1004 && freq > 507)
	{
		return 4;
	}
	else if(freq < 2007 && freq > 1014)
	{
		return 5
	}
	else if(freq < 4015 && freq > 2028)
	{
		return 6;
	}
	else if(freq < 8030 && freq > 4056)
	{
		return 7;
	}
	else if(freq < 16060 && freq > 8112)
	{
		return 8;
	}
	else if(freq < 21610 && freq > 16224)
	{
		return 9;
	}
	else
	{
		return;
	}
}
