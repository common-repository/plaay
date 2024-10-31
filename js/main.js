/************************************
*	Plugin Name: Plaay				*
*	Author: Gustavo Sales			*
*************************************/

var $ = jQuery;

$(function(){
	plugin.initialize();
	
	if (typeof $('body').on != 'undefined'){
		$('body').on('mouseenter', '#result li',
			function(){
				$(this).find('.hover').stop().fadeIn('fast');
			}
		).on('mouseleave', '#result li', 
			function(){
				$(this).find('.hover').stop().fadeOut('fast');
			}
		);
		
		$('body').on('click', '#insert-list-music',
			function(){
				var padding = 17;
				setTimeout(function(){
					$('#TB_ajaxContent').css('height', ($('#TB_window').height() - $('#TB_title').height() - padding) + 'px');
				}, 100);
				
			}
		);
	} else {
		$('#result li').live('mouseenter',
			function(){
				$(this).find('.hover').stop().fadeIn('fast');
			}
		).live('mouseleave', 
			function(){
				$(this).find('.hover').stop().fadeOut('fast');
			}
		);
		
		$('#insert-list-music').live('click',
			function(){
				var padding = 17;
				setTimeout(function(){
					$('#TB_ajaxContent').css('height', ($('#TB_window').height() - $('#TB_title').height() - padding) + 'px');
				}, 100);
			}
		);
	}
})