
function toggleOverlay() {
    if (document.getElementById("toggle").innerHTML=="Enable Overlay") {
        document.getElementById("toggle").innerHTML = "Disable Overlay";
        document.getElementById("image-overlay").style.display="";

    } else if (document.getElementById("toggle").innerHTML=="Disable Overlay") {
        document.getElementById("toggle").innerHTML = "Enable Overlay";
        document.getElementById("image-overlay").style.display="none";
    }
};