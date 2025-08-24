//This is the beginning of the creation of
//the color gradient percentage bar.
let line = document.querySelector(".line"); //Color percentage line bar
let circle1 = document.querySelector(".circle1"); //First percentile for the tape
let circle2 = document.querySelector(".circle2"); //ُSecond percentile for the tape
let span1 = document.createElement("span"); //First percent
let span2 = document.createElement("span"); //Second percent
span1.textContent = "0"; //for the beginning
span2.textContent = "100"; //for the beginning
let dragCircle1 = false;
let dragCircle2 = false;
span2.classList.add("span"); //Percentage display
span1.classList.add("span"); //Percentage display
circle1.appendChild(span1);
circle2.appendChild(span2);

//For bar coordinate calculations
let linewidth = line.clientWidth; //linewidth
let lineleft = line.getBoundingClientRect().left; //Left coordinates of the bar
let circlewidth = circle1.clientWidth; //circlewidth
let mouseXdifference = 22; //border + padding + (1/2* circle)
let endXdifference = 24; // 2 * padding + 2 * border

//The section where the color gradient code is displayed.
let coderBox = document.querySelector(".coderBox");
let linearCode = document.createElement("p"); //The tag within which the code is displayed.
linearCode.classList.add("linearCode");
coderBox.appendChild(linearCode);

//Visual display section of color circles
let linearGradient;
let percent1 = 0;
let percent2 = 100;
let type = "linear"; //type : linear or radial

//resize section for fixed bug
function updateWidthBasedCalculations() {
  checkScreenSize()
  linearGradient.style.background = `${type}-gradient(${angleDeg}, ${inputcolor1.value} ${percent1}%, ${inputcolor2.value} ${percent2}%)`;
  line.style.background = linearGradient.style.background;
  linewidth = line.clientWidth; //linewidth
  lineleft = line.getBoundingClientRect().left; //Left coordinates of the bar
  circlewidth = circle1.clientWidth; //circlewidth
}

function checkScreenSize() {
  if (window.innerWidth <= 768) {
    linearGradient = document.querySelector(".linearGradient");
  } else {
    document.querySelector('.linearGradient').style.background='transparent'
    linearGradient = document.body;
  }
}


//Circle part of the protractor
let mainCircle = document.querySelector(".main-circle"); //The main circle
//  with the small circle inside it rotating around an axis.
let littleCircle = document.querySelector(".little-circle"); //Small circle and protractor
let dragDegree = false;
let angleDeg = "0deg"; //Initial value
let angle = 0;
let trueAngle = 0;

//Color receiving section
let inputcolor1 = document.getElementById("color1");
let inputcolor2 = document.getElementById("color2");
inputcolor1.value = "#008000"; //Initial value
inputcolor2.value = "#ff0000"; //Initial value
let button = false; //This is so that when the gradient type changer buttons
//are pressed, the gradient does not work and does not cause bugs.
checkScreenSize()

//The line of code that the original creator
linearGradient.style.background = `${type}-gradient(${angleDeg}, ${inputcolor1.value} ${percent1}%, ${inputcolor2.value} ${percent2}%)`;
line.style.background = linearGradient.style.background; //To make the bar and the display section have the same gradient
circle1.style.background = inputcolor1.value;
circle2.style.background = inputcolor2.value;


window.addEventListener("resize", updateWidthBasedCalculations);

//First percentile drag
circle1.addEventListener("mousedown", function (e) {
  dragCircle1 = true;
});
//First percentile drag
circle2.addEventListener("mousedown", function (e) {
  dragCircle2 = true;
});
//For a small circle, a protractor
littleCircle.addEventListener("mousedown", function () {
  dragDegree = true;
});

