/**
 * Experiencia 3D Interactiva con Three.js
 * Inspirado en estéticas "Van Holtz" / "Cyberpunk" / "Neon"
 */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('bg-3d');
    if (!canvas || !window.THREE) return; // Salir si no existe canvas o si omitimos carga de Three
  
    // 1. Scene Setup
    const scene = new THREE.Scene();
    
    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
  
    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,           // Fondo transparente para ver los gradientes del css
      antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Resize handler
    const updateSize = () => {
      const width = document.querySelector('.hero').clientWidth || window.innerWidth;
      const height = document.querySelector('.hero').clientHeight || window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
  
    // 4. Objetos y Geometría Premium
    // Usaremos un Toroide Complejo "Knot" como core
    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    
    // Material Neon Glowing "Wireframe"
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x6366f1, // --color-primary de nuestras variables
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);
  
    // Partículas de "Polvo Digital" flotando
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 700;
    const posArray = new Float32Array(particlesCount * 3);
  
    for(let i = 0; i < particlesCount * 3; i++) {
        // Dispersar espacialmente desde el centro
        posArray[i] = (Math.random() - 0.5) * 15;
    }
  
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.015,
        color: 0x818cf8, // --color-primary-light
        transparent: true,
        opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
  
    // 5. Interacción de Mouse con Sensibilidad Cinética (Glitch / Movimiento Fluido)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
  
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
  
    document.addEventListener('mousemove', (event) => {
      mouseX = (event.clientX - windowHalfX);
      mouseY = (event.clientY - windowHalfY);
    });
  
    // 6. Ciclo de Animación (Render Loop)
    const clock = new THREE.Clock();
  
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
  
      // Rotación constante sutil
      torusKnot.rotation.y = 0.1 * elapsedTime;
      torusKnot.rotation.x = 0.05 * elapsedTime;
  
      // Rotar partículas muy suavemente
      particlesMesh.rotation.y = -0.05 * elapsedTime;
  
      // Suavizado (Lerping) para movimiento del mouse (Kinetic aesthetic)
      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;
      
      torusKnot.rotation.y += 0.5 * (targetX - torusKnot.rotation.y);
      torusKnot.rotation.x += 0.5 * (targetY - torusKnot.rotation.x);
      
      // Parallax effect on particles
      particlesMesh.position.x += 0.1 * (targetX - particlesMesh.position.x);
      particlesMesh.position.y += 0.1 * (-targetY - particlesMesh.position.y);
  
      renderer.render(scene, camera);
    };
  
    animate();
  });
