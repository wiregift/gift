var $ = jQuery.noConflict();

jQuery(document).ready(function($){
	"use strict";
	
	//Slider width fixing
	jQuery('.otw_portfolio_manager-portfolio-media.otw_portfolio_manager-format-gallery').each(function(){
		var image = new Image();
		image.src = jQuery(this).find('.slides li img').attr("src");
		jQuery(this).css({'max-width': image.naturalWidth + 'px' });
		jQuery(this).find('.slides li').css({'max-width': image.naturalWidth + 'px' });
	});

	
	otw_pm_responsive_videos();
	
	//Portfolio images slides
	if(jQuery('.otw_portfolio_manager-format-gallery .slides').length > 0 ) {
		jQuery('.otw_portfolio_manager-format-gallery').flexslider({
			animation: "slide" // slide or fade
		});
	}
	try {
		
		
	} catch(err) {}
	
	//Accordion
	try {
		jQuery('.otw_portfolio_manager-accordion').accordion({
			heightStyle: "content"
		});
	} catch(err) {}
	
	jQuery(document).on('click', '.js-otw_portfolio_manager-load-more a', function(e) {
		e.preventDefault();
		
		var $this = jQuery(this);
		
		if( !$this.parent().hasClass('otw_portfolio_manager-load-more-newspapper') ) {
			$this.html('<div class="preloader">' + otw_pm_js_labels.otw_pm_loading_text + '</div>');
			
			var url = $this.parent('.otw_portfolio_manager-load-more').parent().find('.otw_portfolio_manager-pagination.hide a').attr('href');
			
			if(url === 'undefined' || url === '#' || url === ''){
				$this.text($this.attr('data-empty'));
				return false;
			}
			$this.prop('disabled', true);
			
			$container = $this.parents( '.otw-pm-list-section' ).first().find('.otw_portfolio_manager-portfolio-items-holder');
			
			var $mainContainer = $this.parents( '.otw-pm-list-section' ).first();
			
			jQuery.get(url, function(data) {
				if( data.length > 1 ) {
					var $pagination = jQuery(data).find('.js-pagination_container');
					
					$container.parents( '.otw-pm-list-section' ).find( '.js-pagination_container').remove();
					
					var $newElements = jQuery(data).find('.otw_portfolio_manager-portfolio-item-holder');
					$container.append( $newElements );
					
					$mainContainer.append( $pagination );
					
					otw_pm_hover_effects();
					otw_pm_responsive_videos();
					otw_skocial_shares();
					otw_pm_enable_sliders();
					
					//horizontal_layout('.otw_portfolio_manager-horizontal-layout-items');
				} else {
					$this.attr( 'href', 'javascript:;' );
					$this.html( otw_pm_js_labels.otw_pm_no_more_posts_text ).animate({ opacity: 1 }, 2000, function () {
						$this.fadeOut('fast');
					});
				}
			});
		}
	});
	
	// Load More Widgets
	jQuery(document).on('click', '.js-widget-otw_portfolio_manager-load-more a', function(e) {
		e.preventDefault();
		var $this = jQuery(this);
		
		var url = $this.parent('.js-widget-otw_portfolio_manager-load-more').parent().find('.otw_portfolio_manager-pagination.hide a').attr('href');
		
		if(url === 'undefined' || url === '#' || url === ''){
			$this.text($this.attr('data-empty'));
			return false;
		}
		$this.html('<div class="preloader">' + otw_pm_js_labels.otw_pm_loading_text + '</div>');
		$this.prop('disabled', true);
		
		$container = $this.parent().parent().parent().parent().find('.js-widget-list');
		
		jQuery.get(url, function(data) {
			if( data.length > 1 ) {
				var $pagination = jQuery(data).find('.js-otw_portfolio_manager-widget-pagination-holder').parent().parent();
				// Remove Load More
				$this.parent().parent().remove();
				
				// Add new Load More BTN
				jQuery('.js-otw_portfolio_manager-widget-pagination-holder').html( jQuery(data).find('.js-widget-pagination_container') );
				
				$container.append( jQuery(data).find('.js-widget-list').children() );
				
				otw_pm_hover_effects();
				otw_pm_responsive_videos();
				otw_pm_social_shares();
				otw_pm_enable_sliders();
			} else {
				$this.attr( 'href', 'javascript:;' );
				$this.html( otw_pm_js_labels.otw_pm_no_more_posts_text ).animate({ opacity: 1 }, 2000, function () {
					$this.fadeOut('fast');
				});
			}
		});
	});
	
	//Load More NewsPapper
	jQuery(document).on("click", '.otw_portfolio_manager-load-more-newspapper a',function(e){
		e.preventDefault();
		
		var $this = jQuery(this);
		
		var url = $this.attr('href');
		
		if(url === 'undefined' || url === '#' || url === ''){
			$this.text($this.attr('data-empty'));
			return false;
		}
		$this.html('<div class="preloader">' + otw_pm_js_labels.otw_pm_loading_text + '</div>');
		$container = jQuery(this).parent().parent().parent().find('.otw_portfolio_manager-portfolio-newspaper');
		var oldPagination = jQuery( this ).parents( '.js-pagination_container' ).first();
		
		jQuery.get(url, function(data){
			if( data.length > 1 ){
				var $newElements = jQuery( jQuery(data).find('.otw_portfolio_manager-portfolio-items-holder').html() );
				
				//slider fixing
				$newElements.find('.otw_portfolio_manager-portfolio-media-wrapper.otw_portfolio_manager-format-gallery').each(function(){
					var image = new Image();
					image.src = jQuery(this).find('.slides li img').attr("src");
					jQuery(this).css({'max-width': image.naturalWidth + 'px' });
					jQuery(this).find('.slides li').css({'max-width': image.naturalWidth + 'px' });
				});
				
				otw_pm_enable_sliders();
				
				var $paginationElement = jQuery(data).find('.js-pagination_container');
				
				if($this.data('isotope') !== false){
					
					$container.append( $newElements ).isotope( 'appended', $newElements, function(){
						jQuery(this).isotope('layout');
					});
				} else {
					
					$newElements.appendTo( $this.parent('.otw_portfolio_manager-load-more').parent().find('.otw_portolio_manager-portfolio-item-holder') ).each(function(){
						if($this.data('layout') === 'horizontal'){
							otw_portfolio_horizontal_layout('.otw_portfolio_manager-horizontal-layout-items');
						}
					});
				}
				otw_pm_social_shares();
				otw_pm_enable_sliders();
				
				//next page
				oldPagination.remove();
				$container.parent().append( $paginationElement );
				
				otw_pm_calculate_columns('.otw_portfolio_manager-mosaic-layout');
			} else {
				$this.html( otw_pm_js_labels.otw_pm_no_more_posts_text ).animate({ opacity: 1 }, 2000, function () {
					$this.fadeOut('fast');
				});
			}
		});
	});
	
	//Infinite Scroll for Grid Layout
	try {
		jQuery('.otw_portfolio_manager-infinite-pagination-holder').infinitescroll({
			navSelector  : '.otw_portfolio_manager-pagination',    // selector for the paged navigation 
			nextSelector : '.otw_portfolio_manager-pagination a',  // selector for the NEXT link (to page 2)
			itemSelector : '.otw_portfolio_manager-portfolio-item-holder',     // selector for all items you'll retrieve
			loading: {
					finishedMsg: otw_pm_js_labels.otw_pm_no_more_posts_text,
					msgText: otw_pm_js_labels.otw_pm_loading_text,
					img: '//i.imgur.com/o4Qsgvx.gif'
				}
			},
			
			//call horizontal layout as a callback
			function( newElements ) {
				
				otw_pm_hover_effects();
				otw_pm_responsive_videos();
				otw_pm_social_shares();
				otw_pm_enable_sliders();
			}
		);
	} catch(err) { }

	//Infinite Scroll for Newspaper Layout
	try {
		jQuery('.otw_portfolio_manager-infinite-scroll').infinitescroll({
			navSelector  : '.otw_portfolio_manager-pagination',    // selector for the paged navigation 
			nextSelector : '.otw_portfolio_manager-pagination a',  // selector for the NEXT link (to page 2)
			itemSelector : '.otw_portfolio_manager-portfolio-newspaper-item',     // selector for all items you'll retrieve
			loading: {
					finishedMsg: otw_pm_js_labels.otw_pm_no_more_posts_text,
					msgText: otw_pm_js_labels.otw_pm_loading_text,
					img: '//i.imgur.com/o4Qsgvx.gif'
				}
			},

			//call Isotope as a callback
			function( newElements ) {
				var $newElements = jQuery(newElements);

				//slider fixing
				$newElements.find('.otw_portfolio_manager-portfolio-media.otw_portfolio_manager-format-gallery').each(function(){
					var image = new Image();
					image.src = jQuery(this).find('.slides li img').attr("src");
					jQuery(this).css({'max-width': image.naturalWidth + 'px' });
					jQuery(this).find('.slides li').css({'max-width': image.naturalWidth + 'px' });
				});

				if($newElements.find('.otw_portfolio_manager-format-gallery .slides').length > 0 ) {
					$newElements.find('.otw_portfolio_manager-format-gallery').flexslider({
						animation: "slide"
					});
				}

				jQuery('.otw_portfolio_manager-infinite-scroll').isotope( 'appended', $newElements, function(){
					otw_pm_hover_effects();
					otw_pm_social_shares();

					otw_pm_calculate_columns('.otw_portfolio_manager-mosaic-layout');

					jQuery(this).isotope('layout');
				});
			}
		);
	} catch(err) { }

	//Infinite Scroll for Horizontal Layout
	try {
		jQuery('.otw_portfolio_manager-horizontal-layout-items-infinite-scroll').infinitescroll({
			navSelector  : '.otw_portfolio_manager-pagination',    // selector for the paged navigation 
			nextSelector : '.otw_portfolio_manager-pagination a',  // selector for the NEXT link (to page 2)
			itemSelector : '.otw_portfolio_manager-horizontal-item',     // selector for all items you'll retrieve
			loading: {
					finishedMsg: otw_pm_js_labels.otw_pm_no_more_posts_text,
					msgText: otw_pm_js_labels.otw_pm_loading_text,
					img: '//i.imgur.com/o4Qsgvx.gif'
				}
			},

			//call horizontal layout as a callback
			function( newElements ) {
				otw_pm_hover_effects();
				otw_pm_social_shares();
				otw_portfolio_horizontal_layout('.otw_portfolio_manager-horizontal-layout-items');
			}
		);
	} catch(err) { }

	//Infinite Scroll for Timeline Layout
	try {
		jQuery('.otw_portfolio_manager-portfolio-timeline').infinitescroll({
			navSelector  : '.otw_portfolio_manager-pagination',    // selector for the paged navigation 
			nextSelector : '.otw_portfolio_manager-pagination a',  // selector for the NEXT link (to page 2)
			itemSelector : '.otw_portfolio_manager-portfolio-timeline-item',     // selector for all items you'll retrieve
			loading: {
					finishedMsg: otw_pm_js_labels.otw_pm_no_more_posts_text,
					msgText: otw_pm_js_labels.otw_pm_loading_text,
					img: '//i.imgur.com/o4Qsgvx.gif'
				}
			},

			//callback
			function( newElements ) {
				var $newElements = jQuery(newElements);

				//slider fixing
				$newElements.find('.otw_portfolio_manager-portfolio-media.otw_portfolio_manager-format-gallery').each(function(){
					var image = new Image();
					image.src = jQuery(this).find('.slides li img').attr("src");
					jQuery(this).css({'max-width': image.naturalWidth + 'px' });
					jQuery(this).find('.slides li').css({'max-width': image.naturalWidth + 'px' });
				});

				if($newElements.find('.otw_portfolio_manager-format-gallery .slides').length > 0 ) {
					$newElements.find('.otw_portfolio_manager-format-gallery').flexslider({
						animation: "slide"
					});
				}

				//hover styles
				$newElements.each(function(){
					otw_pm_hover_effects();
					otw_pm_social_shares();
				});

				jQuery('.otw_portfolio_manager-portfolio-timeline').append($newElements);

				jQuery('#infscr-loading').remove().insertAfter( jQuery('.otw_portfolio_manager-portfolio-timeline .otw_portfolio_manager-portfolio-timeline-item:last') );

				timeline_pm_layout_fixer();
			}
		);
	} catch(err) { }
	
	//Tabs
	try {
		jQuery('.otw_portfolio_manager-tabs').tabs();
	} catch(err) { }

	//Accordion
	try {
		jQuery('.otw_portfolio_manager-accordion').accordion({
			heightStyle: "content"
		});
	} catch(err) { }

	//Slider
	jQuery('.otw_portfolio_manager-slider').each(function(){
		var $this = jQuery(this);

		var slider_animation = jQuery(this).data('animation');

		if($this.find('.slides').length > 0 ) {
			if($this.hasClass('otw_portfolio_manager-carousel')){
				var item_margin = $this.data('item-margin');
				var item_per_page = $this.data('item-per-page');
				var item_width = ( ($this.width() - ( item_margin * (item_per_page - 1) )) / item_per_page );

				var prev_text = "";
				var next_text = "";

				if($this.data('type') == "widget"){
					prev_text = '<i class="icon-angle-left"></i>';
					next_text = '<i class="icon-angle-right"></i>';
				}
				
				var autoSlide = true;
				
				if( $this.attr('data-auto-slide') == '0' ){
					autoSlide = false;
				};
				
				var navigation = $this.attr('data-nav');
				
				if( navigation == '0' ){
					navigation = false;
				}else{
					navigation = true;
				}
				
				$this.flexslider({
					animation: slider_animation,
					animationLoop: false,
					prevText: prev_text,
					nextText: next_text,
					itemWidth: item_width,
					itemMargin: item_margin,
					controlNav: navigation,
					directionNav: navigation,
					slideshow: autoSlide
				});
			} else {
				var navigation = $this.attr('data-nav');
				
				if( navigation == '0' ){
					navigation = false;
				}else{
					navigation = true;
				}
				$this.flexslider({
					animation: slider_animation,
					smoothHeight: true,
					controlNav: navigation,
					directionNav: navigation
				});
			}
		}
	});

	//Timeline Layout
	jQuery('.otw_portfolio_manager-portfolio-timeline.with-heading').before('<div class="otw_portfolio_manager-portfolio-timeline-heading"></div>');
	timeline_pm_layout_fixer();

	//IE8
	jQuery('.otw_portfolio_manager-portfolio-meta-item:last-child').css({'padding': '0px'});
	
	jQuery( '.otw_portfolio_manager-widget-carousel .slider_item .otw_ier, .otw_portfolio_manager-horizontal-item .otw_ier' ).removeAttr( 'style' );
});

