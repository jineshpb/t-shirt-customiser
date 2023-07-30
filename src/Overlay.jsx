import { Logo } from "@pmndrs/branding"
import { AiOutlineHighlight, AiOutlineShopping, AiFillCamera, AiOutlineArrowLeft } from 'react-icons/ai'
import { useSnapshot } from "valtio"
import { state } from "./Store"


export default function Overlay(){
    const snap = useSnapshot(state)


    return (    
        <div className="container">
             {/* just returning the page header now  */}
            <header>
                <Logo width='40' height='40' />
                <AiOutlineShopping size='3em' />
            </header>


            {/* checking the state of the intro */}
            { snap.intro ? <Intro /> : <Customizer />}

        </div>
    )
}

function Intro(){
    return (
        <div className="container">
           
            <section>
                <div className="section--container">
                    <div>
                        <h1>Lets do this</h1>
                    </div>
                </div>
                <div className="support--container">
                    <div className="support--content">
                        <p>
                            Create your unique and exclusive shirt with our brand-new 3D
                            customization tool. <strong>Unleash your imagination</strong>{' '}
                            and define your own style.
                        </p>
                        <button 
                            // setting intro to false
                            onClick={() => {
                                state.intro = false
                            }}
                        >
                            CUSTOMISE IT <AiOutlineHighlight size="1.3em"/>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}


function Customizer(){
    const snap = useSnapshot(state)
    const colors = [ '#cccccc', '#efbd4e', '#80c670', '#726de8', '#ef674e', '#353934' ]

    const decals = ['blender', 'pmndrs', 'pixel-pusher', 'rectangle-maker','gypsy-vanguard', 'framer', 'figma', 'year']

    return (
        <section key="custom">
            <div className="customizer">
                <div className="color-options">
                    {colors.map((color) => (
                        <div
                            key={color}
                            className="circle"
                            style={{ background: color }}
                            onClick={() => {
                                state.selectedColor = color
                            }}
                        >
                           
                        </div>
                    ))}
                </div>

                <div className="decals">
                    <div className="decals--container">
                        {decals.map((decal) => (
                            <div 
                                key={decal} 
                                className="decal"
                                onClick={()=> state.selectedDecal = decal }>
                                <img src={`./decals/${decal}.png`} alt="brand" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <button className="share" style={ {background: snap.selectedColor }}>
                DOWNLOAD
                <AiFillCamera size="1.3em"/>
            </button>
            <button 
                className="exit" 
                style={ {background: 'black'}}
                onClick={() => {
                    state.intro = true
                }} 
            >
                GO BACK
                <AiOutlineArrowLeft size="1.3em"/>
            </button>
        </section>
    )
}