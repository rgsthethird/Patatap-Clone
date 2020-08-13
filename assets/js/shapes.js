var w = view.size.width;
var h = view.size.height;
var keyMap = {};
var circles = [];

$('body').on("keydown", function(event) {
  var key = event.which;
  if(key != 13) {
    if (!keyMap.hasOwnProperty(key)) {
      keyMap[key] = {
        center: getRandomPoint(w,h),
        radius: getRandomSize(),
        color: getRandomColor(),
      };
      if (roll(4) >= 3) {
        keyMap[key]['linePoint'] = getRandomPoint(w,h);
        keyMap[key]['type'] = "line";
        if(roll(2) === 0) {
          keyMap[key]['rotation'] = 4;
        } else {
          keyMap[key]['rotation'] = -4;
        }
      } else {
        keyMap[key]['type'] = "circle";
      }
      var circObj = keyMap[key];
      if (circObj.type === "line") {
        keyMap[key].object = new Path();
        keyMap[key].object.add(new Point(circObj.center[0],circObj.center[1]));
        keyMap[key].object.add(new Point(circObj.linePoint[0],circObj.linePoint[1]));
        keyMap[key].object.strokeColor = circObj.color;
        keyMap[key].object.strokeWidth = 10;
      } else {
        var myCircle = new Path.Circle(new Point(circObj.center[0],circObj.center[1]), circObj.radius);
        myCircle.fillColor = circObj.color;
        circles.push(myCircle);
      }
    }
    var circObj = keyMap[key];
    if (circObj.type === "circle") {
      var myCircle = new Path.Circle(new Point(circObj.center[0],circObj.center[1]), circObj.radius);
      myCircle.fillColor = circObj.color;
      circles.push(myCircle);
    }
  } else {
    for(var spot in keyMap) {
      delete keyMap[spot];
    }
    circles = [];
    project.activeLayer.removeChildren();
  }
});

function onFrame(event) {
  for(var key in keyMap) {
    if(keyMap[key].type === "line") {
      keyMap[key].object.rotate(keyMap[key].rotation);
    }
  }
  for(var i = 0; i < circles.length; i++) {
    circles[i].scale(.93);
    circles[i].fillColor.hue += .75;
  }
}

function roll(num) {
  return Math.floor(Math.random() * num);
}

function getRandomSize() {
  var min = 250;
  var max = 500;
  return Math.max(min,Math.floor(Math.random()*max));
}

function getRandomPoint(w,h) {
  var width = Math.floor(Math.random()*w);
  var height = Math.floor(Math.random()*h);
  return [width,height];
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
