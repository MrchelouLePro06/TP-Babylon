import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { SceneLoader, Vector3, AnimationGroup, ActionManager, ExecuteCodeAction } from "@babylonjs/core";

export class Player {
    private movementVector: Vector3;
    private isMoving: boolean;
    private animationGroup: AnimationGroup;

    constructor(scene, callback) {
        const objPath = "models/";
        const objFile = "human.glb";
        this.movementVector = new Vector3(0, 0, 0);
        this.isMoving = false;

        SceneLoader.ImportMesh(
            "",        // Si tu veux importer tous les meshes, laisse vide
            objPath,   // Chemin vers le dossier des fichiers
            objFile,   // Nom du fichier OBJ
            scene,     // La scène où l'objet sera chargé
            (meshes, particleSystems, skeletons, animationGroups) => {  // Fonction de rappel lorsque l'objet est chargé
                const importedMesh = meshes[0]; // Le premier mesh importé (si tu as plusieurs meshes, tu peux les parcourir)
                importedMesh.position = new Vector3(0, 0, 0); // Positionne l'objet
                importedMesh.scaling = new Vector3(10, 10, 10);  // Augmentez l'échelle pour agrandir le personnage
                importedMesh.rotation = new Vector3(0, 0, 0); // Ajuste la rotation si nécessaire
                importedMesh.metadata = { frontVector: new Vector3(0, 0, 1) };
                this.animationGroup = animationGroups[0]; // Supposons qu'il y a une seule animation
                callback(importedMesh);
            }
        );
    }

    Moving(scene, player) {
        const inputMap: { [key: string]: boolean } = {};
        scene.actionManager = new ActionManager(scene);

        scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (evt) => {
            inputMap[evt.sourceEvent.key] = true;
        }));

        scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (evt) => {
            inputMap[evt.sourceEvent.key] = false;
        }));

        scene.registerBeforeRender(() => {
            const frontVector = player.metadata.frontVector;
            this.isMoving = false;

            if (inputMap["z"]) {
                player.moveWithCollisions(frontVector.multiplyByFloats(1, 1, 1));
                this.isMoving = true;
            }
            if (inputMap["s"]) {
                player.moveWithCollisions(frontVector.multiplyByFloats(-1, -1, -1));
                this.isMoving = true;
            }
            if (inputMap["q"]) {
                player.rotation.y -= 0.02;
                player.metadata.frontVector = new Vector3(Math.sin(player.rotation.y), 0, Math.cos(player.rotation.y));
                this.isMoving = true;
            }
            if (inputMap["d"]) {
                player.rotation.y += 0.02;
                player.metadata.frontVector = new Vector3(Math.sin(player.rotation.y), 0, Math.cos(player.rotation.y));
                this.isMoving = true;
            }

            if (this.isMoving) {
                if (this.animationGroup && !this.animationGroup.isPlaying) {
                    this.animationGroup.start(true);
                }
            } else {
                if (this.animationGroup && this.animationGroup.isPlaying) {
                    this.animationGroup.stop();
                }
            }
        });
    }
}