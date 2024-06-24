import React, { useRef, useEffect } from 'react';

const WebcamCapture = React.forwardRef((props, ref) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const constraints = {
      video: {
        facingMode: 'environment'
      }
    };

    navigator.mediaDevices.getUserMedia(constraints)
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
      <video ref={videoRef} autoPlay style={{ width: '100%', position: 'absolute', top: 0, left: 0 }} />
    </div>
  );
});

export default WebcamCapture;
