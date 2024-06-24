import React, { useRef, useEffect } from 'react';

const WebcamCapture = React.forwardRef((props, ref) => {
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => {
        console.error("Error accessing webcam: ", err);
      });
  }, []);

  return (
    <div className="webcam-container">
      <video ref={videoRef} autoPlay style={{ width: '100%' }} />
    </div>
  );
});

export default WebcamCapture;
