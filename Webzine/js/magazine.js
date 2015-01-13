/*
 * Magazine sample
*/


var loader = {
	top: 10,
	left: 10
};

function addPage(page, book) {

	var id, pages = book.turn('pages');

	// Create a new element for this page
	var element = $('<div />', {});

	// Add the page to the flipbook
	if (book.turn('addPage', element, page)) {

		// Add the initial HTML
		// It will contain a loader indicator and a gradient
		element.html('<div class="gradient"></div><div class="loader"></div>');
		element.find('.loader').css({top: loader.top, left: loader.left});


		// Load the page
		if (flashpages[page].version == 'swf') {
			loadFlashPage(page, element);
		} else {
			loadPage(page, element);
		}
	}

}




function createIeObject(url){
   var div = document.createElement("div");
   div.innerHTML = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'><param name='movie' value='" +url + "'></object>";
   return div.firstChild;
}
 

function loadFlashPage(page, pageElement) {
	var img = $('<div />');

	img.attr('id', 'flashcontent-' + page);
	img.html('hello world page: ' + page);

	var isMSIE = /*@cc_on!@*/false,
	   obj = (isMSIE) ? createIeObject(imagePath + flashpages[page].file) : document.createElement("object");
	 
	if (!isMSIE) {
	   obj.setAttribute("type", "application/x-shockwave-flash");
	   obj.setAttribute("data", imagePath + flashpages[page].file);
	}
	 
	//Add attributes to <object>
	obj.setAttribute("id", "myObjID");
	obj.setAttribute("width", "100%");
	obj.setAttribute("height", "100%");
	 
	//Add <param> node(s) to <object>
	var param_flashvars = document.createElement("param");
	param_flashvars.setAttribute("name", "flashvars");
	param_flashvars.setAttribute("value", "cat=meow&dog=woof");
	obj.appendChild(param_flashvars);
	 

	img.html(obj);



	if (flashpages[page].wide == 'y') {
		//alert("wide page");
		if (Math.ceil(page/2) == page/2) {
			img.css({width: '200%', height: '100%'});
			img.css({textAlign: 'left'});
		} else {
			img.css({marginLeft: '-100%', width: '200%', height: '100%'});
			img.css({textAlign: 'right'});
		}
	} else {
		img.css({width: '100%', height: '100%'});
	}


	// Add the image to the page after loaded

	img.appendTo(pageElement);

	// Remove the loader indicator
	pageElement.find('.loader').remove();

}

function loadPage(page, pageElement) {

	// Create an image element

	var img = $('<img />');

	img.mousedown(function(e) {
		e.preventDefault();
	});

	img.load(function() {
		
		// Set the size
		//$(this).css({width: '100%', height: '100%'});

		if (flashpages[page].wide == 'y') {
			//alert("wide page");
			if (Math.ceil(page/2) == page/2) {
				$(this).css({width: '200%', height: '100%'});
			} else {
				$(this).css({marginLeft: '-100%', width: '200%', height: '100%'});
			}
		} else {
			$(this).css({width: '100%', height: '100%'});
		}




		// Add the image to the page after loaded

		$(this).appendTo(pageElement);

		// Remove the loader indicator
		pageElement.find('.loader').remove();
	});

	// Load the page

	//img.attr('src', 'pages/' +  page + '.jpg');
	//img.attr('src', imagePath +  page + '.jpg');

	//alert("page: " + flashpages[page].file);
	img.attr('src', imagePath + flashpages[page].file);

}

// Zoom in / Zoom out

function zoomTo(event) {

		setTimeout(function() {
			if ($('.magazine-viewport').zoom('value')==1) {
				$('.magazine-viewport').zoom('zoomIn', event);
			} else {
				$('.magazine-viewport').zoom('zoomOut');
			}
		}, 1);

}



// Load large page

