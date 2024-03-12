// view area function to start the animation
const element_to_animate = document.documentElement.querySelectorAll("animate")

// function to check element in view area
function into_view_area() {
	const window_height = window.innerHeight;
	const window_top_position = window.scrollY;
	const window_bottom_position = (window_top_position + window_height);

	// calculate view area
	// $.each(element_to_animate, function() {
	// 	var element_height = $(this).outerHeight();
	// 	var element_top_position = $(this).offset().top;
	// 	var element_bottom_position = (element_top_position + element_height);
 
	// 	//check to see if this current element is within viewport
	// 	if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
	// 		$(this).addClass('in_view');
	// 	}
	// 	else {
	// 		$(this).removeClass('in_view');
	// 	}
	// });
    element_to_animate.forEach((element)=>{
        const element_height = element.getBoundingClientRect().height
        const element_top_position = element.getBoundingClientRect().top
        const element_bottom_position = (element_top_position + element_height);
    })

    if ((element_bottom_position >= window_top_position) && (window_bottom_position >= element_top_position)) {
        element.classList.add("in_view")
    } else {
        element.classList.remove("in_view")
    }
}

// initialize function
window.on('scroll resize', into_view_area);
window.trigger('scroll');


// ++++++++++++++++++++++++++++++++++++
// counter box to count up the number from 0 to defined value

$.fn.countTo = function(options) {
	// merge the default plugin settings with the custom options
	options = $.extend({}, $.fn.countTo.defaults, options || {});

	// how many times to update the value, and how much to increment the value on each update
	var loops = Math.ceil(options.speed / options.refreshInterval),
		increment = (options.to - options.from) / loops;

	return $(this).each(function() {
		var _this = this,
			loopCount = 0,
			value = options.from,
			interval = setInterval(updateTimer, options.refreshInterval);

		// update value by loops
		function updateTimer() {
			value += increment;
			loopCount++;

			// add decimal and change string to number
			var valueWithDecimal = value.toFixed(options.decimals),
				valueAsNumber = Number.parseFloat(valueWithDecimal);

			// output frontend
			var valueAsLocaleNumber = valueAsNumber.toLocaleString();
			//$(_this).html(valueAsLocaleNumber);
			$(_this).html(valueAsLocaleNumber.replace(/\./g,$(_this).data('seperator')));

			// custom functions on update
			if (typeof(options.onUpdate) == 'function') {
				options.onUpdate.call(_this, value);
			}

			// custom functions on complete
			if (loopCount >= loops) {
				clearInterval(interval);
				value = options.to;

				if (typeof(options.onComplete) == 'function') {
					options.onComplete.call(_this, value);
				}
			}
		}
	});
};

// default options
$.fn.countTo.defaults = {
	from: 0,  // the number the element should start at
	to: 100,  // the number the element should end at
	speed: 1000,  // how long it should take to count between the target numbers
	refreshInterval: 100,  // how often the element should be updated
	decimals: 0,  // the number of decimal places to show
	onUpdate: null,  // callback method for every time the element is updated,
	onComplete: null,  // callback method for when the element finishes updating
};



// get the element and start to count number in view area
function updateOptions() {
	const elements = document.documentElement.getElementsByClassName(".count_up");
    
    elements.forEach(
        // function() {
        //     if($(this).hasClass('in_view') && !$(this).hasClass('is_done')) {
        //         $(this).addClass('is_running');

        //         if($(this).hasClass('is_running')) {
        //             $(this).find('.value').countTo({
        //                 from: 0
        //                 ,to: $(this).find('.value').data('count')
        //                 ,speed: 3000
        //                 ,refreshInterval: 50
        //                 ,decimals: $(this).find('.value').data('decimal')
        //                 ,onUpdate: (value) => {
        //                     element.addClass('is_done');
        //                 }
        //                 ,onComplete: function(value) {
        //                     element.removeClass('is_running');
        //                 }
        //             });
        //         }
        //     }
	    // }
        (element) => {
            if (element.classList.contains('in_view') && !element.classList.contains('is_done')) {
                element.classList.add('is_running')
                
                if (element.classList.contains('is_running')) {
                    const target = document.getElementsByClassName(".value")
                    const options = {
                        from: 0,
                        to: target.dataset.count,
                        speed: 3000,
                        refreshInterval: 50,
                        decimals: target.dataset.decimal,
                        onUpdate: (value) => {
                            value.classList.add('is_done');
                        },
                        onComplete: function(value) {
                            value.classList.remove('is_running');
                        }
                    }
                    countTo(target, options)
                }
            }
        }
    );
}
$(window).on('scroll load', function() {
    updateOptions();
});

// $('button.start').click(function() {
// 	$('.count_up').removeClass('is_done');
// 	$('.count_up').removeClass('in_view');
// 	into_view_area();
// 	updateOptions();
// });

const button = document.documentElement.getElementsByClassName(".button").getElementsByClassName(".start");
const countUp = document.documentElement.getElementsByClassName(".count_up")
button.addEventoListener("click", () => {
    countUp.classList.remove("is_done");
    countUp.classList.remove("in_view");
    into_view_area();
    updateOptions();
})