import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder ,StandardMaterial, Color3} from "@babylonjs/core";

export class Wall{
    createWall(scene: Scene){
    //à modifier
    var sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 5 }, scene);
    sphere.material = new StandardMaterial("redMaterial", scene);
    (sphere.material as StandardMaterial).diffuseColor = Color3.Red();
    }
}