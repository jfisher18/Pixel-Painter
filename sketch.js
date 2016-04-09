
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
var clipboard;
var pasting = false;
var saturation = 50;
var currentColor = 1;
var frame = 0;
var colorPallete;
var textOutput;
var textArray = [];
var defaultPallete;
var customPallete = [];

function setup() {
	pixelDensity(1);
	var myCanvas = createCanvas(imgWidth + 200, imgHeight);
	myCanvas.position(100, 50);
	img = createGraphics(imgWidth, imgHeight);
	img.background(255);
	background(255);
	color1 = color(0, 0, 0);
	color2 = color(255, 255, 255);
	thickness = 2;
	clear = createButton('Clear');
	clear.position(100, 5);
	clear.mousePressed(clearCanvas);
	save1 = createButton('Save JPEG');
	save1.position(170, 5);
	save1.mousePressed(saveJpg);
	save2 = createButton('Save PNG');
	save2.position(295, 5);
	save2.mousePressed(savePng);
	copy = createButton('Copy');
	copy.position(410, 5);
	copy.mousePressed(copyTool);
	paste = createButton('Paste');
	paste.position(480, 5);
	paste.mousePressed(pasteTool);
	thicknessSlider = createSlider(1, 100, 5);
	thicknessSlider.style("width", "200px");
	thicknessSlider.position(imgWidth + 110, 50);
	defaultPallete = [color(255, 0, 0, 255), color(0, 255, 0, 255), color(0, 0, 255, 255), color(255, 255, 0, 255), color(255, 255, 255, 0)];
}



//draw() repeats 60x per second
function draw() {
	frame++;
	fill(255);
	noStroke();
	rect(0, 0, imgWidth, imgHeight);
	img.strokeCap(ROUND);
	strokeCap(PROJECT);
	thickness = thicknessSlider.value();
	image(img, 0, 0);
	fill(color2);
	stroke(color1);
	strokeWeight(thickness);
	img.fill(color2);
	img.stroke(color1);
	img.strokeWeight(thickness);
	if ((tool == "PENCIL" || tool == "SPRAY" || tool == "ERASER") && onCanvas()) {
		noCursor();
	} else if (tool == "DROPPER" && onCanvas()) {
		cursor("icons/dropper.png", 5, 26);
	} else {
		cursor();
	}
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
		selectTool();
	}
	if (tool == "LINE") {
		strokeCap(ROUND);
		lineTool();
	}
	if (tool == "BEZIER") {
		bezierTool();
	}
	if (tool == "TEXT") {
		textTool();
	}


	if (pasting) {
		noFill();
		stroke(0);
		strokeWeight(1);
		rectMode(CORNER);
		image(clipboard, mouseX, mouseY);
		rect(mouseX, mouseY, clipboard.width, clipboard.height);
	}
	if (onCanvas()) {
		if (tool == "ERASER" || tool == "PENCIL") {
			ellipseMode(CENTER);
			noFill();
			stroke(0);
			strokeWeight(1);
			ellipse(mouseX, mouseY, thickness, thickness);
		}
		if (tool == "SPRAY") {
			ellipseMode(CENTER);
			noFill();
			stroke(0);
			strokeWeight(1);
			ellipse(mouseX, mouseY, sqrt(thickness) * 9, sqrt(thickness) * 9);
		}
	}
	if (gridlines) {
		stroke(0, 100);
		strokeWeight(2);
		for (var boxX = 0; boxX < imgWidth; boxX += 20) {
			line(boxX, 0, boxX, imgHeight);
		}
		for (var y = 0; y < height; y += 20) {
			line(0, y, imgWidth, y);
		}
	}
	mousePos();
	fill(52, 73, 94);
	noStroke();
	rect(imgWidth, 0, width - imgWidth, height);
	if (frame == 1) {
		drawColors();
	} else {
		drawColors2();
		noStroke();
		fill(100);
		rect(imgWidth + 5, height / 2 + 5, 190, 180);
		image(colorPallete, imgWidth + 10, height / 2 + 10);
	}
}


function mousePos() {
	if (onCanvas()) {
		var info = select('#mousePos');
		info.html("Mouse coordinates: (" + int(mouseX) + ", " + int(mouseY) + ")");
	} else {
		var info = select('#mousePos');
		info.html("");
	}
}

