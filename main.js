//import * as ZapparBabylon from "@zappar/zappar-babylonjs";

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

    // const groundMat = new BABYLON.StandardMaterial("groundMat");
    // groundMat.diffuseColor = new BABYLON.Color3.Gray();

    // const xrPromise = scene.createDefaultXRExperienceAsync({
    //     uiOptions: {
    //         sessionMode: "immersive-ar",
    //         referenceSpaceType: "local-floor"
    //     },
    //     optionalFeatures: true
    // });

    // return xrPromise.then((xrExperience) => {
    //     const fm = xrExperience.baseExperience.featuresManager;

    //     const xrTest = fm.enableFeature(
    //         BABYLON.WebXRHitTest.Name,
    //         "latest",
    //         {}
    //     );
    //     //const xrPlanes = fm.enableFeature(BABYLON.WebXRPlaneDetector.Name, 'latest', {});
    //     const anchors = fm.enableFeature(
    //         BABYLON.WebXRAnchorSystem.Name,
    //         "latest",
    //         { doNotRemoveAnchorsOnSessionEnded: true }
    //     );
    //     const bgRemover = fm.enableFeature(BABYLON.WebXRBackgroundRemover.Name);

    //     // xrTest.onHitTestResultObservable.add((results) => {
    //     //     if (results.length) {
    //     //         currentHitPosition = results[0].position;
    //     //         if (currentHitPosition && building && updateBuildingPosition) {
    //     //             building.position = currentHitPosition.clone();
    //     //             updateBuildingPosition = false;
    //     //         }
    //     //     }
    //     // });

    //     // let anchorsTest;
    //     // if (anchors) {
    //     //     console.log("anchors attached");

    //     //     anchors.onAnchorAddedObservable.add((anchor) => {
    //     //         if (!anchorsTest) {
    //     //             console.log("attaching", anchors);

    //     //             anchor.attachedNode = dude;
    //     //         }
    //     //     });
    //     // }

    //     // scene.onPointerDown = (evt, pickInfo) => {
    //     //     //Got hit-test, achors and is in XR.
    //     //     if(hitTest && xrExperience.baseExperience.state === BABYLON.WebXRState.IN_XR) {
    //     //         // anchors.addAnchorPointUsingHitTetsResultAsync(hitTest);
    //     //         //updateBuildingPosition = true;
    //     //         dude.position = pickInfo.pickedPoint.clone();
    //     //     }
    //     // }

    //     //Image tracking using Zappar
    //     //const zapCam = new ZapparBabylon.Camera('zapCam', scene);

    //     function loadBuilding(folder, fileName) {
            
    //         let prevBuilding = scene.getMeshesByID('buildingPart');

    //         for(let i = 0; i < prevBuilding.length; i++) {
    //            let building = scene.getMeshByID('buildingPart');
    //            scene.removeMesh(building);
    //         }
            
    //         const assetsManager = new BABYLON.AssetsManager(scene);
    //         const meshTask = assetsManager.addMeshTask('modelTask', '', folder, fileName);
    //         meshTask.onSuccess = (task) => {
    //             for(var i = 0; i < task.loadedMeshes.length; i++) {
    //                 task.loadedMeshes[i].scaling = new BABYLON.Vector3(0.03, 0.03, 0.03);
    //                 task.loadedMeshes[i].id = 'buildingPart';
    //             }
    //         }
    //     assetsManager.load();
    //     } 

    //     //GUI
    //     const adt = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    //     const panel = new BABYLON.GUI.StackPanel();
    //     panel.width = "220px";
    //     panel.top = "-50px";
    //     panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    //     panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    //     adt.addControl(panel);

    //     //btns to choose building
    //     const btn = new BABYLON.GUI.Button.CreateSimpleButton("btn", "Byggnad 1");
    //     btn.height = "200px";
    //     btn.width = "200px";
    //     btn.color = "black";
    //     btn.background = "white";
    //     btn.onPointerUpObservable.add(function() {
    //         loadBuilding('./models_small/', 'small.obj');
    //     });

    //     const btn2 = new BABYLON.GUI.Button.CreateSimpleButton("btn", "Byggnad 2");
    //     btn2.height = "200px";
    //     btn2.width = "200px";
    //     btn2.color = "black";
    //     btn2.background = "white";
    //     btn2.onPointerUpObservable.add(function() {
    //         loadBuilding('./models/', 'ARTestFloor.obj');
    //     });

    //     const btn3 = new BABYLON.GUI.Button.CreateSimpleButton("btn", "Byggnad 3");
    //     btn3.height = "200px";
    //     btn3.width = "200px";
    //     btn3.color = "black";
    //     btn3.background = "white";
        
    //     panel.addControl(btn);
    //     panel.addControl(btn2);
    //     panel.addControl(btn3);

        //window.location = "intent://arvr.google.com/scene-viewer/1.0?file=https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF/Avocado.gltf#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;";
        
        var building = document.getElementById("byggnadID");
        var createLinkBtn = document.getElementById("createLinkBtn");
        createLinkBtn.onclick = function() {
            var modelLink = document.createElement('a');
            var linkText = document.createTextNode('Öppna byggnad');
            modelLink.appendChild(linkText);
            modelLink.title = "Öppna byggnad";
            var intentLink = "intent://arvr.google.com/scene-viewer/1.0?file=";
            var file = building.value;
            var restOfLink = "#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;"
            var totalLink = intentLink + file + restOfLink;
            modelLink.href =totalLink;
            document.body.appendChild(modelLink);
        }

        return scene;
    // });
};

createScene().then((sceneToRender) => {
    engine.runRenderLoop(() => {
        sceneToRender.render();

        // let divFps = document.getElementById("fps");
        // divFps.innerHTML = engine.getFps().toFixed() + " fps";
    });

    //console.log('test');
});