function loadLargePage(page, pageElement) {
	
	var img = $('<img />');

	img.load(function() {

		var prevImg = pageElement.find('img');
		//$(this).css({width: '100%', height: '100%'});
		if (flashpages[page].wide == 'y') {
			//alert("wide page");
			if (Math.ceil(page/2) == page/2) {
				img.css({width: '200%', height: '100%'});
				//img.css({width: 'auto', height: '100%'});
			} else {
				img.css({marginLeft: '-100%', width: '200%', height: '100%'});
				//img.css({marginLeft: '-100%', width: 'auto', height: '100%'});
			}
		} else {
			img.css({width: '100%', height: '100%'});
		}
		$(this).appendTo(pageElement);
		prevImg.remove();
		
	});

	// Loadnew page
	
	//img.attr('src', 'pages/' +  page + '-large.jpg');
	//img.attr('src', imagePath +  page + '.jpg');
	img.attr('src', imagePath + flashpages[page].file);
}

// Load small page

function loadSmallPage(page, pageElement) {
	
	var img = pageElement.find('img');

	if (flashpages[page].wide == 'y') {
		//alert("wide page");
		if (Math.ceil(page/2) == page/2) {
			img.css({width: '200%', height: '100%'});
			//img.css({width: $('.magazine').width(), height: '100%'});
			//img.css({width: $('.magazine').width()/2, height: $('.magazine').height()});
		} else {
			img.css({marginLeft: '-100%', width: '200%', height: '100%'});
			//img.css({marginLeft: '-100%', width: $('.magazine').width()/2, height: $('.magazine').height()});
		}
	} else {
		img.css({width: '100%', height: '100%'});
	}


	img.unbind('load');
	// Loadnew page

	//img.attr('src', 'pages/' +  page + '.jpg');
	//img.attr('src', imagePath +  page + '.jpg');
	img.attr('src', imagePath + flashpages[page].file);
}

// http://code.google.com/p/chromium/issues/detail?id=128488

function isChrome() {

	return navigator.userAgent.indexOf('Chrome')!=-1;

}

function disableControls(page) {
		if (page==1)
			$('.previous-button').hide();
		else
			$('.previous-button').show();
					
		if (page==$('.magazine').turn('pages'))
			$('.next-button').hide();
		else
			$('.next-button').show();
}

// Set the width and height for the viewport

function resizeViewport() {

	var width = $(window).width(),
		height = $(window).height(),
		options = $('.magazine').turn('options');

	checkvollbild();
	if (screenMode != 'fullscreen' && fixedWidth) {
		width = fixedWidth;
	}
	if (screenMode != 'fullscreen' && fixedHeight) {
		height = fixedHeight;
	}

	$('.magazine').removeClass('animated');

	$('.magazine-viewport').css({
		width: width,
		height: height
	}).
	zoom('resize');
	//$('.magazine').zoom('resize');


	if ($('.magazine').turn('zoom')==1) {

		var bound = calculateBound({
			width: options.width,
			height: options.height,
			//boundWidth: Math.min(options.width, width),
			//boundWidth: Math.min(options.width, width - 44), // minus the 2 next and previous buttons
			boundWidth: Math.min(width - 44), // minus the 2 next and previous buttons
			//boundHeight: Math.min(options.height, height)
			//boundHeight: Math.min(options.height, height - 50) // minus navigation
			boundHeight: Math.min(height - 50) // minus navigation
		});

		if (bound.width%2!==0)
			bound.width-=1;

		$('.magazine').turn('size', bound.width, bound.height);

		loader = {
			top: -11+bound.height/2,
			left: -11+bound.width/4
		};
		//$('.loader').css({top: -11+bound.height/2, left: -11+bound.width/4});
		$('.loader').css({top: loader.top, left: loader.left});


		if ($('.magazine').turn('page')==1)
			$('.magazine').turn('peel', 'tr');

		$('.next-button').css({height: bound.height, backgroundPosition: '-38px '+(bound.height/2-32/2)+'px'});
		$('.previous-button').css({height: bound.height, backgroundPosition: '-4px '+(bound.height/2-32/2)+'px'});

			

		if (bound.width!=$('.magazine').width() || bound.height!=$('.magazine').height()) {

			$('.magazine').turn('size', bound.width, bound.height);

			if ($('.magazine').turn('page')==1)
				$('.magazine').turn('peel', 'tr');

			$('.next-button').css({height: bound.height, backgroundPosition: '-38px '+(bound.height/2-32/2)+'px'});
			$('.previous-button').css({height: bound.height, backgroundPosition: '-4px '+(bound.height/2-32/2)+'px'});
		}

		//$('.magazine').css({top: -bound.height/2, left: -bound.width/2});
		$('.magazine').css({top: -50/2-bound.height/2, left: -bound.width/2});
	  //alert("top: " + $('.magazine').css('top'));
	  //alert("height: " + bound.height);

	}

	var magazineOffset = $('.magazine').offset(),
		boundH = height - magazineOffset.top - $('.magazine').height(),
		marginTop = (boundH - $('.thumbnails > div').height()) / 2;

	if (marginTop<0) {
		$('.thumbnails').css({height:1});
	} else {
		$('.thumbnails').css({height: boundH});
		$('.thumbnails > div').css({marginTop: marginTop});
	}

	if (magazineOffset.top<$('.made').height())
		$('.made').hide();
	else
		$('.made').show();

	$('.magazine').addClass('animated');

}


