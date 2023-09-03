// // 1. Install dependencies DONE
// // 2. Import dependencies DONE
// // 3. Setup webcam and canvas DONE
// // 4. Define references to those DONE
// // 5. Load posenet DONE
// // 6. Detect function DONE
// // 7. Drawing utilities from tensorflow DONE
// // 8. Draw functions DONE

// // Face Mesh - https://github.com/tensorflow/tfjs-models/tree/master/facemesh

// import React, { useRef, useEffect, useState  } from "react";
// import "./App.css";
// import * as tf from "@tensorflow/tfjs";
// // OLD MODEL
// //import * as facemesh from "@tensorflow-models/facemesh";

// // NEW MODEL
// import * as facemesh from "@tensorflow-models/face-landmarks-detection";
// import Webcam from "react-webcam";
// import { drawMesh } from "./utilities";

// // Import your glasses image
// import glassesImage from "./glasses-img/sample.png";


// function App() {
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [glassesLoaded, setGlassesLoaded] = useState(false);
//   const glasses = new Image();

//   // Load the glasses image
//   useEffect(() => {
//     glasses.src = glassesImage;
//     glasses.onload = () => {
//       setGlassesLoaded(true);
//     };
//   }, []);

//   //  Load posenet
//   const runFacemesh = async () => {
//     const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
//     setInterval(() => {
//       detect(net);
//     }, 10);
//   };

//   // const detect = async (net) => {
//   //   if (
//   //     typeof webcamRef.current !== "undefined" &&
//   //     webcamRef.current !== null &&
//   //     webcamRef.current.video.readyState === 4
//   //   ) {
//   //     // Get Video Properties
//   //     const video = webcamRef.current.video;
//   //     const videoWidth = webcamRef.current.video.videoWidth;
//   //     const videoHeight = webcamRef.current.video.videoHeight;

//   //     // Set video width
//   //     webcamRef.current.video.width = videoWidth;
//   //     webcamRef.current.video.height = videoHeight;

//   //     // Set canvas width
//   //     canvasRef.current.width = videoWidth;
//   //     canvasRef.current.height = videoHeight;

//   //     // Make Detections
//   //     // OLD MODEL
//   //     //       const face = await net.estimateFaces(video);
//   //     // NEW MODEL
//   //     const face = await net.estimateFaces({input:video});
//   //     console.log(face);

//   //     // Get canvas context
//   //     const ctx = canvasRef.current.getContext("2d");
//   //     requestAnimationFrame(()=>{drawMesh(face, ctx)});
//   //   }
//   // };

//   const detect = async (net) => {
//     if (
//       typeof webcamRef.current !== "undefined" &&
//       webcamRef.current !== null &&
//       webcamRef.current.video.readyState === 4
//     ) {
//       const video = webcamRef.current.video;
//       const videoWidth = webcamRef.current.video.videoWidth;
//       const videoHeight = webcamRef.current.video.videoHeight;
//       webcamRef.current.video.width = videoWidth;
//       webcamRef.current.video.height = videoHeight;
//       canvasRef.current.width = videoWidth;
//       canvasRef.current.height = videoHeight;
//       const face = await net.estimateFaces({ input: video });
//       const ctx = canvasRef.current.getContext("2d");
//       requestAnimationFrame(() => {
//         drawMeshWithGlasses(face, ctx);
//       });
//     }
//   };

//   const drawMeshWithGlasses = (predictions, ctx) => {
//     if (predictions.length > 0) {
//       predictions.forEach((prediction) => {
//         const keypoints = prediction.scaledMesh;
//         const leftEyeIndices = [33, 246, 161, 160, 159, 158, 157, 173, 133, 155, 154, 153, 145];
//         const rightEyeIndices = [362, 398, 384, 385, 386, 387, 388, 466, 263, 249, 390, 373, 374];
//         const glassesWidth = 120; // Adjust the width as needed
//         const glassesHeight = 40; // Adjust the height as needed

//         if (glassesLoaded) {
//           // Draw glasses over the left eye keypoints
//           const [x, y] = keypoints[leftEyeIndices[0]]; // Use the first keypoint as the reference
//           ctx.drawImage(glasses, x - glassesWidth / 2, y - glassesHeight / 2, glassesWidth, glassesHeight);
//         }

//         // Draw circles around the eyes
//         for (let i = 0; i < leftEyeIndices.length; i++) {
//           const index = leftEyeIndices[i];
//           const [x, y] = keypoints[index];

//           ctx.beginPath();
//           ctx.arc(x, y, 2 /* radius */, 0, 2 * Math.PI);
//           ctx.fillStyle = "red"; // You can change the color
//           ctx.fill();
//         }

//         // Repeat the same process for the right eye
//         // ...

//       });
//     }
//   };

//   useEffect(() => {
//     runFacemesh();
//   }, []);


//   return (
//     // <div className="App">
//     //   <header className="App-header">
//     //     <Webcam
//     //       ref={webcamRef}
//     //       style={{
//     //         position: "absolute",
//     //         marginLeft: "auto",
//     //         marginRight: "auto",
//     //         left: 0,
//     //         right: 0,
//     //         textAlign: "center",
//     //         zindex: 9,
//     //         width: 640,
//     //         height: 480,
//     //       }}
//     //     />

