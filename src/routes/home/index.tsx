import './index.css'

// react-beautiful-dnd
// ant
import Left from './left'
import Center from './center'
import Right from './right'


function App() {
  const handleWheel = (ev: any) => {
    console.log('ev', ev)
  }
  return (
    <div className="p-home" onWheel={ handleWheel }>
      <Left/>
      <Center/>
      <Right/>
    </div>
  )
}

export default App
