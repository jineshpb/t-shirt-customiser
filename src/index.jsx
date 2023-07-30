import './style.css'
import ReactDOM from 'react-dom/client'
import { App as Canvas }  from './Canvas.jsx'
import Overlay from './Overlay.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))



root.render(
 <>
    <Canvas/>
    <Overlay/>
 </>
)