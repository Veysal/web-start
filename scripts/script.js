//accordeon vertical
let accordActive = document.querySelector('.accordeon__item--active'),
team = document.querySelector('.team__block'),
accoItem = document.querySelectorAll('.accordeon__item');

team.addEventListener('click', (e)=>{
for(let i = 0; i < accoItem.length; i++){
accoItem[i].classList.remove('accordeon__item--active')
}
});

for(let i = 0; i < accoItem.length; i++){
accoItem[i].addEventListener('click', (e)=> {
e.preventDefault();
e.stopPropagation();

if(accoItem[i].classList.contains('accordeon__item--active')){
  accoItem[i].classList.remove('accordeon__item--active')
}else{
  for (let i = 0; i < accoItem.length; i++) {
    accoItem[i].classList.remove('accordeon__item--active');
    //
  }
  accoItem[i].classList.add('accordeon__item--active')
}
});
}

  //accordeon horizontally
let menu = document.querySelector('.menu');
let menuItem = document.querySelectorAll('.menu__item');

menu.addEventListener('click', (e)=>{
  for(let i = 0; i < menuItem.length; i++){
    menuItem[i].classList.remove('menu__item--active')
  }
});

for(let i = 0; i < menuItem.length; i++){
  menuItem[i].addEventListener('click', (e)=>{
    e.preventDefault();
    e.stopPropagation();

    if(menuItem[i].classList.contains('menu__item--active')){
      menuItem[i].classList.remove('menu__item--active')
    }else{
      for(let i = 0; i < menuItem.length; i++){
        menuItem[i].classList.remove('menu__item--active');
      }
      menuItem[i].classList.add('menu__item--active')
    }
  });
}


//slider JQuery

$(document).ready(function(){
  $(function(){
    var slideNow = 1;
    var slideCount = $('.slider').children().length;
    console.log(slideCount);
  
    let slideTime = 3000;
  
     setInterval(nexSlide, slideTime);
    
    $('.slider__arrow-right').on('click', nexSlide);
    $('.slider__arrow-left').on('click', prevSlide);
  
  
    function nexSlide(){
      if(slideNow === slideCount || slideNow <=0){
        $('.slider').css({
          'transform': 'translate(0,0)'
        });
        slideNow = 1;
      }else {
        let translateWidth = -$('.slider__wrap').width() * (slideNow);
        $('.slider').css({
          'transform': 'translate('+translateWidth+'px,0)'
        });
        slideNow++;
      }
    }
  });

  function prevSlide(){
    if(slideNow = 1 || slideNow <= 0){
      let translateWidth = -$('.slider__wrap').width() * (slideCount - 1);
      $('.slider').css({
        'transform': 'translate('+translateWidth+'px,0)'
      });
      slideNow = slideCount;
    }else {
      let translateWidth = -$('.slider__wrap').width() * (slideNow - 2);
      $('.slider').css({
        'transform': 'translate('+translateWidth+'px,0)'
      });
      slideNow--;
    }
  }
});


//slider

// const left = document.querySelector('.slider__arrow-left'),
//       right = document.querySelector('.slider__arrow-right'),
//       items = document.querySelector('.slider'),
//       computed = getComputedStyle(items),
//       step = parseInt(getComputedStyle(items.firstElementChild).width),
//       size = items.children.length - 1,
//       maxRight = size * step,
//       minRight = 0;

// right.addEventListener("click", (e) => {
//   e.preventDefault();
//   let currentRight = parseInt(computed.right);

//   if (!currentRight) {
//     currentRight = 0;
//   }

//   if (currentRight < maxRight) {
//     items.style.right = currentRight + step + "px";
//   } else {
//     currentRight = 0;
//     items.style.right = minRight;
//   }

// });

// left.addEventListener("click", (e) => {
//   e.preventDefault();
//   let currentRight = parseInt(computed.right);

//   if (!currentRight) {
//     currentRight = 0;
//   }

//   if (currentRight > minRight) {
//     items.style.right = currentRight - step + "px";
//   } else {
//     currentRight = maxRight;
//     items.style.right = maxRight;
//   }

// });


// overlay

let openBtn = document.querySelectorAll(".review-block__btn"),
  reviewsSection = document.querySelector('#reviews');


for (let i = 0; i < openBtn.length; i++) {
  let element = openBtn[i];

  element.addEventListener("click", () => {
    let elements = element.parentNode.children;
    let name, 
        text;

    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      if (element.classList.contains('review-block__name')) {
        name = element.textContent
      };
      if (element.classList.contains('review-block__text')) {
        text = element.textContent
      };

    }

    reviewsSection.appendChild(createOverlay(name, text));
  });
};

function createOverlay(name, text) {
  let overlayElement = document.createElement("div");
  overlayElement.classList.add("overlay");

  let template = document.querySelector("#reviewTemplate");
  overlayElement.innerHTML = template.innerHTML;

  let closeElement = overlayElement.querySelector(".overlay__close");
  closeElement.addEventListener("click", () => {
    reviewsSection.removeChild(overlayElement);
  });

  let nameElement = overlayElement.querySelector(".overlay__name");
  nameElement.innerHTML = name;

  let textElement = overlayElement.querySelector(".overlay__text");
  textElement.innerHTML = text;

  return overlayElement;
}


 //form
 let message = new Object();
 message.loading = 'Загрузка...';
 message.success = 'Спасибо! Скоро мы с Вами свяжемся';
 message.failure = 'Что-то пошло не так';

 let form = document.querySelector('.form'),
     input = document.getElementsByTagName('input'),
     statusMessage = document.createElement('div');
     statusMessage.classList.add('status');

     form.addEventListener('submit', (event) =>{
       event.preventDefault();
       form.appendChild(statusMessage);
     });

     let request = new XMLHttpRequest();
     request.open('Post', 'https://webdev-api.loftschool.com/sendmail');

     let formData = new FormData(form);
     request.send(formData);

     request.onreadystatechange = function(){
       if(request.readyState < 4){
         statusMessage.innerHTML = message.loading;
       }else if(request === 4){
         if(request.status === 200 && request.status < 300){
           statusMessage.innerHTML = message.success;
         }
       }else{
         statusMessage.innerHTML = message.failure
       }
     }
     for(let i = 0; i < input.length; i++){
       input[i].value ='';
     }



