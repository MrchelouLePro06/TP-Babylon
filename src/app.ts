import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { Engine, Scene, Vector3, HemisphericLight, DirectionalLight, MeshBuilder, StandardMaterial, Color3, Texture } from "@babylonjs/core";
import { Voiture } from "./voiture";
import { Camera } from "./camera";
import { Boule } from "./boule";

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

        // ground
        const ground = MeshBuilder.CreateGround("ground", { width: 1000, height: 1000 });
        const groundMaterial = new StandardMaterial("groundMaterial", scene);
        groundMaterial.diffuseTexture = new Texture("textures/grass.jpg", scene);
        groundMaterial.specularColor = new Color3(0, 1, 0);
        groundMaterial.diffuseColor = new Color3(3.5, 0.5, 0.5);
        ground.material = groundMaterial;

        //2 lights 2 methods
        var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
        const directionalLight = new DirectionalLight("dirLight", new Vector3(0, -1, 0), scene);
        directionalLight.intensity = 1;

        /*
        // voiture
        let v = new Voiture();
        v.loadOBJ(scene, (importedMesh) => {
            // camera + light
            let camera = new Camera(canvas, scene, importedMesh);
            v.MovingVoiture(scene, importedMesh);
        });
        */
       
        // boule
        let b = new Boule();
        const sphere = b.createSphere(scene);
        let camera = new Camera(canvas, scene, sphere);
        // scene.gravity = new Vector3(0, -9.81, 0);
        // camera.applyGravity = true;
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