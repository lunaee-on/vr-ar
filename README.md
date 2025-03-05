<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VR & AR Experience</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" defer></script>
    <style>
        body {
            margin: 0;
            font-family: 'Orbitron', sans-serif;
            background-color: #050a30;
            color: #fff;
            cursor: default;
            overflow-x: hidden;
        }

        /* VR Background */
        #vr-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
        }

        /* Header */
        header {
            text-align: center;
            padding: 20px;
            font-size: 24px;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(5px);
            position: relative;
            z-index: 2;
        }

        /* Content */
        .content {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            padding: 50px;
            gap: 20px;
            z-index: 2;
            position: relative;
            min-height: 150vh;
        }

        .fact {
            background: rgba(0, 0, 0, 0.5);
            padding: 20px;
            border-radius: 10px;
            border: 1px solid cyan;
            width: 300px;
            text-align: center;
            transition: transform 0.3s ease, background 0.3s ease;
        }

        .fact:hover {
            background: rgba(0, 255, 255, 0.2);
            transform: scale(1.1);
        }

        /* Custom Pointer */
        .pointer {
            position: absolute;
            width: 15px;
            height: 15px;
            background: cyan;
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            transition: transform 0.05s ease-out;
        }
    </style>
</head>
<body>
    <div id="vr-background"></div> 

    <header>
        <h1>Virtual & Augmented Reality</h1>
    </header>

    <section class="content">
        <div class="fact"><h2>VR immerses users</h2><p>VR fully immerses users into a digital world with headsets.</p></div>
        <div class="fact"><h2>AR overlays digital content</h2><p>AR enhances reality with holograms and filters.</p></div>
        <div class="fact"><h2>VR is used in gaming</h2><p>Popular games like Beat Saber and Half-Life: Alyx use VR.</p></div>
        <div class="fact"><h2>AR in everyday life</h2><p>Snapchat filters and Pokémon GO use Augmented Reality.</p></div>
        <div class="fact"><h2>VR in medicine</h2><p>Doctors train in VR simulations for complex surgeries.</p></div>
        <div class="fact"><h2>AR in shopping</h2><p>Stores let customers preview furniture using AR.</p></div>
        <div class="fact"><h2>VR can reduce pain</h2><p>Studies show VR helps distract from pain in medical treatments.</p></div>
        <div class="fact"><h2>AR in navigation</h2><p>Google Maps Live View uses AR for real-time directions.</p></div>
    </section>

    <div class="pointer"></div>

    <script>
        // Custom pointer effect
        document.addEventListener("mousemove", (e) => {
            let pointer = document.querySelector(".pointer");
            pointer.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });

        // Hover animations for facts
        document.querySelectorAll(".fact").forEach((fact) => {
            fact.addEventListener("mouseenter", () => {
                gsap.to(fact, { scale: 1.2, duration: 0.3 });
            });
            fact.addEventListener("mouseleave", () => {
                gsap.to(fact, { scale: 1, duration: 0.3 });
            });
        });

        // THREE.js VR-Like Background
        let scene, camera, renderer, stars;

        function init() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.getElementById("vr-background").appendChild(renderer.domElement);

            // Create star field
            stars = new THREE.Group();
            for (let i = 0; i < 1000; i++) {
                let starGeometry = new THREE.SphereGeometry(0.1, 24, 24);
                let starMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
                let star = new THREE.Mesh(starGeometry, starMaterial);

                let x = (Math.random() - 0.5) * 1000;
                let y = (Math.random() - 0.5) * 1000;
                let z = (Math.random() - 0.5) * 1000;

                star.position.set(x, y, z);
                stars.add(star);
            }
            scene.add(stars);

            camera.position.z = 5;
            animate();
        }

        function animate() {
            requestAnimationFrame(animate);
            stars.rotation.x += 0.0005;
            stars.rotation.y += 0.0005;
            renderer.render(scene, camera);
        }

        // Mouse movement effect for VR background
        document.addEventListener("mousemove", (event) => {
            let x = (event.clientX / window.innerWidth - 0.5) * 2;
            let y = -(event.clientY / window.innerHeight - 0.5) * 2;
            gsap.to(camera.rotation, { x: y * 0.2, y: x * 0.2, duration: 1 });
        });

        // Adjust canvas size when resizing window
        window.addEventListener("resize", () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        });

        init();
    </script>
</body>
</html>