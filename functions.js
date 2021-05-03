// JavaScript Document
var voiceName = new Array(); //for random play
var updateTime ;		//storage for updatetime
var voiceNumber ;		//storager 4 number of audios
var multi = false;		//control param for multiple player
var song = false;		// control param for song (if true, the route will add sth)
//var eleID = "";			// store the sounds names
var HDActive = false;	//If true, higher qulity song will be play
var countaudio = 0;		// count the how many audios was played together and record the maximum
var loop = false;
	
function playsound(eleID){
	var button = document.getElementById(eleID);
	var audio = document.getElementById("music");
	var songname = document.getElementById("songName");
	var audiosrc ;
	if (HDActive){		//Higer qulity song
		if(song){audiosrc = "SpiritSound/" +eleID + "_HD.ogg";}		
	}
	else{
		audiosrc = "SpiritSound/" +eleID + ".mp3";
	}
	if (multi){			//multiple sounds play together
		multiplayer(audiosrc,countaudio,loop);
		countaudio = countaudio + 1;
	}
	else{				//simple play the sound
		audio.src = audiosrc;
		if(loop){
			audio.loop;
		}
		else{
			audio.removeAttribute("loop");
		}
		if(audio.paused){                 
			audio.play();
		}
		else{
			audio();
		} 
	}
	songname.innerHTML = "现在播放：" + button.innerHTML;	//record the sound name now playing
}
		
function multiplayer(src, playerNum,loop){
	var audio = new Audio()
	audio.id = "soundplayer" + playerNum;
	audio.controls = true;
	audio.preload = true;
	audio.hidden = true;
	audio.onpause = "resetName()";
	audio.src = src;
	if(loop){
		audio.loop;
	}
	else{
		audio.removeAttribute("loop");
	}
	audio.play();
	document.body.appendChild(audio);
}
		
function voiceControl(butID){		//play sound clip
	song = false;
	playsound(butID);
}
		
function songControl(butID){		//play songs
	song = true;
	playsound(butID);
}

function multiPlayerAct(){			//if multiplayer true change the params
	if (multi){
		multi = false;
		eleStateColor("multi","#E8779F");
	}
	else{
		multi = true;
		eleStateColor("multi","#cc225f");
	}
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
		
function eleStateColor(ElementID,eleColor){			//if the button was selected change its color
	var element = document.getElementById(ElementID);
	element.style.borderColor=eleColor;
	element.style.backgroundColor=eleColor;
}

function voiceStop(){				//stop all sounds now playing
	var audio = document.getElementById("music");
	var songname = document.getElementById("songName");
	var multiplayer ;
	var playerID;
	audio.removeAttribute("loop");
	audio.src="";
	songname.innerHTML = "";
	if (multi){						//stop multiplaying sounds
		for(var i = 0;i < (countaudio+10); i++){
			playerID = "soundplayer" + i;
			multiplayer = document.getElementById(playerID);
			multiplayer.src = "";
			multiplayer.removeAttribute("loop");
		}
		countaudio = 0;
	}
}
		
function randomVoice(){				//randomly play a sound(need to fix)
	var RandomNumber = Math.floor(Math.random()*voiceName.length);
	console.log(voiceName[RandomNumber]);
	voiceControl(voiceName[RandomNumber]);
}

function voiceLoop(){				//if true the sound play will loop
	if (loop){
		loop = false;
		eleStateColor("loop","#E8779F");
	}
	else{
		loop = true;
		eleStateColor("loop","#CC255F");
	}		
}
		
function resetName(){				// when sound playing was stoped reset the sound name now playing
	var songname = document.getElementById("songName");
	songname.innerHTML = "";
}
	
function getSoundList(){
	var Num = 0 ;
	data1 = $.ajax({
		url: 'songlist.json',
		async: false,
	});	
	$.each(data1.responseJSON,function(idx,obj){
		voiceName[Num] = obj;
		Num = Num + 1;
	});
	data2 = $.ajax({
		url: 'songnumber.json',
		async: false,
	});	
		voiceNumber = data2.responseText;
}
		
function getUpdateTime(){
	data = $.ajax({
		type:'GET',
		url: 'https://api.github.com/repos/Tim120702/Chiyuu_Button',
		async: false,
	});
	$.each(data.responseJSON,function(key,obj){
		if(key == "updated_at")
			time4update = obj.split('T')[0]+" "+obj.split('T')[1].replace("Z","");
	});
	console.log(time4update);
	return time4update;
}

function broswercheck(){
	var browser = (function BrowserVersion(agent) {		//check browse if IE/Edge shutdown the function 1.Now playing sound name record;2.random play
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
	var updateinfo = "当前音声量:" + String(voiceNumber) + "(更新于" + String(updateTime) +")";
	console.log(updateinfo);
	$(document).ready(function(){document.getElementById("updateinfo").innerText = updateinfo;});
}