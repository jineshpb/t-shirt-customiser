import { proxy } from 'valtio'

const state = proxy({
    intro: true,
    colors: [ '#cccccc', '#efbd4e', '#80c670', '#726de8', '#ef674e', '#353934' ],
    decals: ['blender', 'bra-vr', 'pixel-pusher', 'rectangle-maker','gypsy-vanguard', 'framer', 'figma', 'year'],
    selectedColor: '#cccccc',
    selectedDecal: 'blender'
})

export { state }