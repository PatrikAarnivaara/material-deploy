import { useState, createContext, useEffect } from 'react';
import EquipmentAPIService from '../api/service/EquipmentAPIService'
import { EquipmentProps } from '../types/EquipmentProps'

export const EquipmentContext = createContext<any>(null);

export const EquipmentProvider = (props: { children?: React.ReactNode }) => {
    const [equipment, setEquipment] = useState<EquipmentProps>()

    const fetchData = async () => {
        try {
            const { data } = await EquipmentAPIService.getEquipment();
            setEquipment(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return <EquipmentContext.Provider value={[equipment, setEquipment]}>{props.children}</EquipmentContext.Provider>;
}