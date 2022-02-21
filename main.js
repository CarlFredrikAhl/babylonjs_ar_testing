const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
var currentHitPosition = undefined;
var dude = undefined;
var updateBuildingPosition = true;
const createScene = function () {
    const scene = new BABYLON.Scene(engine);

    const cam = new BABYLON.FreeCamera(
        "cam",
        new BABYLON.Vector3(60, 50, 90),
        scene
    );
    cam.attachControl(canvas, true);
    cam.rotation = new BABYLON.Vector3(0.2, 10, 0);
    var light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );

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

    //const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 500, height:500}, scene);

    const groundMat = new BABYLON.StandardMaterial("groundMat");
    groundMat.diffuseColor = new BABYLON.Color3.Gray();

    const xrPromise = scene.createDefaultXRExperienceAsync({
        uiOptions: {
            sessionMode: "immersive-ar",
            referenceSpaceType: "local-floor"
        },
        optionalFeatures: true
    });

    return xrPromise.then((xrExperience) => {
        const fm = xrExperience.baseExperience.featuresManager;
        //xrExperience.baseExperience.camera.useAutoRotationBehaviour = true;

        const xrTest = fm.enableFeature(
            BABYLON.WebXRHitTest.Name,
            "latest",
            {}
        );
        //const xrPlanes = fm.enableFeature(BABYLON.WebXRPlaneDetector.Name, 'latest', {});
        const anchors = fm.enableFeature(
            BABYLON.WebXRAnchorSystem.Name,
            "latest",
            { doNotRemoveAnchorsOnSessionEnded: true }
        );
        const bgRemover = fm.enableFeature(BABYLON.WebXRBackgroundRemover.Name);

        //Download mesh from babylon to test
        // BABYLON.SceneLoader.ImportMeshAsync(
        //     "him",
        //     "https://assets.babylonjs.com/meshes/Dude/",
        //     "dude.babylon",
        //     scene
        // ).then((result) => {
        //     dude = result.meshes[0];
        //     dude.scaling = new BABYLON.Vector3(0.02, 0.02, 0.02);
        //     //dude.position = new BABYLON.Vector3(-2, 0, -2);
        //     // dude.position =
        //     //     xrExperience.baseExperience.camera.getFrontPosition(2);
        //     //dude.setEnabled(false);
        //     //dude.rotation = xrExperience.baseExperience.camera.rotation;
        //     //dude.setParent(xrExperience.baseExperience.camera);

        //     scene.beginAnimation(result.skeletons[0], 0, 100, true, 1);
        // });

        const assetsManager = new BABYLON.AssetsManager(scene);
        const meshTask = assetsManager.addMeshTask('modelTask', '', './models_small/', 'small.obj');
        meshTask.onSuccess = (task) => {
            for(var i = 0; i < task.loadedMeshes.length; i++) {
                task.loadedMeshes[i].scaling = new BABYLON.Vector3(0.03, 0.03, 0.03);
            }
        }
        assetsManager.load();

        // xrTest.onHitTestResultObservable.add((results) => {
        //     if (results.length) {
        //         currentHitPosition = results[0].position;
        //         if (currentHitPosition && building && updateBuildingPosition) {
        //             building.position = currentHitPosition.clone();
        //             updateBuildingPosition = false;
        //         }
        //     }
        // });

        // let anchorsTest;
        // if (anchors) {
        //     console.log("anchors attached");

        //     anchors.onAnchorAddedObservable.add((anchor) => {
        //         if (!anchorsTest) {
        //             console.log("attaching", anchors);

        //             anchor.attachedNode = dude;
        //         }
        //     });
        // }

        // scene.onPointerDown = (evt, pickInfo) => {
        //     //Got hit-test, achors and is in XR.
        //     if(hitTest && xrExperience.baseExperience.state === BABYLON.WebXRState.IN_XR) {
        //         // anchors.addAnchorPointUsingHitTetsResultAsync(hitTest);
        //         //updateBuildingPosition = true;
        //         dude.position = pickInfo.pickedPoint.clone();
        //     }
        // }

        return scene;
    });
};

createScene().then((sceneToRender) => {
    engine.runRenderLoop(() => {
        sceneToRender.render();

        let divFps = document.getElementById("fps");
        divFps.innerHTML = engine.getFps().toFixed() + " fps";
    });

    //console.log('test');
});



