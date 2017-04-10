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
	camera.inputs.addKeyboard();
	var inputManager = camera.inputs;

	var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
	light1.intensity = .5;

	var light2 = new BABYLON.HemisphericLight("light2", new BABYLON.Vector3(0, -1, 0), scene);
	light2.intensity = .5;

	var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 4, scene);
	var materialSphere1 = new BABYLON.StandardMaterial("texture1", scene);
	materialSphere1.diffuseTexture = new BABYLON.Texture("textures/pcb.svg", scene);
	sphere.material = materialSphere1;
	sphere.position.y = 2;

	var boxSize = 1000;

	// Placement rules for planes:
	//
	// You shall not use a negative Y value.
	// ...
	// ...
	// ...
	// That is all.

    var plane1 = BABYLON.Mesh.CreatePlane("planeBot", boxSize, scene); // Good!
    plane1.position.y = 0;
    plane1.rotation.x = Math.PI / 2;
        
    var plane2 = BABYLON.Mesh.CreatePlane("planeNor", boxSize, scene);
    plane2.position.x = 0;
    plane2.position.y = boxSize / 2.0;
    plane2.position.z = boxSize / 2.0;
    
    var plane3 = BABYLON.Mesh.CreatePlane("planeEas", boxSize, scene); // Good!
    plane3.position.x = boxSize / 2.0;
    plane3.position.y = boxSize / 2.0;
    plane3.position.z = 0;
    plane3.rotation.y = Math.PI / 2;

    var plane4 = BABYLON.Mesh.CreatePlane("planeSou", boxSize, scene);
    plane4.position.x = 0;
    plane4.position.y = boxSize / 2.0;
    plane4.position.z = -(boxSize / 2.0);

    var plane5 = BABYLON.Mesh.CreatePlane("planeWes", boxSize, scene); // Good!
    plane5.position.x = -(boxSize / 2.0);
    plane5.position.y = boxSize / 2.0;
    plane5.position.z = 0;
    plane5.rotation.y = Math.PI / 2;
    
    var plane6 = BABYLON.Mesh.CreatePlane("planeTop", boxSize, scene); // Good!
    plane6.position.y = boxSize;
    plane6.rotation.x = Math.PI / 2;

    var materialPlane = new BABYLON.StandardMaterial("texturePlane", scene);
    materialPlane.diffuseTexture = new BABYLON.Texture("textures/space1.jpg", scene);
    materialPlane.diffuseTexture.uScale = 10.0;
    materialPlane.diffuseTexture.vScale = 10.0;
    materialPlane.backFaceCulling = false;

    plane1.material = materialPlane;
    plane2.material = materialPlane;
    plane3.material = materialPlane;
    plane4.material = materialPlane;
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
	var dir = "n";
	document.onkeydown = function(e) {
			var key = e.keyCode;

			if(key == 65 && dir != "right")     setTimeout(function() {dir = "left"; }, 30);
			else if(key == 87 && dir != "down") setTimeout(function() {dir = "up"; }, 30);
			else if(key == 68 && dir != "left") setTimeout(function() {dir = "right"; }, 30);
			else if(key == 83 && dir != "up")   setTimeout(function() {dir = "down"; }, 30);

			if(key) e.preventDefault();
	}

	// camera.position.x
	// camera.position.y
	// camera.position.z

	if(dir == "right") sphere.positon.x++;
	else if(dir == "left") sphere.positon.x--;
	else if(dir == "up") sphere.positon.y--;
	else if(dir == "down") sphere.positon.y++;

	scene.render();
});
}