import { useAnimations } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const actionNames = ['The Life']

const Fantasy = () => {
  const model = useLoader(GLTFLoader, '/Fantasy.gltf')

  const [active, setActive] = useState(false);
  const myMesh = useRef();

  const animations = useAnimations(model.animations, model.scene);



  // useFrame(() => {
  //   actionNames.forEach((actionNames) => {
  //     const action = animations.actions[actionNames]
  //     action.play()
  //   })
  // })


  useFrame(() => {
    if (active) {
      actionNames.forEach((actionName) => {
        const action = animations.actions[actionName];
        action.play();
      });
    }
    else {
      actionNames.forEach((actionName) => {
        const action = animations.actions[actionName];
        action.stop(); // Stop the animation when not active
      });
    }
  });

  const handleClick = () => {
    console.log(active);
    setActive((prevActive) => !prevActive);
  };


  return (
    // <mesh  onClick={() => setActive(handleClick)} ref={myMesh}>
    <mesh  onClick={() => setActive(handleClick)} ref={myMesh}>
      <primitive object={model.scene} />
    </mesh>
  )
}

export default Fantasy
