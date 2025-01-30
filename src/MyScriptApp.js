import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import * as iink from "iink-js";
import axios from "axios";

const MyScriptApp = () => {
  const [responseText, setResponseText] = useState("");
  const [capturedText, setCapturedText] = useState("");
  const editorRef = useRef(null);

  const editorStyle = {
    minWidth: "100px",
    minHeight: "100px",
    width: "75vw",
    height: "calc(100vh - 190px)",
    touchAction: "none",
    border: "1px solid lightgray",
    backgroundColor: "white",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    display: "block",
  };

  useEffect(() => {
    const editor = iink.register(editorRef.current, {
      recognitionParams: {
        type: "TEXT",
        protocol: "WEBSOCKET",
        apiVersion: "V4",
        server: {
          scheme: "https",
          host: "webdemoapi.myscript.com",
          applicationKey: "86b52209-107c-4887-a8ed-a12986edd7de",
          hmacKey: "be6f326e-f995-4aed-b784-e71da6d7492a",
        },
      },
    });

    const handleResize = () => editor.resize();
    window.addEventListener("resize", handleResize);

    const handleExported = (evt) => {
      const exports = evt.detail.exports;
      if (exports && exports["application/vnd.myscript.jiix"]) {
        const finalOutputText = exports["application/vnd.myscript.jiix"];
        const parsedOutput = JSON.parse(finalOutputText);
        setCapturedText(parsedOutput.label);
      }
    };

    const editorElement = document.getElementById("editor");
    editorElement.addEventListener("exported", handleExported);

    return () => {
      window.removeEventListener("resize", handleResize);
      editorElement.removeEventListener("exported", handleExported);
      editor.close();
    };
  }, []);

  const sendToOpenAI = async () => {
    if (capturedText) {
      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-4",
            max_tokens: 1000,
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              { role: "user", content: capturedText },
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
      }
    } else {
      console.log("No captured text to send.");
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>
        Hand written text integration with Open AI
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <div id="editor" style={editorStyle} ref={editorRef}></div>
        <div
          style={{
            width: "50%",
            marginLeft: "20px",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <div>
            <h3>Captured Text:</h3>
            <p>{capturedText}</p>
          </div>
          <button onClick={sendToOpenAI}>Send to OpenAI</button>
          <div>
            <h3>OpenAI Response:</h3>
            <p>{responseText}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyScriptApp; 

/* 
function MyScriptApp() {
    const editorRef = useRef(null);
    const editorStyle = {
      'minWidth': '100px',
      'minHeight': '100px',
      'width': '100vw',
      'height': 'calc(100vh - 190px)',
      'touchAction': 'none',
      'border': '1px solid #000',
    };
  
    useEffect(() => {
      let editor = editorRef.current;
      console.log(editor)
      editor = iink.register(editorRef.current, {
        recognitionParams: {
          type: 'TEXT',
          protocol: 'WEBSOCKET',
          apiVersion: 'V4',
          server: {
            scheme: 'https',
            host: 'webdemoapi.myscript.com',
            applicationKey: 'e185cbd1-8e0f-4ea2-a2a7-dd2991b66768',
            hmacKey: '0abe1d17-3fa5-45c0-bef8-9693cd4d8db5',
          },
        },
      });
      window.addEventListener('resize', () => { 
        editor.resize() 
      });
  
      return () => {
        window.removeEventListener('resize', () => { editor.resize() });
        editor.close();
      }
    }, []);
    console.log("editor1 ---->", editorRef)
    return (
      <div className="App">
        
          <h1 className="App-title">Welcome to Myscript</h1>
        
        <div style={editorStyle} ref={editorRef} touch-action="none">
        </div>
      </div>
    )
  }
 
  export default MyScriptApp; */