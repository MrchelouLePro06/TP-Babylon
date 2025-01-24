import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder ,StandardMaterial, Color3,ActionManager,ExecuteCodeAction} from "@babylonjs/core";
import { Camera } from "./camera";

export class Boule{
    createSphere(scene: Scene): Mesh {
    var d=5;
    var sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: d }, scene);
    sphere.material = new StandardMaterial("redMaterial", scene);
    (sphere.material as StandardMaterial).diffuseColor = Color3.Red();
    sphere.position.y=d/2;
    sphere.position.x=0;
    return sphere;
    }
    
    MovingBoule(scene: Scene, camera : Camera){
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
                if (inputMap["z"]) {
                    sphere.position.z -= 0.5;
                }
                if (inputMap["s"]) {
                    sphere.position.z += 0.5;
                }
                if (inputMap["q"]) {
                    sphere.position.x += 0.5;
                }
                if (inputMap["d"]) {
                    sphere.position.x -= 0.5;
                }
            }
        });
    }
}