import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder ,StandardMaterial, Color3,ActionManager,ExecuteCodeAction} from "@babylonjs/core";

export class Boule{
    createSphere(scene: Scene){
    var d=5;
    var sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: d }, scene);
    sphere.material = new StandardMaterial("redMaterial", scene);
    (sphere.material as StandardMaterial).diffuseColor = Color3.Red();
    sphere.position.y=d/2;
    }
    
    MovingBoule(scene: Scene){
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
                    sphere.position.z += 1;
                }
                if (inputMap["s"]) {
                    sphere.position.z -= 1;
                }
                if (inputMap["q"]) {
                    sphere.position.x -= 1;
                }
                if (inputMap["d"]) {
                    sphere.position.x += 1;
                }
            }
        });
    }
}