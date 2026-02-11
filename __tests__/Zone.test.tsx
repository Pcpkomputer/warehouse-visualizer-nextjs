import React from 'react'
import { render } from '@testing-library/react'
import Zone from '../components/Zone'

describe('Zone Component', () => {
    const defaultProps = {
        type: 'Storage',
        name: 'Zone A',
        position: [0, 0, 0] as [number, number, number],
        dimensions: [5, 5] as [number, number],
        color: '#3b82f6'
    }

    it('renders without crashing', () => {
        render(<Zone {...defaultProps} />)
    })

    it('renders the zone name', () => {
        const { getByTestId } = render(<Zone {...defaultProps} />)
        expect(getByTestId('text-mock')).toHaveTextContent('Zone A')
    })
})
