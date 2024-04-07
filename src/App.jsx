import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, useScroll } from "@react-three/drei";
import { getProject, val } from "@theatre/core";
import {
  SheetProvider,
  PerspectiveCamera,
  useCurrentSheet,
} from "@theatre/r3f";
import Fantasy from "../src/Model/Fantasy";
import CameraAdjust from "./Helper/CameraAdjust";

import flyState from './fly.json';

function App() {
  const sheet = getProject("Fly Through", { state: flyState }).sheet("Scene");

  return (
    <>
      <div>
        {/* Rest of your website content */}
        <h1>Your Website Title</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quasi ex eum, odit assumenda consequatur eos pariatur vero deleniti in tempore eligendi voluptatibus praesentium, perspiciatis doloribus cumque incidunt. Officiis blanditiis possimus iste corrupti est numquam necessitatibus quaerat earum nihil libero quis, ab reiciendis aliquid modi labore repellat repudiandae eius natus ex provident sint esse consequuntur! Illo, numquam corrupti! Architecto laborum, repellendus dicta veniam alias repudiandae aliquam iusto quas illum. Placeat, iusto consequatur distinctio explicabo amet, odio sit consectetur laudantium blanditiis veniam id, quia omnis voluptates ipsam beatae mollitia ut suscipit consequuntur eum eligendi! Sunt ducimus ipsam adipisci! Natus excepturi esse, quisquam, molestiae nemo exercitationem veniam distinctio voluptatem reiciendis dolores maxime, praesentium autem veritatis et corrupti! Neque beatae odit, iure rem nobis tempora praesentium porro totam? Repudiandae blanditiis voluptatum excepturi distinctio. Excepturi, cum officia! Et voluptatum sit possimus repellat dolor nemo, hic doloribus, quae totam, adipisci quasi? Repellat, nesciunt dolores! Praesentium unde obcaecati deserunt architecto reprehenderit doloremque. Nostrum, aperiam tenetur! Animi voluptas officiis dolores odit distinctio cupiditate velit a, laborum blanditiis perferendis porro nulla nemo. Culpa voluptate adipisci quidem sapiente ut quam dolorum dolor molestiae ipsa, rem laborum harum tenetur ab aliquid dignissimos alias expedita fugit molestias numquam fugiat explicabo. Ducimus fuga ut id a tenetur enim? .</p>
      </div>
      <Canvas className="main-canvas" gl={{ preserveDrawingBuffer: true }}>
        <CameraAdjust event="mousedown" />
        <ScrollControls pages={5} dumping={1} maxSpeed={1}>
          <SheetProvider sheet={sheet}>
            <Scene />
          </SheetProvider>
        </ScrollControls>
      </Canvas>
    </>
  );
}

export default App;

function Scene() {
  const sheet = useCurrentSheet();
  const scroll = useScroll();

  useFrame(() => {
    const sequenceLength = val(sheet.sequence.pointer.length);
    sheet.sequence.position = scroll.offset * sequenceLength;
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <Fantasy />
      <PerspectiveCamera
        theatreKey="camera"
        makeDefault
        position={[0, 0, 0]}
        fov={90}
        near={0.1}
        far={70}
      />
    </>
  );
}