function mouseDragged() {
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
	if (!pasting) {
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
		}
		if (tool == "SELECT") {
			if (x1 == null && x2 == null || x1 !== null && x2 !== null) {
				if (onCanvas()) {
					x1 = constrain(mouseX, 0, imgWidth);
					y1 = constrain(mouseY, 0, imgHeight);
					x2 = null;
					y2 = null;
				}
			} else if (x1 !== null && x2 == null) {
				if (onCanvas()) {
					x2 = constrain(mouseX, 0, imgWidth);
					y2 = constrain(mouseY, 0, imgHeight);
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
		if (tool == "DROPPER") {
			if (onCanvas()) {
				if (currentColor == 1) {
					color1 = get(mouseX, mouseY);
					customPallete.unshift(color1);
				}
				if (currentColor == 2) {
					color2 = get(mouseX, mouseY);
					customPallete.unshift(color2);
				}
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
		if (tool == "BEZIER" && onCanvas()) {
			if (x == null && x1 == null && x2 == null) {
				x = mouseX;
				y = mouseY;

			} else if (x !== null && x1 == null && x2 == null) {
				x1 = mouseX;
				y1 = mouseY;

			} else if (x !== null && x1 !== null && x2 == null) {
				x2 = mouseX;
				y2 = mouseY;

			} else if (x !== null && x1 !== null && x2 !== null) {               image(img,0,0);
                                                                    strokeWeight(thickness);
                                                                  stroke(color1);
                                                                  noFill();
		bezier(x, y, x1, y1, x2, y2, mouseX, mouseY);
				img.image(get(0,0,imgWidth,imgHeight),0,0);
				x = null;
				y = null;
				x1 = null;
				y1 = null;
				x2 = null;
				y2 = null;

			}
		}

		if (tool == "PENCIL" && onCanvas()) {

			if (mouseButton == LEFT) {
				img.fill(color1);
			}
			if (mouseButton == RIGHT) {
				img.fill(color2);
			}
			img.noStroke();
			img.ellipse(mouseX, mouseY, thickness, thickness);
		}
		if (tool == "ERASER" && onCanvas()) {
			img.fill(color2);
			img.noStroke();
			img.ellipse(mouseX, mouseY, thickness, thickness);
		}
		if (tool == "SPRAY" && onCanvas()) {
			spray();
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
		if (tool == "TEXT") {
			if (x == null) {
				if (onCanvas()) {
					x = mouseX;
					y = mouseY;
					textOutput = "";
					for (var t = 0; t <= textArray.length; t++) {
						shorten(textArray);
					}


				}
			}
		}

		//        else{
		//                   for(var t=0; t<=textArray.length; t++){
		//                        shorten(textArray);
		//                    }
		//                    img.text(textOutput, x, y);
		//                    x=null;
		//                    y=null;
		//                }
		if (mouseX >= imgWidth + 10 && mouseX <= width - 10 && mouseY >= height / 2 + 10 && mouseY <= height / 2 + 180) {
			if (currentColor == 1) {
				color1 = colorPallete.get(mouseX - imgWidth, mouseY - height / 2);
				customPallete.unshift(color1);
			} else {
				color2 = colorPallete.get(mouseX - imgWidth, mouseY - height / 2);
				customPallete.unshift(color2);
			}
		}

		if (mouseX >= imgWidth + 10 && mouseX <= width - 10 && mouseY >= height / 2 + 200 && mouseY <= height / 2 + 230) {
			var temp = get(0,0,width,height);
			if (currentColor == 1) {
				color1 = temp.get(mouseX, mouseY);
				customPallete.unshift(color1);
			} else {
				color2 = temp.get(mouseX, mouseY);
				customPallete.unshift(color2);
			}
		}
		if (mouseX >= imgWidth + 5 && mouseX <= imgWidth + 5 + 95 && mouseY >= height / 2 + 5 + 250 && mouseY <= height / 2 + 5 + 290) {
			currentColor = 1;
		}
		if (mouseX >= imgWidth + 105 && mouseX <= imgWidth + 105 + 95 && mouseY >= height / 2 + 5 + 250 && mouseY <= height / 2 + 5 + 290) {
			currentColor = 2;
		}
		var index = 0;
		for (var boxX = imgWidth + 5; boxX < width; boxX += 39) {
			if (mouseX >= boxX + 5 && mouseX <= boxX + 29 && mouseY >= height / 2 - 73 + 5 && mouseY <= height / 2 - 73 + 29) {
				if (currentColor == 1) {
					color1 = defaultPallete[index];
				} else {
					color2 = defaultPallete[index];
				}
			}
			index += 1;
		}
		index = 0;
		for (var boxX = imgWidth + 5; boxX < width; boxX += 39) {
			if (mouseX >= boxX + 5 && mouseX <= boxX + 29 && mouseY >= height / 2 - 73 + 39 && mouseY <= height / 2 - 73 + 29 + 34 && index <= customPallete.length - 1) {
				if (currentColor == 1) {
					color1 = customPallete[index];
				} else {
					color2 = customPallete[index];
				}
			}
			index += 1;
		}
	} else {
		if (onCanvas()) {
			pasting = false;
			img.image(clipboard, mouseX, mouseY);
		}
	}
}




function pencil() {
	if (onCanvas()) {
		if (mouseButton == LEFT) {
			img.stroke(color1);
		}
		if (mouseButton == RIGHT) {
			img.stroke(color2);
		}
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
		for (var i = 0; i < 15 * log(thickness); i++) {
			img.rect(randomGaussian(mouseX, sqrt(thickness) * 2), randomGaussian(mouseY, sqrt(thickness) * 2), 1, 1);
		}
	}
}

function rectangle() {
	if (x !== null) {
		rect(x, y, mouseX - x, mouseY - y);
	}
}

function selectTool() {
	stroke(0);
	noFill();
	strokeWeight(2);
	rectMode(CORNERS);
	if (x1 !== null && x2 == null) {
		rect(x1, y1, constrain(mouseX, 0, imgWidth), constrain(mouseY, 0, imgHeight));
	} else if (x1 != null && x2 != null) {
		rect(x1, y1, x2, y2);
	}
	rectMode(CORNER);
}


function lineTool() {
	if (x !== null) {
		stroke(color1);
		strokeWeight(thickness);
		line(x, y, mouseX, mouseY);
	}
}

function bezierTool() {
	stroke(color1);
	noFill();
	strokeWeight(thickness);
	if (x !== null && x1 == null && x2 == null) {
		bezier(x, y, mouseX, mouseY, mouseX, mouseY, mouseX, mouseY);
	} else if (x !== null && x1 !== null && x2 == null) {
		bezier(x, y, x1, y1, mouseX, mouseY, mouseX, mouseY);
	} else if (x !== null && x1 !== null && x2 !== null) {
		bezier(x, y, x1, y1, x2, y2, mouseX, mouseY);
	}
}

function ellipseTool() {
	if (x !== null) {
		ellipseMode(CORNERS);
		ellipse(x, y, mouseX, mouseY);
	}
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

function textTool() {
	fill(color1);
	textSize(thickness);
	if (x !== null)
		text(textOutput, x, y);
}

function keyPressed() {
    console.log(i);
    /*if((keyCode==DELETE||keyCode==BACKSPACE)&&tool=="SELECT"&&x1!=null&&x2!=null){
	img.fill(color2);
	img.rectMode(CORNERS);
	img.noStroke();
	img.rect(x1,x2,y1,y2);
}*/
	if (key == ESCAPE) {
		reset();
	}
    if(key == 'I'){
        changeTool("DROPPER");
    }
    if(key == 'B'){
        changeTool("PENCIL");
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

	textOutput = "";
	// if(keyCode==BACKSPACE){
	//   textOutput-=textOutput.substring(textOutput.length()-1);
	// }
	if (keyCode == BACKSPACE) {
		shorten(textArray);
	} else if (keyCode == ENTER) {
		append(textArray, "\n");
	} else {
		append(textArray, key);
	}
	for (var j = 0; j < textArray.length; j++) {
		textOutput += textArray[j];
	}
}

function changeTool(toolIn) {
	if (tool != null) {
		select("#" + tool).style("background-color: #34495e");
	}
	tool = toolIn;
	select("#" + tool).style("background-color: rgb(72, 93, 113);");
	reset();
}

function changeGridlines() {
	gridlines = !gridlines;
	if (gridlines) {
		select("#GRID").style("background-color: rgb(72, 93, 113);");
	} else {
		select("#GRID").style("background-color: #34495e;");
	}
}



function onCanvas() {
	return (mouseX >= 0 && mouseX <= imgWidth && mouseY >= 0 && mouseY <= imgHeight);
}

function copyTool() {
	if (tool == "SELECT" && x1 != null & x2 != null) {
		clipboard = img.get(min(x1, x2), min(y1, y2), max(x1, x2) - min(x1, x2), max(y1, y2) - min(y1, y2));
		reset();
	} else {
		alert('You have nothing selected!');
	}
}

function pasteTool() {
	if (clipboard != null) {
		reset();
		pasting = true;
	} else {
		alert('You have nothing copied!');
	}
}

function clearCanvas() {
	var ans = confirm("This will clear all your work.  Are you sure you want to do this?");
	if (ans) {
		select("#" + tool).style("background-color: #34495e");
		tool = null;
		img.background(255);
	}
}

function reset() {
	pasting = false;
	x1 = null;
	y1 = null;
	x2 = null;
	y2 = null;
	x3 = null;
	y3 = null;
	x = null;
	y = null;

}

function drawColors() {
	drawColors2();
	colorMode(HSL, 360, 100, 100);
	noStroke();
	hue = 0;
	for (var boxX = imgWidth + 10; boxX < width - 10; boxX += 1) {
		brightness = 0;
		hue += 2;
		for (var y = height / 2 + 10; y < height / 2 + (width - imgWidth - 20); y += 1) {
			brightness += 0.6;
			fill(hue, 50, brightness);
			rect(boxX, y, 1, 1);
		}
	}
	colorPallete = get(imgWidth + 10, height / 2 + 10, width - imgWidth - 20, width - imgWidth - 30);
}

function drawColors2() {
	colorMode(RGB, 255);
	if (currentColor == 1) {
		stroke(255 - red(color1), 255 - green(color1), 255 - blue(color1));
	} else {
		stroke(255 - red(color2), 255 - green(color2), 255 - blue(color2));
	}
	fill(100);
	noStroke();
	var index = 0;
	strokeWeight(1);
	for (var boxX = imgWidth + 5; boxX < width; boxX += 39) {
		noStroke();
		fill(100);
		rect(boxX, height / 2 - 73, 34, 34);
		stroke(0);
		fill(defaultPallete[index]);
		rect(boxX + 5, height / 2 - 73 + 5, 24, 24);
		if (alpha(defaultPallete[index]) == 0) {
			fill(255);
			rect(boxX + 5, height / 2 - 73 + 5, 24, 24);
			strokeWeight(1);
			stroke(255, 0, 0);
			line(boxX + 6, height / 2 - 73 + 6, boxX + 28, height / 2 - 73 + 28);
		}
		noStroke();
		index += 1;
	}
	index = 0;
	for (var boxX = imgWidth + 5; boxX < width; boxX += 39) {
		noStroke();
		fill(100);
		rect(boxX, height / 2 - 34, 34, 34);
		if (index <= customPallete.length - 1) {
			stroke(0);
			fill(customPallete[index]);
			rect(boxX + 5, height / 2 - 34 + 5, 24, 24);
		}
		index += 1;
	}
	noStroke();
	if (customPallete.length > 5) {
		customPallete.length = 5;
	}
	fill(100);
	rect(imgWidth + 5, height / 2 + 5 + 190, 190, 40);
	if (currentColor == 1) {
		fill(255, 255, 0);
	} else {
		fill(100);
	}
	rect(imgWidth + 5, height / 2 + 5 + 250, 95, 40);
	if (currentColor == 2) {
		fill(255, 255, 0);
	} else {
		fill(100);
	}
	rect(imgWidth + 105, height / 2 + 5 + 250, 95, 40);
	var drawSat = 0;
	for (var boxX = imgWidth + 10; boxX < width - 10; boxX += 1) {
		drawSat += 255 / 180;
		fill(drawSat);
		noStroke();
		rect(boxX, height / 2 + 5 + 195, 1, 30);

	}
	stroke(0);
	if (alpha(color1) != 0) {
		fill(color1);
		rect(imgWidth + 10, height / 2 + 10 + 250, 85, 30);
	} else {
		fill(255);
		rect(imgWidth + 10, height / 2 + 10 + 250, 85, 30);
		stroke(255, 0, 0);
		line(imgWidth + 10, height / 2 + 10 + 250, imgWidth + 95, height / 2 + 40 + 250);
		stroke(0);
	}

	if (alpha(color2) != 0) {
		fill(color2);
		rect(imgWidth + 110, height / 2 + 10 + 250, 85, 30);
	} else {
		fill(255);
		rect(imgWidth + 110, height / 2 + 10 + 250, 85, 30);
		stroke(255, 0, 0);
		line(imgWidth + 110, height / 2 + 10 + 250, imgWidth + 195, height / 2 + 40 + 250);
		stroke(0);
	}
}

function saveJpg() {
	save(img, 'download.jpg');
}

function savePng() {
	save(img, 'download.png');
}