//     //     <canvas
//     //       ref={canvasRef}
//     //       style={{
//     //         position: "absolute",
//     //         marginLeft: "auto",
//     //         marginRight: "auto",
//     //         left: 0,
//     //         right: 0,
//     //         textAlign: "center",
//     //         zindex: 9,
//     //         width: 640,
//     //         height: 480,
//     //       }}
//     //     />
//     //   </header>
//     // </div>
//     <div className="App">
//     <header className="App-header">
//       <Webcam
//         ref={webcamRef}
//         style={{
//           position: "absolute",
//           marginLeft: "auto",
//           marginRight: "auto",
//           left: 0,
//           right: 0,
//           textAlign: "center",
//           zIndex: 9,
//           width: 640,
//           height: 480,
//         }}
//       />

//       <canvas
//         ref={canvasRef}
//         style={{
//           position: "absolute",
//           marginLeft: "auto",
//           marginRight: "auto",
//           left: 0,
//           right: 0,
//           textAlign: "center",
//           zIndex: 9,
//           width: 640,
//           height: 480,
//         }}
//       />
//     </header>
//   </div>
//   );
// }

// export default App;

import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { drawMesh } from "./utilities";

// Import your glasses image
import glassesImage from "./glasses-img/sample.png";


function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [glassesLoaded, setGlassesLoaded] = useState(false);
  const glasses = new Image();
  const [faceDetected, setFaceDetected] = useState(true);

  // Load the glasses image
  useEffect(() => {
    glasses.src = glassesImage;
    glasses.onload = () => {
      setGlassesLoaded(true);
    };
  }, []);

  const referenceDistanceInPixels = 100; // Adjust this value based on your reference distance
  const knownReferenceDistanceInMillimeters = 50; // Adjust this value based on your known reference distance

  const calculateDistanceInMillimeters = (leftEar, rightEar) => {
    const distanceInPixels = Math.sqrt(
      Math.pow(leftEar[0] - rightEar[0], 2) + Math.pow(leftEar[1] - rightEar[1], 2)
    );

    const distanceInMillimeters = (distanceInPixels / referenceDistanceInPixels) * knownReferenceDistanceInMillimeters;

    return distanceInMillimeters;
  };

  const runFacemesh = async () => {
    const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      const face = await net.estimateFaces({ input: video });

      if (face.length > 0) {
        setFaceDetected(true);
        const ctx = canvasRef.current.getContext("2d");
        requestAnimationFrame(() => {
          drawMeshWithGlasses(face, ctx);
        });

        // Calculate the distance between ears
        const leftEar = face[0].scaledMesh[234]; // Adjust the index as needed
        const rightEar = face[0].scaledMesh[454]; // Adjust the index as needed

        const distanceInMillimeters = calculateDistanceInMillimeters(leftEar, rightEar);
        console.log(`Distance between ears: ${distanceInMillimeters.toFixed(2)} mm`);
      } else {
        setFaceDetected(false);
      }
    }
  };

  const drawMeshWithGlasses = (predictions, ctx) => {
    if (predictions.length > 0) {
      predictions.forEach((prediction) => {
        const keypoints = prediction.scaledMesh;
        const leftEyeIndices = [33, 246, 161, 160, 159, 158, 157, 173, 133, 155, 154, 153, 145];
        const rightEyeIndices = [362, 398, 384, 385, 386, 387, 388, 466, 263, 249, 390, 373, 374];
        const glassesWidth = 120; // Adjust the width as needed
        const glassesHeight = 40; // Adjust the height as needed

        if (glassesLoaded) {
          // Draw glasses over the left eye keypoints
          const [xLeft, yLeft] = keypoints[leftEyeIndices[0]]; // Use the first keypoint as the reference
          ctx.drawImage(glasses, xLeft - glassesWidth / 2, yLeft - glassesHeight / 2, glassesWidth, glassesHeight);

          // Draw glasses over the right eye keypoints
          const [xRight, yRight] = keypoints[rightEyeIndices[0]]; // Use the first keypoint as the reference
          ctx.drawImage(glasses, xRight - glassesWidth / 2, yRight - glassesHeight / 2, glassesWidth, glassesHeight);
        }

        // Draw circles around the eyes
        for (let i = 0; i < leftEyeIndices.length; i++) {
          const leftIndex = leftEyeIndices[i];
          const rightIndex = rightEyeIndices[i];
          const [leftX, leftY] = keypoints[leftIndex];
          const [rightX, rightY] = keypoints[rightIndex];

          ctx.beginPath();
          ctx.arc(leftX, leftY, 2 /* radius */, 0, 2 * Math.PI);
          ctx.fillStyle = "red"; // You can change the color
          ctx.fill();

          ctx.beginPath();
          ctx.arc(rightX, rightY, 2 /* radius */, 0, 2 * Math.PI);
          ctx.fillStyle = "red"; // You can change the color
          ctx.fill();
        }
      });
    }
  };

  useEffect(() => {
    runFacemesh();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />

        {faceDetected ? (
          <div className="face-detected">Face Detected</div>
        ) : (
          <div className="face-not-detected">Face Not Detected</div>
        )}
      </header>
    </div>
  );
}

export default App;