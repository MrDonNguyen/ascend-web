const reportWebVitals = async (onPerfEntry) => {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    try {
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import("web-vitals");

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
    } catch (err) {
      console.error("❌ Failed to load Web Vitals module:", err);
    }
  }
};

export default reportWebVitals;
