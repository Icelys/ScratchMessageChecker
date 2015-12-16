// ==UserScript==
// @name        Scratch Message Count
// @namespace   https://github.com/Icelys/
// @include     *
// @version     1
// @grant       none
// ==/UserScript==

var user = "Put your username here"

var messageCount = 0;
var startTitle = document.title;
console.log(startTitle);
var debug = false;


function update(data){
  if(debug){
	console.log("Retrieved: " + data);
	}
	var decodedData = JSON.parse(data);
	messageCount = decodedData.msg_count;
	if(decodedData.err != undefined){
		document.title = startTitle+" ("+messageCount+")";
	} else {
		document.title = startTitle;
	}
}

function getData(){
  if(debug){
	console.log("Getting data...");
	}
	var XMLRequest = new XMLHttpRequest();
	XMLRequest.onreadystatechange = function() {
		if (XMLRequest.readyState == 4) {
        		update(XMLRequest.responseText);
        		
    		}
	}
	XMLRequest.open("GET", "https://api.scratch.mit.edu/proxy/users/"+user+"/activity/count", true);
	XMLRequest.send(null);
}

setInterval(getData, 10000);
