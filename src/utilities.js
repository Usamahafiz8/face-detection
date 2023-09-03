// // Drawing Mesh
// export const drawMesh = (predictions, ctx) => {
//   if (predictions.length > 0) {
//     predictions.forEach((prediction) => {
//       const keypoints = prediction.scaledMesh;


//       // Draw Dots
//       for (let i = 0; i < keypoints.length; i++) {
//         const x = keypoints[i][0];
//         const y = keypoints[i][1];

//         ctx.beginPath();
//         ctx.arc(x, y, 1 /* radius */, 0, 3 * Math.PI);
//         ctx.fillStyle = "aqua";
//         ctx.fill();
//       }
//     });
//   }
// };

// Modify the drawMesh function to draw circles around the eyes
export const drawMesh = (predictions, ctx) => {
  if (predictions.length > 0) {
    predictions.forEach((prediction) => {
      const keypoints = prediction.scaledMesh;

      // Define indices for the left and right eyes in the keypoints array
      const leftEyeIndices = [33, 246, 161, 160, 159, 158, 157, 173, 133, 155, 154, 153, 145];
      const rightEyeIndices = [362, 398, 384, 385, 386, 387, 388, 466, 263, 249, 390, 373, 374];

      // Draw circles around the left eye keypoints
      for (let i = 0; i < leftEyeIndices.length; i++) {
        const index = leftEyeIndices[i];
        const [x, y] = keypoints[index];

        ctx.beginPath();
        ctx.arc(x, y, 2 /* radius */, 0, 2 * Math.PI);
        ctx.fillStyle = "red"; // You can change the color
        ctx.fill();
      }

      // Draw circles around the right eye keypoints
      for (let i = 0; i < rightEyeIndices.length; i++) {
        const index = rightEyeIndices[i];
        const [x, y] = keypoints[index];

        ctx.beginPath();
        ctx.arc(x, y, 2 /* radius */, 0, 2 * Math.PI);
        ctx.fillStyle = "red"; // You can change the color
        ctx.fill();
      }
    });
  }
};
