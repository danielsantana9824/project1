// Initialize the current slide index to 0 (starting with the first slide)
let currentSlide = 0;

// Select all elements with the class 'slide' and store them in a NodeList
const slides = document.querySelectorAll('.slide');

// Function to change the current slide
function changeSlide(direction) {
    // Remove the 'active' class from the current slide
    slides[currentSlide].classList.remove('active');
    
    // Calculate the new slide index:
    // 1. Add the direction (+1 for next, -1 for previous) to the current index
    // 2. Add the total number of slides to ensure the result is positive
    // 3. Use modulo operator to wrap around if we go past the last slide or before the first slide
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    
    // Add the 'active' class to the new current slide
    slides[currentSlide].classList.add('active');
}
