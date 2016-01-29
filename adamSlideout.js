$.fn.adamSlideout = function($slideout) {
	var pageX;
	var originX;
	var slideoutWidth;
	var $panel = $(this);
	var sliding = false;
	var supportsTouch = false;
	
	//Detects touchevents, just a fall back to allow the button to work on non-touch browsers
	if ('ontouchstart' in window) {
			//iOS & android
			supportsTouch = true;
	} else if(window.navigator.msPointerEnabled) {
			//Win8
			supportsTouch = true;
	}

	//Button events
	if (supportsTouch) {
		$('.js-slideout-toggle')[0].addEventListener('touchend', function() {
			sliding = false;
			if($('body').hasClass('slideout-open')){
				$('body').removeClass('slideout-open');
			} else {
				$('body').addClass('slideout-open');
			}
		});
	} else { 
		$('.js-slideout-toggle').on("click", function(){
			$('body').toggleClass('slideout-open');
		});
	}
	
	//Slide events
	$('#panel')[0].addEventListener('touchstart', function(event) {
		originX = event.changedTouches[0].pageX - $panel[0].getBoundingClientRect().left;
	});
		
	$($panel)[0].addEventListener('touchmove', function(event) {
		var slideX;
		
		sliding 			= true;
		pageX 				= event.changedTouches[0].pageX;
		slideoutWidth = $slideout.width();
		
		if($(event.target).hasClass('slideout-disabled')){
			return false;	
		}
		
		if(slideoutWidth === $('body').width()){ //Disable via. CSS
			return false;
		}
		
		$panel.addClass('sliding');
		
		slideX = pageX - originX;
		
		//Subtract current movement
		slideX = slideX;
		
		if(slideX < 0){
			slideX = 0;
		}
		
		if(slideX >= slideoutWidth){
			slideX = slideoutWidth;
		}
		
		if(slideX > 30 || slideX < -30){ //Stop it reacting to minor movement
			$panel.css({
				MozTransition:		"transform 0",
				WebkitTransition:	"transform 0",
				msTransition:			"transform 0",
				transition:				"transform 0",
				MozTransform: 		"translate3d(" + slideX + "px, 0, 0)",
				WebkitTransform: 	"translate3d(" + slideX + "px, 0, 0)",
				msTransform: 			"translate3d(" + slideX + "px, 0, 0)",
				transform: 				"translate3d(" + slideX	 + "px, 0, 0)"
			});
		}
	});
	
	$('#panel')[0].addEventListener('touchend', function(event) {
		
		if(slideoutWidth === $('body').width() || !sliding){ //Disable via. CSS
			return false;
		}
		
		pageX = event.changedTouches[0].pageX;
		$panel.removeAttr('style');
		$panel.removeClass('sliding');
		
		//Makes it easier to close when open, and easier to open when closed.
		var snapPoint;
		if($('body').hasClass('slideout-open')){
			snapPoint = (2 * slideoutWidth / 3); 
		} else {
			snapPoint = (slideoutWidth / 3);
		}
		
		if($panel[0].getBoundingClientRect().left <= snapPoint){
			$('body').removeClass('slideout-open');
		} else {
			$('body').addClass('slideout-open');
		}
		sliding = false; 
	});
	
};
