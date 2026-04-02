"use client";

import { useEffect, useRef } from "react";

export default function AdBanner() {
  const adRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;
    scriptLoaded.current = true;

    const script = document.createElement("script");
    script.src = "https://t1.daumcdn.net/kas/static/ba.min.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);
  }, []);

  return (
    <div ref={adRef} style={{ display: "flex", justifyContent: "center", width: "100%", paddingTop: "2rem" }}>
      <ins
        className="kakao_ad_area"
        style={{ display: "none", margin: "0 auto" }}
        data-ad-unit="DAN-fXhpWzbN01UXBhD4"
        data-ad-width="320"
        data-ad-height="100"
      />
    </div>
  );
}
