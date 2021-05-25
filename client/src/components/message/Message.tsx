import { useState } from 'react'
import styled from 'styled-components';

export const StyledMessage = styled.div`
    color: black;
    padding: 8px 16px;
    width: 50%;
    opacity: 0.9;
    border-radius: 10px;
    position: absolute;
    top:80px;
    `

type MessageProps = {
    message: string,
    delay: number,
}

export const Message: React.FC<MessageProps> = ({ message, delay }) => {
    const [showMessage, setShowMessage] = useState<string>(message)

    const messageTimer = () => {
        setTimeout(() => {
            setShowMessage('')
        }, delay);

        return <StyledMessage>{showMessage}</StyledMessage>
    }

    return (
        messageTimer()
    )
}
