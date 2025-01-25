import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder ,StandardMaterial, Color3,FollowCamera, int} from "@babylonjs/core";
import { Boule } from "./boule";

export class Camera {
    private camera: FollowCamera;
    constructor(canvas, scene, boule) {
        this.camera = new FollowCamera("Camera", boule.position, scene, boule);
        this.camera.radius = 80;
        this.camera.heightOffset = 20;
        this.camera.rotationOffset =180;
        this.camera.cameraAcceleration = .1;
        scene.activeCamera = this.camera;
        this.camera.attachControl(canvas);

    }
    setPosCamera(x : int) {
        this.camera.rotationOffset+=x;
    }
}