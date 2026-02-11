# Warehouse Visualizer 3D

A vibrant, cartoon-style 3D warehouse visualization built with Next.js, React Three Fiber, and Zustand.

## 🚀 Features
- **3D Interactive Scene**: Navigate a warehouse with interactive racks, zones, and moving forklifts.
- **Cartoon Aesthetic**: High-vibrancy, cel-shaded visuals using custom toon materials.
- **Dynamic Filtering**: Filter warehouse items by condition (Good, Damage, Quarantine, Scrap).
- **Global State**: State management powered by Zustand for seamless interaction.
- **External Data**: Configuration driven by `warehouse-data.json`.

## 🛠 Setup

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## 🏃 How to Run

### Development Server
Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the 3D visualizer.

### Running Tests
Execute unit tests for components and logic:
```bash
npm test
```

## 📝 Notes
- **Data Customization**: You can modify the warehouse layout (racks, items, routes) by editing `warehouse-data.json` in the root directory.
- **Tech Stack**:
  - [Next.js](https://nextjs.org/) - Framework
  - [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - 3D Engine
  - [Zustand](https://github.com/pmndrs/zustand) - State Management
  - [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Testing
