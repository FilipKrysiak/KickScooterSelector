//Language properties

languageSelector(navigator.language);

function languageSelector(userLang){
	let textId = ["gripText1", "gripText", "gripText2", "frameText1", "frameText", "frameText2", "deckText1", "deckText", "photoBttn", "saveBttn", "buyBttn"];
	let textPL = ["wybierz kolor: ", "chwyty", "", "wybierz kolor: ", "rama", "", "wybierz: ", "deska", "generuj obraz", "zapisz", "kup"];
	let textEN = ["choose ", "grips", " colour", "choose ", "frame", " colour", "choose ", "deck", "photo", "save", "buy"];
  if(userLang==="pl"){
	for (let i=0; i < textId.length; i++){
		document.getElementById(textId[i]).innerHTML = textPL[i];
	}
	document.getElementById("languagePL").style.fontWeight = "800";
	document.getElementById("languageEN").style.fontWeight = "300";
  }
  else{
	for (let i=0; i < textId.length; i++){
		document.getElementById(textId[i]).innerHTML = textEN[i];
	}
	document.getElementById("languageEN").style.fontWeight = "800";
	document.getElementById("languagePL").style.fontWeight = "300";
  }
}

document.getElementById("languageEN").addEventListener("click", myFunctionEN);
function myFunctionEN(){languageSelector("en");}

document.getElementById("languagePL").addEventListener("click", myFunctionPL);
function myFunctionPL(){languageSelector("pl");}

//Drawing images

var canvas = document.getElementById("mainCanvas");

function draw(){
var ctx = canvas.getContext("2d");
canvas.width = 480;
canvas.height = 480;

var img = new Image();
img.src = "anim/" + frameIdx + gripIdx + deckIdx + "_000" + viewIdx + ".png";
img.addEventListener("load", function(){ctx.drawImage(img, 0, 0);});
}
// Select options

var grip = ["black", "brown", "purple", "orange"];
var gripIdx = 0;
var frame = ["white", "black", "turquoise"];
var frameIdx = 0;
var deck = ["aztec", "stripe", "tiles", "woods"];
var deckIdx = 0;
var product = {
	grip: 0,
	frame: 0,
	deck: 0
};
var viewIdx = 1;

document.getElementById("gripNext").addEventListener("click", gripNext);
function gripNext(){
	if(gripIdx < grip.length){
		gripIdx++;
	}
	else{
		gripIdx = 1;
	}
	createProduct();
};
document.getElementById("gripPrev").addEventListener("click", gripPrev);
function gripPrev(){
	if(gripIdx > 1){
		gripIdx--;
	}
	else{
		gripIdx = grip.length;
	}
	createProduct();
};

document.getElementById("frameNext").addEventListener("click", frameNext);
function frameNext(){
	if(frameIdx < frame.length){
		frameIdx++;
	}
	else{
		frameIdx = 1;
	}
	createProduct();
};
document.getElementById("framePrev").addEventListener("click", framePrev);
function framePrev(){
	if(frameIdx > 1){
		frameIdx--;
	}
	else{
		frameIdx = frame.length;
	}
	createProduct();
};

document.getElementById("deckNext").addEventListener("click", deckNext);
function deckNext(){
	if(deckIdx < deck.length){
		deckIdx++;
	}
	else{
		deckIdx = 1;
	}
	createProduct();
};
document.getElementById("deckPrev").addEventListener("click", deckPrev);
function deckPrev(){
	if(deckIdx > 1){
		deckIdx--;
	}
	else{
		deckIdx = deck.length;
	}
	createProduct();
};

function createProduct(){
	product.grip = grip[gripIdx-1];
	product.frame = frame[frameIdx-1];
	product.deck = deck[deckIdx-1];
	document.getElementById("icoGrip").src = "bttn/grip_" + product.grip + ".png";
	document.getElementById("icoFrame").style.background =  product.frame;
	document.getElementById("icoDeck").src = "bttn/deck_" + product.deck + ".png";
	draw();
};

//photo button

document.getElementById("photoBttn").addEventListener("click", photo);

function photo(){
  window.open(mainCanvas.toDataURL("image/png"), "Hoolay Kick Scooter");
}

//save button

document.getElementById("saveBttn").addEventListener("click", save);

function save(){
const saveIdx = {
	g: gripIdx,
	f: frameIdx,
	d: deckIdx
};
localStorage.setItem("HoolayScooter", JSON.stringify(saveIdx));
}

//buy button

document.getElementById("buyBttn").addEventListener("click", buy);
function buy(){
localStorage.clear();
}

// Local Storage

storage();

function storage(){
	if (localStorage.getItem("HoolayScooter") === null){
		gripIdx = Math.floor(Math.random()*grip.length) +1;
		frameIdx = Math.floor(Math.random()*frame.length) +1;
		deckIdx = Math.floor(Math.random()*deck.length) +1;
		createProduct();
	}
	else {
		let retObj = localStorage.getItem("HoolayScooter");
		retObj = JSON.parse(retObj);
		gripIdx = retObj.g;
		frameIdx = retObj.f;
		deckIdx = retObj.d;
		createProduct();
	}
}

