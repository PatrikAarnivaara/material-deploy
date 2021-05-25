/* import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LenderAPIService from '../../shared/api/service/LenderAPIService'; */

/* type Lender = {
    first_name: string;
    last_name: string;
} */

/* TODO: Change name of this view to LenderDetailView */
/* TODO: add spinner if item details are loading */
export const ItemDetailView = () => {
    /* const location = useLocation<number>()
    const [data, setData] = useState<Lender>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await LenderAPIService.getLender(location.state);
                setData(response.data);
            } catch (error) {
                console.log('error message');
            }
        };
        fetchData()
    }, [location.state]); */

    return (
        <div>
            <h1>ITEM DETAIL</h1>
            {/* <h2>{data?.first_name}</h2>
            <h2>{data?.last_name}</h2> */}
        </div>
    )
}