var $container = jQuery('.otw_portfolio_manager-portfolio-newspaper');

jQuery(window).on('load', function() {
	//Hover effect
	otw_pm_hover_effects();

	//Socail shares
	otw_pm_social_shares();

	try {
		$container = jQuery('.otw_portfolio_manager-portfolio-newspaper');
		
		otw_pm_calculate_columns('.otw_portfolio_manager-mosaic-layout');
		
		$container.isotope({
			itemSelector: '.otw_portfolio_manager-portfolio-newspaper-item',
			layoutMode: 'masonry',
			getSortData: {
				date: function( $elem ) {
					return parseInt(String( jQuery( $elem ).attr('data-date')).replace(/-/g, ""));
				},
				alphabetical: function( $elem ) {
					return jQuery( $elem ).attr('data-title');
				}
			}
		});
		
		jQuery('.otw_portfolio_manager-mosaic-layout').each(function(){
			var $this = jQuery(this);

			jQuery(this).isotope({
				masonry: {
					columnWidth: $this.attr('data-item-width')
				}
			});
		});

		var $optionSets_filter = jQuery('.option-set.otw_portfolio_manager-portfolio-filter'),
			$optionLinks_filter = $optionSets_filter.find('a');

		$optionLinks_filter.click(function(e) {
			e.preventDefault();

			var $this = jQuery(this);

			if ($this.hasClass('selected')) {
				return false;
			}

			var $optionSet = $this.parents('.option-set');
			$optionSet.find('.selected').removeClass('selected');
			$this.addClass('selected');

			var selector = jQuery(this).data('filter');
			jQuery(this).parents('.otw_portfolio_manager-portfolio-newspaper-filter').parent().find($container).isotope({filter: selector});
		});
	} catch(err) {}

	//Portfolio Sorting
	var $optionSets_sort = jQuery('.option-set.otw_portfolio_manager-portfolio-sort'),
		$optionLinks_sort = $optionSets_sort.find('a');

	$optionLinks_sort.click(function(e){
		e.preventDefault();

		var $this = jQuery(this);

		if ($this.hasClass('selected')) {
			return false;
		}

		var $optionSet = $this.parents('.option-set');
		$optionSet.find('.selected').removeClass('selected');
		$this.addClass('selected');

		var value = $this.attr('data-option-value');
		jQuery(this).parents('.otw_portfolio_manager-portfolio-newspaper-sort').parent().find($container).isotope({ sortBy : value });
	});

	//horizontal layout
	otw_portfolio_horizontal_layout('.otw_portfolio_manager-horizontal-layout-items');
});

