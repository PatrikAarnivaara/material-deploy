import { LabelDefinitionType } from '../../shared/types/LabelDefenitionType';
import styled from 'styled-components';

type CardProps<Type, Key extends keyof Type> = {
    item: Type;
    list: Array<LabelDefinitionType<Type, Key>>
    /* Change name of x */
    x: (/* input: string */) => void,
}

const StyledMyLoanCardWrapper = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    max-height: 200px;
    padding: 1em;
    background-color: #f4d248;
`
const StyledMyLoanCardContent = styled.span`
`

const StyledMyLoanCardButton = styled.button`
    background-color: #a42420;
    color: white;
    padding: 8px 16px;
    margin: 16px 0;
    border: none;
    cursor: pointer;
    width: 50%;
    opacity: 0.9;
`

export const Card = <Type, Key extends keyof Type>({ item, list, x }: CardProps<Type, Key>): JSX.Element => {
    return (
        <StyledMyLoanCardWrapper>
            {list?.map((listItem, index) => {
                return <StyledMyLoanCardContent key={index}>{item[listItem.key]}<br /></StyledMyLoanCardContent>
            })}
            <StyledMyLoanCardButton onClick={() => { x() }}>Return Loan</StyledMyLoanCardButton>
        </StyledMyLoanCardWrapper>
    )
}
