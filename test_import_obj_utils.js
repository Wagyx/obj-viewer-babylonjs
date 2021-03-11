// var createScene = function (objName) {

//     // This creates a basic Babylon Scene object (non-mesh)
//     var scene = new BABYLON.Scene(engine);

//     // This creates and positions a free camera (non-mesh)
//     var camera = new BABYLON.ArcRotateCamera("Camera0", 0, 0.8, 5, new BABYLON.Vector3.Zero(), scene);
//     camera.setTarget(BABYLON.Vector3.Zero());

//     camera.lowerRadiusLimit = 4;
//     camera.upperRadiusLimit = 20;

//     // This attaches the camera to the canvas
//     camera.attachControl(document.getElementById("renderCanvas0"), true);

//     // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
//     var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

//     // Default intensity is 1. Let's dim the light a small amount
//     light.intensity = 0.7;

//     // ads mesh
//     BABYLON.SceneLoader.Append("./assets/models/Archimedean/", objName, scene, function (scene) {
//         // do something with the scene
//     });

//     scene.createDefaultEnvironment();

//     return scene;
// };;


var createScene = function () {

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

   new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    var cam = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, 0, 3, new BABYLON.Vector3(0, 0, 0), scene);
    cam.attachControl(canvas);

    var loader = new BABYLON.AssetsManager(scene);

    var pos = function(t) {
        t.loadedMeshes.forEach(function(m) {
            //Todo: center and scale mesh 
            // I don't get how any of this works -> RTFM
            //console.log(m.position)
            //m.position -= m.boudingInfo.boundingSphere.center;
            // console.log(m.position)
            // m.scaling = new BABYLON.Vector3(1/m.boundinInfo.boundingSphere.radius);
            //console.log(m.boudingInfo.boundingSphere.radius)
            //m.scale( 2,2,2);
            //console.log(m.scaling);
            //m.scaling /= m.boudingInfo.boundingSphere.radius;
        });
    };

    var bane = loader.addMeshTask("bane", "", "./assets/models/Archimedean/", objName);
    bane.onSuccess = pos;

    loader.onFinish = function() {
        engine.runRenderLoop(function () {
            scene.render();
        });
    };

    loader.load();

    return scene;

};