const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    import("web-vitals")
      .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        if (process.env.NODE_ENV === "development") {
          console.groupCollapsed("🚀 Web Vitals Performance Metrics");
        }

        getCLS(onPerfEntry);  // Measures Cumulative Layout Shift
        getFID(onPerfEntry);  // Measures First Input Delay
        getFCP(onPerfEntry);  // Measures First Contentful Paint
        getLCP(onPerfEntry);  // Measures Largest Contentful Paint
        getTTFB(onPerfEntry); // Measures Time to First Byte

        if (process.env.NODE_ENV === "development") {
          console.groupEnd();
        }
      })
      .catch((err) => {
        console.error("❌ Error loading Web Vitals:", err);
      });
  }
};

export default reportWebVitals;
