import { useState } from "react";
import "./App.css";
import { Form } from "./components/Form";
import { Modal } from "./components/Modal";
import axios from "axios";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedFileName, setGeneratedFileName] = useState<string | null>(
    null
  );

  const handleOpenModal = (fileName: string) => {
    setGeneratedFileName(fileName);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const downloadFile = async () => {
    if (!generatedFileName) return alert("First generate the CV!");

    try {
      console.log("📤 Downloading file:", generatedFileName);
      const response = await axios.get(
        `https://cv-generator-dgho.onrender.com/cv/${generatedFileName}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", generatedFileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <>
      <h1>CV Generator</h1>
      <Form onSubmitSuccess={handleOpenModal} />
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <div className="modal__upload-section">
            <h2>Your CV was created!</h2>
            <p>Click to download the document:</p>
            <button className="modal__download-btn" onClick={downloadFile}>
              Download .docx
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default App;
