document.addEventListener("DOMContentLoaded", () => {
    // Floating title effect
    const title = document.getElementById("main-title");
    title.addEventListener("mouseover", () => {
        title.style.transform = "translateY(-5px)";
    });
    title.addEventListener("mouseout", () => {
        title.style.transform = "translateY(0)";
    });

    // Mouse Trail Effect
    document.addEventListener("mousemove", (e) => {
        let trail = document.createElement("div");
        trail.classList.add("trail");
        document.body.appendChild(trail);
        trail.style.left = `${e.pageX}px`;
        trail.style.top = `${e.pageY}px`;

        setTimeout(() => {
            trail.remove();
        }, 500);
    });

    // Keyboard Interaction
    document.addEventListener("keydown", (event) => {
        if (event.key === "v") {
            alert("You pressed 'V' for Virtual Reality!");
        } else if (event.key === "a") {
            alert("You pressed 'A' for Augmented Reality!");
        }
    });

    // Interactive VR Background
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let geometry = new THREE.BufferGeometry();
    let vertices = [];
    for (let i = 0; i < 5000; i++) {
        let x = (Math.random() - 0.5) * 2000;
        let y = (Math.random() - 0.5) * 2000;
        let z = (Math.random() - 0.5) * 2000;
        vertices.push(x, y, z);
    }
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

    let material = new THREE.PointsMaterial({ color: 0x00ffff, size: 1 });
    let stars = new THREE.Points(geometry, material);
    scene.add(stars);

    camera.position.z = 500;

    function animate() {
        requestAnimationFrame(animate);
        stars.rotation.x += 0.0005;
        stars.rotation.y += 0.0005;
        renderer.render(scene, camera);
    }
    animate();
});

function showDetails(id) {
    document.getElementById(id).style.display = "block";
}

function hideDetails(id) {
    event.stopPropagation();
    document.getElementById(id).style.display = "none";
}