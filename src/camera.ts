import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { FollowCamera, Vector3 } from "@babylonjs/core";

export class Camera {
    private camera: FollowCamera;
    constructor(canvas, scene, obj) {
        this.camera = new FollowCamera("Camera", obj.position, scene, obj);
        this.camera.radius = 80;
        this.camera.heightOffset = 20;
        this.camera.rotationOffset = 180;
        this.camera.cameraAcceleration = .1;
        scene.activeCamera = this.camera;
        this.camera.attachControl(canvas);
    }
    setPosCamera(x: number) {
        this.camera.rotationOffset += x;
    }
}