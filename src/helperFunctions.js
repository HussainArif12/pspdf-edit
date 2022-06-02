import mySignature from "./Bill_Gates_signature.svg.png";
async function addSignatureFromURL({ PSPDFKit, instance, left, top }) {
  const signatureSource =
    "https://upload.wikimedia.org/wikipedia/commons/d/d4/Autograph_of_Benjamin_Franklin_%28from_Nordisk_familjebok%29.png";
  const request = await fetch(signatureSource);
  const blob = await request.blob();
  const imageAttachmentId = await instance.createAttachment(blob);
  const annotation = new PSPDFKit.Annotations.ImageAnnotation({
    pageIndex: 0,
    isSignature: true,
    contentType: "image/jpeg",
    imageAttachmentId,
    description: "Example Image Annotation",
    boundingBox: new PSPDFKit.Geometry.Rect({
      left,
      top,
      width: 150,
      height: 150,
    }),
  });
  instance.create(annotation);
  return instance;
}
async function addSignatureFromDisk({ PSPDFKit, instance }) {
  const request = await fetch(mySignature);
  const blob = await request.blob();
  const imageAttachmentId = await instance.createAttachment(blob);
  const annotation = new PSPDFKit.Annotations.ImageAnnotation({
    pageIndex: 0,
    isSignature: true,
    contentType: "image/jpeg",
    imageAttachmentId,
    description: "Example Image Annotation",
    boundingBox: new PSPDFKit.Geometry.Rect({
      left: 10,
      top: 20,
      width: 150,
      height: 150,
    }),
  });

  instance.create(annotation);
  return annotation;
}
async function signForm({ PSPDFKit, instance }) {
  const formFieldName = "Given Name Text Box";

  // First get all `FormFields` in the `Document`.
  const formFields = await instance.getFormFields();
  // Get a signature form with the specific name you want.
  const field = formFields.find((formField) => {
    return (
      formField.name === formFieldName &&
      formField instanceof PSPDFKit.FormFields.TextFormField
    );
  });
  // In this example, assume the widget you need is on the first page.
  //
  const annotations = await instance.getAnnotations(0);

  // Find that widget.

  const widget = annotations.find(
    (annotation) =>
      annotation instanceof PSPDFKit.Annotations.WidgetAnnotation &&
      annotation.formFieldName === field.name
  );

  // Make a new ink annotation.
  //

  const annotation = addSignatureFromURL({
    PSPDFKit,
    instance,
    left: widget.boundingBox.left,
    top: widget.boundingBox.top,
  });

  instance.create(annotation);
  return instance;
}
async function addSignatureFromCode({ PSPDFKit, instance }) {
  const annotation = new PSPDFKit.Annotations.InkAnnotation({
    pageIndex: 0,
    isSignature: true,
    lines: PSPDFKit.Immutable.List([
      PSPDFKit.Immutable.List([
        new PSPDFKit.Geometry.DrawingPoint({ x: 5, y: 5 }),
        new PSPDFKit.Geometry.DrawingPoint({ x: 95, y: 95 }),
      ]),
      PSPDFKit.Immutable.List([
        new PSPDFKit.Geometry.DrawingPoint({ x: 95, y: 5 }),
        new PSPDFKit.Geometry.DrawingPoint({ x: 5, y: 95 }),
      ]),
    ]),
    boundingBox: new PSPDFKit.Geometry.Rect({
      left: 0,
      top: 0,
      width: 100,
      height: 100,
    }),
  });

  instance.create(annotation);
}
export {
  addSignatureFromURL,
  addSignatureFromDisk,
  signForm,
  addSignatureFromCode,
};
