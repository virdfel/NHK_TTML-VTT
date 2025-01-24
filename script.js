/*
* NHK TTML to VTT subtitles converter
*
* v0.1
*/

function msToTime(s){
	s *= 1000;
	var ms = s % 1000;
	s = (s - ms) / 1000;
	var secs = s % 60;
	s = (s - secs) / 60;
	var mins = s % 60;
	var hrs = (s - mins) / 60;

	return ((hrs<10)?'0':'')+hrs +':'+ ((mins<10)?'0':'')+mins +':'+ ((secs<10)?'0':'')+secs +'.'+ ((ms<10)?'00':((ms<100)?'0':''))+ms;
}

$(document).ready(function(){			
	$("#tin").bind('input propertychange', function(){		
		var textin = $("#tin").val().split("\n");	
		var text = [];
			
		var j = 0;
		$.each(textin, function(i,val){
			if(val.search('time="') != -1){
				text.push([val, '']);
				j++;
			}
			if(val.search('CDATA') != -1){
				text[j-1][1] = text[j-1][1] + val.replace('<![CDATA[', '').replace(']]>', '');
			}
		});
		
		var tout = "";
		for(var i=0; i<j-1; i++){		
			tout += msToTime(text[i][0].split('"')[3]) +' --> '+ msToTime(text[i+1][0].split('"')[3]) + '\n';
			tout += text[i][1] + '\n';
		}
		
		$("#tout").val("WEBVTT \n\n" + tout);
	});		
});
