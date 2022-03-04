import * as ZapparBabylon from "@zappar/zappar-babylonjs";

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

        //Image tracking using Zappar
        const zapCam = new ZapparBabylon.Camera('zapCam', scene);

        //GUI
        // const adt = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        // const panel = new BABYLON.GUI.StackPanel();
        // panel.width = "220px";
        // panel.top = "-50px";
        // panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        // panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        // adt.addControl(panel);

        // //QR-Button
        // const qrBtn = new BABYLON.GUI.Button.CreateSimpleButton("qrBtn", "Skanna QR-Kod");
        // qrBtn.height = "200px";
        // qrBtn.width = "200px";
        // qrBtn.color = "black";
        // qrBtn.background = "white";
        // panel.addControl(qrBtn);

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



