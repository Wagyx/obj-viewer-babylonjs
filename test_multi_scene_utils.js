var createScenes = function (canvasesId) {
    var scenes = []
    for(let i = 0; i < canvasesId.length; i++){
        console.log(canvasesId[i]);
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(engine);
        
        // This creates and positions a free camera (non-mesh)
        var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 5, new BABYLON.Vector3.Zero(), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        
        camera.lowerRadiusLimit = 4;
        camera.upperRadiusLimit = 20;
        
        // This attaches the camera to the canvas
        camera.attachControl(document.getElementById(canvasesId[i]), true);
        
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        
        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = (i+1)*0.2;
        
        // Our built-in 'sphere' shape.
        var box = BABYLON.MeshBuilder.CreateBox("Box", {size: 2}, scene);
        
        box.position.y = 0.5;
        
        var mat = new BABYLON.PBRMetallicRoughnessMaterial("mat", scene);
        mat.baseColor = new BABYLON.Color3(0, (i+1)*0.2, 0);
        mat.metallic = 1;
        mat.roughness = 0.5;
        
        box.material = mat;
        
        //scene.createDefaultEnvironment();
        engine.registerView(document.getElementById(canvasesId[i]),camera);
        scenes.push(scene);
    }

    return scenes;

};;

