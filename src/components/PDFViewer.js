import { useEffect, useRef } from "react";
import {
  addSignatureFromCode,
  addSignatureFromDisk,
  addSignatureFromURL,
  signForm,
} from "../helperFunctions";
export default function PDFViewer({ document }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let PSPDFKit;

    (async function () {
      PSPDFKit = await import("pspdfkit");

      if (PSPDFKit) {
        PSPDFKit.unload(container);
      }

      const instance = await PSPDFKit.load({
        container,
        document: document,
        baseUrl: `${window.location.protocol}//${window.location.host}/`,
      });
      //addSignatureFromURL({ PSPDFKit, instance, top: 10, left: 10 });
      addSignatureFromCode({ PSPDFKit, instance });
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
}
