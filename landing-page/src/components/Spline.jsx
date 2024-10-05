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
        viewer.setAttribute("loading-anim-type", "spinner-big-dark")
        viewer.style.width = "100%"
        viewer.style.height = "100%"
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
    <div className="w-full h-[60rem] lg:h-[25rem]" id="spline-viewer-container"></div>
  );
};

export default SplineViewer;
