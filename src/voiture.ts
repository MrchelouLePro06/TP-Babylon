import "@babylonjs/inspector";
import { Engine, Scene, ArcRotateCamera, SceneLoader,Vector3, HemisphericLight, Mesh, MeshBuilder ,StandardMaterial, Color3,ActionManager,ExecuteCodeAction, int} from "@babylonjs/core";
import { Camera } from "./camera";

export class Voiture{
    loadOBJ(scene, callback) {
        // Chemin vers le fichier OBJ et MTL
        const objPath = "models/";  // Dossier où se trouvent les fichiers OBJ et MTL
        const objFile = "car-coupe-violet.obj";  // Nom du fichier OBJ
        const mtlFile = "car-coupe-violet.mtl";  // Nom du fichier MTL (si disponible)
    
        // Importation de l'objet 3D
        SceneLoader.ImportMesh(
            "",        // Si tu veux importer tous les meshes, laisse vide
            objPath,   // Chemin vers le dossier des fichiers
            objFile,   // Nom du fichier OBJ
            scene,     // La scène où l'objet sera chargé
            (meshes) => {  // Fonction de rappel lorsque l'objet est chargé
                // Traitement des meshes (ex. positionnement, scaling, rotation, etc.)
                const importedMesh = meshes[0]; // Le premier mesh importé (si tu as plusieurs meshes, tu peux les parcourir)
                importedMesh.position = new Vector3(0, 0, 0); // Positionne l'objet
                importedMesh.scaling = new Vector3(10, 10, 10);  // Augmentez l'échelle pour agrandir la voiture
                importedMesh.rotation = new Vector3(0, 0, 0); // Ajuste la rotation si nécessaire
                importedMesh.metadata = { frontVector: new Vector3(0, 0, 1) };
                console.log("Objet 3D importé avec succès !");
                callback(importedMesh);
            }
        );
    }

    MovingVoiture(scene, voiture) {
        const inputMap: { [key: string]: boolean } = {};
        scene.actionManager = new ActionManager(scene);

        scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (evt) => {
            inputMap[evt.sourceEvent.key] = true;
        }));

        scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (evt) => {
            inputMap[evt.sourceEvent.key] = false;
        }));

        scene.registerBeforeRender(() => {
            const frontVector = voiture.metadata.frontVector;
            if (inputMap["z"]) {
                voiture.moveWithCollisions(frontVector.multiplyByFloats(2, 2, 2)); // Augmentez la vitesse
            }
            if (inputMap["s"]) {
                voiture.moveWithCollisions(frontVector.multiplyByFloats(-2, -2, -2)); // Augmentez la vitesse
            }
            if (inputMap["q"]) {
                voiture.rotation.y -= 0.04; // Augmentez la vitesse de rotation
                voiture.metadata.frontVector = new Vector3(Math.sin(voiture.rotation.y), 0, Math.cos(voiture.rotation.y));
            }
            if (inputMap["d"]) {
                voiture.rotation.y += 0.04; // Augmentez la vitesse de rotation
                voiture.metadata.frontVector = new Vector3(Math.sin(voiture.rotation.y), 0, Math.cos(voiture.rotation.y));
            }
        });
    }
}
