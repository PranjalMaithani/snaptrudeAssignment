import React from "react";
import {
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Texture,
  Vector4,
} from "@babylonjs/core";
import SceneComponent from "babylonjs-hook"; // if you install 'babylonjs-hook' NPM.

let box;

const onSceneReady = (scene, texturePath) => {
  // This creates and positions a free camera (non-mesh)
  var camera = new ArcRotateCamera(
    "camera1",
    0,
    0,
    0,
    new Vector3(0, 0, -10),
    scene
  );
  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  //flipping texture on the backside of the mesh
  let faceUV = new Array(6);
  faceUV.fill(new Vector4(0, 0, 1, 1));
  faceUV[0] = new Vector4(0, 0, -1, -1);

  box = MeshBuilder.CreateBox(
    "box",
    { width: 5, height: 3, faceUV: faceUV },
    scene
  );
  var mapMaterial = new StandardMaterial("mapMaterial", scene);
  mapMaterial.diffuseTexture = new Texture(`${texturePath}`, scene);
  box.material = mapMaterial;

  box.position.y = 2;

  // Our built-in 'ground' shape.
  MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene) => {
  if (box !== undefined) {
    var deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;
    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
};

const RenderScene = ({ texturePath }) => (
  <div>
    <SceneComponent
      antialias
      onSceneReady={(scene) => {
        onSceneReady(scene, texturePath);
      }}
      onRender={onRender}
      id="my-canvas"
      style={{ width: 900, height: 600 }}
    />
  </div>
);

export default RenderScene;
