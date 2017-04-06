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

	var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);

	var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
	light.intensity = .5;

	var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 4, scene);
	var materialSphere1 = new BABYLON.StandardMaterial("texture1", scene);
	materialSphere1.diffuseTexture = new BABYLON.Texture("textures/pcb.svg", scene);
	sphere.material = materialSphere1;
	sphere.position.y = 2;

    var plane = BABYLON.Mesh.CreatePlane("plane", 100, scene);
    plane.position.y = -5;
    plane.rotation.x = Math.PI / 2;
    var materialPlane = new BABYLON.StandardMaterial("texturePlane", scene);
    materialPlane.diffuseTexture = new BABYLON.Texture("textures/space1.jpg", scene);
    materialPlane.diffuseTexture.uScale = 10.0;
    materialPlane.diffuseTexture.vScale = 10.0;
    materialPlane.backFaceCulling = false;
    plane.material = materialPlane;

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