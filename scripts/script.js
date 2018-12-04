// menu

const menuItems = document.querySelectorAll('.menu__item');

for (let i = 0; i < menuItems.length; i++) {
  const menuLink = menuItems[i];
  
  menuLink.addEventListener('click', function() {

    for (let i = 0; i < menuItems.length; i++) {
  
      const menuLink = menuItems[i];

      if (menuLink != event.currentTarget) {
        menuLink.classList.remove('menu__item--active');
      };
    };

    if (menuLink == event.currentTarget) {
      if (this.classList.contains('menu__item--active')) {
        this.classList.remove('menu__item--active');
      } else {
        this.classList.add('menu__item--active');
      };
    };
  });
};

// accordeon

const accItems = document.querySelectorAll('.accordeon__head');

for (let i = 0; i < accItems.length; i++) {
  const accLink = accItems[i];
  
  accLink.addEventListener('click', function() {
    
    for (let i = 0; i < accItems.length; i++) {
      const accLink = accItems[i];
      if (accLink != event.currentTarget) {
      accLink.parentElement.classList.remove('accordeon__item--active');
      }
    };

    if (accLink == event.currentTarget) {
      accLink.parentElement.classList.toggle('accordeon__item--active');
    };

  });
};

// order form 

const myForm = document.querySelector('.form'),
  sendBtn = document.querySelector('#sendBtn'),
  name = myForm.elements.name,
  phone = myForm.elements.phone,
  comment = myForm.elements.comment,
  body = document.querySelector('body');


name.addEventListener('keydown', function (event) {
  let isLetter = false,
    isControl = false;

  if (isFinite(event.key) == false) {
    isLetter = true;
  };

  if (event.key == "ArrowLeft" || event.key == "ArrowRight" || event.key == "Backspace" || event.keyCode == '32') {
    isControl = true;
  }

  if (!isLetter && !isControl) {
    event.preventDefault();
  };
});

const onlyDigit = document.querySelectorAll('.onlyDigit');

for (const element of onlyDigit) {
  element.addEventListener('keydown', function (event) {
    let isDigit = false;
    let isDash = false;
    isControl = false;

    if (event.key >= 0 || event.key <= 9) {
      isDigit = true;
    };

    if (event.key == '-') {
      isDash = true;
    };

    if (event.key == "ArrowLeft" || event.key == "ArrowRight" || event.key == "Backspace") {
      isControl = true;
    }

    if (!isDigit && !isDash && !isControl) {
      event.preventDefault();
    };
  });
}



sendBtn.addEventListener('click', event => {
  event.preventDefault();

  if (validateForm(myForm)) {
    let formData = new FormData(myForm);
    formData.append("name", myForm.elements.name.value);
    formData.append("phone", myForm.elements.phone.value);
    formData.append("comment", myForm.elements.comment.value);
    formData.append("to", 'mail@mail.com');

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    xhr.send(formData);
    xhr.addEventListener('load', () => {
      if (xhr.response.status) {
        const message = xhr.response.message;
        body.appendChild(createResponse(message));
        document.body.style.overflow = 'hidden';
      }
    });
  };
});

function validateForm(form) {
  let valid = true;

  if (!validateField(form.elements.name)) {
    valid = false;
  };

  if (!validateField(form.elements.phone)) {
    valid = false;
  };

  if (!validateField(form.elements.comment)) {
    valid = false;
  };

  return valid;
};

function validateField(field) {
  field.nextElementSibling.textContent = field.validationMessage;

  if (!field.checkValidity()) {
    field.nextElementSibling.classList.add('form__error--active');
  } else {
    field.nextElementSibling.classList.remove('form__error--active');
  }
  return field.checkValidity();
};