//Window resize event
try {
	jQuery(window).smartresize(function(){
		try {
			otw_pm_calculate_columns('.otw_portfolio_manager-mosaic-layout');
		} catch(err) { }

		try {
			otw_portfolio_horizontal_layout('.otw_portfolio_manager-horizontal-layout-items');
		} catch(err) { }

		try {
			jQuery('.otw_portfolio_manager-mosaic-layout').each(function(){
				var $this = jQuery(this);

				jQuery(this).isotope({
					masonry: {
						columnWidth: $this.attr('data-item-width')
					}
				});
			});
		} catch(err) { }
	});
} catch(err) { }

function otw_pm_hover_effects(){
	jQuery('.otw_portfolio_manager-hover-effect-5, .otw_portfolio_manager-hover-effect-12').each(function(){
		$this = jQuery(this).find('.otw_portfolio_manager-portfolio-media.otw_portfolio_manager-format-image > a');
		
		if( $this.find('span.otw-hover-effect').length == 0 ){
			$this.append('<span class="otw-hover-effect"></span>');
		}
	});

	jQuery('.otw_portfolio_manager-valign-middle').each(function(){
		jQuery(this).css({'margin-top': 0 - (jQuery(this).outerHeight() / 2) + 'px'})
	});

	//Special effects
	jQuery('img', '.otw_portfolio_manager-hover-effect-13 .otw_portfolio_manager-portfolio-media.otw_portfolio_manager-format-image > a').each(function(){
		jQuery(this).clone().addClass("otw_portfolio_manager-hover-img").insertAfter(jQuery(this)).load(function(){
			Pixastic.process(this, "desaturate", {average: !1});
		});
	});

	jQuery('img', '.otw_portfolio_manager-hover-effect-14 .otw_portfolio_manager-portfolio-media.otw_portfolio_manager-format-image > a').each(function(){
		jQuery(this).clone().addClass("otw_portfolio_manager-hover-img").insertAfter(jQuery(this)).load(function(){
			Pixastic.process(this, "blurfast", {amount: 0.3});
		});
	});

	jQuery('img', '.otw_portfolio_manager-hover-effect-15 .otw_portfolio_manager-portfolio-media.otw_portfolio_manager-format-image > a').each(function(){
		jQuery(this).clone().addClass("otw_portfolio_manager-hover-img").insertAfter(jQuery(this)).load(function(){
			Pixastic.process(this, "blurfast", {amount: 0.05});
		});
	});

	jQuery('img', '.otw_portfolio_manager-hover-effect-16 .otw_portfolio_manager-portfolio-media.otw_portfolio_manager-format-image > a').each(function(){
		jQuery(this).clone().addClass("otw_portfolio_manager-hover-img").insertAfter(jQuery(this)).load(function(){
			Pixastic.process(this, "glow", {amount: 0.3, radius: 0.2});
		});
	});

	//IE8 frameborder fixer
	jQuery('.otw_portfolio_manager-format-video iframe, .otw_portfolio_manager-format-audio iframe').each(function(){
		jQuery(this).attr({'frameBorder': 'no'});
	});
}

