// import React, { useRef } from 'react';

// const VideoCapture = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   const handleCapture = () => {
//     const videoElement = videoRef.current;
//     const canvasElement = canvasRef.current;
//     const canvasContext = canvasElement.getContext('2d');
    
//     // Draw video frame onto canvas
//     canvasContext.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight);
    
//     // Get the data URL of the canvas (captured image)
//     const dataUrl = canvasElement.toDataURL('image/png');
    
//     // Do something with the captured image dataUrl, e.g. save to state, send to server, etc.
//     console.log('Captured image data URL:', dataUrl);
//   };

//   const handleStartCamera = () => {
//     navigator.mediaDevices.getUserMedia({ video: true })
//       .then(stream => {
//         // Set the video element's srcObject to the media stream
//         videoRef.current.srcObject = stream;
//       })
//       .catch(error => {
//         console.error('Error accessing camera:', error);
//       });
//   };

//   return (
//     <div>
//       <button onClick={handleStartCamera}>Start Camera</button>
//       <video ref={videoRef} width="640" height="480" autoPlay playsInline muted />
//       <canvas ref={canvasRef} style={{ display: 'none' }} />
//       <button onClick={handleCapture}>Capture</button>
//     </div>
//   );
// };

// export default VideoCapture;
