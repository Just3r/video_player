    function VideoPlayer() {

    }
    VideoPlayer.prototype = {
    	soundToggle: function () {
    		if ( !video.muted ) {
    			video.muted = true;
    		} else {
    			video.muted = false;
    		}
    	},

    	volumeChanger: function ( volume ) {
    		this.volume = volume;
    		if ( volume < 0 ) {
    			volume = 0
    		} else if ( volume > 1 ) {
    			volume = 1
    		}
    		video.volume = volume;
    	},
    	playToggle: function () {
    		if ( video.paused ) {
    			video.play()
    		} else {
    			video.pause()
    		}
    	},
    	playTimeChanger: function ( time ) {
    		this.time = time;
    		if ( time < 0 ) {
    			video.currentTime = 0
    		} else if ( time > video.duration ) {
    			video.currentTime = video.ended
    		} else if ( time >= 0 && time <= video.duration ) {
    			video.currentTime = time
    		}
    	},
    	currentTime: function () {
    		return video.currentTime;
    	},
    	currentVolume: function () {
    		return video.volume
    	},
    	totalTimer: function () {
    		return video.duration;
    	},
    	setCurrentTime: function ( el ) {
    		this.el = el.toFixed( 2 )
    		video.currentTime = el * video.duration;
    	},
    	setCurrentVolume: function ( value ) {
    		video.volume = value;
    	},
    }
    var Player = new VideoPlayer();
