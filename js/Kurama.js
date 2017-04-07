document.addEventListener("DOMContentLoaded", function () {
    if (BABYLON.Engine.isSupported()) {
        initScene();
    }
}, false);

function initScene() {

	var canvas = document.getElementById("renderCanvas");
	var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {
	var scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color3(0, 1, 0); // Bright green.

	var camera = new BABYLON.FreeCamera("sceneCamera", new BABYLON.Vector3(0, 1, -15), scene);
	camera.inputs.addGamepad();
	var inputManager = camera.inputs;

	var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
	light.intensity = .5;

	var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 4, scene);
	var materialSphere1 = new BABYLON.StandardMaterial("texture1", scene);
	materialSphere1.diffuseTexture = new BABYLON.Texture("textures/pcb.svg", scene);
	sphere.material = materialSphere1;
	sphere.position.y = 2;

	// Placement rules for planes:
	//
	// You shall not use a negative Y value.
	// ...
	// ...
	// ...
	// That is all.

    var plane1 = BABYLON.Mesh.CreatePlane("planeBot", 100, scene); // Good!
    plane1.position.y = 0;
    plane1.rotation.x = Math.PI / 2;
        
    var plane2 = BABYLON.Mesh.CreatePlane("planeNor", 100, scene);
    plane2.position.x = 50;
    plane2.position.y = 50;
    plane2.position.z = -50;
    plane2.rotation.y = Math.PI / 2;
    
    var plane3 = BABYLON.Mesh.CreatePlane("planeEas", 100, scene); // Good!
    plane3.position.x = 50;
    plane3.position.y = 50;
    plane3.position.z = 0;
    plane3.rotation.y = Math.PI / 2;

    var plane4 = BABYLON.Mesh.CreatePlane("planeSou", 100, scene);
    plane4.position.x = -50;
    plane4.position.y = 50;
    plane4.position.z = 50;
    plane4.rotation.y = Math.PI / 2;

    var plane5 = BABYLON.Mesh.CreatePlane("planeWes", 100, scene); // Good!
    plane5.position.x = -50;
    plane5.position.y = 50;
    plane5.position.z = 10;
    plane5.rotation.y = Math.PI / 2;
    
    var plane6 = BABYLON.Mesh.CreatePlane("planeTop", 100, scene); // Good!
    plane6.position.y = 100;
    plane6.rotation.x = Math.PI / 2;

    var materialPlane = new BABYLON.StandardMaterial("texturePlane", scene);
    materialPlane.diffuseTexture = new BABYLON.Texture("textures/space1.jpg", scene);
    materialPlane.diffuseTexture.uScale = 10.0;
    materialPlane.diffuseTexture.vScale = 10.0;
    materialPlane.backFaceCulling = false;

    var testingPlane = new BABYLON.StandardMaterial("texturePlane", scene);
    testingPlane.diffuseTexture = new BABYLON.Texture("textures/pcb.svg", scene);
    testingPlane.diffuseTexture.uScale = 10.0;
    testingPlane.diffuseTexture.vScale = 10.0;
    testingPlane.backFaceCulling = false;

    plane1.material = materialPlane;
    plane2.material = testingPlane;
    plane3.material = materialPlane;
    plane4.material = testingPlane;
    plane5.material = materialPlane;
    plane6.material = materialPlane;

	camera.attachControl(canvas, false); // req

	return scene;
};

var scene = createScene();

//BABYLON.SceneLoader.Load("", "ship.stl", engine, function (scene) {});

window.addEventListener("resize", function () {
	engine.resize();
});

engine.runRenderLoop(function() {
	scene.render();
});
}