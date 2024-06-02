import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.SphereGeometry(5, 32, 32);
const material = new THREE.PointsMaterial({
  color: 0x00ffff,
  size: 0.1,
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener('mousemove', onMouseMove, false);

function animate() {
  requestAnimationFrame(animate);

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(particles);

  if (intersects.length > 0) {
    gsap.to(intersects[0].object.scale, {
      duration: 1,
      x: 2,
      y: 2,
      z: 2,
    });
  } else {
    gsap.to(particles.rotation, {
      duration: 1,
      x: 0,
      y: 0.005,
      z: 0,
    });
  }

  controls.update();

  renderer.render(scene, camera);
}

animate();
init();  

let mouseMoved = false;
    const pointer = {
    x: .5 * windows.innerWidth,
    y: .5 * windows.innerHeight,
    }
    const params = {
        poinsNumer: 40,
        widthFactor: .3,
        mouseThreshold: .6,
        spring: .4,
        friction: .5,
    };
    function updateMousePosition (eX, eY){
        pointer.x =eX;
        pointer.y = eY;
    
    }
    setupCanvas();
    update(0);
    windwo.addEventListener("resize", setupCanvas);
    
    
    
    
    
    
    
    
    
    