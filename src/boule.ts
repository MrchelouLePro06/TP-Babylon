import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder ,StandardMaterial, Color3,ActionManager,ExecuteCodeAction, int} from "@babylonjs/core";
import { Camera } from "./camera";

export class Boule{
    private hauteur : int;
    createSphere(scene: Scene){
    this.hauteur=5;
    var sphere = MeshBuilder.CreateSphere("sphere", { diameter: this.hauteur }, scene);
    sphere.material = new StandardMaterial("redMaterial", scene);
    (sphere.material as StandardMaterial).diffuseColor = Color3.Blue();
    sphere.position.y=this.hauteur/2;
    sphere.position.x=0;
    sphere.metadata = { frontVector: new Vector3(0, 0, 1) };//permet de stocker des données dans l'objet "sphere"
    return sphere;
    }
    
    MovingBoule(scene: Scene){
        let isJumping = false;
        let jumpStartTime = 0;
        const jumpDuration = 1000;
        const jumpHeight = 15;
        const inputMap: { [key: string]: boolean } = {};
        scene.actionManager = new ActionManager(scene);

        scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (evt) => {
            inputMap[evt.sourceEvent.key] = true;
        }));

        scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (evt) => {
            inputMap[evt.sourceEvent.key] = false;
        }));

        scene.registerBeforeRender(() => {
            const sphere = scene.getMeshByName("sphere");
            if (sphere) {
                const frontVector = sphere.metadata.frontVector;
                if (inputMap["z"]) {
                    sphere.moveWithCollisions(frontVector.multiplyByFloats(2, 2, 2));
                }
                if (inputMap["s"]) {
                    sphere.moveWithCollisions(frontVector.multiplyByFloats(-2, -2, -2));
                }
                if (inputMap["q"]) {
                    sphere.rotation.y -= 0.02;
                    sphere.metadata.frontVector = new Vector3(Math.sin(sphere.rotation.y), 0, Math.cos(sphere.rotation.y));
                }
                if (inputMap["d"]) {
                    sphere.rotation.y += 0.02;
                    sphere.metadata.frontVector = new Vector3(Math.sin(sphere.rotation.y), 0, Math.cos(sphere.rotation.y));
                }
                if (inputMap[" "] && !isJumping) {
                    isJumping = true;
                    jumpStartTime = performance.now();
                }
                if (isJumping) {
                    const elapsedTime = performance.now() - jumpStartTime;
                    const progress = elapsedTime / jumpDuration;
                    if (progress < 1) {
                        sphere.position.y = this.hauteur / 2 + Math.sin(progress * Math.PI) * jumpHeight;
                    } else {
                        sphere.position.y =this.hauteur/2;
                        isJumping = false;
                    }
                }
            }
        });
    }
}