import React, { useState, useEffect } from "react";
import "./DotLoading.css";

const DotLoading = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500); // Adjust speed here

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <span className="dots">{dots}</span>
    </div>
  );
};

export default DotLoading;
