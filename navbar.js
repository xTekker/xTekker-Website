var currentPageUrl = window.location.href;
var navLinks = document.querySelectorAll('#topnav a');

for (var i = 0; i < navLinks.length; i++) {
  var link = navLinks[i];

  if (link.href === currentPageUrl) {
    link.classList.add('active');
    break;
  }
}
document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menuButton");
    const topnav = document.getElementById("topnav");

    menuButton.addEventListener("click", function () {
        if (topnav.style.display === "none" || topnav.style.display === "") {
            topnav.style.display = "block";
        } else {
            topnav.style.display = "none";
        }
    });
});

