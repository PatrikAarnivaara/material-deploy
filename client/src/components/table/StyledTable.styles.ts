import styled from 'styled-components';

export const StyledContainer = styled.div`
`
export const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    cursor: pointer;
    position:relative;
    td, th {
        border: 1px solid #999;
        border-right: 0px;
        border-left: 0px;
        padding: 0.5rem;
        text-align: left;
    }
    tr {
        font-size: 200
    }
    tr:hover {background-color: #ddd;}
    input{
        padding: 8px 10px;
        padding: 6px;
        font-size: 17px;
    }
`;