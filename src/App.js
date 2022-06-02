import "./App.css";
import PDFViewer from "./components/PDFViewer";

function App() {
  return (
    <div className="App">
      <PDFViewer document={"OoPdfFormExample.pdf"} />
    </div>
  );
}

export default App;
