var ballPic=document.createElement("img");
var backgroundPic=document.createElement("img");
var lifePic=document.createElement("img");
var paddlePic=document.createElement("img");
var titlePic=document.createElement("img");
var missilePic=document.createElement("img");
var brickPics = [];

var picsToLoad = 0;

function countLoadedImageAndLaunchIfReady() {
  picsToLoad--;
  if(picsToLoad == 0) { // last image loaded?
    loadingDoneSoStartGame();
  }
}

function beginLoadingImage(imgVar, fileName) {
  imgVar.onload=countLoadedImageAndLaunchIfReady;
  imgVar.src="images/"+fileName;
}

function loadImages() {
  var imageList = [
    {varName:ballPic, theFile:"ball.png"},
    {varName:backgroundPic, theFile:"bg.jpg"},
    {varName:lifePic, theFile:"life.png"},
    {varName:paddlePic, theFile:"paddle.png"},
    {varName:titlePic, theFile:"titlescreen.jpg"},
    {varName:missilePic, theFile:"missile.png"},
    {brickType:INVULN_BRICK, theFile:"brick_invuln.png"},
    {brickType:DEFAULT_BRICK, theFile:"brick1.png"},
    {brickType:DOUBLE_BRICK, theFile:"brick2.png"},
    {brickType:TRIPLE_BRICK, theFile:"brick3.png"}
    ];

  picsToLoad = imageList.length;

  for(var i=0;i<imageList.length;i++) {
    if(imageList[i].varName != undefined) {
      beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    } else {
      loadImageForBrickCode(imageList[i].brickType, imageList[i].theFile);
    }
  }
}

function loadImageForBrickCode(brickCode, fileName) {
  brickPics[brickCode] = document.createElement("img");
  beginLoadingImage(brickPics[brickCode], fileName);
}