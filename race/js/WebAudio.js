var audioFormat;
var audioContext;
var bufferLoader;

var allSoundsLoaded = false;

function setFormat() {
	var audio = new Audio();
	if(audio.canPlayType("audio/mp3")) {
		audioFormat = ".mp3";
	} else {
		audioFormat = ".ogg";
	}
}

function loadSounds() {
	setFormat();
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	soundContext = new AudioContext();

	bufferLoader = new BufferLoader(audioContext, [
		"car_engine" + audioFormat
		], finishedLoading);

	bufferLoader.load();
}

function finishedLoading() {
	allSoundsLoaded = true;
}

function playSound(buffer, time) {
	var source = audioContext.createBufferSource();
	source.buffer = buffer;
	source.connect(audioContext.destination);
	source.start(time);
}

// BufferLoader class from www.html5rocks.com
function BufferLoader(context, urlList, callback) {
	this.context = context;
	this.urlList = urlList;
	this.onload = callback;
	this.bufferList = new Array();
	this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
	// Load buffer asynchronously
	var request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.responseType = "arraybuffer";

	var loader = this;

	request.onload = function() {
		// Asynchronously decode the audio file data in request.response
		loader.context.decodeAudioData(
			request.response,
			function(buffer) {
				if (!buffer) {
					alert('error decoding file data: ' + url);
					return;
				}
				loader.bufferList[index] = buffer;
				if (++loader.loadCount == loader.urlList.length) {
					loader.onload(loader.bufferList);
				}
			},
			function(error) {
				console.error('decodeAudioData error', error);
			}
		);
	}

	request.onerror = function() {
		alert('BufferLoader: XHR error');
	}

	request.send();
}

BufferLoader.prototype.load = function() {
	for (var i = 0; i < this.urlList.length; i++) {
		this.loadBuffer(this.urlList[i], i);
	}
}
