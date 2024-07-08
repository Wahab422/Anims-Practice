import barba from '@barba/core';
import barbaPrefetch from '@barba/prefetch';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import Flip from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(Flip);
barba.use(barbaPrefetch);
gsap.registerPlugin(ScrollTrigger);

gsap.config({
  nullTargetWarn: false,
});
gsap.defaults({
  ease: 'cubic-bezier(.22,.6,.36,1)',
});

let boxWrappers = document.querySelectorAll('.box-wrapper');
let gridOverlay = document.querySelector('.grid-overlay');
boxWrappers.forEach((boxWrapper) => {
  let box = boxWrapper.querySelector('.box');
  boxWrapper.style.width = boxWrapper.clientWidth;
  console.log(boxWrapper.clientWidth);
  box.addEventListener('click', () => {
    if (!box.classList.contains('clicked')) {
      let state = Flip.getState(box);
      gridOverlay.appendChild(box);
      gsap.to(gridOverlay, { pointerEvents: 'auto' });
      box.classList.add('clicked');
      gsap.to(boxWrapper, { duration: 1, zIndex: 2 });
      Flip.from(state, {
        duration: 1,
        ease: 'expo.out',
      });
    } else {
      let state = Flip.getState(box);
      boxWrapper.appendChild(box);
      gsap.to(gridOverlay, { pointerEvents: 'none' });
      box.classList.remove('clicked');
      Flip.from(state, {
        duration: 1,
        ease: 'expo.out',
        onComplete: () => {
          gsap.to(boxWrapper, { duration: 1, zIndex: 0 });
        },
      });
    }
  });
});