//Important part of the site
//Where the coordinate calculation is located
document.addEventListener("mousemove", function (e) {
  //In this section, we move an element by dragging
  //and using mouse coordinates.

  let mouseX = e.clientX - lineleft - mouseXdifference; //Start section of the bar
  let endX = linewidth - circlewidth - endXdifference; //The end of the tape
  //Displacement of the first percentile with the following calculations
  if (dragCircle1 && 0 <= mouseX && mouseX <= endX) {
    circle1.style.left = mouseX + "px"; //Styling to create movement with mouse movement
    span1.textContent = Math.round((mouseX / endX) * 100);
    percent1 = parseInt(span1.textContent);
    //Determining percentage using a percent meter
    linearGradient.style.background = `${type}-gradient(${angleDeg}, ${inputcolor1.value} ${percent1}%, ${inputcolor2.value} ${percent2}%)`;
  } //Displacement of the second percentile with the following calculations
  else if (dragCircle2 && 10 <= mouseX && mouseX <= endX + 10) {
    circle2.style.left = mouseX + "px"; //Styling to create movement with mouse movement
    span2.textContent = Math.round(((mouseX - 10) / endX) * 100);
    percent2 = parseInt(span2.textContent);
    //Determining percentage using a percent meter
    linearGradient.style.background = `${type}-gradient(${angleDeg}, ${inputcolor1.value} ${percent1}%, ${inputcolor2.value} ${percent2}%)`;
  }
  linearCode.textContent = linearGradient.style.background;
  line.style.background = linearGradient.style.background;

  //Protractor circle calculations section
  //Here, calculations are made based on the coordinates of the center
  // of the circle and the mouse, the angle between the mouse and
  // the center of the circle is calculated, and the value of each
  // quadrant is added based on the trigonometric circle and the difference in width and length.
  if (!dragDegree) {
    return;
  } else if (dragDegree && !button) {
    let maincircle = mainCircle.getBoundingClientRect();
    let cx = e.clientX;
    let cy = e.clientY;
    let x = maincircle.left + (1 / 2) * mainCircle.clientWidth;
    let y = maincircle.top + (1 / 2) * mainCircle.clientHeight;
    let dx = Math.round(x - cx);
    let dy = Math.round(y - cy);
    angle = Math.round(
      Math.atan(Math.abs(dy) / Math.abs(dx)) * (180 / Math.PI)
    );
    if (dx < 0 && dy > 0) {
      //first section
      trueAngle = angle;
    } else if (dx < 0 && dy == 0) {
      trueAngle = 0;
    } else if (dx > 0 && dy > 0) {
      trueAngle = 180 - angle;
    } else if (dx == 0 && dy > 0) {
      trueAngle = 90;
    } else if (dx > 0 && dy < 0) {
      trueAngle = 180 + angle;
    } else if (dx > 0 && dy == 0) {
      trueAngle = 180;
    } else if (dx < 0 && dy < 0) {
      trueAngle = 360 - angle;
    } else if (dx == 0 && dy < 0) {
      trueAngle = 270;
    }
    angleDeg = trueAngle + "deg"; //Because angleDeg can be the degree and type of shape.
    mainCircle.style.transform = `rotate(${-trueAngle}deg)`; //Because the direction of the trigonometric circle and the rotation style are opposite.
    linearGradient.style.background = `${type}-gradient(${angleDeg}, ${inputcolor1.value} ${percent1}%, ${inputcolor2.value} ${percent2}%)`;
    line.style.background = linearGradient.style.background;
    checkScreenSize();
  }
});
document.addEventListener("mouseup", function () {
  dragCircle1 = false;
  dragCircle2 = false;
  dragDegree = false;
  //End of dragging and placing text inside span
  linearCode.textContent = linearGradient.style.background;
});

//The color submit button section, which is an input type
//event, is for ease of use.
inputcolor1.addEventListener("input", function () {
  linearGradient.style.background = `${type}-gradient(${angleDeg}, ${inputcolor1.value} ${percent1}%, ${inputcolor2.value} ${percent2}%)`;
  //As the color input moment changes, the gradient color also changes.
  circle1.style.background = inputcolor1.value;
});
inputcolor2.addEventListener("input", function () {
  linearGradient.style.background = `${type}-gradient(${angleDeg}, ${inputcolor1.value} ${percent1}%, ${inputcolor2.value} ${percent2}%)`;
  //As the color input moment changes, the gradient color also changes.
  circle2.style.background = inputcolor2.value;
});

//Gradient type buttons
let btnselect = document.querySelectorAll(".selectBtn");

//First button for radial navigation and circular shape
btnselect[0].addEventListener("click", function () {
  button = true;
  type = "radial";
  angleDeg = "circle";
  linearGradient.style.background = `${type}-gradient(${angleDeg}, ${inputcolor1.value} ${percent1}%, ${inputcolor2.value} ${percent2}%)`;
  linearCode.textContent = linearGradient.style.background;
});
//Second button for radial type and ellipse shape
btnselect[1].addEventListener("click", function () {
  button = true;
  type = "radial";
  angleDeg = "ellipse";
  linearGradient.style.background = `${type}-gradient(${angleDeg}, ${inputcolor1.value} ${percent1}%, ${inputcolor2.value} ${percent2}%)`;
  linearCode.textContent = linearGradient.style.background;
  line.style.background = linearGradient.style.background;
});
//Third button for linear type
btnselect[2].addEventListener("click", function () {
  button = true;
  type = "linear";
  angleDeg = "0deg";
  button = false;
  linearGradient.style.background = `${type}-gradient(${angleDeg}, ${inputcolor1.value} ${percent1}%, ${inputcolor2.value} ${percent2}%)`;
  linearCode.textContent = linearGradient.style.background;
  line.style.background = linearGradient.style.background;
});

