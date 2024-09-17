// Get modal element
var modal = document.getElementById("registerModal");

// Get open modal button
var openModalBtn = document.getElementById("openModal");

// Get close button
var closeBtn = document.getElementsByClassName("close")[0];

// Open modal
openModalBtn.onclick = function() {
    modal.style.display = "block";
}

// Close modal
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// Close modal if clicked outside
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
