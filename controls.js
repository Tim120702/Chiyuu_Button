// JavaScript Document
var voiceName = new Array(); //for random play
var updateTime ;		//storage for updatetime
var voiceNumber ;		//storager 4 number of audios
var multi = false;		//control param for multiple player
var song = false;		// control param for song (if true, the route will add sth)
//var eleID = "";			// store the audios names
var HDActive = false;	//If true, higher qulity song will be play
var countaudio = 0;		// count the how many audios was played together and record the maximum
var loop = false;
	
function playaudio(eleID){
	var button = document.getElementById(eleID);
	var audioplayer = document.getElementById("music");
	var songname = document.getElementById("songName");
	var audiosrc ;
	if (HDActive){		//Higer qulity song
		if(song){audiosrc = "SpiritSound/" +eleID + "_HD.ogg";}		
	}
	else{
		audiosrc = "SpiritSound/" +eleID + ".mp3";
	}
	if (multi){			//multiple audios play together
		multiplayer(audiosrc);
	}
	else{				//simple play the audio
		audioplayer.src = audiosrc;
		if(loop){
			audioplayer.loop;
		}
		else{
			audioplayer.removeAttribute("loop");
		}
		if(audioplayer.paused){                 
			audioplayer.play();
		}
		else{
			audio();
		} 
	}
	songname.innerHTML = "现在播放：" + button.innerHTML;	//record the audio name now playing
}

function randomVoice(){				//randomly play a audio(need to fix)
	var RandomNumber = Math.floor(Math.random()*voiceName.length);
	//console.log(voiceName[RandomNumber]);
	voiceControl(voiceName[RandomNumber]);
}

function voiceLoop(){				//if true the audio play will loop
	if (loop){
		loop = false;
		eleStateColor("loop","#E8779F");
	}
	else{
		loop = true;
		eleStateColor("loop","#CC255F");
	}		
}
		
function multiplayer(src){
	var multiaudioplayer = new Audio()
	multiaudioplayer.id = "audioplayer" + String(countaudio);
	multiaudioplayer.controls = true;
	multiaudioplayer.preload = true;
	multiaudioplayer.hidden = true;
	multiaudioplayer.onpause = "resetName()";
	multiaudioplayer.src = src;
	if(loop){
		multiaudioplayer.loop;
	}
	else{
		multiaudioplayer.removeAttribute("loop");
	}
	multiaudioplayer.play();
	countaudio = countaudio + 1;
	document.body.appendChild(multiaudioplayer);
}

function voiceStop(){				//stop all audios now playing
	var defaultAudioplayer = document.getElementById("music");
	var multiplayer ;
	var playerID;
	defaultAudioplayer.removeAttribute("loop");
	defaultAudioplayer.src="";
	resetName();
	//console.log(countaudio);
	if (multi){						//stop multiplaying audios
		for(var i = 0;i < (countaudio+1); i++){
			playerID = "audioplayer" + String(i);
			multiplayer = document.getElementById(playerID);
			if (document.body.contains(multiplayer)){
				//console.log(playerID + "exist");
				multiplayer.remove();
			}
			else{
				//console.log(playerID+ " not exist")
			}		
		}
	}
	countaudio = 0;
	//console.log(countaudio);
}

		
function voiceControl(butID){		//play audio clip
	song = false;
	playaudio(butID);
}
		
function songControl(butID){		//play songs
	song = true;
	playaudio(butID);
}
		
function switchHD(){				// if HD is true chang reletive params
	if (HDActive){
		HDActive = false;
		eleStateColor("HD","#E8779F");
	}
	else{
		HDActive = true;
		eleStateColor("HD","#cc225f");
	}
}
		
function resetName(){	// when audio stope reset the audio name showed on the bottom column
	var songname = document.getElementById("songName");
	songname.innerHTML = "";
}

function multiPlayerAct(){			//if multiplay selected change the buttoncolor
	if (multi){
		multi = false;
		eleStateColor("multi","#E8779F");
	}
	else{
		multi = true;
		eleStateColor("multi","#cc225f");
	}
}
		
function eleStateColor(ElementID,eleColor){			//if the button was selected change its color
	var element = document.getElementById(ElementID);
	element.style.borderColor=eleColor;
	element.style.backgroundColor=eleColor;
}
	
function getAudioList(){
	var Num = 0 ;
	data1 = $.ajax({
		url: 'songlist.json',
		async: false,
	});	
	$.each(data1.responseJSON,function(idx,obj){
		voiceName[Num] = obj;
		Num = Num + 1;
	});
	//console.log(voiceName);
	data2 = $.ajax({
		url: 'songnumber.json',
		async: false,
	});	
		voiceNumber = data2.responseText;
}
		
function getUpdateTime(){
	var date;
	var time;
	data = $.ajax({
		type:'GET',
		url: 'https://api.github.com/repos/Tim120702/Chiyuu_Button',
		async: false,
	});
	$.each(data.responseJSON,function(key,obj){
		if(key == "updated_at"){
			date = obj.split('T')[0];
			time = obj.split('T')[1].replace("Z","");
		}	
	});
	var update = new Date(date.split('-')[0],date.split('-')[1]-1,date.split('-')[2],Number(time.split(':')[0])+8,time.split(':')[1],time.split(':')[2]);
	time4update = update.toISOString().split('T')[0] + " " + update.toTimeString().replace(/\s*/g,"").replace("GMT+0800(中国标准时间)","");
	return time4update;
}

function broswercheck(){	
	var browser = (function BrowserVersion(agent) {		//check browse if IE/Edge shutdown the function 1.Now playing audio name record;2.random play
		switch (true) {
			case agent.indexOf("edge") > -1: return "edge";
			case agent.indexOf("edg") > -1: return "chromium based edge (dev or canary)";
			case agent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera: return "IE";
			default: return "other";
		}
	})(window.navigator.userAgent.toLowerCase());
	$(document).ready(function(){
		switch (browser){
			case "ie" : 
				disableUncompatableFuctions(browser);
				break;
			case "edge":
				disableUncompatableFuctions(browser);
				break;
		}
	});
}
		
function disableUncompatableFuctions(broswerName){
	$("#bottomsign").remove();
	$("#randomplay").remove();
	$("#readrandom").remove();		
	alert("因"+broswerName+"潜在的兼容性问题，网页部分功能暂停使用");
}

function datainitial(){
	var updateTime = getUpdateTime()
	var updateinfo = "当前音声量:" + String(voiceNumber).replace(/\"/g, "") + "(更新于" + String(updateTime) +")";
	console.log(updateinfo);
	$(document).ready(function(){document.getElementById("updateinfo").innerText = updateinfo;});
}