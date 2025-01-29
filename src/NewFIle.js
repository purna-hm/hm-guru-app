<div style={{ padding: "20px", textAlign: "center", display:'flex', flexDirection:'row', gap:'60px',     margin: "auto",
      justifyContent: 'center', background:'rgb(237, 230, 226)' }}>
     
      <div style={{display:'flex', flexDirection:'column'}}>

  
      {/* Webcam View */}
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={500}
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

      
     </div>
      {/* Display Extracted Text */}
      {handwrittenText && (
        <div>
          <h3>Extracted Text:</h3>
          <textarea
            value={handwrittenText}
            rows="10"
            cols="50"
            readOnly
            style={{ width: "100%", marginTop: "10px" }}
          />
        </div>
      )}

    </div>