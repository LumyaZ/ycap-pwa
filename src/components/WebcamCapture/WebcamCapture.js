import React from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = React.forwardRef((props, ref) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Webcam
        audio={false}
        ref={ref}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: "environment" }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
});

export default WebcamCapture;
