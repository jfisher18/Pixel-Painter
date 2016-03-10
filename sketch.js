
var code = "uuddlrlrBA";
var i = 0;
var img;
var tool;
var x;
var y;
var color1;
var color2;
var imgWidth = 800;
var imgHeight = 600;
var thickness;
var x1;
var y1;
var x2;
var y2;
var x3;
var y3;
var gridlines = false;

function setup() {
	var myCanvas = createCanvas(imgWidth, imgHeight);
	myCanvas.position(100, 50);
	fill(255);
	img = createGraphics(imgWidth, imgHeight);
	img.background(255);
	background(255);
	color1 = color(0, 0, 0);
	color2 = color(255, 255, 255);
	thickness = 2;
	clear = createButton('Clear');
	clear.position(100, 5);
	clear.mousePressed(clearCanvas);
	thicknessSlider = createSlider(1, 100, 5);
	thicknessSlider.style("width","200px");
	thicknessSlider.style("color","#fefefe");
	thicknessSlider.position(width + 110, 20);
}



//draw() repeats 60x per second
function draw() {
    img.strokeCap(ROUND);
    strokeCap(PROJECT);
	thickness = thicknessSlider.value();
	background(255);
	image(img, 0, 0);
	fill(color2);
	stroke(color1);
	strokeWeight(thickness);
	img.fill(color2);
	img.stroke(color1);
	img.strokeWeight(thickness);
	if (tool == "RECTANGLE") {
		if (x !== null) {
			rectangle();
		}
	}
	if (tool == "ELLIPSE") {
		if (x !== null) {
			ellipseTool();
		}
	}
	if (tool == "TRIANGLE") {
		tri();

	}
	if (tool == "SELECT") {
        select();

	}
	if (tool == "LINE") {
        strokeCap(ROUND);
		lineTool();

	}
	if (gridlines) {
		stroke(0,100);
		strokeWeight(2);
		for (var x = 0; x < width; x += 20) {
			line(x, 0, x, width);
		}
		for (var y = 0; y < height; y += 20) {
			line(0, y, width, y);
		}
	}
	mousePos();
}

function mousePos() {
	if (mouseX >= 0 && mouseX <= 800 && mouseY >= 0 && mouseY <= 600) {
		var info = select('#mousePos');
		info.html("Mouse coordinates: (" + mouseX + ", " + mouseY + ")");
	} else {
		var info = select('#mousePos');
		info.html("");
	}
}

function mouseDragged() {
	if (mouseButton == LEFT) {
		if (tool == "PENCIL") {
			pencil();
		}
		if (tool == "ERASER") {
			eraser();
		}
		if (tool == "SPRAY") {
			spray();
		}
	}
}

function mouseClicked() {
	/*if (tool == "BUCKET") {
        img.fill(color1);
        img.noStroke();
        img.rectMode(CORNER);
        var base = img.get(int(mouseX),int(mouseY));
        var queue = [[int(mouseX),int(mouseY)]];
					img.rect(queue[0][0],queue[0][1],10,10);
					var test = 0;
        while (test<5){
					console.log(2);
            img.rect(queue[0][0],queue[0][1],1,1);
						for(var x = -1; x<=1; x+=2){
							for(var y = -1; y<=1; x+=2){
								if(abs(x+y)==0){
									if(x>=0&&x<=width&&y>=0&&y<=height){
										if(img.get(queue[0][0]+x,queue[0][1]+y)==base){
											queue.append([queue[0][0]+x,queue[0][1]+y]);
										}
									}
								}

							}
						}
            queue.shift();
						test++;
        }

	}*/
	if (tool == "RECTANGLE") {
		if (x == null) {
			if (onCanvas()) {
				x = mouseX;
				y = mouseY;
			}
		} else {
			img.rect(x, y, mouseX - x, mouseY - y);
			x = null;
			y = null;
		}
	}if (tool == "SELECT") {
		if (x1 == null&&x2==null) {
			if (onCanvas()) {
				x1 = mouseX;
				y1 = mouseY;
			}
		} else if (x1 !== null&&x2==null) {
			if (onCanvas()) {
				x2 = mouseX;
				y2 = mouseY;
			}
		}  else  {
			if (onCanvas()) {
                x1=null;
                y1=null;
                x2=null;
                y2=null;
			}
		}
	}
	if (tool == "ELLIPSE") {
		if (x == null) {
			if (onCanvas()) {
				x = mouseX;
				y = mouseY;
			}
		} else {
			img.ellipseMode(CORNERS);
			img.ellipse(x, y, mouseX, mouseY);
			x = null;
			y = null;

		}
	}
	if (tool == "LINE") {
		if (x == null) {
			if (onCanvas()) {
				x = mouseX;
				y = mouseY;
			}
		} else {
			img.strokeWeight(thickness);
			img.stroke(color1);
			img.line(x, y, mouseX, mouseY);
			x = null;
			y = null;
		}
	}
	if (tool == "TRIANGLE") {
		if (x1 == null && x2 == null) {
			if (onCanvas()) {
				x1 = mouseX;
				y1 = mouseY;
			}
		} else if (x1 !== null && x2 == null) {
			if (onCanvas()) {
				x2 = mouseX;
				y2 = mouseY;
			}
		} else if (x1 !== null && x2 !== null) {
			img.triangle(x1, y1, x2, y2, mouseX, mouseY);
			x1 = null;
			x2 = null;
			y1 = null;
			y2 = null;


		}



	}
}


