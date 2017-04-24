document.addEventListener("DOMContentLoaded", function () {
    if (BABYLON.Engine.isSupported()) {
    	backgroundMusic.play();
        initScene();
    }
}, false);

var backgroundMusic = new Audio('Background.mp3');

var totalPlayerDamageDealt = 0;
var playerKills = 100;

function initScene() {

	var canvas = document.getElementById("renderCanvas");
	var engine = new BABYLON.Engine(canvas, true);

	//var theHud = document.getElementById('theHUD'),
      //tH = theHud.getContext('2d')
	//theHud.style.width = '100%';
	//theHud.style.height= '100%';

var createScene = function () {
	var scene = new BABYLON.Scene(engine);
	var gravityVector = new BABYLON.Vector3(0,-9.81, 0);
	var physicsPlugin = new BABYLON.CannonJSPlugin();
	scene.enablePhysics(gravityVector, physicsPlugin);
	scene.actionManager = new BABYLON.ActionManager(scene);

	scene.clearColor = new BABYLON.Color3(0, 1, 0); // Bright green.

	var camera = new BABYLON.FreeCamera("sceneCamera", new BABYLON.Vector3(0, 1, -15), scene);
	camera.inputs.clear();
	camera.inputs.addMouse();
	camera.inputs.addKeyboard();

	var inputManager = camera.inputs;
	// scene.activeCamera.attachControl(canvas);

	var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
	light1.intensity = .5;

	var light2 = new BABYLON.HemisphericLight("light2", new BABYLON.Vector3(0, -1, 0), scene);
	light2.intensity = .5;

	var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 4, scene);
	var materialSphere1 = new BABYLON.StandardMaterial("texture1", scene);
	materialSphere1.diffuseTexture = new BABYLON.Texture("textures/pcb.svg", scene);
	sphere.material = materialSphere1;
	sphere.position.y = 3;

	camera.target = sphere;

	var boxSize = 1000;

	var playerSpeed = 0.1;

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
        
    var plane2 = BABYLON.Mesh.CreatePlane("planeNor", boxSize, scene); // Good!
    plane2.position.x = 0;
    plane2.position.y = boxSize / 2.0;
    plane2.position.z = boxSize / 2.0;
    
    var plane3 = BABYLON.Mesh.CreatePlane("planeEas", boxSize, scene); // Good!
    plane3.position.x = boxSize / 2.0;
    plane3.position.y = boxSize / 2.0;
    plane3.position.z = 0;
    plane3.rotation.y = Math.PI / 2;

    var plane4 = BABYLON.Mesh.CreatePlane("planeSou", boxSize, scene); // Good!
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

	var keys={letft:0,right:0,backwards:0,forward:0};
	window.addEventListener('keydown',function(event){
		var ch = String.fromCharCode(event.keyCode);
			if (ch == "A") keys.left=1;
			if (ch == "D") keys.right=1;
			if (ch == "S") keys.backwards=1;
			if (ch == "W") keys.forward=1;
		}); 
	window.addEventListener('keyup',function(event){
		var ch = String.fromCharCode(event.keyCode);
			if (ch == "A") keys.left=0;
			if (ch == "D") keys.right=0;
			if (ch == "S") keys.backwards=0;
			if (ch == "W") keys.forward=0;
		}); 
	scene.registerBeforeRender(function(){
		if (keys.forward==1){
		var posX = Math.sin(sphere.rotation.y);
		var posZ = Math.cos(sphere.rotation.y);
		sphere.position.x += posX;
		sphere.position.z += posZ;
	}
		if (keys.backwards==1){
		var posX = Math.sin(sphere.rotation.y);
		var posZ = Math.cos(sphere.rotation.y);
		sphere.position.x -= posX;
		sphere.position.z -= posZ;
	}
		if (keys.left==1){
		var posY = Math.sin(sphere.rotation.y);
		var posZ = Math.cos(sphere.rotation.y);
		sphere.position.y += posY;
		sphere.position.z += posZ;
	}
		if (keys.right==1){
		var posY = Math.sin(sphere.rotation.y);
		var posZ = Math.cos(sphere.rotation.y);
		sphere.position.y -= posY;
		sphere.position.z -= posZ;
	}
});

/*
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
		if (evt.sourceEvent.key == "w") {
			sphere.position.y += playerSpeed;
		}
		if (evt.sourceEvent.key == "s") {
			sphere.position.y -= playerSpeed;
		}
		if (evt.sourceEvent.key == "a") {
			sphere.position.x += playerSpeed;
		}
		if (evt.sourceEvent.key == "d") {
			sphere.position.x -= playerSpeed;
		}
		else {
		}
	}));
*/
	camera.attachControl(canvas, false); // req

	return scene;
};

var scene = createScene();

//BABYLON.SceneLoader.Load("", "ship.stl", engine, function (scene) {});

window.addEventListener("resize", function () {
	engine.resize();
});

engine.runRenderLoop(function() {
	// tH.font = "8px Courier New";
    // tH.fillStyle = "White";
    // tH.textAlign = "left";
    // tH.clearRect(0,0, theHud.width, theHud.height);
	// tH.fillText(String(playerKills), 0, 0);
	scene.render();
});
}