//Masonry layout
function otw_pm_calculate_columns(container) {

	jQuery(container).each(function(){
		

		var $this = jQuery(this),
			containerWidth = $this.width(),
			minCol = Math.floor(containerWidth / 12);
			
		if (minCol*3 >= 200) {

			if($this.data('columns') == 3){
//				$this.attr({'data-item-width': minCol*4});
			} else if($this.data('columns') == 4){
			//	$this.attr({'data-item-width': minCol*3});
			}

			jQuery('> .otw_portfolio_manager-iso-item', $this).each(function() {
				var $this = jQuery(this);
				if ($this.hasClass('otw_portfolio_manager-1-4')) {
					$this.css('width', minCol*3);
				} else if ($this.hasClass('otw_portfolio_manager-2-4') || $this.hasClass('otw_portfolio_manager-1-2')) {
					$this.css('width', minCol*6);
				} else if ($this.hasClass('otw_portfolio_manager-1-3')) {
					$this.css('width', minCol*4);
				} else if ($this.hasClass('otw_portfolio_manager-2-3')) {
					$this.css('width', minCol*8);
				}
			});

		} else if ( minCol*3 < 200 && minCol*3 > 150) {
			
			if($this.data('columns') == 3){
//				$this.attr({'data-item-width': minCol*6});
			} else if($this.data('columns') == 4){
//				$this.attr({'data-item-width': minCol / 2});
			}

			jQuery('> .otw_portfolio_manager-iso-item', $this).each(function() {
				var $this = jQuery(this);
				if ($this.hasClass('otw_portfolio_manager-1-4')) {
					$this.css('width', minCol*6);
				} else if ($this.hasClass('otw_portfolio_manager-2-4') || $this.hasClass('otw_portfolio_manager-1-2')) {
					$this.css('width', minCol*12);
				} else if ($this.hasClass('otw_portfolio_manager-1-3')) {
					$this.css('width', minCol*6);
				} else if ($this.hasClass('otw_portfolio_manager-2-3')) {
					$this.css('width', minCol*12);
				}
			});

		}  else if ( minCol*3 <= 150) {
			
			//$this.attr({'data-item-width': minCol*12});

			jQuery('> .otw_portfolio_manager-iso-item', $this).each(function() {
				jQuery(this).css('width', minCol*12);
			});
		}

		jQuery('> .otw_portfolio_manager-iso-item', $this).each(function() {
			
			
			if( ( jQuery(this).hasClass('otw_portfolio_manager-1-2') || jQuery(this).hasClass('otw_portfolio_manager-2-3') ) && jQuery(this).hasClass('height1')){
				jQuery(this).css('height', jQuery(this).outerWidth()/2);
			} else if(jQuery(this).hasClass('height2')){
				jQuery(this).css('height', jQuery(this).outerWidth()*2);
			} else {
				jQuery(this).css('height', jQuery(this).outerWidth());
			}

			jQuery(this).find('.otw_portfolio_manager-portfolio-media.otw_portfolio_manager-format-image a img').css({'width': jQuery(this).width(), 'height': jQuery(this).height() })
			jQuery(this).find('.otw_ier').removeAttr( 'style' );
			jQuery(this).find('.otw_ier iframe').attr( 'width', jQuery(this).width() ).attr( 'height', jQuery(this).height() );
		});
		
	});
}

