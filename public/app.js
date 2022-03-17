const navs = document.querySelectorAll(".nav-item");

if (window.location.pathname == "/create") {
  navs[1].className = "nav-item active";
} else if (window.location.pathname == "/polls") {
  navs[2].className = "nav-item active";
} else {
  navs[0].className = "nav-item active";
}
