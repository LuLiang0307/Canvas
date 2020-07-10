var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var lineWidth = 5;
autoSetCanvasSize(canvas)
listenToUser(canvas)

/****/
black.onclick = function() {
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';
    black.classList.add('active');
    red.classList.remove('active');
    green.classList.remove('active');
    blue.classList.remove('active');
}
red.onclick = function() {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'red';
    red.classList.add('active');
    green.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active');
}
green.onclick = function() {
    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'green';
    green.classList.add('active');
    red.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active');
}
blue.onclick = function() {
    ctx.fillStyle = 'blue';
    ctx.strokeStyle = 'blue';
    blue.classList.add('active');
    green.classList.remove('active');
    red.classList.remove('active');
    black.classList.remove('active');
}
thin.onclick = function(){
    lineWidth = 5;
}
thick.onclick = function(){
    lineWidth = 10;
}

/****/
function drawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, (Math.PI / 180) * 1, true)
    ctx.fill()
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke()

}

function autoSetCanvasSize(canvas) {
    resizeWindow()

    window.onresize = function() {
        resizeWindow()
    }

    function resizeWindow() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

function listenToUser(canvas) {
    var using = false;
    var time;
    var lastPoint = {
        x: undefined,
        y: undefined
    }
    var eraserEnabled = false;
    brush.onclick = function() {
        eraserEnabled = false;
        brush.classList.add('active');
        eraser.classList.remove('active');
    }
    eraser.onclick = function() {
        eraserEnabled = true;
        eraser.classList.add('active');
        brush.classList.remove('active');
    }
    clear.onclick = function(){
        ctx.clearRect(0,0,canvas.width,canvas.height)
    }
    download.onclick = function(){
        var url = canvas.toDataURL("image/png");
        var a=document.createElement('a');
        document.body.appendChild(a);
        a.href=url;
        a.download = '我的画儿';
        a.target = '_blank';
        a.click()
    }
    //特性检测，检测的不是设备，而是特性
    if (document.body.ontouchstart !== undefined) {
        //触屏设备
        canvas.ontouchstart = function(e) {
            using = true;
            var x = e.touches[0].clientX;
            var y = e.touches[0].PIclientY;

            if (eraserEnabled) {
                ctx.clearRect(x, y, 10, 10)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                };
            }
        }
        canvas.ontouchmove = function(e) {
            if (using) {
                var x = e.touches[0].clientX;
                var y = e.touches[0].clientY;
                if (eraserEnabled) {
                    ctx.clearRect(x, y, 10, 10)
                } else {
                    var newPoint = {
                        "x": x,
                        "y": y
                    }
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                    lastPoint = newPoint;
                }
            }
        }
        canvas.ontouchend = function(e) {
            using = false;
        }
    } else {
        //L
        document.onmousedown = function(e) {
            using = true;
            var x = e.clientX;
            var y = e.clientY;

            if (eraserEnabled) {
                ctx.clearRect(x, y, 10, 10)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                };
            }
        }
        document.onmousemove = function(e) {
            if (using) {
                var x = e.clientX;
                var y = e.clientY;
                if (eraserEnabled) {
                    ctx.clearRect(x, y, 10, 10)
                } else {
                    var newPoint = {
                        "x": x,
                        "y": y
                    }
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                    lastPoint = newPoint;
                }
            }
        }
        document.onmouseup = function(e) {
            using = false;
        }
    }

}