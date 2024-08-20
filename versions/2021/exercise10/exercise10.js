console.log("connected!");

var input1 = document.getElementById('username');

var input2 = document.getElementById('password');

var feedback = document.getElementById('feedback');

var change = document.getElementById('change');

function Tip(message){
  feedback.textContent = message;
}

input1.addEventListener('focus', function(){Tip("username should be at least 5 characters")});

input2.addEventListener('focus', function(){Tip("password should be at least 7 characters")});


function Message(element, num, message){
  var text = element.value;

  var len = text.length;

  if (len < num){
    feedback.textContent = message;
  }
}

input1.addEventListener('blur', function(){Message(input1, 5, "Your username should be at least 5 characters")});

input2.addEventListener('blur', function(){Message(input2, 7, "Your password should be at least 7 characters")});

function ChangeStyle(){
  change.style.color = "blue";
}

function OriginalStyle(){
  change.style.color = "black";
}

change.onmouseover = function(){ChangeStyle();};
change.onmouseout = function(){OriginalStyle();};
