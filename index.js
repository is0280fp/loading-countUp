// view area function to start the animation
const element_to_animate = document.documentElement.querySelectorAll(".animate").item(0)

// function to check element in view area
function into_view_area(element) {
	const window_height = window.innerHeight;
	const window_top_position = window.scrollY;
	const window_bottom_position = (window_top_position + window_height);

    const element_height = element.offsetHeight;
    const element_top_position = element.getBoundingClientRect().top;
    const element_bottom_position = element_top_position + element_height;

    if ((element_bottom_position >= window_top_position) && (window_bottom_position >= element_top_position)) {
        element.classList.add("in_view")
    } else {
        element.classList.remove("in_view")
    }
}

// Add event listeners for scroll and resize events
window.addEventListener('scroll', into_view_area(element_to_animate));
window.addEventListener('resize', into_view_area(element_to_animate));

// Trigger the scroll event manually
window.dispatchEvent(new Event('scroll'));

function countTo (element, options) {
    options = Object.assign({}, countTo.defaults, options || {});

    // how many times to update the value, and how much to increment the value on each update
    const loops = Math.ceil(options.speed / options.refreshInterval)
    const increment = (options.to - options.from) / loops;
    
    let loopCount = 0;
    let value = options.from;

    const interval = setInterval(updateTimer, options.refreshInterval);

    // update value by loops
    function updateTimer() {
        value += increment;
        loopCount++;

        // add decimal and change string to number
        const valueWithDecimal = value.toFixed(options.decimals);
        const valueAsNumber = Number.parseFloat(valueWithDecimal);

        // output frontend
        const valueAsLocaleNumber = valueAsNumber.toLocaleString();
        element.innerHTML = valueAsLocaleNumber.replace(/\./g, element.dataset.seperator)

        // custom functions on update
        if (typeof(options.onUpdate) == 'function') {
            options.onUpdate.call(element);
        }

        // custom functions on complete
        if (loopCount >= loops) {
            clearInterval(interval);
            value = options.to;

            if (typeof(options.onComplete) == 'function') {
                options.onComplete.call(element);
            }
        }
    }
}

// Default options
countTo.defaults = {
    from: 0, // The number the element should start at
    to: 100, // The number the element should end at
    speed: 1000, // How long it should take to count between the target numbers
    refreshInterval: 100, // How often the element should be updated
    decimals: 0, // The number of decimal places to show
    onUpdate: null, // Custom function to run on update
    onComplete: null // Custom function to run on completion
};



// get the element and start to count number in view area
function updateOptions(element) {
    if (element.classList.contains('in_view') && !element.classList.contains('is_done')) {
        element.classList.add('is_running')
        
        if (element.classList.contains('is_running')) {
            const target = document.querySelector(".value")
            const options = {
                from: 0,
                to: target.dataset.count,
                speed: 3000,
                refreshInterval: 50,
                decimals: target.dataset.decimal,
                onUpdate: () => {
                    element.classList.add('is_done');
                },
                onComplete: () => {
                    element.classList.remove('is_running');
                }
            }
            countTo(target, options)
        }
    }
}

// Add event listeners for scroll and load events
window.addEventListener('scroll', updateOptions(element_to_animate));
window.addEventListener('load', updateOptions(element_to_animate));

const button = document.querySelectorAll(".start").item(0);
const countUp = document.querySelectorAll(".count_up").item(0);
button.addEventListener("click", () => {
    countUp.classList.remove("is_done");
    countUp.classList.remove("in_view");
    into_view_area(element_to_animate);
    updateOptions(element_to_animate);
})