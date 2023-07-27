import './style.css'
import ReactDOM from 'react-dom/client'
import { App as Canvas }  from './Canvas.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

console.log(Canvas);

root.render(
 
    <Canvas/>
   
)