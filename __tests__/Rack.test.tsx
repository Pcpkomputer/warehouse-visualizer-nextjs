import React from 'react'
import { render, screen } from '@testing-library/react'
import Rack from '../components/Rack'

describe('Rack Component', () => {
    const defaultProps = {
        position: [0, 0, 0] as [number, number, number],
        shelves: 3,
        width: 3,
        height: 6,
        depth: 1,
        color: '#ACBAC4'
    }

    it('renders without crashing', () => {
        render(<Rack {...defaultProps} />)
    })

    it('calculates the correct number of shelf positions', () => {
        const { container } = render(<Rack {...defaultProps} shelves={3} />)
        const meshes = container.querySelectorAll('mesh')
        expect(meshes.length).toBe(8)
    })
})
