import React, { useEffect } from "react";
import useEventListener from "@use-it/event-listener";
import { useSpring, a } from "@react-spring/three";
import {
  Shape,
  ShapeBufferGeometry,
  DoubleSide,
  PlaneBufferGeometry
} from "three";

const CodeSandBoxCube = ({ wireframe, filled }) => {
  const [rotating, setRotating] = React.useState(0);
  useEventListener("keypress", (e) => {
    if (e.key === "r") {
      setRotating(Number(!rotating));
    }
  });
  useEffect(() => {
    setRotating(1);
  }, []);
  const rotationSpring = useSpring({
    n: rotating,

    onRest: () => {
      setMoving(Number(!moving));
    },
    config: {
      mass: 1,
      tension: 50,
      friction: 17
    }
  });
  const r = rotationSpring.n.to([0, 1], [0, Math.PI * 2]);
  const [moving, setMoving] = React.useState(0);
  useEventListener("keypress", (e) => {
    if (e.key === "a") {
      setMoving(Number(!moving));
    }
  });
  const positionSpring = useSpring({
    n: moving,
    onRest: () => {
      if (moving) {
        setMoving(Number(!moving));
      } else {
        setRotating(Number(!rotating));
      }
    },
    config: {
      mass: 1,
      friction: 33
    }
  });

  const d = positionSpring.n.to([0, 1], [0.5, 1]);

  return (
    <>
      <a.group rotation-x={0} rotation-y={r}>
        {[
          [0, 0, 0],
          [-Math.PI / 2, -Math.PI / 2, Math.PI / 2]
        ].map((r) => (
          <group rotation={r}>
            {[
              {
                r: [Math.PI / 2, 0, 0],
                x: 0,
                y: d,
                z: 0
              },
              {
                r: [Math.PI, 0, 0],
                x: 0,
                y: 0,
                z: d
              },
              {
                r: [Math.PI / 2, Math.PI / 2, 0],
                x: d,
                y: 0,
                z: 0
              }
            ].map((props) => (
              <AnimatedSquare {...props} {...{ filled, wireframe }} />
            ))}
          </group>
        ))}
      </a.group>
    </>
  );
};

const Square = ({ r, x, y, z, filled, wireframe }) => {
  const geo = React.useMemo(() => {
    let x = -0.5;
    let y = -0.5;
    let width = 1;
    let height = 1;
    let radius = 0.1;

    let shape = new Shape();
    shape.moveTo(x, y + radius);
    shape.lineTo(x, y + height - radius);
    shape.quadraticCurveTo(x, y + height, x + radius, y + height);
    shape.lineTo(x + width - radius, y + height);
    shape.quadraticCurveTo(
      x + width,
      y + height,
      x + width,
      y + height - radius
    );
    shape.lineTo(x + width, y + radius);
    shape.quadraticCurveTo(x + width, y, x + width - radius, y);
    shape.lineTo(x + radius, y);
    shape.quadraticCurveTo(x, y, x, y + radius);

    return new ShapeBufferGeometry(shape);
  }, []);

  return (
    <group position={[x, y, z]} rotation={r} scale={[1, 1, 1]} color={0xffffff}>
      <lineSegments>
        <edgesGeometry args={[geo]} />

        <lineBasicMaterial color="white" linewidth={40} />
      </lineSegments>
      {filled && (
        <mesh>
          <planeBufferGeometry />
          <meshBasicMaterial
            opacity={0.125}
            transparent
            wireframe={wireframe}
            color={wireframe ? 0xffffff : 0xffffff}
            side={DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
};

const AnimatedSquare = a(Square);

export default CodeSandBoxCube;
