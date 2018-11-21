

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


//slide

let slideIndex = 1,
    slideItems = document.querySelectorAll('.slider__item'),
    next = document.querySelector('.slider__arrow-right'),
    prev = document.querySelector('.slider__arrow-left');

    



