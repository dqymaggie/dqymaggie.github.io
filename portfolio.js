// var element = document.getElementById('darkmode');

function darkMode() {
    var element = document.body;
    element.classList.toggle('dark-mode');

    var icon = document.getElementById('darkmode-icon');
    // if (element.classList.contains('dark-mode')) {
    //     icon.classList.remove('fa-moon');
    //     icon.classList.add('fa-sun');
    // } else {
    //     icon.classList.remove('fa-sun');
    //     icon.classList.add('fa-moon');
    // }
    if (element.classList.contains('dark-mode')) {
        icon.classList.remove('bi-moon-fill');
        icon.classList.add('bi-sun');
    } else {
        icon.classList.remove('bi-sun');
        icon.classList.add('bi-moon-fill');
    }
}