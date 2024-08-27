function darkMode() {
    var element = document.body;
    element.classList.toggle('dark-mode');

    var icon = document.getElementById('darkmode-icon');
    if (element.classList.contains('dark-mode')) {
        icon.classList.remove('bi-moon-fill');
        icon.classList.add('bi-sun');
    } else {
        icon.classList.remove('bi-sun');
        icon.classList.add('bi-moon-fill');
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var links = document.querySelectorAll('.header-box a');

    links.forEach(function(link) {
        if (link.href === window.location.href) {
            link.querySelector('.header-text').classList.add('active');
        }
    });
});