//Timeline layout
function timeline_pm_layout_fixer(){
	jQuery('.otw_portfolio_manager-portfolio-timeline .otw_portfolio_manager-portfolio-timeline-item').removeClass('odd').removeClass('even');
	jQuery('.otw_portfolio_manager-portfolio-timeline .otw_portfolio_manager-portfolio-timeline-item:nth-child(2n-1)').addClass('odd');
	jQuery('.otw_portfolio_manager-portfolio-timeline .otw_portfolio_manager-portfolio-timeline-item:nth-child(2n)').addClass('even');
}

//Horizontal layout
function otw_portfolio_horizontal_layout(container){
	jQuery(container).each(function(){
		jQuery(this).css({'opacity': '0'});

		var $this = jQuery(this),
			container_width = $this.parent('.otw_portfolio_manager-horizontal-layout-wrapper').width(),
			row = 1,
			item_margin = $this.data('item-margin'),
			cache_width = 0,
			height_items = [];

		$this.children('.otw_portfolio_manager-horizontal-item').each(function(){
			if( jQuery(this).attr('data-original-width') === undefined ){
				var $img = jQuery(this).find('.otw_portfolio_manager-portfolio-media.otw_portfolio_manager-format-image img');

				jQuery(this).attr({'data-original-width': $img.attr('width')});
				jQuery(this).attr({'data-original-height': $img.attr('height')});

				//remove image size
				$img.attr({'width': ''});
				$img.attr({'height': ''});
			}

			jQuery(this).css({'margin-right': ''});

			cache_width += ( jQuery(this).data('original-width') + item_margin );
			
			jQuery(this).attr({'data-row': row});

			if( cache_width >= container_width ){
				//new height = original height / original width x new width
				height_items.push( (jQuery(this).data('original-height') / (cache_width - item_margin) * container_width) );
				
				jQuery(this).css({'margin-right': '0px'});
				jQuery(this).attr( 'data-last', 1 );

				cache_width = 0;
				row += 1;
			}else{
				jQuery(this).attr( 'data-last', 0 );
			}
		});
		
		for (var i = 0; i < height_items.length; i++) {
			var tw_size = 0;
			$this.children('.otw_portfolio_manager-horizontal-item[data-row="'+ (i + 1) +'"]').each(function(){
				//new width = original wdith / original height x new height
				var new_width = Math.ceil( jQuery(this).data('original-width') / jQuery(this).data('original-height') * height_items[i] );
				
				tw_size = tw_size + new_width + item_margin;
				
				if(jQuery( this ).attr( 'data-last' ) == '1' ){
					
					if( tw_size < container_width ){
						
						new_width = new_width + ( container_width - tw_size );
						
					}else if( tw_size > container_width ){
						
						new_width = new_width - ( tw_size - container_width );
					}
				}
				
				jQuery(this).find('.otw_portfolio_manager-portfolio-media.otw_portfolio_manager-format-image').css( {'width': new_width + 'px', 'height': parseInt(height_items[i]) });
				
				jQuery(this).find('.otw_ier iframe').attr( 'width', new_width ).attr( 'height', parseInt(height_items[i]) );
			});
		}

		if( $this.children('.otw_portfolio_manager-horizontal-item[data-row="'+ row +'"]').length > 0 ){
			$this.children('.otw_portfolio_manager-horizontal-item[data-row="'+ row +'"]').each(function(){
				jQuery(this).find('.otw_portfolio_manager-portfolio-media.otw_portfolio_manager-format-image').css({'width': jQuery(this).data('original-width') + 'px', 'height': jQuery(this).data('original-height') });
				
				jQuery(this).find('.otw_ier iframe').attr( 'width', jQuery(this).data('original-width') ).attr( 'height', jQuery(this).data('original-height') );
			});

			$this.children('.otw_portfolio_manager-horizontal-item[data-row="'+ row +'"]:last-child').css({'margin-right': '0px'});
		}

		$this.css({'opacity': '1'});
	});
}

