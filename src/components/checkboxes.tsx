import React from 'react'
import styled from 'styled-components'
import Session from '../types/session'

const CheckBoxes: React.FC<{ input: Session, setInput: Function, handleChange: Function}> = ({ input, setInput, handleChange }) => {

    return (
        <CheckBoxContainer>
            <CheckItem>
                <CheckBox 
                    type="checkbox" 
                    name="sessionCheck1" 
                    id="session.Check1" 
                    checked={input.sessionCheck1} 
                    onChange={() => setInput({...input ,sessionCheck1: !input.sessionCheck1})}
                />
                <CheckTask 
                    type="text" 
                    name="sessionTask1"
                    id="sessionTask1" 
                    value={input.sessionTask1} 
                    onChange={(e) => setInput({...input ,sessionTask1: e.target.value})}
                    placeholder="Aufgabe" 
                />
            </CheckItem>
            <CheckItem>
                <CheckBox 
                    type="checkbox" 
                    name="sessionCheck2" 
                    id="session.Check2" 
                    checked={input.sessionCheck2} 
                    onChange={() => setInput({...input ,sessionCheck2: !input.sessionCheck2})}
                />
                <CheckTask 
                    type="text" 
                    name="sessionTask2" 
                    id="sessionTask2" 
                    value={input.sessionTask2} 
                    onChange={(e) => setInput({...input ,sessionTask2: e.target.value})}
                    placeholder="Aufgabe" 
                />
            </CheckItem>
            <CheckItem>
                <CheckBox 
                    type="checkbox" 
                    name="sessionCheck3" 
                    id="session.Check3" 
                    checked={input.sessionCheck3} 
                    onChange={() => setInput({...input ,sessionCheck3: !input.sessionCheck3})}
                />
                <CheckTask 
                    type="text" 
                    name="sessionTask3" 
                    id="sessionTask3" 
                    value={input.sessionTask3} 
                    onChange={(e) => setInput({...input ,sessionTask3: e.target.value})}
                    placeholder="Aufgabe" 
                />
            </CheckItem>
            <CheckItem>
                <CheckBox 
                    type="checkbox" 
                    name="sessionCheck4" 
                    id="session.Check4" 
                    checked={input.sessionCheck4} 
                    onChange={() => setInput({...input ,sessionCheck4: !input.sessionCheck4})}
                />
                <CheckTask 
                    type="text" 
                    name="sessionTask4" 
                    id="sessionTask4" 
                    value={input.sessionTask4} 
                    onChange={(e) => setInput({...input ,sessionTask4: e.target.value})}
                    placeholder="Aufgabe" 
                />
            </CheckItem>  
        </CheckBoxContainer>
    )
}

export default CheckBoxes

const CheckBoxContainer = styled.div`
    display: grid;
    grid-gap: 0 1rem;
    grid-template-columns: 1fr 1fr;
`

const CheckItem = styled.div`
    display: flex;
    flex-direction: row;    
    margin-bottom: 0.5rem;
    justfiy-content: center;
`

const CheckBox = styled.input`
`

const CheckTask = styled.input`
    width: 100%;
`