//To copy the code into the code section
linearCode.addEventListener("click", function () {
  navigator.clipboard
    .writeText(linearCode.textContent)
    .then(function () {
      alert("Code is copied!!!");
    })
    .catch(function (err) {
      alert("Copying the code : " + err);
    });
});


//touch section for mobile and talblet device

let touchCircle1 = false;
let touchCircle2 = false;
let touchDegree = false;

circle1.addEventListener("touchstart", function (e) {
  touchCircle1 = true;
  e.preventDefault();
});
circle2.addEventListener("touchstart", function (e) {
  touchCircle2 = true;
  e.preventDefault();
});
littleCircle.addEventListener("touchstart", function (e) {
  touchDegree = true;
  e.preventDefault();
});

document.addEventListener("touchmove", function (e) {
  let touchX = e.touches[0].clientX - lineleft - mouseXdifference; //Start section of the bar
  let touchendX = linewidth - circlewidth - endXdifference; //The end of the tape
  //Displacement of the first percentile with the following calculations
  if (touchCircle1 && 0 <= touchX && touchX <= touchendX) {
    circle1.style.left = touchX + "px"; //Styling to create movement with mouse movement
    span1.textContent = Math.round((touchX / touchendX) * 100);
    percent1 = parseInt(span1.textContent);
    //Determining percentage using a percent meter
    linearGradient.style.background = `${type}-gradient(${angleDeg}, ${inputcolor1.value} ${percent1}%, ${inputcolor2.value} ${percent2}%)`;
  } //Displacement of the second percentile with the following calculations
  else if (touchCircle2 && 10 <= touchX && touchX <= touchendX + 10) {
    circle2.style.left = touchX + "px"; //Styling to create movement with mouse movement
    span2.textContent = Math.round(((touchX - 10) / touchendX) * 100);
    percent2 = parseInt(span2.textContent);
    //Determining percentage using a percent meter
    linearGradient.style.background = `${type}-gradient(${angleDeg}, ${inputcolor1.value} ${percent1}%, ${inputcolor2.value} ${percent2}%)`;
  }
  linearCode.textContent = linearGradient.style.background;
  line.style.background = linearGradient.style.background;

  //Protractor circle calculations section
  //Here, calculations are made based on the coordinates of the center
  // of the circle and the mouse, the angle between the mouse and
  // the center of the circle is calculated, and the value of each
  // quadrant is added based on the trigonometric circle and the difference in width and length.
  if (!touchDegree) {
    return;
  } else if (touchDegree && !button) {
    let maincircle = mainCircle.getBoundingClientRect();
    let cx = e.touches[0].clientX;
    let cy = e.touches[0].clientY;
    let x = maincircle.left + (1 / 2) * mainCircle.clientWidth;
    let y = maincircle.top + (1 / 2) * mainCircle.clientHeight;
    let dx = Math.round(x - cx);
    let dy = Math.round(y - cy);
    angle = Math.round(
      Math.atan(Math.abs(dy) / Math.abs(dx)) * (180 / Math.PI)
    );
    if (dx < 0 && dy > 0) {
      //first section
      trueAngle = angle;
    } else if (dx < 0 && dy == 0) {
      trueAngle = 0;
    } else if (dx > 0 && dy > 0) {
      trueAngle = 180 - angle;
    } else if (dx == 0 && dy > 0) {
      trueAngle = 90;
    } else if (dx > 0 && dy < 0) {
      trueAngle = 180 + angle;
    } else if (dx > 0 && dy == 0) {
      trueAngle = 180;
    } else if (dx < 0 && dy < 0) {
      trueAngle = 360 - angle;
    } else if (dx == 0 && dy < 0) {
      trueAngle = 270;
    }
    angleDeg = trueAngle + "deg"; //Because angleDeg can be the degree and type of shape.
    mainCircle.style.transform = `rotate(${-trueAngle}deg)`; //Because the direction of the trigonometric circle and the rotation style are opposite.
    linearGradient.style.background = `${type}-gradient(${angleDeg}, ${inputcolor1.value} ${percent1}%, ${inputcolor2.value} ${percent2}%)`;
    line.style.background = linearGradient.style.background;
  }
});
document.addEventListener("touchend", function (e) {
  touchCircle1 = false;
  touchCircle2 = false;
  touchDegree = false;
  linearGradient.style.background = `${type}-gradient(${angleDeg}, ${inputcolor1.value} ${percent1}%, ${inputcolor2.value} ${percent2}%)`;
  linearCode.textContent = linearGradient.style.background;
  line.style.background = linearGradient.style.background;
});

window.addEventListener("resize", updateWidthBasedCalculations);
