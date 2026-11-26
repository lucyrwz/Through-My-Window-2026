var bg;
var songs = [];
var currentSong = -1;
var stoppedRegion = -1;

// Filename, left, right, top, bottom

var regions = [
  ["1.wav", 319, 332, 144, 192],
  ["2.wav", 38, 87, 373, 406],
  ["3.wav", 218, 225, 525, 528],
  ["4.wav", 249, 293, 938, 965],
  ["5.wav", 608, 658, 873, 909],
  ["6.wav", 637, 683, 519, 557],
  ["7.wav", 629, 656, 275, 316],
  ["8.wav", 824, 856, 118, 155],
  ["9.wav", 845, 892, 466, 490],
  ["10.wav", 847, 894, 834, 867],
  ["11.wav", 941, 988, 932, 968],
  ["12.wav", 1111, 1129, 536, 575],
  ["13.wav", 1272, 1317, 712, 747],
  ["14.wav", 1310, 1360, 274, 288],
  ["15.wav", 1431, 1456, 136, 181],
  ["16.wav", 1440, 1482, 658, 688],

  ["A1.mp3", 61, 241, 70, 236],
  ["A2.mp3", 432, 697, 69, 214],
  ["A3.mp3", 970, 1313, 115, 245],
  ["A4.mp3", 170, 611, 311, 465],
  ["A5.mp3", 684, 868, 243, 432],
  ["A6.mp3", 927, 1117, 325, 515],
  ["A7.mp3", 1240, 1407, 316, 645],
  ["A8.mp3", 59, 207, 549, 830],
  ["A9.mp3", 300, 498, 519, 712],
  ["A10.mp3", 572, 714, 612, 838],
  ["A11.mp3", 835, 1098, 596, 745],
  ["A12.mp3", 275, 521, 825, 911],
  ["A13.mp3", 1128, 1364, 781, 907]
];

function preload() {
  bg = loadImage("windowmap.jpg");

  for (var i = 0; i < regions.length; i++) {
    songs[i] = loadSound(regions[i][0]);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
}

function translateX(position) {
  return (position / 1512) * width;
}

function translateY(position) {
  return (position / 982) * height;
}

function getHoveredRegion() {
  for (var i = 0; i < regions.length; i++) {
    var r = regions[i];

    if (
      mouseX > translateX(r[1]) &&
      mouseX < translateX(r[2]) &&
      mouseY > translateY(r[3]) &&
      mouseY < translateY(r[4])
    ) {
      return i;
    }
  }

  return -1;
}

function draw() {
  background(bg);

  var hoveredSong = getHoveredRegion();

  // Show musical note when hovering
  if (hoveredSong !== -1) {
    text("♫", mouseX, mouseY);
  }

  // Reset click-to-stop when leaving the area
  if (hoveredSong !== stoppedRegion) {
    stoppedRegion = -1;
  }

  // Do not play the region that was clicked
  if (hoveredSong === stoppedRegion) {
    hoveredSong = -1;
  }

  // Stop previous sound when moving away
  if (currentSong !== hoveredSong) {

    if (currentSong !== -1) {
      songs[currentSong].stop();
      currentSong = -1;
    }

    // Play new sound
    if (
      hoveredSong !== -1 &&
      getAudioContext().state === "running"
    ) {
      songs[hoveredSong].play();
      currentSong = hoveredSong;
    }
  }
}

// Single click stops all sounds
function mousePressed() {
  userStartAudio();

  for (var i = 0; i < songs.length; i++) {
    if (songs[i].isPlaying()) {
      songs[i].stop();
    }
  }

  currentSong = -1;
  stoppedRegion = getHoveredRegion();
}

// Stop when the mouse leaves the canvas
function mouseMoved() {
  if (
    mouseX < 0 ||
    mouseX > width ||
    mouseY < 0 ||
    mouseY > height
  ) {
    if (currentSong !== -1) {
      songs[currentSong].stop();
      currentSong = -1;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}