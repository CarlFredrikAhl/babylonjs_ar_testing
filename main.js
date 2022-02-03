const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true);

const createScene = function() {

    const scene = new BABYLON.Scene(engine);

    const cam = new BABYLON.FreeCamera("cam", new BABYLON.Vector3(60, 50, 90), scene);
    cam.attachControl(canvas, true);
    cam.rotation = new BABYLON.Vector3(0.2, 10, 0);
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    //const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 500, height:500}, scene);

    // const box = BABYLON.MeshBuilder.CreateBox('box', {}, scene);
    // box.scaling = new BABYLON.Vector3(10, 10, 10);

   // box.parent = cam;

    // const boxMat = new BABYLON.StandardMaterial('boxMat');
    // boxMat.diffuseColor = new BABYLON.Color3.Red;

    // box.material = boxMat;
    // box.position = new BABYLON.Vector3(0, 5, 0);

    // var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
    // sphere.position.y = 2;
    // sphere.position.z = 5;

    //Download mesh from babylon to test
    BABYLON.SceneLoader.ImportMeshAsync("him", "https://assets.babylonjs.com/meshes/Dude/", "dude.babylon", scene)
    .then((result) => {
        var dude = result.meshes[0];
        dude.scaling = new BABYLON.Vector3(0.02, 0.02, 0.02);
        dude.position = new BABYLON.Vector3(-10, 0, -10);

        scene.beginAnimation(result.skeletons[0], 0, 100, true, 1);
    });

    //const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 500, height:500}, scene);

    const groundMat = new BABYLON.StandardMaterial("groundMat");
    groundMat.diffuseColor = new BABYLON.Color3.Gray;

    const xrPromise = scene.createDefaultXRExperienceAsync({
        uiOptions: {
            sessionMode: 'immersive-ar'
        }
    });

    return xrPromise.then((xrExperience) => {

        // box.parent = xrExperience.baseExperience.camera;
        
        // const xrTest = fm.enableFeature(BABYLON.WebXRHitTestLegacy.Name, 'latest', {});
        // const xrPlanes = fm.enableFeature(BABYLON.WebXRPlaneDetector.Name, 'latest', {});

        return scene;
    });
}

createScene().then(sceneToRender => {
    engine.runRenderLoop(() => {
    sceneToRender.render();

    let divFps = document.getElementById("fps");
    divFps.innerHTML = engine.getFps().toFixed() + " fps";
    });

    //console.log('test');
});