function createResponse(text) {
  const overlayElement = document.createElement("div");
  overlayElement.classList.add("overlay");

  const template = document.querySelector("#responseTemplate");
  overlayElement.innerHTML = template.innerHTML;

  const closeElement = overlayElement.querySelector(".overlay__close--response");
  closeElement.addEventListener("click", function () {
    body.removeChild(overlayElement);
  });

  const wrapElement = overlayElement.querySelector(".overlay__wrap");
  wrapElement.addEventListener("click", function () {
    body.removeChild(overlayElement);
  });

  const messageElement = overlayElement.querySelector(".overlay__message");
  messageElement.innerHTML = text;

  return overlayElement;
}

// Yandex map

ymaps.ready(init);

var placemarks = [
  {
    latitude: 59.97,
    longitude: 30.31,
    hintContent: '<div class="map__item map__hint">улица Литераторов, 17</div>',
    balloonContent: [
      '<div class="map__item map__balloon">',
      '<img class="map__balloon"/>',
      '<div class="map__text">Самые вкусные бургеры у нас!</div>',
      '<div class="map__text">Заходите по адресу: <b> ул.Литераторов, 17</b></div>',
      '</div>'
    ]
  }, {
    latitude: 59.94,
    longitude: 30.25,
    hintContent: '<div class="map__item map__hint">Малый проспект В О, 64</div>',
    balloonContent: [
      '<div class="map__item map__balloon">',
      '<img class="map__balloon"/>',
      '<div class="map__text">Самые вкусные бургеры у нас!</div>',
      '<div class="map__text">Заходите по адресу: <b>Малый проспект В О, 64</b></div>',
      '</div>'
    ]
  }, {
    latitude: 59.93,
    longitude: 30.34,
    hintContent: '<div class="map__item map__hint">Наб. реки Фонтанки, 56</div>',
    balloonContent: [
      '<div class="map__item map__balloon">',
      '<img class="map__balloon"/>',
      '<div class="map__text">Самые вкусные бургеры у нас!</div>',
      '<div class="map__text">Заходите по адресу: <b>Наб. реки Фонтанки, 56</b></div>',
      '</div>'
    ]
  }, {
    latitude: 59.93,
    longitude: 30.40,
    hintContent: '<div class="map__item map__hint">Малоохтинский проспект, 61</div>',
    balloonContent: [
      '<div class="map__item map__balloon">',
      '<img class="map__balloon"/>',
      '<div class="map__text">Самые вкусные бургеры у нас!</div>',
      '<div class="map__text">Заходите по адресу: <b>Малоохтинский проспект, 61</b></div>',
      '</div>'
    ]
  }
];

function init() {
  let map = new ymaps.Map('map', {
    center: [59.94, 30.32],
    zoom: 12,
    controls: ['zoomControl'],
    behaviors: [],
  });

  placemarks.forEach(function (obj) {
    let placemark = new ymaps.Placemark([obj.latitude, obj.longitude], {
      hintContent: obj.hintContent,
      balloonContent: obj.balloonContent.join('')
    },
      {
        iconLayout: 'default#image',
        iconImageHref: '/images/icons/map-marker.svg',
        iconImageSize: [46, 58],
        iconImageOffset: [-23, -57]
      });

    map.geoObjects.add(placemark);
  });
};

// navigation

const btn = document.querySelector('#burger-btn'),
      nav = document.querySelector('#nav'),
      navList = document.querySelector('#nav__list'),
      links = document.querySelectorAll('.nav__item'),
      isBtnActive = btn.classList.contains('burger-btn--active');
  
btn.addEventListener('click', function() {
  btn.classList.toggle('burger-btn--active');
  btn.classList.toggle('burger-btn--animation');
  nav.classList.toggle('nav--active');
});
  
for (const element of links) {
  element.addEventListener('click', function() {
    btn.classList.toggle('burger-btn--active');
    btn.classList.toggle('burger-btn--animation');
    nav.classList.toggle('nav--active');
  });
};


