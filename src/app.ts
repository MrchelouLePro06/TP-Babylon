import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { Engine, Scene, Vector3, HemisphericLight, DirectionalLight, MeshBuilder, StandardMaterial, Color3, Texture } from "@babylonjs/core";
import { Voiture } from "./voiture";
import { Camera } from "./camera";
import { Boule } from "./boule";

class App {
    private currentObject: any;
    private camera: Camera;
    private voiture: Voiture;
    private boule: Boule;
    private importedMesh: any;
    private sphere: any;

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

        // 2 lights 2 methods
        var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
        const directionalLight = new DirectionalLight("dirLight", new Vector3(0, -1, 0), scene);
        directionalLight.intensity = 1;

        // boule
        this.boule = new Boule();
        this.sphere = this.boule.createSphere(scene);
        this.currentObject = this.sphere;
        this.boule.MovingBoule(scene);
        this.camera = new Camera(canvas, scene, this.sphere);

        // voiture
        this.voiture = new Voiture();
        this.voiture.loadOBJ(scene, (importedMesh) => {
            this.importedMesh = importedMesh;
            //this.voiture.MovingVoiture(scene, importedMesh);
            this.importedMesh.setEnabled(false);
        });

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
            if (ev.key === 'e' || ev.key === 'E') {
                if (this.currentObject === this.sphere) {
                    this.sphere.setEnabled(false);
                    this.importedMesh.setEnabled(true);
                    this.currentObject = this.importedMesh;
                    this.voiture.MovingVoiture(scene, this.importedMesh);
                } else {
                    this.importedMesh.setEnabled(false);
                    this.sphere.setEnabled(true);
                    this.currentObject = this.sphere;
                    this.boule.MovingBoule(scene);
                }
                this.camera = new Camera(canvas, scene, this.currentObject);
            }
        });

        engine.runRenderLoop(() => {
            scene.render();
        });
    }
}
new App();