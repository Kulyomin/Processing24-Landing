/* Swiper Slider`s */
var certificates_swiper = new Swiper('.certificates-slider', {
   navigation: {
      nextEl: '.main-certificates-btn-next',
      prevEl: '.main-certificates-btn-prev'
   },
   spaceBetween: 31,
   slidesPerGroup: 1,
   loop: true,
   /* Lazy loading */
   lazy: {
      loadOnTransitionStart: false,
      loadPrevNext: false,
   },
   watchSlidesProgress: true,
   watchSlidesVisibility: true,
   breakpoints: {
      320: {
         slidesPerView: 'auto',
      },
      500: {
         slidesPerView: 2,
      },
      700: {
         slidesPerView: 3,
      },
      968: {
         slidesPerView: 4,
      }
   }
});

var partners_swiper = new Swiper('.partners-slider', {
   loop: true,
   slidesPerView: 4,
   slidesPerColumn: 4,
   spaceBetween: 115,
   pagination: {
      el: '.swiper-pagination',
      clickable: true,
   },
   /* Lazy loading */
   lazy: {
      loadOnTransitionStart: false,
      loadPrevNext: false,
   },
   watchSlidesProgress: true,
   watchSlidesVisibility: true,
   autoplay: {
      delay: 3000,
      disableOnInteraction: false,
   },
   breakpoints: {
      320: {
         slidesPerView: 'auto',
      },
      500: {
         slidesPerView: 2,
      },
      700: {
         slidesPerView: 3,
      },
      968: {
         slidesPerView: 4,
      }
   }
});

var reviews_swiper = new Swiper('.reviews-slider', {
   loop: true,
   slidesPerColumn: 2,
   spaceBetween: 30,
   /* Lazy loading */
   lazy: {
      loadOnTransitionStart: false,
      loadPrevNext: false,
   },
   watchSlidesProgress: true,
   watchSlidesVisibility: true,
   navigation: {
      nextEl: '.main-reviews-btn-next',
      prevEl: '.main-reviews-btn-prev'
   },
   autoplay: {
      delay: 4000,
      disableOnInteraction: false,
   },
   breakpoints: {
      320: {
         slidesPerView: 1,
      },
      768: {
         slidesPerView: 2,
      },
   }
});
/* Input номера телефона */
document.addEventListener("DOMContentLoaded", function () {
   var eventCalllback = function (e) {
      var el = e.target,
         clearVal = el.dataset.phoneClear,
         pattern = el.dataset.phonePattern,
         matrix_def = "+7(___) ___-__-__",
         matrix = pattern ? pattern : matrix_def,
         i = 0,
         def = matrix.replace(/\D/g, ""),
         val = e.target.value.replace(/\D/g, "");
      if (clearVal !== 'false' && e.type === 'blur') {
         if (val.length < matrix.match(/([\_\d])/g).length) {
            e.target.value = '';
            return;
         }
      }
      if (def.length >= val.length) val = def;
      e.target.value = matrix.replace(/./g, function (a) {
         return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
      });
   }
   var phone_inputs = document.querySelectorAll('[data-phone-pattern]');
   for (let elem of phone_inputs) {
      for (let ev of ['input', 'blur', 'focus']) {
         elem.addEventListener(ev, eventCalllback);
      }
   }
});
/* Работа калькулятора */
const fuelVolume = document.querySelector('.fuel-volume');
const fuelPrice = document.querySelector('.fuel-price');
const fuelLiterPrice = document.querySelector('.fuel-liter-price');
const fuelBenefit = document.querySelector('.fuel-benefit');
const inputRange = document.querySelector('.input-range');

/* Заливка значений */
const assignValue = () => {
   fuelVolume.value = inputRange.value;
}

/* Заливка Input Range */
const fillRange = (elem) => {
   newRange = (((elem.value - elem.min) * (100 - 0)) / (elem.max - elem.min)) + 0;
   elem.style.background = 'linear-gradient(to right, #098FCF 0%, #098FCF ' + newRange + '%, #E1E1E1 ' + newRange + '%, #E1E1E1 100%)';
}

/* Проходим по каждому input range */
inputRange.addEventListener('input', () => {
   fillRange(inputRange);
   assignValue();
   calculation(fuelVolume.value, Number(String(fuelLiterPrice.innerHTML).slice(0, -1)));
});

/* При изменении Input Default меняем Input Range */
fuelVolume.addEventListener('input', function () {
   inputRange.value = fuelVolume.value;
   fillRange(inputRange);
});

/* Сама функция калькулятора */
const calculation = (fuelVolume = 1670, fuelLiterPrice = 45.50) => {
   const anotherLiterPrice = Number(49.59);
   let price = Math.round(Number(fuelVolume * fuelLiterPrice));
   let priceAnother = Math.round(Number(fuelVolume * anotherLiterPrice));
   let benefit = Math.round(Number(priceAnother - price));
   fuelPrice.innerHTML = `${price} ₽`;
   fuelBenefit.innerHTML = `${benefit} ₽`;
}

fillRange(inputRange);
assignValue();
calculation(fuelVolume.value, Number(String(fuelLiterPrice.innerHTML).slice(0, -1)));

/* Burger Menu */
const menu = document.querySelector('.burger-menu');
const menuOverlay = document.querySelector('.burger-menu-overlay');
const navbar = document.querySelector('.header-nav');
var flag_menu = true;
menu.addEventListener('click', () => {
   console.log("Вы нажали на менюшку");
   menuOverlay.classList.toggle('active');
   navbar.classList.toggle('active');
   if(flag_menu) {
      menu.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      flag_menu = false;
   }
   else {
      menu.innerHTML = '<i class="fa-solid fa-bars"></i>';
      flag_menu = true;
   }
});