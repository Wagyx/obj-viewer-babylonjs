class MouseHandler {
	
	onMouseLeave(scene, engine, canvasName) {
		console.log("leave " + canvasName);
        scene.cameras[0].detachControl(document.getElementById(canvasName));
	}
	
	onMouseEnter(scene, engine, canvasName) {
		console.log("enter " + canvasName);
		engine.inputElement = document.getElementById(canvasName);
		document.getElementById(canvasName).blur();
        scene.cameras[0].attachControl(document.getElementById(canvasName), true);
	}
}

var createScenes = function (canvasesId) {
    var scenes = []
    for(let i = 0; i < canvasesId.length; i++){
        console.log(canvasesId[i]);
        // This creates a basic Babylon Scene object (non-mesh)
        let scene = new BABYLON.Scene(engine);
        
        // This creates and positions a free camera (non-mesh)
        let camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 5, new BABYLON.Vector3.Zero(), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        
        camera.lowerRadiusLimit = 4;
        camera.upperRadiusLimit = 20;
        
        // This attaches the camera to the canvas
        //camera.attachControl(document.getElementById(canvasesId[i]), true);
        
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        
        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = (i+1)*0.2;
        
        // Our built-in 'sphere' shape.
        let box = BABYLON.MeshBuilder.CreateBox("Box", {size: 2}, scene);
        
        box.position.y = 0.5;
        
        let mat = new BABYLON.PBRMetallicRoughnessMaterial("mat", scene);
        mat.baseColor = BABYLON.Color3.Random();
        mat.metallic = 1;
        mat.roughness = 0.5;
        
        box.material = mat;
        
        //scene.createDefaultEnvironment();
        engine.registerView(document.getElementById(canvasesId[i]),camera);
        scenes.push(scene);
		
		let mouseHandler = new MouseHandler();
		document.getElementById(canvasesId[i]).addEventListener("mouseleave", () => {mouseHandler.onMouseLeave(scene, engine, canvasesId[i]);}, false);
		document.getElementById(canvasesId[i]).addEventListener("mouseenter", () => {mouseHandler.onMouseEnter(scene, engine, canvasesId[i]);}, false);
    }

    return scenes;

};