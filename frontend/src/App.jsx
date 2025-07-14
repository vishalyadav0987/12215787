import { useState } from 'react'
import './App.css'
import LinkShortPage from './Pages/LinkShortPage'

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      <div className="App" style={{
        width: '1280px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: '#f0f0f0',
        color: '#333',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',

      }}>
        <div style={{
          display: 'flex',
          width: '100%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}>
          <LinkShortPage />
        </div>
      </div>
    </>
  )
}

export default App
