import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import DotLoading from "./DotLoading";

const GoogleVision = () => {
  const webcamRef = useRef(null); // Reference to the webcam
  const [image, setImage] = useState(null); // Captured image
  const [handwrittenText, setHandwrittenText] = useState(""); // Extracted text
  const [loading, setLoading] = useState(false); // Loading state
  const [ailoading, setAILoading] = useState(false); // Loading state
  const [responseText, setResponseText] = useState("");

  // Function to capture the image
  const captureImage = () => {
    const capturedImage = webcamRef.current.getScreenshot(); // Capture image as Base64
    setImage(capturedImage);
  };

  // Function to process the captured image
  const processImage = async () => {
    if (!image) {
      alert("Please capture an image first!");
      return;
    }

    setLoading(true);

    // Remove Base64 headers from the image
    const base64Image = image.split(",")[1];

    const visionAPIKey = "AIzaSyBXN8BZhwNEV-cDD-SoG-_5MsrEGC-uacE"; // Replace with your API Key

    try {
      const response = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${visionAPIKey}`,
        {
          requests: [
            {
              image: {
                content: base64Image,
              },
              features: [
                {
                  type: "DOCUMENT_TEXT_DETECTION", // For handwritten text
                },
              ],
            },
          ],
        }
      );

      // Extract text from the Vision API response
      const detectedText =
        response.data.responses[0].fullTextAnnotation?.text ||
        "No text detected";
      setHandwrittenText(detectedText);
    } catch (error) {
      console.error("Error processing image:", error);
      alert("Failed to process the image. Check your API key or network.");
    } finally {
      setLoading(false);
    }
  };

  const sendToOpenAI = async () => {
    if (handwrittenText) {
      setAILoading(true);
      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-4",
            max_tokens: 1000,
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              { role: "user", content: handwrittenText },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_API_AI_KEY}`, // Replace with your OpenAI API Key
            },
          }
        );
        setResponseText(response.data.choices[0].message.content);
      } catch (error) {
        console.error("Error calling OpenAI API:", error);
        setResponseText("Sorry, there was an error processing your request.");
      } finally {
        setAILoading(false);
      }
    } else {
      console.log("No captured text to send.");
    }
  };

  return (
    <div className="container">
      {/* Left Column - Fixed */}
      <div className="left-column">
        {/* <h2>HM Guru!</h2>
        <p>Ask our Guru for anything!</p> */}
        {/* <p className="no-space">Capturing handwritten text from a camera and solve problems</p> */}

        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={400}
          className="webcam-container"
          // style={{ border: "1px solid black", marginBottom: "10px" }}
        />
        <div>
          {/* Button to Capture Image */}
          <button onClick={captureImage} style={{ marginRight: "10px" }}>
            Capture Image
          </button>

          {/* Button to Process Image */}
          <button
            onClick={processImage}
            disabled={loading}
            sx={{ background: "rgb(98, 91, 44" }}
          >
            {loading ? "Processing..." : "Extract Handwritten Text"}
          </button>
        </div>
      </div>
      
      {/* Right Column - Scrollable */}
      <div className="right-column">
        {/* Webcam View */}
        {/* <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={400}
          className="webcam-container"
          // style={{ border: "1px solid black", marginBottom: "10px" }}
        />
        <div>
          
          <button onClick={captureImage} style={{ marginRight: "10px" }}>
            Capture Image
          </button>

          <button
            onClick={processImage}
            disabled={loading}
            sx={{ background: "rgb(98, 91, 44" }}
          >
            {loading ? "Processing..." : "Extract Handwritten Text"}
          </button>
        </div> */}

        {/* Display Captured Image */}
        {image && (
          <div>
            {/* <h3>Captured Image:</h3> */}
            <img
              src={image}
              alt="Captured"
              className="webcam-container"
              style={{ maxWidth: "300px", marginTop: "10px" }}
            />
          </div>
        )}
    
       

      {/* Display Extracted Text */}
      {handwrittenText && (
        <div>
          {/* <div>
            <h3>Extracted Text:</h3>
            <textarea
              value={handwrittenText}
              rows="10"
              cols="50"
              onChange={(e) => {
                setHandwrittenText(e.target.value);
              }}
              style={{ width: "70%", marginTop: "10px" }}
            />
          </div> */}
           {/* border Textarea  */}
            <div class="textarea-container">
                <textarea className="custom-textarea" 
                value={handwrittenText}
                onChange={(e) => {
                  setHandwrittenText(e.target.value);
                }}
                />
                <div className={`icon-container ${handwrittenText ==='No text detected' ? "disabled" : "active"}`}  onClick={() => {
                sendToOpenAI();
              }}>
                    {/* SVG Arrow Icon */}
                    {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M12 5L19 12L12 19" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg> */}

                <svg width="32" height="30" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Arrows">
                <path id="Vector" d="M2.66663 4.53076V28.8271L29.3333 16.6789L2.66663 4.53076ZM5.33329 8.70669L22.8359 16.6789L5.33329 24.6511V18.3345L17.3333 16.6789L5.33329 15.0233V8.70669Z" fill="#F3F4F5"/>
                </g>
                </svg>

                </div>
            </div>
      {/* border Textarea  */}
          {/* <div>
          
            <button
            disabled = {handwrittenText ==='No text detected'}
              onClick={() => {
                sendToOpenAI();
              }}
            >
              Get Response
            </button>
          </div> */}
          {ailoading && <DotLoading />}
          { !ailoading && (<div class="textarea-container">
            {responseText && (
              <>
                {/* <h3>Our Response :</h3> */}
                <textarea
                  className="custom-textarea"
                  value={responseText}
                  disabled={true}
                  // rows="10"
                  // cols="50"
                  // style={{ width: "70%", marginTop: "10px" }}
                />
              </>
            )}
          </div>) }
        </div>
      )}
      </div>  
    </div>
  );
};

export default GoogleVision;