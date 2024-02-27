import './App.css'
import Home from './Components/Home'
import {BrowserRouter} from "react-router-dom"
import { ContextProvider } from './Context/ContextProvider'
function App() {


  return (
    <ContextProvider>
    <BrowserRouter>
      <Home/>
    </BrowserRouter>
    </ContextProvider>
  )
}

export default App
