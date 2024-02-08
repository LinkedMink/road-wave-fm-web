const reportWebVitals = (): void => {
  void import("web-vitals").then(({ onCLS, onFID, onFCP, onINP, onLCP, onTTFB }) => {
    onCLS(console.log);
    onFID(console.log);
    onFCP(console.log);
    onINP(console.log);
    onLCP(console.log);
    onTTFB(console.log);
  });
};

export default reportWebVitals;
