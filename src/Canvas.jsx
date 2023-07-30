import {  Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Center, useGLTF, Environment, AccumulativeShadows, RandomizedLight, Decal, useTexture } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { easing } from 'maath'

import { useSnapshot } from "valtio"
import { state } from "./Store"

import { useControls } from 'leva'

console.log('decals'+ Decal);



export const App = ({ position= [-1, 0, 2.5], fov= 25}) => (
    <Canvas
        shadows
        camera={{ position, fov }}
        eventSource={ document.getElementById('root')}
        eventPrefix='client'
    >
        <OrbitControls/>
    <ambientLight intensity={ 0.5 } />
    <Environment preset="city" />

    
        <CamerRig>
            <Backdrop/>
            <Center>
                <Shirt/>
            </Center>
        </CamerRig>
    </Canvas>
)



function Shirt(props) {
    const snap = useSnapshot(state)
    const texture = useTexture(`./decals/${snap.selectedDecal}.png`)
    
    const { nodes, materials } = useGLTF("/t-shirt-orange-sleeves.glb");
    console.log(nodes);
    // const { nodes, materials } = useGLTF("/shirt_baked.glb");
   

    const { ex, why, ezed } =   useControls({ 
        ex: {value:-0.40, step:0.05}, 
        why: {value:0.10, step:0.05}, 
        ezed: {value:-0.45, step:0.05} })

   

    useFrame((state, delta) => {
        easing.dampC(materials.FABRIC_5_FRONT_2402.color, snap.selectedColor, 0.25, delta)
    })


    
    return (
       
        <mesh 
            castShadow
            receiveShadow
        >
            <Decal

            debug
            position={[ex, why, ezed]}
            rotation={[-Math.PI,0,  0]}
            scale={0.3}
            opacity={0.1}
            map={texture}
            // map-anisotropy={16}
            />
            <boxGeometry args={[.5, .5, .5]} />
            <meshStandardMaterial color={ snap.selectedColor } />
        </mesh>

      
        // <mesh
        //   castShadow
        //   receiveShadow
        //   geometry={nodes.T_Shirt_male.geometry}
        //   material={materials.lambert1}
        //   position={[0.419, 0, 0]}
        //   rotation={[Math.PI / 2, 0, 0]}
        //   {...props} 
        //   dispose={null}
        // >
        //     <Decal

        //         debug
        //         position={[ex, why, ezed]}
        //         rotation={[-Math.PI,0,  Math.PI/12]}
        //         scale={0.1}
        //         opacity={0.1}
        //         map={texture}
        //         // map-anisotropy={16}
        //     />

            
        // </mesh>
     
    );
}

function Backdrop(){

    const shadows = useRef()

    useFrame((state, delta) => {
        easing.dampC(
            shadows.current.getMesh().material.color,
            state.selectedColor,
            0.25,
            delta
        )
    })

    return (
        <AccumulativeShadows
            ref={ shadows }
            temporal
            frames={60}
            alphaTest={0.85}
            scale={10}
            rotation={[Math.PI / 2, 0, 0]}
            position={[0, 0, -0.14]}
        >
            <RandomizedLight 
                amount={3}
                radius={15}
                intensity={0.88}
                ambient={0.25}
                position={[5, 5, -10]}
            />
        </AccumulativeShadows>
    )
}

function CamerRig({ children }){
    const group = useRef();
    // Thhis uses a math libray called maaath to animate or damp the rotation of the camera rig
    useFrame((state, delta)=>{
        easing.dampE(
            group.current.rotation,
            [state.pointer.y / 10, -state.pointer.x / 5, 0], 
            0.25,
            delta 
        )
    })
    return <group ref={ group }>  {children} </group>
}

// useGLTF.preload("./shirt_baked.glb");
useGLTF.preload("/t-shirt-orange-sleeves.glb");