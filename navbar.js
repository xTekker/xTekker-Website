// Get the current page URL
var currentPageUrl = window.location.href;

// Get all the links in the navigation
var navLinks = document.querySelectorAll('#topnav a');

// Loop through the links and compare the URL with the current page URL
for (var i = 0; i < navLinks.length; i++) {
  var link = navLinks[i];

  if (link.href === currentPageUrl) {
    link.classList.add('active');
    break; // Stop checking further links
  }
}
