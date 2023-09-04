"use strict";


const $startBtn = document.getElementById("start-btn");
const $guessBtn = document.getElementById("guess-btn");
const $cowBtn = document.getElementById("cow-btn");
const $output = document.getElementById("output");
const $numUsr = document.getElementById("num-usr");
const $maxUsr = document.getElementById("max-usr");

let secretNumber = 0;
let nbGuesses = 0;
let maxGuesses = 0;
let cptClick = 1;

function launchGame(_evt) {
  secretNumber = Math.floor(Math.random() * $maxUsr.value) + 1;
  maxGuesses = Math.ceil(Math.log($maxUsr.value)) + 1;

  $output.innerHTML = "Debut du jeu tu as que " + maxGuesses + " tentatives possibles ";
  $guessBtn.disabled = false;
  

  $guessBtn.removeEventListener("click", guessHandler()); 
  
  $guessBtn.addEventListener("click", guessHandler); 
  

}

$numUsr.addEventListener("keydown",function(event){
  if(event.key == "Enter"){
    event.preventDefault()
    $guessBtn.click();
  }
})



function guessHandler() {
  if (cptClick ==1){
    $output.innerHTML += "<br>#############################<br>"
    cptClick++
  }
  else{
    if (cptClick >= 7) {
      $output.innerHTML += "<br> Tu as perdu le nombre était " + secretNumber;
      $guessBtn.disabled = true;
      cptClick = 1;
    }
    else {
      if ($numUsr.value < secretNumber) {
        $output.innerHTML += "<br> C'est plus :) Nombre entré => " + $numUsr.value;
        cptClick++;
    } 
      else if ($numUsr.value > secretNumber) {
        $output.innerHTML += "<br> C'est moins :) Nombre entré => " + $numUsr.value;
        cptClick++;
    } 
      else if ($numUsr.value == secretNumber) {
        $output.innerHTML += "<br> Bien joué vous avez trouvé en " + cptClick + " tentatives";
        cptClick = 1;
    }
  }
    
  }
  
}


$startBtn.addEventListener("click", launchGame);



function addCow(evt) {
  const vache_image = document.createElement('img');  
  vache_image.src = "https://upload.wikimedia.org/wikipedia/commons/3/30/Cowicon.svg";
  vache_image.classList.add("cow")
  vache_image.style.left=evt.pageX+"px"
  vache_image.style.top = evt.pageY +"px"
  let valAleatoire = Math.random(); 
  vache_image.style.transform = "rotate("+valAleatoire+"turn)";
  document.body.appendChild(vache_image)
}



function toggleCow(_evt) {
  if (document.onmousedown instanceof Function) {
    document.onmousedown = null;
  } else {
    document.onmousedown = addCow;
  }
}

$cowBtn.addEventListener("click", toggleCow);