// Number of views in a flipbook

function numberOfViews(book) {
	return book.turn('pages') / 2 + 1;
}

// Current view in a flipbook

function getViewNumber(book, page) {
	return parseInt((page || book.turn('page'))/2 + 1, 10);
}

function moveBar(yes) {
	if (Modernizr && Modernizr.csstransforms) {
		$('#slider .ui-slider-handle').css({zIndex: yes ? -1 : 10000});
	}
}

function setPreview(view) {

	var previewWidth = 112,
		previewHeight = 73,
		previewSrc = 'pages/preview.jpg',
		preview = $(_thumbPreview.children(':first')),
		numPages = (view==1 || view==$('#slider').slider('option', 'max')) ? 1 : 2,
		width = (numPages==1) ? previewWidth/2 : previewWidth;

	_thumbPreview.
		addClass('no-transition').
		css({width: width + 15,
			height: previewHeight + 15,
			top: -previewHeight - 30,
			left: ($($('#slider').children(':first')).width() - width - 15)/2
		});

	preview.css({
		width: width,
		height: previewHeight
	});

	if (preview.css('background-image')==='' ||
		preview.css('background-image')=='none') {

		preview.css({backgroundImage: 'url(' + previewSrc + ')'});

		setTimeout(function(){
			_thumbPreview.removeClass('no-transition');
		}, 0);

	}

	preview.css({backgroundPosition:
		'0px -'+((view-1)*previewHeight)+'px'
	});
}

// Width of the flipbook when zoomed in

function BAKlargeMagazineWidth() {
	
	return 2214;

}

// decode URL Parameters

function decodeParams(data) {

	var parts = data.split('&'), d, obj = {};

	for (var i =0; i<parts.length; i++) {
		d = parts[i].split('=');
		obj[decodeURIComponent(d[0])] = decodeURIComponent(d[1]);
	}

	return obj;
}

// Calculate the width and height of a square within another square

function calculateBound(d) {
	
	var bound = {width: d.width, height: d.height};

	//if (bound.width>d.boundWidth || bound.height>d.boundHeight) {
		
		var rel = bound.width/bound.height;

		if (d.boundWidth/rel>d.boundHeight && d.boundHeight*rel<=d.boundWidth) {
			
			bound.width = Math.round(d.boundHeight*rel);
			bound.height = d.boundHeight;

		} else {
			
			bound.width = d.boundWidth;
			bound.height = Math.round(d.boundWidth/rel);
		
		}
	//}

	bound.width = 0.95 * bound.width;
	bound.height = 0.95 * bound.height;
		
	return bound;
}