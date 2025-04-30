const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const geometry = new THREE.BufferGeometry();
const vertices = [];
const colors = [];
const sizes = [];

for (let i = 0; i < 1000; i++) {
    vertices.push(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
    );
    colors.push(Math.random(), Math.random(), Math.random());
    sizes.push(0.1 + Math.random() * 0.2);
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

const material = new THREE.PointsMaterial({
    size: 0.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

camera.position.z = 50;

function animate() {
    requestAnimationFrame(animate);
    particles.rotation.y += 0.001;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.preloader').classList.add('hidden');
    }, 1000);
});

const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let posX = 0, posY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
});

function updateFollower() {
    posX += (mouseX - posX) * 0.1;
    posY += (mouseY - posY) * 0.1;
    follower.style.left = `${posX}px`;
    follower.style.top = `${posY}px`;
    requestAnimationFrame(updateFollower);
}
updateFollower();

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const scrollToTop = document.querySelector('.scroll-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTop.classList.add('visible');
    } else {
        scrollToTop.classList.remove('visible');
    }
});

gsap.from('.hero-content', { opacity: 0, y: 50, duration: 1, delay: 0.5 });
gsap.from('.nav-links a', { opacity: 0, y: -20, stagger: 0.1, duration: 0.5, delay: 0.5 });
gsap.from('.about-content', { opacity: 0, x: -50, duration: 1, scrollTrigger: { trigger: '#about', start: 'top 80%' } });
gsap.from('.skill-category', { opacity: 0, y: 50, stagger: 0.2, duration: 1, scrollTrigger: { trigger: '#skills', start: 'top 80%' } });
gsap.from('.project-card', { opacity: 0, y: 50, stagger: 0.2, duration: 1, scrollTrigger: { trigger: '#projects', start: 'top 80%' } });
gsap.from('.timeline-item', { opacity: 0, x: -50, stagger: 0.3, duration: 1, scrollTrigger: { trigger: '#experience', start: 'top 80%' } });
gsap.from('.contact-container', { opacity: 0, y: 50, duration: 1, scrollTrigger: { trigger: '#contact', start: 'top 80%' } });