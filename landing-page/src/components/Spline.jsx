import React, { useEffect } from "react";

const SplineViewer = ({ url }) => {
  useEffect(() => {
    const existingViewer = document.querySelector("spline-viewer");

    if (!existingViewer) {
      const script = document.createElement("script");
      script.type = "module";
      script.src =
        "https://unpkg.com/@splinetool/viewer@1.9.27/build/spline-viewer.js";
      script.onload = () => {
        const viewer = document.createElement("spline-viewer");
        viewer.setAttribute("url", url);
        const splineElement = document
          .getElementById("spline-viewer-container")
          .appendChild(viewer);
        splineElement.style.width = "100%";
        splineElement.style.height = "100%";
      };

      document.body.appendChild(script);
    }

    return () => {
      const container = document.getElementById("spline-viewer-container");
      if (container) {
        container.innerHTML = ""; // Clear the container
      }
    };
  }, [url]);

  return (
    <div className="w-[30rem] h-[20rem]" id="spline-viewer-container"></div>
  );
};

export default SplineViewer;
