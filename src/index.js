// import barba from '@barba/core';
// import barbaPrefetch from '@barba/prefetch';
// import Lenis from '@studio-freight/lenis';
// import { gsap } from 'gsap';
// import Flip from 'gsap/Flip';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// gsap.registerPlugin(Flip);
// barba.use(barbaPrefetch);
// gsap.registerPlugin(ScrollTrigger);

// gsap.config({
//   nullTargetWarn: false,
// });
// gsap.defaults({
//   ease: 'cubic-bezier(.22,.6,.36,1)',
// });

// let staggerElements = document.querySelectorAll('[anim-stagger]');
// if (staggerElements.length > 0) {
//   staggerElements.forEach((element) => {
//     animateStagger(element);
//   });
// }
// // GSAP Stagger Animation Function
// function animateStagger(element, children, opacityValue) {
//   if (children == null) {
//     children = element.getAttribute('anim-stagger');
//   }
//   let childrens = element.querySelectorAll(children);
//   gsap.set(childrens, {
//     y: element.getAttribute('from-y') || '1rem',
//     opacity: opacityValue || 0,
//   });
//   ScrollTrigger.batch(childrens, {
//     onEnter: (target) => {
//       // Animate sub-elements when they enter the viewport
//       gsap.to(target, {
//         autoAlpha: 1,
//         duration: element.getAttribute('data-duration') || 1.3,
//         y: '0rem',
//         opacity: 1,
//         stagger: {
//           from: element.getAttribute('stagger-from') || 'start',
//           each: element.getAttribute('stagger-amount') || 0.25,
//         },
//         ease: element.getAttribute('data-easing') || 'power3.out',
//         scrollTrigger: {
//           trigger: element,
//           start: element.getAttribute('scrollTrigger-start') || 'top 95%',
//           markers: element.getAttribute('anim-markers') || false,
//           toggleActions: 'play pause none reset',
//         },
//         delay: element.getAttribute('anim-delay') || 0.15,
//       });
//     },
//   });
// }
var { Engine } = Matter,
  { Render } = Matter,
  { World } = Matter,
  { Bodies } = Matter,
  { Body } = Matter,
  { Events } = Matter;

var engine = Engine.create(),
  { world } = engine;

var render = Render.create({
  element: document.getElementById('world'),
  engine: engine,
  options: {
    width: 800,
    height: 600,
    wireframes: false,
    background: 'transparent',
  },
});

var item1 = document.querySelector('[item]'),
  item2 = document.getElementById('item2');

var boxA = Bodies.rectangle(400, 200, 80, 80, { id: 'item1' }),
  boxB = Bodies.rectangle(450, 50, 80, 80, { id: 'item2' }),
  ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

World.add(world, [boxA, boxB, ground]);

Events.on(engine, 'afterUpdate', function () {
  var bodies = Matter.Composite.allBodies(engine.world);
  bodies.forEach(function (body) {
    if (body.id) {
      var element = document.getElementById(body.id);
      if (element) {
        element.style.left = body.position.x - 40 + 'px'; // Adjust for half width to center
        element.style.top = body.position.y - 40 + 'px'; // Adjust for half height to center
        element.style.transform = 'rotate(' + (body.angle * 180) / Math.PI + 'deg)';
      }
    }
  });
});

Engine.run(engine);
Render.run(render);
