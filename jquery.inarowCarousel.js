/**
 * inarowCarousel is a jQuery plugin that generates the necesary elements 
 * to convert a list of HTML anchors or images in an animated carousel.
 *
 * @name inarowCarousel
 * @version 0.0.1
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
	$.fn.inarowCarousel = function(options){
		var Defaults = {
			spacing: 1024,
			height: 422,
			elementTag: 'a'
		};
		var opts = $.extend(Defaults, options);
		return this.each(function(){
			var currentPos = 0;
			var $mainObj = $(this);
			// Images to work with.
			var $covers = $mainObj.find('.covers '+opts.elementTag);
			
			$mainObj
				.css({
					width: opts.spacing,
					height:opts.height,
					overflow:'hidden'
				})
				.find('.covers')
				.css({
					width: $covers.lenght * opts.spacing,
					position: 'absolute',
					left:'0px',
					top:'0px',
				})
				.find(opts.elementTag)
				.css({
					position:'absolute',
					left:opts.spacing
				});
			
			var $btns = $('<div>')
				.addClass('inarowCarousel-direct-buttons')
				.css({
					width: opts.spacing,
				});
			
			// To move to an element of the list
			function moveTo(index){
				currentPos = index;
				$covers.parent().animate({'left':-1 * currentPos * opts.spacing}, 'slow', 'easeInOutQuart', function(){
					$btns.find('a').removeClass('selected').eq(index).addClass('selected');
				});
			}
			
			// Creating left and right arrows.
			function createControl(cls){
				return $('<div>')
					.addClass(cls)
					.addClass('button')
					.css('opacity', '0')
					.css('height', opts.height);
			}
			
			// Posicioning images.
			$covers.each(function(index){
				$(this).css('left', opts.spacing * index);
				$('<a>')
					.text(index)
					.attr('href', '#')
					.click(function(event){
						moveTo(index);
						event.preventDefault();
					})
					.appendTo($btns);
			});
			
			$btns
				.css({
					'display': 'block',
				})
				.find('a')
				.eq(0)
				.addClass('selected');

			
			if ($covers.length > 1){
				
				$btns.insertAfter($mainObj);
				
				createControl('left')
					.unbind('click mouseenter mouseleave')
					.hover(function(){
						$(this).css('opacity', '0.6');
					},function(){
						$(this).css('opacity', '0');
					})
					.click(function(){
//	This line is not working in javascript. Reference: http://javascript.about.com/od/problemsolving/a/modulobug.htm
//						currentPos = (currentPos-1) % $covers.length;
						currentPos--;
						if (currentPos < 0){
							currentPos = $covers.length - 1;
						}
						moveTo(currentPos);
					})
					.insertBefore($mainObj.find('.covers'));
				
				createControl('right')
					.unbind('click mouseenter mouseleave')
					.hover(function(){
						$(this).css('opacity', '0.6');
					},function(){
						$(this).css('opacity', '0');
					})
					.click(function(){
						currentPos = Math.abs((currentPos+1) % $covers.length);
						moveTo(currentPos);
					})
					.insertBefore($mainObj.find('.covers'));
			}
		});
	};
})(jQuery);
