const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true);

const createScene = function() {

    const scene = new BABYLON.Scene(engine);

   // var environment = scene.createDefaultEnvironment();

    const xrPromise = scene.createDefaultXRExperienceAsync({
        uiOptions: {
            sessionMode: 'immersive-ar'
        }
    });

    return xrPromise.then((xrExperience) => {
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