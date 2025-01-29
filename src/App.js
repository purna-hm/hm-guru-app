import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import MyScriptApp from "./MyScriptApp"
import GoogleVision from "./GoogleVision"
import NoPage from './NoPage';
import OpenCV from './OpenCV';
// import TwoColumnLayout from './TwoColumnLayout';
function App() {
  return (
    <div className="App">
      <p>Ask HMGuru, Our AI Tutor Anything!</p>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<OpenCV />} />
          <Route path="myscript" element={<MyScriptApp />} />
          <Route path="googlevision" element={<GoogleVision />} />
          <Route path="opencv" element={<OpenCV />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
