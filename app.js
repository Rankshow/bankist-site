'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');



///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener
  ('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// button Scrolling
btnScrollTo.addEventListener('click', function(e){
  const s1coords = section1.getBoundingClientRect();

// window.scrollTo({
//   left: s1coords.left + window.pageXOffset,
//   top: s1coords.top  + window.pageYOffset,
//   behaviour: 'smooth',
// })
  section1.scrollIntoView({ bahaviour: 'smooth'});

});

//////////
// Page navigation
// once, you click this link it will navigate to all links having the same class.
// ===Event delegation====
// document.querySelectorAll('.nav__link').forEach(function(el) {
//   el.addEventListener('click', function(e){
//     e.preventDefault();
//     const id =this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behaviour: 'smooth'});
//   })
// })

// 1.Add event listener to commo parent element
// 2. determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault();

  // Matching strategy
  if(e.target.classList.contains('nav__link')){
      const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ 
        behaviour: 'smooth'});
  }
});

const h1 = document.querySelector('h1');


// going downwards:child
console.log(h1.querySelectorAll('.highlight'))
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'red';


// Going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)'

// h1.closest('h1').style.background = 'var(--gradient-primary)';

// going side ways: siblings.
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.parentElement.children);

// [...h1.parentElement.children].forEach(function(el){
//   if(el !== h1) el.style.transform ='scale(0.4)'
// });

// Tabbed component

tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');
  

  // Guard clause
  if(!clicked) return;
  
  

// Remove the active classes for both tab and contain area.
  tabs.forEach( t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach( c => c.classList.remove('operations__content--active'));
  
  // Activate tab
  clicked.classList.add('operations__tab--active');

  
  // Active content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
  
});

// this function change the opacity of the menubar to be faded
const handler = function (e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');


    siblings.forEach(el => {
      if(el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  };
};

// menu fade animation
nav.addEventListener('mouseover', handler.bind(0.5));
nav.addEventListener('mouseout',  handler.bind(1));
// // creating a sticky navigation
// const initCoords = section1.getBoundingClientRect();
// console.log(initCoords)
// // sticky navigation
// window.addEventListener('scroll', function(){
//   console.log(window.scrollY);

//   if(this.window.scrollY > initCoords.top)
//   nav.classList.add('sticky');
//   else nav.classList.add('sticky');

// })

// sticky navigation: Intersection Observer API
// const obsCallback = function(entries, observer){
//   entries.forEach(entry => {
//     console.log(entry);
//   });
  
// }

// const obsOption = {
//  root: null,
//  threshold: [0, 0.2], 
// };
// const observer = new IntersectionObserver(obsCallback, obsOption);
// observer.observe(section1);


const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
 

  if(!entry.isintersecting) nav.classList.add('sticky');
  else 
  nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, 
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Revaeal section
const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer){
  const [entry] = entries;
  // console.log(entry);

  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section){
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// Lazy loading images
const imgTarget = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer) {
  const [entry] = entries;
  // console.log(entry)

  if(!entry.isIntersecting) return;

  // Replace the src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg,
{
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTarget.forEach(img => imgObserver.observe(img))

// slider
const slider = function(){

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');


let curSlide = 0;
const maxSlide = slides.length;


// Function
const createDots = function (){
  slides.forEach(function(_, i) {
    dotContainer.insertAdjacentHTML('beforeend',
    `<button class='dots__dot' data-slide='${i}'></
    button>`);
  });
};


// for the  dot slide
const activateDot = function(slide){
 document.querySelectorAll('dots__dot')
 .forEach(dot => dot.classList.remove('dots__dot--active'));

 document
 .querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot-active');
};


// +++++++++++++++++++++++++

// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.2) translateX(-800px)';
// slider.style.overflow = 'visible';


const goToSlide = function(slide) {
slides.forEach((s, i) => s.style.transform = `translateX(${100 
  *(i - slide)}%)`
  );
}



const nextSlide = function() {
  if(curSlide === maxSlide - 1){
    curSlide = 0;
   }else{
     curSlide++;
   }
  
  goToSlide(curSlide);
  activateDot(curSlide);
};

const previousSlide = function (){
  if(curSlide === 0) {
  curSlide = maxSlide -1;
}else {
  curSlide--;
}
 goToSlide(curSlide);
 activateDot(curSlide);
}

const init = function(){
  goToSlide(0);
  createDots();
  activateDot(0);
};
init();
// Next slide
btnRight.addEventListener('click',  nextSlide);
btnLeft.addEventListener('click', previousSlide);

document.addEventListener('keydown', function (e) {
  console.log(e);
  if(e.key === 'ArrowLeft') previousSlide();
  e.key === 'ArrowRight' && nextSlide();
});

// action is taken when one pf the dots is clicked
dotContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('dots__dot')){
    console.log('DOT');
    const {slide} = e.target.dataset;
    goToSlide(slide);
    activateDot(curSlide);
  }
})
}
slider();



document.addEventListener('DOMContentLoaded', function(e){
  console.log('HTML parsed and DOM tree built', e);
});

window.addEventListener('load', function(e){
  console.log('page fully loaded', e);
});

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// })