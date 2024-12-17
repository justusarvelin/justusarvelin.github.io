let slideIndex = [1, 1, 1];
let slideId = ["mySlides1", "mySlides2", "mySlides3"];

showSlides(1, 0);
showSlides(1, 1);
showSlides(1, 2);

function plusSlides(n, no) {
  showSlides(slideIndex[no] += n, no);
}

function showSlides(n, no) {
  let i;
  let x = document.getElementsByClassName(slideId[no]);
  
  if (n > x.length) { slideIndex[no] = 1; }    
  if (n < 1) { slideIndex[no] = x.length; }
  
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  
  x[slideIndex[no] - 1].style.display = "block";  
}

function magnify(zoom) {
  // Select all images with the class "magnify-image"
  var images = document.querySelectorAll('.magnify-image');
  
  images.forEach(function(img, index) {
    var glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");

    // Insert the magnifier glass before the image
    img.parentElement.insertBefore(glass, img);

    // Set background properties for the magnifier glass
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    
    var bw = 3;
    var w = glass.offsetWidth / 2;
    var h = glass.offsetHeight / 2;

    // Event listeners for mouse and touch events
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);

    function moveMagnifier(e) {
      e.preventDefault();
      var pos = getCursorPos(e);
      var x = pos.x;
      var y = pos.y;

      // Prevent magnifier from going outside the image bounds
      if (x > img.width - (w / zoom)) x = img.width - (w / zoom);
      if (x < w / zoom) x = w / zoom;
      if (y > img.height - (h / zoom)) y = img.height - (h / zoom);
      if (y < h / zoom) y = h / zoom;

      // Set position of magnifier glass
      glass.style.left = (x - w) + "px";
      glass.style.top = (y - h) + "px";

      // Update the magnifier glass background position
      glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }

    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      a = img.getBoundingClientRect();
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    }
  });
}

/* Initialize the magnifier for all images with the class "magnify-image" */
magnify(6); // The zoom level is set to 2x
