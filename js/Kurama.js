document.addEventListener("DOMContentLoaded", function () {
    if (BABYLON.Engine.isSupported()) {
        initScene();
    }
}, false);

/**
 * Creates a new BABYLON Engine and initialize the scene
 */
function initScene() {
// Get the canvas element from our HTML above
var canvas = document.getElementById("renderCanvas");

// Load the BABYLON 3D engine
var engine = new BABYLON.Engine(canvas, true);

// This begins the creation of a function that we will 'call' just after it's built
var createScene = function () {
	// Now create a basic Babylon Scene object 
	var scene = new BABYLON.Scene(engine);

	// Change the scene background color to green.
	scene.clearColor = new BABYLON.Color3(0, 1, 0);

	var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);

	// This creates a light, aiming 0,1,0 - to the sky.
	var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

	// Dim the light a small amount
	light.intensity = .5;

	// var light2 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 10, 100), scene);

	// Let's try our built-in 'sphere' shape. Params: name, subdivisions, size, scene
	var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 4, scene);

	var materialSphere1 = new BABYLON.StandardMaterial("texture1", scene);

	// materialSphere1.diffuseColor = new BABYLON.Color3(1.0, 0.2, 0.7);

	materialSphere1.diffuseTexture = new BABYLON.Texture("textures/flower1.jpg", scene);

	sphere.material = materialSphere1;

	// Move the sphere upward 1/2 its height
	sphere.position.y = 2;

	// Let's try our built-in 'ground' shape.  Params: name, width, depth, subdivisions, scene
	var ground = BABYLON.Mesh.CreateGround("ground1", 100, 100, 100, scene);
	var groundText1 = new BABYLON.StandardMaterial("texture2", scene);
    groundText1.diffuseTexture = new BABYLON.Texture("textures/space.jpg", scene);

    // This targets the camera to the sphere
	camera.setTarget(sphere);

	// This attaches the camera to the canvas
	camera.attachControl(canvas, false);

	// Leave this function
	return scene;
};

var scene = createScene();

//BABYLON.SceneLoader.Load("", "ship.stl", engine, function (scene) {});

window.addEventListener("resize", function () {
	engine.resize();
});

engine.runRenderLoop(function() {
	sphere.position.y += 0.1;
	scene.render();
});
}