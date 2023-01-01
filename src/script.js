import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'lil-gui'


const parameters = {
    color: 0xBDF7,
    spin: () => {
        gsap.to(mesh.rotation, 1, { y: mesh.rotation.y + Math.PI * 2 })
    }
}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xBDF7 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setClearColor(0xffffff, 0);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Debug
const gui = new dat.GUI({
    width: 400
})


// Gui Parameters
gui.title('Play with Cube!')
// Position 
const folderPosition = gui.addFolder('Positions');
folderPosition.add(mesh.position, 'y').min(- 3).max(3).step(0.01).name('Y')
folderPosition.add(mesh.position, 'x').min(- 3).max(3).step(0.01).name('X')
folderPosition.add(mesh.position, 'z').min(- 3).max(3).step(0.01).name('Z')

// Scale
const folderScale = gui.addFolder('Scale');
folderScale.add(mesh.scale, 'y', 0, 6).name('Y')
folderScale.add(mesh.scale, 'x', 0, 6).name('X')
folderScale.add(mesh.scale, 'z', 0, 6).name('Z')


// Color
const folderTexture = gui.addFolder('Texture')
folderTexture
    .addColor(parameters, 'color').name('Color')
    .onChange(() => {
        material.color.set(parameters.color)
    })


// Bonus
const folderBonus = gui.addFolder('Bonus')
folderBonus.add(material, 'wireframe')
folderBonus.add(mesh, 'visible')
folderBonus.add(parameters, 'spin')




const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()
    // Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()


