import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'


export const App = ({ position= [-1, 0, 2.5], fov= 25}) => (
    <Canvas
        camera={{ position, fov }}
    >
        <OrbitControls />
        <Shirt />
    </Canvas>
)

function Shirt() {
    return (
        <mesh>
            <boxGeometry  args={[1, 1, 1]} />
            <meshNormalMaterial />
        </mesh>
    )
}