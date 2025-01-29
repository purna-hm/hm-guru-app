import React from "react";

const TwoColumnLayout = () => {
  return (
    <div className="container">
      {/* Left Column - Fixed */}
      <div className="left-column">
        <h2>HM Guru!</h2>
        <p>This column remains fixed.</p>
      </div>

      {/* Right Column - Scrollable */}
      <div className="right-column">
        <h2>Right Column</h2>
        <p>This column has a scrollable content area.</p>
        <div className="content">
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i}>Scrollable content line {i + 1}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TwoColumnLayout;
