import { useEffect, useRef, useState } from "react";
import HeaderPage from "./components/HeaderPage";
import Header from "./components/HeaderPage";
import HomePage from "./components/HomePage";
import FileDisplay from "./components/FileDisplay";
import Information from "./components/Information";
import Transcribing from "./components/Transcribing";
import { MessageTypes } from "./utils/persets";

function App() {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const isAudioAvailable = file || audioStream;
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false)
  const [downloading, setDownloading] = useState(false)



  function handleAudioReset() {
    setFile(null);
    setAudioStream(null);
  }
  const worker = useRef(null)
  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('./utils/whisper.worker.js', import.meta.url), {
        type: 'module'
      })
    }
    const onMessageReceived = async (e) => {
      switch (e.data.type) {
        case 'DOWNLOADING':
          setDownloading(true)
          console.log("downloading")
          break;
        case 'LOADING':
          setLoading(true)
          console.log("loading")
          break;
        case 'RESULT':
          setOutput(e.data.results)
          break;
        case 'INFERENCE_DONE':
          setFinished(true)
          console.log("done")
      }
    }
    worker.current.addEventListener('message', onMessageReceived)

    return () => {
      worker.current.removeEventListener('message', onMessageReceived)
    }
    
  }, [])
  async function readAudioFrom(file) {
    const sample_rate = 16000
    const audioCtx= new AudioContext({sampleRate: sample_rate})
    const response = await file.arrayBuffer()
    const decoded = await audioCtx.decodeAudioData(response)
    const audio = decoded.getChannelData(0)
    return audio    
  }
  async function handleFromSubmission(params) {
    if(!file || !audioStream){
      return 
    }
    let audio = await readAudioFrom(file ? file : audioStream)
    const model_name = `openai/whisper-tiny.en`
    worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      // audio:,
      // model_name: 
    })
  }

  useEffect(() => {
    console.log(audioStream);
  });

  return (
    <div className="flex flex-col  max-w-[1000px] mx-auto w-full">
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
