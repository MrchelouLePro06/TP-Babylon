import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder ,StandardMaterial, Color3, Texture,DeviceOrientationCamera} from "@babylonjs/core";
import { Boule } from "./boule";
import { Camera } from "./camera";

class App {
    constructor() {
        // create the canvas html element and attach it to the webpage
        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);

        // initialize babylon scene and engine
        var engine = new Engine(canvas, true);
        var scene = new Scene(engine);

        //ground
        const ground = MeshBuilder.CreateGround("ground", {width:1000, height:1000});
        const groundMaterial = new StandardMaterial("groundMaterial", scene);
        groundMaterial.diffuseTexture = new Texture("textures/grass.jpg", scene);
        groundMaterial.specularColor = new Color3(0, 1, 0);
        groundMaterial.diffuseColor = new Color3(3.5, 0.5, 0.5);
        ground.material = groundMaterial;

        //boule
        let b = new Boule();
        const sphere = b.createSphere(scene);

        //camera + light
        let camera = new Camera(canvas, scene, b);
        camera.followBoule(sphere);
        var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
        b.MovingBoule(scene);
        
        // hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
            }
        });

        // run the main render loop
        engine.runRenderLoop(() => {
            scene.render();
        });
    }
}
new App();