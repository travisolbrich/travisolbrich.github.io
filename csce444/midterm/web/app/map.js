'use strict';

function drawRow(context, y, color) {
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = 20;
    context.moveTo(0, y);
    context.lineTo(360, y);
    context.stroke();
}

function drawCircle(id, name, context, x, y, color) {
    // Start with a white fill to hide the line under the circle
    context.beginPath();
    context.arc(x, y, 8, 0, 2 * Math.PI);
    context.lineWidth = 16;
    context.strokeStyle = 'white';
    context.stroke();

    // Add the colored circle
    context.beginPath();
    context.arc(x, y, 17, 0, 2 * Math.PI);
    context.lineWidth = 6;
    context.strokeStyle = color;
    context.stroke();

    // Return an array showing a bounding box of the object
    return {
        id: id,
        name: name,
        x1: x - 20,
        y1: y - 20,
        x2: x + 20,
        y2: y + 20,
        x: x,
        y: y
    }
}

function drawBase() {
    // Draw rows
    drawRow(ctx, row1, blue);
    drawRow(ctx, row2, orange);
    drawRow(ctx, row3, purple);

    // Draw circles
    zoneArray.push(drawCircle('recursive-time', 'Recursive Time', ctx, 120, row1, blue));

    zoneArray.push(drawCircle('forking-paths', 'Forking Paths', ctx, 77, row2, orange));
    zoneArray.push(drawCircle('simultaneous-outcomes', 'Simultaneous Outcomes', ctx, 160, row2, orange));

    zoneArray.push(drawCircle('remixes', 'Remixes', ctx, 35, row3, purple));
    zoneArray.push(drawCircle('hypertext', 'Hypertext', ctx, 120, row3, purple));
    zoneArray.push(drawCircle('synchronization', 'Synchronization', ctx, 203, row3, purple));

    // Draw text
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText("Recursion", 230, row1 + 6);
    ctx.fillText("(Non)Linearity", 230, row2 + 6);
    ctx.fillText("Interconnections", 230, row3 + 6);
}

function determineZoneHit(mouseX, mouseY){
    // calculate if the mouse is currently inside the circle
    for (var i = 0, len = zoneArray.length; i < len; i++) {
        var inx = (zoneArray[i].x1 < mouseX) && (mouseX < zoneArray[i].x2);
        var iny = (zoneArray[i].y1 < mouseY) && (mouseY < zoneArray[i].y2);
        if (inx && iny) {
            return zoneArray[i];
        }
    }

    return null;
}

function handleMouseMove(e, mouseX, mouseY) {
    e.preventDefault();
    e.stopPropagation();

    var zone = determineZoneHit(mouseX, mouseY);

    if (zone && !previousHit) {
        // Display a pointer if we're hovered over a node
        previousHit = true;
        var zoneHit = zone;

        document.body.style.cursor = "pointer";
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";

        ctx.fillText(zone.name, zoneHit.x, zoneHit.y-25);
    }
    else if(zone == null && previousHit) {
        // Restore the base map if not
        previousHit = false;

        document.body.style.cursor = "default";
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawBase();
    }

}

// Basic canvas defs
var canvas = document.getElementById('canvas-map');
var ctx = canvas.getContext('2d');
var zoneArray = [];

// Colors to use
var purple = "#8C40A1";
var orange = "#EBA403";
var blue = "#2E86C1";

// Vertical position of the rows in the box
var row1 = 70;
var row2 = 136.5;
var row3 = 203;

var previousHit = false;

drawBase();

// listen for mousemove events
canvas.addEventListener('mousemove', function (e) {
        var canvasrect = canvas.getBoundingClientRect();
        var mouseX = e.clientX - canvasrect.left;
        var mouseY = e.clientY - canvasrect.top;
        handleMouseMove(e, mouseX, mouseY);
    }
);

// listen for click events
canvas.addEventListener('click', function (e) {
        var canvasrect = canvas.getBoundingClientRect();
        var mouseX = e.clientX - canvasrect.left;
        var mouseY = e.clientY - canvasrect.top;

        var zone = determineZoneHit(mouseX, mouseY);

        if(zone != null) {
            window.location.href = '#/' + zone.id;
        }
    }
);