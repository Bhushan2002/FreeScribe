import { useState } from "react"
import HeaderPage from "./components/HeaderPage"
import Header from "./components/HeaderPage"
import HomePage from "./components/HomePage"
import FileDisplay from "./components/FileDisplay";


function App() {


  const [file, setFile] = useState(null);
  const [audioStream,setAudioStream] = useState(null);
  const isAudioAvailable = file || audioStream

  function handleAudioReset(){
    setFile(null)
    setAudioStream(null)
  }


  return (
    <div className="flex flex-col max-w-[1000px] mx-auto w-full">
      <section className="min-h-screen flex flex-col" >
        <HeaderPage/>
        { isAudioAvailable ? (<FileDisplay file={file} audioStream={setAudioStream}/>):(<HomePage setFile={setFile} setAudioStream={setAudioStream}/>)}
        <footer>

        </footer>
      </section>
      <h1 className="text-green-400">hello</h1>

    </div>
  )
}

export default App
