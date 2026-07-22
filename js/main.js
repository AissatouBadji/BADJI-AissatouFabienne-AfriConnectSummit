//  DARK MODE 

// Récupération du bouton thème
const themeBtn = document.getElementById("theme-btn");

// Vérification du thème enregistré
const savedTheme = localStorage.getItem("theme");

if(savedTheme){
    document.documentElement.setAttribute("data-theme", savedTheme);
}

// Changement de thème au clic
if(themeBtn){

themeBtn.addEventListener("click",()=>{

let currentTheme = document.documentElement.getAttribute("data-theme");

if(currentTheme === "dark"){

document.documentElement.setAttribute("data-theme","light");

localStorage.setItem("theme","light");

}else{

document.documentElement.setAttribute("data-theme","dark");

localStorage.setItem("theme","dark");

}

});

}


//  MENU HAMBURGER 

const hamburger = document.getElementById("hamburger");
const menu = document.querySelector(".menu");

if(hamburger){

hamburger.addEventListener("click",()=>{

menu.classList.toggle("active");

});

}


//  NAVBAR AU SCROLL 

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

if(window.scrollY > 80){

navbar.classList.add("scrolled");

}else{

navbar.classList.remove("scrolled");

}

});


//  ANNEE AUTOMATIQUE 

const year = document.getElementById("year");

if(year){

year.textContent = new Date().getFullYear();

}


//  RETOUR EN HAUT 

const topBtn = document.getElementById("topBtn");

if(topBtn){

window.addEventListener("scroll",()=>{

if(window.scrollY > 300){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});


topBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}

//  COMPTE A REBOURS 

// Date fictive de la conférence
const eventDate = new Date("November 20, 2026 09:00:00").getTime();

const countdown = setInterval(()=>{

const now = new Date().getTime();

const difference = eventDate - now;


// Calcul des temps restants

const days = Math.floor(difference / (1000 * 60 * 60 * 24));

const hours = Math.floor(
(difference % (1000 * 60 * 60 * 24)) /
(1000 * 60 * 60)
);

const minutes = Math.floor(
(difference % (1000 * 60 * 60)) /
(1000 * 60)
);

const seconds = Math.floor(
(difference % (1000 * 60)) /
1000
);


// Affichage

const dayElement = document.getElementById("days");
const hourElement = document.getElementById("hours");
const minuteElement = document.getElementById("minutes");
const secondElement = document.getElementById("seconds");


if(dayElement){
dayElement.textContent = days;
}

if(hourElement){
hourElement.textContent = hours;
}

if(minuteElement){
minuteElement.textContent = minutes;
}

if(secondElement){
secondElement.textContent = seconds;
}


// Arrêter quand la date est dépassée

if(difference < 0){

clearInterval(countdown);

}

},1000);



//  COMPTEURS ANIMES 

const counters = document.querySelectorAll(".counter");


counters.forEach(counter=>{


const target = Number(counter.dataset.target);


let value = 0;


const updateCounter = ()=>{


const increment = target / 100;


if(value < target){

value += increment;

counter.textContent = Math.ceil(value);

setTimeout(updateCounter,20);


}else{

counter.textContent = target;

}


};


// Démarrage de l'animation

updateCounter();


});



//  ANIMATION AU SCROLL 

// Sélection des éléments cachés

const hiddenElements = document.querySelectorAll(".hidden");


// Création de l'observateur

const observer = new IntersectionObserver((entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){

entry.target.classList.add("show");

}

});


});


// Observation de chaque élément

hiddenElements.forEach(element=>{

observer.observe(element);

});

//  ONGLET PROGRAMME 

const tabs = document.querySelectorAll(".tab");

const contents = document.querySelectorAll(".tab-content");


tabs.forEach(tab=>{


tab.addEventListener("click",()=>{


// Retirer la classe active des boutons

tabs.forEach(button=>{

button.classList.remove("active");

});


// Ajouter active au bouton choisi

tab.classList.add("active");


// Récupération du jour choisi

const day = tab.dataset.day;


// Affichage du bon contenu

contents.forEach(content=>{


content.style.display="none";


});


const selectedDay = document.getElementById("day"+day);


if(selectedDay){

selectedDay.style.display="block";

}


});


});



//  FILTRE INTERVENANTS 


const filterButtons = document.querySelectorAll(".filter-btn");

const speakers = document.querySelectorAll(".speaker-card");


filterButtons.forEach(button=>{


button.addEventListener("click",()=>{


// Gestion bouton actif

filterButtons.forEach(btn=>{

btn.classList.remove("active");

});


button.classList.add("active");


// Catégorie choisie

const category = button.dataset.filter;



speakers.forEach(speaker=>{


const speakerCategory = speaker.dataset.category;



if(category==="all" || speakerCategory===category){

speaker.style.display="block";

}else{

speaker.style.display="none";

}


});


});


});



//  VALIDATION FORMULAIRE 


const form = document.getElementById("contactForm");


if(form){


form.addEventListener("submit",(event)=>{


event.preventDefault();



const nom = document.getElementById("nom");

const email = document.getElementById("email");

const telephone = document.getElementById("telephone");

const message = document.getElementById("message");

const success = document.getElementById("successMessage");



let valid = true;



// Vérification nom

if(nom.value.trim()===""){

nom.classList.add("invalid");

valid=false;

}else{

nom.classList.add("valid");

}


// Vérification email

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


if(!emailRegex.test(email.value)){

email.classList.add("invalid");

valid=false;

}else{

email.classList.add("valid");

}


// Vérification téléphone

if(telephone.value.length < 8){

telephone.classList.add("invalid");

valid=false;

}else{

telephone.classList.add("valid");

}


// Vérification message

if(message.value.length < 20){

message.classList.add("invalid");

valid=false;

}else{

message.classList.add("valid");

}



// Message succès

if(valid){

success.textContent="Inscription envoyée avec succès !";

success.style.color="green";


form.reset();


}else{

success.textContent="Veuillez corriger les erreurs.";

success.style.color="red";

}


});


}