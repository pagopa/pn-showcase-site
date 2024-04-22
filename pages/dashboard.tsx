import React, { useLayoutEffect } from "react";
import PageHead from "src/components/PageHead";

export default function Home() {
  const resizeIFrameToFitContent = (iFrame: HTMLElement, timeout?: number) => {
    setTimeout(() => {
      // @ts-ignore
      // Resize adding a 80px margin to avoid awkward 1-pixel scrollbars on resize.
      // A better solution would be to have the body inside the iFrame have overflow-y: hidden, but that's out of our control.
      iFrame.height = iFrame.contentDocument.body.scrollHeight + 80;
    }, timeout ?? 0);
  };

  useLayoutEffect(() => {
    const iFrame = document.getElementById("idIframe");
    if (iFrame === null) return;

    window.addEventListener("resize", () => resizeIFrameToFitContent(iFrame));

    resizeIFrameToFitContent(iFrame); // For Chrome-based browsers, since the iFrame's onLoad function doesn't trigger for them

    // or, to resize all iframes:
    // const iFrames = document.querySelectorAll("iframe");
    // for( let i = 0; i < iFrames.length; i++) {
    //     resizeIFrameToFitContent( iFrames[i] );
    // }
  }, []);

  return (
    <>
      <PageHead title="dashboard" description="dashboard" />
      <iframe
        id="idIframe"
        src="/dashboardContent"
        onLoad={(e) => resizeIFrameToFitContent(e.currentTarget, 500)} // Resizing onLoad, added timeout for Firefox
        className="flexIframe"
      />
    </>
  );
}
  