//Social shares
function otw_pm_social_shares(){
	jQuery('.otw_portfolio_manager-social-share-buttons-wrapper').each(function(){
		var $this = jQuery(this);
			title = jQuery(this).data('title'),
			description = jQuery(this).data('description'),
			image = jQuery(this).data('image'),
			url = jQuery(this).data('url');

		jQuery.ajax({
			type: 'POST',
			url: socialShareURL,
			dataType: 'json',
			cache: false,
			data: 'url='+ url,
			success: function(data) {
			
				if(data.info !== 'error'){
					
					$this.find('.otw_portfolio-manager-social-share').each(function(){
						if(jQuery(this).hasClass('otw-facebook')){
							jQuery(this).append('<span class="data-shares">'+ data.facebook +'</span>');
							jQuery(this).attr({'href': 'http://www.facebook.com/sharer.php?u='+ url});
						} else if(jQuery(this).hasClass('otw-twitter')){
							jQuery(this).append('<span class="data-shares">'+ data.twitter +'</span>');
							jQuery(this).attr({'href': 'https://twitter.com/intent/tweet?source=tweetbutton&text='+ title +'&url='+ encodeURIComponent(url)});
						} else if(jQuery(this).hasClass('otw-google_plus')){
							jQuery(this).append('<span class="data-shares">'+ data.google_plus +'</span>');
							jQuery(this).attr({'href': 'https://plus.google.com/share?url='+ url});
						} else if(jQuery(this).hasClass('otw-linkedin')){
							jQuery(this).append('<span class="data-shares">'+ data.linkedin +'</span>');
							jQuery(this).attr({'href': 'http://www.linkedin.com/shareArticle?mini=true&url='+ encodeURIComponent(url) +'&title='+ escape(title) +'&summary='+ escape(description)});
						} else if(jQuery(this).hasClass('otw-pinterest')){
							jQuery(this).append('<span class="data-shares">'+ data.pinterest +'</span>');
							jQuery(this).attr({'href': 'http://pinterest.com/pin/create/button/?url='+ encodeURIComponent(url) +'&media='+ encodeURIComponent(image) +'&description='+ escape(description)});
						}
					});
				}
			}
		});
	});

	jQuery('.otw_portfolio_manager-social-wrapper').each(function(){
		var $this = jQuery(this);
			title = jQuery(this).data('title'),
			description = jQuery(this).data('description'),
			image = jQuery(this).data('image'),
			url = jQuery(this).data('url');
		
		jQuery(this).children('.otw_portfolio_manager-social-item').each(function(){
			if(jQuery(this).hasClass('otw-facebook')){
				jQuery(this).attr({'href': 'http://www.facebook.com/sharer.php?u='+ url});
			} else if(jQuery(this).hasClass('otw-twitter')){
				jQuery(this).attr({'href': 'https://twitter.com/intent/tweet?source=tweetbutton&text='+ title +'&url='+ encodeURIComponent(url)});
			} else if(jQuery(this).hasClass('otw-google_plus')){
				jQuery(this).attr({'href': 'https://plus.google.com/share?url='+ url});
			} else if(jQuery(this).hasClass('otw-linkedin')){
				jQuery(this).attr({'href': 'http://www.linkedin.com/shareArticle?mini=true&url='+ encodeURIComponent(url) +'&title='+ escape(title) +'&summary='+ escape(description)});
			} else if(jQuery(this).hasClass('otw-pinterest')){
				jQuery(this).attr({'href': 'http://pinterest.com/pin/create/button/?url='+ encodeURIComponent(url) +'&media='+ encodeURIComponent(image) +'&description='+ escape(description)});
			}
		});
	});
	update_pm_social_stuff();
}

function otw_pm_responsive_videos() {
	jQuery('.otw_portfolio_manager-portfolio-media-wrapper').fitVids({ customSelector: "iframe[src*='soundcloud.com']"});
}

function otw_pm_enable_sliders () {
	jQuery('.otw_portfolio_manager-format-gallery').flexslider({
			animation: "slide" // slide or fade
	});
}
function update_pm_social_stuff() {
	//Twitter
	
	jQuery.getScript("//platform.twitter.com/widgets.js");
	
	// G+
	(function() {
		var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
		po.src = 'https://apis.google.com/js/platform.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
	})();
}