function pencil() {
	if (onCanvas()) {
		img.stroke(color1);
		img.strokeWeight(thickness);
		img.line(pmouseX, pmouseY, mouseX, mouseY);
	}
}

function eraser() {
	if (onCanvas()) {
		img.stroke(color2);
		img.strokeWeight(thickness);
		img.line(pmouseX, pmouseY, mouseX, mouseY);
	}
}

function spray() {
	if (onCanvas()) {
		img.fill(color1);
		img.noStroke();
		for (var i = 0; i <15*log(thickness); i++) {
			img.rect(randomGaussian(mouseX, sqrt(thickness)*2), randomGaussian(mouseY, sqrt(thickness)*2), 1, 1);
		}
	}
}

function rectangle() {
	if (x !== null) {
		rect(x, y, mouseX - x, mouseY - y);
	}
}
function select() {
        print(2);
    /*stroke(0);
    noFill();
    strokeWeight(2);
	if (x1 !== null&& x2!==null) {
		//rect(x1, y1, mouseX - x, mouseY - y);
	} else if(x1==null&&x2!=null){
		rect(x1, y1, x2 - x, y2 - y);
    }*/
}


function lineTool() {
	if (x !== null) {
		stroke(color1);
		strokeWeight(thickness);
		line(x, y, mouseX, mouseY);
	}
}

function ellipseTool() {
	if (x !== null) {
		ellipseMode(CORNERS);
		ellipse(x, y, mouseX, mouseY);
	}
}

function toScreenX(xin) {
	return (map(x, leftSidebar + margins / 2, leftSidebar + margins / 2 + imgWidtht * ale, 0, imgWidth));
}

function toScreenY(yin) {
	return (map(y, topBar + margins + (height - topBar - margins * 2 - imgHeight * scale) / 2, topBar + margins + (height - topBar - margins * 2 - imgHeight * scale) / 2 + imgHeight * scale, 0, imgWidth));
}

function tri() {
	fill(color2);
	stroke(color1);
	if (x1 !== null && x2 == null) {
		line(x1, y1, mouseX, mouseY);
	} else if (x1 !== null && x2 !== null) {
		triangle(x1, y1, x2, y2, mouseX, mouseY);
	}
}

function keyPressed() {
	if (keyCode == ESCAPE) {
		x1 = null;
		y1 = null;
		x2 = null;
		y2 = null;
		x = null;
		y = null;
	}
	if (key !== null) {
		var check = key;
	}
	if (keyCode == UP_ARROW) {
		check = 'u';
	}
	if (keyCode == DOWN_ARROW) {
		check = 'd';
	}
	if (keyCode == LEFT_ARROW) {
		check = 'l';
	}
	if (keyCode == RIGHT_ARROW) {
		check = 'r';
	}
	if (check == code.charAt(i)) {
		i++;
		if (i == code.length) {
			i = 0;
			window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
		}
	} else {
		i = 0;
	}
}

function changeTool(toolin) {
	tool = toolin;
	x1 = null;
	y1 = null;
	x2 = null;
	y2 = null;
	x = null;
	y = null;
}

function changeGridlines() {
	gridlines = !gridlines;
}

function mouseMoved() {
	var info = select('#infoContainer');
	//fo.html("<h2>mouseCoordinates:"+mouseX +", ,+mouseY+"</h2>");
}

function onCanvas() {
	return (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= width);
}

function clearCanvas() {
	img.background(255);
}
