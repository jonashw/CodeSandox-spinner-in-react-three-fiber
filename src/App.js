import React from "react";
import { Canvas } from "react-three-fiber";
import { Globals } from "@react-spring/three";
import useKeyToggle from "./use-key-toggle";

import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import CodeSandBoxCube from "./CodeSandboxCube";

Globals.assign({
  frameLoop: "always"
});

export default function App() {
  let wireframe = useKeyToggle("w", false);
  let filled = useKeyToggle("f", true);
  return (
    <div>
      <Canvas
        style={{
          height: "100vh",
          width: "100vw",
          background: "#151515"
        }}
      >
        <CodeSandBoxCube {...{ wireframe, filled }} />
        <ambientLight />

        <OrthographicCamera
          makeDefault
          zoom={150}
          position={[1, 1, 1]}
          rotation={[Math.PI / 4]}
        />

        <OrbitControls enabled={false} />
      </Canvas>
    </div>
  );
}
