<div className="container">
      {/* Left Column - Fixed */}
      <div className="left-column">
        <h2>HM Guru!</h2>
        <p>Ask our Guru for anything!</p>
      </div>

      {/* Right Column - Scrollable */}
      <div className="right-column">
        <h2>Capture Image from Camera</h2>
        <p>Please try to make capture properly!.</p>
         {/* Webcam View */}
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={300}
        style={{ border: "1px solid black", marginBottom: "10px" }}
      />

      <div>
        {/* Button to Capture Image */}
        <button onClick={captureImage} style={{ marginRight: "10px" }}>
          Capture Image
        </button>

        {/* Button to Process Image */}
        <button onClick={processImage} disabled={loading} sx={{background:'rgb(98, 91, 44'}}>
          {loading ? "Processing..." : "Extract Handwritten Text"}
        </button>
      </div>

      {/* Display Captured Image */}
      {image && (
        <div>
          <h3>Captured Image:</h3>
          <img
            src={image}
            alt="Captured"
            style={{ maxWidth: "300px", marginTop: "10px" }}
          />
        </div>
      )}

      {handwrittenText && (
        <div>
          <h3>Extracted Text:</h3>
          <textarea
            value={handwrittenText}
            rows="10"
            cols="50"
            readOnly
            style={{ width: "60%", marginTop: "10px" }}
          />
        </div>
      )}
      </div>
    </div>