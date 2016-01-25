$.fn.adamSlideout = function($slideout) {
	var pageX;
	var originX;
	var slideoutWidth;
	var $panel = $(this);
	
			
	$('.js-slideout-toggle').on("click, tapend", function(){
		$('body').toggleClass('slideout-open');
	});
			
	$('#panel')[0].addEventListener('touchstart', function(event) {
		originX = event.changedTouches[0].pageX - $panel[0].getBoundingClientRect().left;
	});
		
	$($panel)[0].addEventListener('touchmove', function(event) {
		var slideX;
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
	});
	
	$('#panel')[0].addEventListener('touchend', function(event) {
		
		if(slideoutWidth === $('body').width()){ //Disable via. CSS
			return false;
		}
		
		pageX = event.changedTouches[0].pageX;
		$panel.removeAttr('style');
		$panel.removeClass('sliding');
		if($panel[0].getBoundingClientRect().left <= (slideoutWidth / 2)){
			$('body').removeClass('slideout-open');
		} else {
			$('body').addClass('slideout-open');
		}
	});
	
};
