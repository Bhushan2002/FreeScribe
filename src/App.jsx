import { useEffect, useState } from "react";
import HeaderPage from "./components/HeaderPage";
import Header from "./components/HeaderPage";
import HomePage from "./components/HomePage";
import FileDisplay from "./components/FileDisplay";
import Information from "./components/Information";
import Transcribing from "./components/Transcribing";

function App() {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const isAudioAvailable = file || audioStream;
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(true);

  function handleAudioReset() {
    setFile(null);
    setAudioStream(null);
  }
  
  useEffect(() => {
    console.log(audioStream);
  });

  return (
    <div className="flex flex-col max-w-[1000px] mx-auto w-full">
      <section className="min-h-screen flex flex-col">
        <HeaderPage />
        {output ? (
          <Information />
        ) : loading ? (
          <Transcribing />
        ) : isAudioAvailable ? (
          <FileDisplay
            handleAudioReset={handleAudioReset}
            file={file}
            audioStream={audioStream}
          />
        ) : (
          <HomePage setFile={setFile} setAudioStream={setAudioStream} />
        )}
        
        <footer></footer>
      </section>
      <h1 className="text-green-400">hello</h1>
    </div>
  );
}

export default App;
