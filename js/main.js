var main_body = document.getElementById( 'main_body' );
var video = document.getElementById( 'player' );
var smartTime = false;
var timeDrag = false;
var timeDrag1 = false;
var currentVideoTime = document.getElementById( 'progress_status' );
var progressContainer = document.getElementById( 'progress_container' );
var soundBarContainer = document.getElementById( 'progress_sound' );
var progressSoundChecker = document.getElementById( 'progress_checker' );
var screenToggler = document.getElementById( 'fullscreenToggler' );
var playPause = document.getElementById( 'playButton' );
var soundToggler = document.getElementById( 'sound_toggler' );
var toggleTime = document.getElementById( 'span_toggle' );
var totalTime = document.getElementById( 'span_total' );
var bigButton = document.getElementById( 'big_center_button' );
var soundChecker = document.getElementById( 'progress_checker' );

window.addEventListener( 'load', function () {

	View.volStyleChange( progressSoundChecker, Player.currentVolume() )

	toggleTime.innerHTML = View.formattedTime( false, Player.currentTime() )

	totalTime.innerHTML = View.formattedTime( Player.totalTimer(), false )

	video.addEventListener( 'ended', function () {

		playPause.classList.remove( 'small_play', 'small_pause' );
		View.classToggler( playPause, 'small_end' )
		View.classToggler( bigButton, 'big_end' )

	} )

	video.addEventListener( 'play', function () {

		playPause.classList.remove( 'small_end' )
		bigButton.classList.remove( 'big_end' )
		bigButton.classList.add( 'big_play' )
		View.classToggler( playPause, 'small_play' )
	} )
	video.addEventListener( 'timeupdate', function () {

		toggleTime.innerHTML = View.timeHandler();
		View.durStyleChange( currentVideoTime, Player.currentTime() );
	} )
	toggleTime.addEventListener( 'click', function () {
		if ( smartTime == false ) {
			this.innerHTML = View.timeHandler()
			smartTime = true
		} else {
			this.innerHTML = View.timeHandler()
			smartTime = false
		}
	}, false )
	playPause.addEventListener( 'click', function () {

		View.classToggler( this, 'small_play' )
		View.classToggler( this, 'small_pause' )
		View.classToggler( bigButton, 'big_play' )
		Player.playToggle()
	}, false )
	bigButton.addEventListener( 'click', function () {

		Player.playToggle()
		View.classToggler( this, 'big_play' )
		View.classToggler( playPause, 'small_play' )
		View.classToggler( playPause, 'small_pause' )

	}, false )
	screenToggler.addEventListener( 'click', function () {
		View.screenToggle()
		View.classToggler( this, 'fullscreenOn' )
	}, false )
	soundToggler.addEventListener( 'click', function () {

		View.classToggler( this, 'muted' )
		View.classToggler( soundChecker, 'muted_sound' )
		Player.soundToggle()
	}, false )

	soundBarContainer.addEventListener( 'mousedown', function ( e ) {
		timeDrag = true;
		Player.setCurrentVolume( View.barController( e, this ) )
		View.volStyleChange( progressSoundChecker, Player.currentVolume() )
	}, false );
	document.addEventListener( 'mouseup', function ( e ) {
		if ( timeDrag ) {
			timeDrag = false;
			Player.setCurrentVolume( View.barController( e, soundBarContainer ) )
			View.volStyleChange( progressSoundChecker, Player.currentVolume() )
		}
	}, false );
	document.addEventListener( 'mousemove', function ( e ) {
		if ( timeDrag ) {
			Player.setCurrentVolume( View.barController( e, soundBarContainer ) )
			View.volStyleChange( progressSoundChecker, Player.currentVolume() )
		}
	}, false );
	progressContainer.addEventListener( 'mousedown', function ( e ) {
		timeDrag1 = true;
		Player.setCurrentTime( View.barController( e, progressContainer ) )
		View.durStyleChange( currentVideoTime, Player.currentTime() )

	}, false );
	document.addEventListener( 'mouseup', function ( e ) {
		if ( timeDrag1 ) {
			timeDrag1 = false;
			Player.setCurrentTime( View.barController( e, progressContainer ) )
			View.durStyleChange( currentVideoTime, Player.currentTime() )
		}
	}, false );
	document.addEventListener( 'mousemove', function ( e ) {
		if ( timeDrag1 ) {
			Player.setCurrentTime( View.barController( e, progressContainer ) )
			View.durStyleChange( currentVideoTime, Player.currentTime() )

		}
	}, false );

}, false );
