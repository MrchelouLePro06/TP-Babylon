import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder ,StandardMaterial, Color3,FollowCamera} from "@babylonjs/core";
import { Boule } from "./boule";

export class Camera {
    private camera: FollowCamera;
    constructor(canvas, scene) {
        this.camera = new FollowCamera("Camera", new Vector3(0, 10, -10), scene);
        this.camera.radius = 80;
        this.camera.heightOffset = 20;
        this.camera.rotationOffset = 0;
        this.camera.attachControl(canvas);
        
    }

    followBoule(boule: Mesh) {
        this.camera.lockedTarget = boule;
    }
}