// one page scroll
$(function () {
    const list = $('.wrapper');
    var generateDots = function () {
      $('.section').each(function () {
        var dot = $('<li>', {
          attr: {
            class: 'dots__item'
          },
          html: '<a href="#" class="dots__link"></a>'
        });
  
        $('.dots__list').append(dot);
      });
    };
  
    generateDots();
  
    $('body').on('click', '.dots__item', function () {
      var $this = $(this),
        container = $this.closest('.wrapper'),
        index = $this.index();
  
      moveSection(index);
      activateDot(index);
    })
  
  
    // activate dot 
    var activateDot = function (index) {
      $('body')
        .find('.dots__item')
        .eq(index)
        .addClass('active')
        .siblings()
        .removeClass('active');
    }
  
  

    $('.hero-bottom').on('click touch', function () {
      var $this = $(this),
        container = $this.closest('.wrapper'),
        items = $('.section', container),
        activeItem = items.filter('.active'),
        nextItem = activeItem.next();
  
      moveSection(nextItem.index());
    });
  
 
    $('.wrapper').on('mousewheel DOMMouseScroll', function (e) {
      let deltaY = e.originalEvent.wheelDelta,
        mozDeltaY = e.originalEvent.detail,
        $this = $(this),
        container = $this.closest('.wrapper'),
        items = $('.section', container),
        activeItem = items.filter('.active'),
        nextItem = activeItem.next(),
        prevItem = activeItem.prev(),
        existedItem, reqItem;
  
      if (deltaY < 0 || mozDeltaY > 0) { 
        existedItem = nextItem;
      };
  
      if (deltaY > 0 || mozDeltaY < 0) { 
        existedItem = prevItem;
      };
  
      reqItem = existedItem.length ? existedItem.index() : items.first();
      moveSection(reqItem);
    });
  
  
    $(function () {
      $(".section").swipe({
        swipeStatus: function (event, phase, direction, distance) {
          if (phase == "end") {
            var items = $('.section'),
              activeItem = items.filter('.active'),
              nextItem = activeItem.next(),
              prevItem = activeItem.prev(),
              existedItem, reqItem;
  
            if (direction == 'up') { 
              existedItem = nextItem;
            }
  
            if (direction == 'down') { 
              existedItem = prevItem;
            }
  
            reqItem = existedItem.length ? existedItem.index() : items.first();
            moveSection(reqItem);
          };
        },
        triggerOnTouchEnd: false,
        threshold: 100
      });
    });
  
    $(document).on('keydown', e => {
      let items = $('.section'),
        activeItem = items.filter('.active'),
        nextItem = activeItem.next(),
        prevItem = activeItem.prev(),
        existedItem, reqItem;
  
      switch (e.keyCode) {
        case 40:
          existedItem = nextItem;
          break;
        case 38:
          existedItem = prevItem;
          break;
      };
  
      reqItem = existedItem.length ? existedItem.index() : items.first();
      moveSection(reqItem);
    })
  
    // quick clicks protection
    var flag = true;
  
    var changeFlag = function () {
      const mouseInertionIsFinished = 400,
        animationDuration = 700;
  
      setTimeout(function () {
        flag = true;
      }, animationDuration + mouseInertionIsFinished);
    }
  
  
    var moveSection = function (sectionNum) {
      const items = list.find('.section'),
        activeSection = items.filter('.active'),
        reqItem = items.eq(sectionNum),
        reqIndex = reqItem.index(),
        duration = 700;
  
      if (flag) {
  
        flag = false;
  
        if (reqItem.length) {
          list.animate({
            'top': -reqIndex * 100 + '%'
          }, duration, function () {
            activeSection.removeClass('active');
            reqItem.addClass('active');
            activateDot(sectionNum);
          });
        };
  
        changeFlag();
      }
    }
  });

  // // overlay

const openButtons = document.querySelectorAll(".review-block__btn"),
reviewsSection = document.querySelector('#reviews'),
overlayContainer = document.querySelector('body');


