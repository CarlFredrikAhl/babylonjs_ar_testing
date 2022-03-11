const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

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
};

createScene().then((sceneToRender) => {
    engine.runRenderLoop(() => {
        sceneToRender.render();
    });
});



