import '@testing-library/jest-dom'
import React from 'react'

jest.mock('three', () => {
    const THREE = jest.requireActual('three')
    return {
        ...THREE,
        WebGLRenderer: jest.fn().mockImplementation(() => ({
            setSize: jest.fn(),
            setPixelRatio: jest.fn(),
            render: jest.fn(),
            domElement: document.createElement('canvas'),
        })),
    }
})

jest.mock('@react-three/fiber', () => {
    const React = require('react')
    return {
        Canvas: ({ children }: { children: React.ReactNode }) => <div data-testid="canvas-mock">{children}</div>,
        useFrame: jest.fn(),
        useThree: () => ({
            size: { width: 100, height: 100 },
            viewport: { width: 100, height: 100 },
        }),
    }
})

jest.mock('@react-three/drei', () => ({
    Text: ({ children }: { children: React.ReactNode }) => <div data-testid="text-mock">{children}</div>,
    Html: ({ children }: { children: React.ReactNode }) => <div data-testid="html-mock">{children}</div>,
    OrbitControls: () => <div data-testid="orbit-controls-mock" />,
}))

const primitives = ['mesh', 'group', 'boxGeometry', 'meshToonMaterial', 'planeGeometry', 'gridHelper']
primitives.forEach(p => {
    // @ts-ignore
    global[p] = p
})
