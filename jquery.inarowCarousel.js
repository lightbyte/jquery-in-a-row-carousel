/**
 * inarowCarousel is a jQuery plugin that generates the necesary elements 
 * to convert a list of HTML tags in an animated carousel.
 *
 * @name inarowCarousel
 * @version 0.0.3
 * @requires jQuery v1.3+
 * @author Pedro Martín Valenciano
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * http://www.lightbyte.org/post/my-inarowcarousel-jquery-plugin
 *
 * Copyright (c) 2012, Pedro Martín Valenciano (pedro -[at]- lightbyte [*dot*] org)
 */
(function($){
	var methods = {
		defaults : {
			spacing: 1024,
			height: 422,
			beforeMoveCallback: function(leavingItem, commingItem){ return true; },
			afterMoveCallback: function(leavingItem, commingItem){ return true; },
			autoplay: false,
			timeout: 5000,
		},
		opts : {},
		currentPos : 0,
		$covers : null,
		$btns : null,
		id : null,
		
		// Variables to pass to the callbacks
		leavingItem : null,
		commingItem : null,
		
		// To move to an element of the list
		moveTo : function (index){
			// Check if its playing already, then stop it.
        	var activateAfter = false;
        	if (methods.id != null){
        		methods.stop();
        		activateAfter = true;
        	}
        	
			// Callback before moving
			methods.leavingItem = methods.$covers.eq(methods.currentPos);
			methods.commingItem = methods.$covers.eq(index);

			if (true === methods.opts.beforeMoveCallback(methods.leavingItem, methods.commingItem)) {
				
				//It will move if beforeMoveCallback returns true.
				
				methods.currentPos = index;
				methods.$covers.parent().animate({'left':-1 * methods.currentPos * methods.opts.spacing}, 'slow', 'easeInOutQuart', function(){
					methods.$btns.find('a').removeClass('selected').eq(index).addClass('selected');
					// Callback after moving
					methods.opts.afterMoveCallback(methods.leavingItem, methods.commingItem);
					
				});
			}

			// At the end, we leave it playing if it was playing before
			if (activateAfter){
				methods.play();
			}
		},
		
        init : function(options) {
        	
    		methods.opts = $.extend(methods.defaults, options);
    		
    		
    		var $mainObj = null;
    		
    		// Creating left and right arrows.
    		function createControl(cls){
    			return $('<div>')
    				.addClass(cls)
    				.addClass('button')
    				.css('opacity', '0')
    				.unbind('click mouseenter mouseleave')
    				.hover(function(){
    					$(this).css('opacity', '0.6');
    				},function(){
    					$(this).css('opacity', '0');
    				});
    		}
    		
    		return this.each(function(){
    			
    			
    			$mainObj = $(this);
    			// Images to work with.
    			methods.$covers = $mainObj.find('.covers ').children();
    			
    			$mainObj
    				.css({
    					width: methods.opts.spacing,
    					height:methods.opts.height,
    					overflow:'hidden'
    				})
    				.find('.covers')
    				.css({
    					width: methods.$covers.lenght * methods.opts.spacing,
    					position: 'absolute',
    					left:'0px',
    					top:'0px',
    				})
    				.children()
    				.css({
    					position:'absolute',
    					left:methods.opts.spacing
    				});
    			
    			methods.$btns = $('<div>')
    				.addClass('inarowCarousel-direct-buttons')
    				.css({
    					width: methods.opts.spacing,
    				});
    			
    			
    			
    			// Posicioning images.
    			methods.$covers.each(function(index){
    				$(this).css('left', methods.opts.spacing * index);
    				$('<a>')
    					.text(index)
    					.attr('href', '#')
    					.click(function(event){
    						methods.moveTo(index);
    						event.preventDefault();
    					})
    					.appendTo(methods.$btns);
    			});
    			
    			methods.$btns
    				.css({
    					'display': 'block',
    				})
    				.find('a')
    				.eq(0)
    				.addClass('selected');

    			
    			if (methods.$covers.length > 1){
    				
    				methods.$btns.insertAfter($mainObj);
    				
    				createControl('left')
    					.click(function(){
    						methods.prev();
    					})
    					.insertBefore($mainObj.find('.covers'));
    				
    				createControl('right')
    					.click(function(){
    						methods.next();
    					})
    					.insertBefore($mainObj.find('.covers'));
    			}
    			
    			/*
    			 * If autoplay is true.
    			 */
    			if (methods.opts.autoplay) {
    				methods.play();
    			}
    		});
        },
        next : function( ) {
        	var newPos = Math.abs((methods.currentPos+1) % methods.$covers.length);
			methods.moveTo(newPos);
			
        },
        prev : function( ) {
        	var newPos = methods.currentPos-1;
        	if (newPos < 0){
				newPos = methods.$covers.length - 1;
			}
			methods.moveTo(newPos);
			
        },
        play : function( ) {
        	if (methods.id != null){
        		clearInterval(methods.id);
        		methods.id = null;
        	}
        	methods.id = window.setInterval(function(){
        		methods.next();
        	}, methods.opts.timeout);
        },
        stop : function( ) {
        	if (methods.id != null){
        		window.clearInterval(methods.id);
        		methods.id = null;
        	}
        }
    };
	
	$.fn.inarowCarousel = function(methodOrOptions) {
        if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            // Default to "init"
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
        }    
    };
    
})(jQuery);
