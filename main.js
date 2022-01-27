const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true);

var createScene = async function () {
   
    const scene = new BABYLON.Scene(engine);

    var environment = scene.createDefaultEnvironment();

    const xr = scene.createDefaultVRExperience({
        uiOptions: {
            sessionMode: 'immersive-ar',
            referenceSpaceType: 'local-floor'
        },
        optionalFeatures: true
    });
    
    return scene;
}

var scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});