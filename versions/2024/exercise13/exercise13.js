var line1 = document.getElementById('line1');
var line2 = document.getElementById('line2');
var line3 = document.getElementById('line3');
var line4 = document.getElementById('line4');

line1.addEventListener('animationstart', function(){
  line2.style.opacity = '0';
  line3.style.opacity = '0';
  line4.style.opacity = '0';
})

line1.addEventListener('animationend', function(){
  line1.className = '';
  line2.className = 'line_animate_on_event';
})

line2.addEventListener('animationend', function(){
  line2.className = '';
  line2.style.opacity = '1';
  line3.className = 'line_animate_on_event';
})

line3.addEventListener('animationend', function(){
  line3.className = '';
  line3.style.opacity = '1';
  line4.className = 'line_animate_on_event';
})

line4.addEventListener('animationend', function(){
  line4.className = '';
  line4.style.opacity = '1';
})
