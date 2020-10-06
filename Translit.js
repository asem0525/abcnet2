// /*Translit function gets the source as an input from the textarea, it should be passed as UTF-8 by calling onClick="Translit(document.getElementById('input1').value)", 
//the outpust is passed from the function as a newSource, before returning it it writes it into output textarea by document.getElementById('output').value=newSource;*/


function Translit(source){
	var CyrAlph = "йцукенгзхфывапролджэсмтбіқһъьЙЦУКЕНГЗХФЫВАПРОЛДЖЭСМТБІҚҺЪЬ"; // the default Kazakh Cyrillic alphabet
	var LatAlph = "ysukengzhfyvaproldjesmtbiqhiiYSUKENGZHFYVAPROLDJESMTBIQHII"; // letter by letter transliteration
	var QazAlph = "әғүұөшщячюиёӘҒҮҰӨШЩЯЧЮИЁ";                                   // irregular letters in Cyrillic
	var QazLat =["á", "gh", "ý", "ú", "ó", "sh", "sh", "ya", "ch", "yu", "iy", "yo", 
	                            "Á", "Gh", "Ý", "Ú", "Ó", "Sh", "Sh", "Ya", "Ch", "Yu", "Iy", "Yo"]; //irregular letters in Latin
								
	var DauystyJuan = "аиоуүыэюяч";  
    var  DauystyJing = "әеөүұі";
    var  Dauyssyz = "йцкнгзхфвпрлджсмтбшщчъь";
	var  JJbelgiler="ьъЬЪ";
	var Dauysty="еяёю";
	var YYY="үҮыЫ";
	var newSource="";
	
	for (i=0; i<source.length; i++){

		if (source[i]=="и" || source[i]=="И"){		// И әрпі ережелеріне сәйкестендіру
			try{
					prevIY = source[i - 1].toLowerCase();
                    nextIY1 = source[i + 1].toLowerCase();
                    nextIY2 = source[i + 2].toLowerCase();
			}
			catch(err) {
  
			}
                    if ((DauystyJuan.indexOf(nextIY1) != -1) ||
                        (Dauyssyz.indexOf(nextIY1) != -1 &&
                        (Dauyssyz.indexOf(nextIY2) != -1) || DauystyJuan.indexOf(nextIY2) != -1) || nextIY2 == " ")
                    {
                        if (source[i]==source[i].toUpperCase())
						current = "I";
						else current = "i";
                    }
                    else if ((DauystyJing.indexOf(nextIY1) != -1) ||
                        (Dauyssyz.indexOf(nextIY1) != -1 && DauystyJing.indexOf(nextIY2) != -1))
                    {
                        if (source[i]==source[i].toUpperCase())
						current = "IY";
						else current = "iy";
                    }
                    else
                        { if (source[i]==source[i].toUpperCase())
						current = "IY";
						else current = "iy"; 
						}
					newSource=newSource+current;
		}
		
		else if (source[i]=="й" || source[i]=="Й"){		// Й әрпі ережелеріне сәйкестендіру
					prevIY = source[i - 1].toLowerCase();
                    if (YYY.indexOf(prevIY)!=-1){
						if (source[i]==source[i].toUpperCase())
							current = "I";
							else current = "i";
						} 
					else { if (source[i]==source[i].toUpperCase())
							current = "Y";
							else current = "y"; 
						}
			newSource=newSource+current;
		}
		else if (JJbelgiler.indexOf(source[i],0)!=-1){  // егер ь немесе ъ кездессе
			nextJ=source[i+1].toLowerCase();
			if (Dauysty.indexOf(nextJ)!=-1){
				if (source[i]==source[i].toUpperCase())
						current = "I";
						else current = "i";
			}
			else current="";
			newSource=newSource+current;
		}
		else if (source[i]=="ң" || source[i]=="Ң"){
				 nextNG = source[i + 1].toLowerCase();
			if ((CyrAlph.indexOf(nextNG)) == -1 || (QazAlph.indexOf(nextNG) == -1)){
				if (source[i]==source[i].toUpperCase())
						current = "N";
						else current = "n";	}
			else {
					if (source[i]==source[i].toUpperCase())
						current = "Ng";
						else current = "ng";
				}
				newSource=newSource+current;
		}
		else if (CyrAlph.indexOf(source[i],0)!=-1){			// бірлікті әріптерді алмастыру
			var j=CyrAlph.indexOf(source[i]);
			newSource=newSource+LatAlph[j];

		}
		else if (QazAlph.indexOf(source[i])!=-1){			// екілікті әріптерді алмастыру
			j=QazAlph.indexOf(source[i]);

			newSource=newSource+QazLat[j];

		}

		else newSource=newSource+source[i];					// егер әріп кириллдік болмаса
	}
	document.getElementById('output').value=newSource;
	return newSource;
	
	
}