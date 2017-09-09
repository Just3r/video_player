function ViewPlayer() {

}
ViewPlayer.prototype = {
	barController: function ( e, reducer ) {
		var a = this.positioning( e, reducer, main_body ) / this.computedWidth( reducer );
		if ( a < 0 ) {
			a = 0
		} else if ( a > 1 ) {
			a = 1
		}
		return a;
	},
	durStyleChange: function ( element, value ) {
		element.style.width = value / video.duration * 100 + '%';
	},
	volStyleChange: function ( element, value ) {
		element.style.width = value * 100 + '%';
	},
	timeHandler: function () {
		if ( smartTime == false ) {
			return this.formattedTime( false, Player.currentTime() )
		} else {
			return this.formattedTime( Player.totalTimer(), Player.currentTime() )
		}
	},
	formattedTime: function ( duration, currentTime ) {
		if ( duration && currentTime ) {
			seconds = Math.round( duration ) - Math.round( currentTime );
		} else if ( !duration || !currentTime ) {

			if ( duration ) {
				seconds = Math.round( duration )
			} else {
				seconds = Math.round( currentTime )
			}
		}
		minutes = Math.floor( seconds / 60 );
		if ( minutes > 0 ) {
			seconds -= minutes * 60;
		}
		if ( seconds.toString().length === 1 ) {
			seconds = '0' + seconds;
		}
		return minutes + ':' + seconds;
	},

	classToggler: function ( elem, classList ) {

		elem.classList.toggle( classList );

	},
	computedWidth: function ( element ) {
		value = window.getComputedStyle( element ).getPropertyValue( 'width' );
		value = parseFloat( value.substr( 0, value.length - 2 ) );
		return value
	},
	positioning: function ( el, reducer, foreigner ) {
		if ( document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || video.msFullscreenElement ) {
			position = el.pageX - reducer.offsetLeft
		} else {
			position = el.pageX - reducer.offsetLeft - foreigner.offsetLeft
		}
		return position
	},
	screenToggle: function () {
		if ( !document.fullscreenElement &&
			!document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {
			if ( video.requestFullscreen ) {
				video.requestFullscreen();
			} else if ( video.msRequestFullscreen ) {
				main_body.msRequestFullscreen();
			} else if ( video.mozRequestFullScreen ) {
				main_body.mozRequestFullScreen();
			} else if ( video.webkitRequestFullscreen ) {
				video.webkitRequestFullscreen();
			}
		} else {
			if ( document.exitFullscreen ) {
				document.exitFullscreen();
			} else if ( document.msExitFullscreen ) {
				document.msExitFullscreen();
			} else if ( document.mozCancelFullScreen ) {
				document.mozCancelFullScreen();
			} else if ( document.webkitExitFullscreen ) {
				document.webkitExitFullscreen();
			}
		}
	},
}

View = new ViewPlayer();