for (let i = 0; i < openButtons.length; i++) {
const element = openButtons[i];

element.addEventListener("click", function () {
  const elements = element.parentNode.children;
  let name, 
  text;

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.classList.contains('review-block__name')) {
      name = element.textContent
    };
    if (element.classList.contains('review-block__text')) {
      text = element.textContent
    };
  };

  body.appendChild(createOverlay(name, text));
  // reviewsSection.appendChild(createOverlay(name, text));
});
};

function createOverlay(name, text) {
const overlayElement = document.createElement("div");
overlayElement.classList.add("overlay");

const template = document.querySelector("#reviewTemplate");
overlayElement.innerHTML = template.innerHTML;

const closeElement = overlayElement.querySelector(".overlay__close");
closeElement.addEventListener("click", function () {
  overlayContainer.removeChild(overlayElement);
});

const wrapElement = overlayElement.querySelector(".overlay__wrap");
wrapElement.addEventListener("click", function () {
  overlayContainer.removeChild(overlayElement);
});

const nameElement = overlayElement.querySelector(".overlay__name");
nameElement.innerHTML = name;

const textElement = overlayElement.querySelector(".overlay__text");
textElement.innerHTML = text;

return overlayElement;
}

//slider

const left = document.querySelector('.slider__arrow-left'),
  right = document.querySelector('.slider__arrow-right'),
  contentBlock = document.querySelector('.slider__wrap'),
  items = document.querySelector('.slider'),
  computed = getComputedStyle(items),
  step = parseInt(getComputedStyle(items.firstElementChild).width),
  size = items.children.length - 1,
  maxRight = size * step,
  minRight = 0;

var flag = true;

var changeFlag = function () {
  setTimeout(function () {
    flag = true;
  }, 500);
}

var timerID = setInterval(function () {
  moveRight();
}, 4000);

right.addEventListener("click", function (e) {
  e.preventDefault();

  moveRight();
  clearInterval(timerID);
});

left.addEventListener("click", function (e) {
  e.preventDefault();

  moveLeft();
  clearInterval(timerID);
});

function moveRight() {
  let currentRight = parseInt(computed.right);

  if (flag) {
    flag = false
    if (!currentRight) {
      currentRight = 0;
    }

    if (currentRight < maxRight) {
      items.style.right = currentRight + step + "px";
    } else {
      currentRight = 0;
      items.style.right = minRight;
    };

    changeFlag();
  };
}

function moveLeft() {
  let currentRight = parseInt(computed.right);

  if (flag) {
    flag = false
    
    if (!currentRight) {
      currentRight = 0;
    }

    if (currentRight > minRight) {
      items.style.right = currentRight - step + "px";
    };
    if (currentRight == 0) {
      currentRight = maxRight;
      items.style.right = maxRight + "px";
    };

    changeFlag();
  }
}

const videoEl = document.querySelector('.work__video-window'),
  videoWindow = $('.work__video-window'),
  videoContainer = $('.work__player'),
  playBtns = $('.playBtn'),
  volumeBtn = $('.player__volume'),
  volumeLevelBtn = $('.player__bar--volume').after();


playBtns.on('click', e => {
  playVideo();
})

videoWindow.on('click', e => {
  playVideo();
})

volumeBtn.on('click', e => {
  if (videoEl.volume != 0) {
    videoEl.volume = 0;
  } else {
    videoEl.volume = .5;
  };
  volumeBtn.toggleClass('player__volume--mute');
})

  var changeButtonPos = function(percent){
    volumeLevelBtn.style.left = `${percent}%`
  }

  var changeVolumePos = function(percent){
    playerVolumeRangeButton.style.left = `${percent}%`
  }

  var onPlayerReady = function(){
    const duration = videoEl.duration;

    interval = setInterval(function(){
      const completed = videoEl.currentTime;
      const percent = (completed / duration) * 100;
      changeButtonPos(percent);
    }, 1000 + 300)
  }

const playVideo = function () {
  if (videoEl.paused) {
    videoEl.play();
  } else {
    videoEl.pause();
  };
  videoContainer.toggleClass('player--active');
}