import { create } from 'zustand';
import { WarehouseData, Item } from '@/types/warehouse';

interface WarehouseState {
    data: WarehouseData;
    selectedItem: Item | null;
    selectedConditions: string[];
    setData: (data: WarehouseData) => void;
    setSelectedItem: (item: Item | null) => void;
    setSelectedConditions: (conditions: string[]) => void;
    toggleCondition: (condition: string) => void;
}

export const useWarehouseStore = create<WarehouseState>((set) => ({
    data: {
        racks: [],
        zones: [],
        routes: [],
    },
    selectedItem: null,
    selectedConditions: [],
    setData: (data) => set({ data }),
    setSelectedItem: (selectedItem) => set({ selectedItem }),
    setSelectedConditions: (selectedConditions) => set({ selectedConditions }),
    toggleCondition: (condition) => set((state) => ({
        selectedConditions: state.selectedConditions.includes(condition)
            ? state.selectedConditions.filter((c) => c !== condition)
            : [...state.selectedConditions, condition],
    })),
}));
