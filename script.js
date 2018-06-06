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



/*function konfigurator(){

}

var canvas;
var context;
var klatka = 1;
var kolor;
var message;
var rama = "1";
var chwyty = "3";
var deska = "3";
var pschwyty = "27-grips-purple";
var pskolor = "10-classic12-white";
var psdeska = "35-deck-tiles";


var ms = 0;
var r2;
var p = 108000;
var kltkp = 108000;
var kltk = 108000;
var kltkw = 108000;
var maxkltk = 20; //ilosc klatek
var kltkd = 1;

function Konfigurator(){
	      var canvas = document.getElementById('canvas');
          var context = canvas.getContext('2d');
		      kolor="anim/" + rama + chwyty + deska + "_0001.png";

    var imgkolor=new Image()
    imgkolor.src=kolor;
    imgkolor.onload = function() {
    context.drawImage(imgkolor,0,0);
	var img360=new Image()
    img360.src="guziki/360_en.png";
	img360.onload = function() {
    context.drawImage(img360,174,145);
	}}



	preload();


        canvas.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        var r = mousePos.x/20; //predkosc 1 - b.szybko
        r = Math.round(r);
        r2 = r;
        var message = '';
       if(ms===1){
       p = kltkp - r;
       kltkw = kltk + p;
	   Draw();}
kltkd = (kltkw) % (maxkltk)+1;
      }, false);
}


function Draw() {
	var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    if(kltkd<10){
	kolor="anim/" + rama + chwyty + deska + "_000" + kltkd + ".png";} else {
	kolor="anim/" + rama + chwyty + deska + "_00" + kltkd + ".png";}

	var imgkolor=new Image()
    imgkolor.src=kolor;
    imgkolor.onload = function() {
    context.drawImage(imgkolor,0,0);

	}
}


      function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left
        };
}
function mouseDown(){
    ms = 1;
    kltkp = r2;
}

function mouseUp(){
    ms = 0;
    kltk = kltk + p;
}

function clearCoor() {
    if(ms===1){
        kltk = kltk + p;
        ms = 0;

} else {
    ms = 0;}
}



function grips_left(){
	if(chwyty==="1"){
		chwyty = "4";
		pschwyty = "28-grips-orange";
		icogrip.src="guziki/grip_or.png";
		} else  {if(chwyty==="2"){
			chwyty="1";
			pschwyty="25-grips-black";
			icogrip.src="guziki/grip_bl.png";} else {if(chwyty==="3"){
				chwyty="2";
				pschwyty="26-grips-brown";
				icogrip.src="guziki/grip_br.png";} else {if(chwyty==="4"){
					chwyty="3";
					pschwyty="27-grips-purple";
					icogrip.src="guziki/grip_pr.png";}
				}
			}
		}
	Draw();
	preload();
}

function grips_right(){

	if(chwyty==="1"){
		chwyty = "2";
		pschwyty="26-grips-brown";
		icogrip.src="guziki/grip_br.png";
		} else  {if(chwyty==="2"){
			chwyty="3";
			pschwyty="27-grips-purple";
			icogrip.src="guziki/grip_pr.png";} else {if(chwyty==="3"){
				chwyty="4";
				pschwyty = "28-grips-orange";
				icogrip.src="guziki/grip_or.png";} else {if(chwyty==="4"){
					chwyty="1";
					pschwyty="25-grips-black";
					icogrip.src="guziki/grip_bl.png";}
				}
			}
		}
	Draw();
    preload();
}

function frames_left(){
	if(rama==="1"){
		rama = "3";
		pskolor = "15-classic12-turquoise";
		icoframe.src="guziki/frame_tur.png";
		} else  {if(rama==="2"){
			rama="1";
			pskolor = "10-classic12-white";
			icoframe.src="guziki/frame_white.png";} else {if(rama==="3"){
				rama="2";
				pskolor = "13-classic12-black";
				icoframe.src="guziki/frame_black.png";}

			}
		}
    Draw();
	preload();
}

function frames_right(){
	if(rama==="2"){
		rama = "3";
		pskolor = "15-classic12-turquoise";
		icoframe.src="guziki/frame_tur.png";
		} else  {if(rama==="3"){
			rama="1";
			pskolor = "10-classic12-white";
			icoframe.src="guziki/frame_white.png";} else {if(rama==="1"){
				rama="2";
				pskolor = "13-classic12-black";
				icoframe.src="guziki/frame_black.png";}

			}
		}
	Draw();
	preload();
}

function decks_left(){
	if(deska==="1"){
		deska = "4";
		psdeska = "36-deck-woods";
		icodeck.src="guziki/bttn_woods.png";
		widok.src="deski/pdgl_woods2016.png";
		} else  {if(deska==="2"){
			deska="1";
			icodeck.src="guziki/bttn_aztec.png";
			psdeska = "37-deck-aztec";
			widok.src="deski/pdgl_aztec2016.png";} else {if(deska==="3"){
				deska="2";
				psdeska = "34-deck-stripe";
				icodeck.src="guziki/bttn_stripe.png";
				widok.src="deski/pdgl_stripe2016.png";} else {if(deska==="4"){
					deska="3";
					psdeska = "35-deck-tiles";
					icodeck.src="guziki/bttn_tiles.png";
					widok.src="deski/pdgl_tiles2016.png";}
				}
			}
		}
	Draw();
	preload();
}

function decks_right(){
	if(deska==="3"){
		deska = "4";
		psdeska = "36-deck-woods";
		icodeck.src="guziki/bttn_woods.png";
		widok.src="deski/pdgl_woods2016.png";
		} else  {if(deska==="4"){
			deska="1";
			icodeck.src="guziki/bttn_aztec.png";
			psdeska="37-deck-aztec";
			widok.src="deski/pdgl_aztec2016.png";} else {if(deska==="1"){
				deska="2";
				psdeska = "34-deck-stripe";
				icodeck.src="guziki/bttn_stripe.png";
				widok.src="deski/pdgl_stripe2016.png";} else {if(deska==="2"){
					deska="3";
					psdeska = "35-deck-tiles";
					icodeck.src="guziki/bttn_tiles.png";
					widok.src="deski/pdgl_tiles2016.png";}
				}
			}
		}
	Draw();
	preload();
}

function save(){

    var dataURL = document.getElementById('canvas').toDataURL("image/png");
    window.open(dataURL, "Canvas Image");
}


function buy(){

	var adres="../en/scooters/" + pskolor + "-kick-scooter.html#/" + psdeska + "/" + pschwyty;
	window.parent.location.href = adres;
}




function preload() {
	            var loading = new Array();
				for (i = 1; i < maxkltk; i++) {
					loading[i] = new Image();
					if(i<10){
	loading[i].src = "anim/" + rama + chwyty + deska + "_000" + i + ".png";} else {
	loading[i].src = "anim/" + rama + chwyty + deska + "_00" + i + ".png";}

				}
			}
			*/
