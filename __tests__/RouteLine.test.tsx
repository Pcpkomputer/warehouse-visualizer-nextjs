import React from 'react'
import { render } from '@testing-library/react'
import RouteLine from '../components/RouteLine'

describe('RouteLine Component', () => {
    const defaultProps = {
        path: [[0, 0, 0], [5, 0, 0], [5, 0, 5]] as [number, number, number][],
        color: '#ef4444'
    }

    it('renders without crashing', () => {
        render(<RouteLine {...defaultProps} />)
    })
})
