import './App.css'
import Footer from './components/Footer'
import Manager from './components/Manager'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  
  return (
    <>
      <Navbar />
      <div>
        <Manager />
        <ToastContainer />
      </div>
      <Footer />
    </>
  )
}

export default App
