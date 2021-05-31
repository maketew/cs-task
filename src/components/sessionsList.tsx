import React from 'react'
import styled from 'styled-components'
import { GetSessions } from '../utils/StorageManager'
import Session from '../types/session'


// Erstellen der beiden Listen: geplant und erledigt
const SessionsList: React.FC<{ stype: string, store: string, setCurrentSession: Function, setInput: Function}> = ({ stype, store, setCurrentSession, setInput }) => {

    const storedSessions = GetSessions(`${store}`);

    
    // Auswahl einer Session mit Hilfe des Index
    // Werte dieser Session werden übergeben
    // session Fenster (einzelnes Fenster) wird angezeigt, mit den Werten aus setInput
    const viewSession = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const index = e.currentTarget.id;
        const singleSession = GetSessions(`${store}`)[index];

        // Daten der ausgewählten (oder neuen) Session werden übergeben
        setInput({
            sessionType: stype,                                 
            sessionTitle: singleSession['sessionTitle'],
            sessionDate: singleSession['sessionDate'],
            sessionNote: singleSession['sessionNote'],
            sessionTask1: singleSession['sessionTask1'],
            sessionCheck1: singleSession['sessionCheck1'],
            sessionTask2: singleSession['sessionTask2'],
            sessionCheck2: singleSession['sessionCheck2'],
            sessionTask3: singleSession['sessionTask3'],
            sessionCheck3: singleSession['sessionCheck3'],
            sessionTask4: singleSession['sessionTask4'],
            sessionCheck4: singleSession['sessionCheck4'],
            sessionIndex: index,
            sessionStore: store,
            createdSession: true,
        });
        setCurrentSession(true);
    }

    return (
        <SessionsListContainer>
            <ListTitle>{stype}</ListTitle>
            {storedSessions.map((item: Session, i: string) => {
                return (
                    <ListItem key={i} id={i} onClick={viewSession} /* store={store} */>
                        <ItemTitle>{item.sessionTitle}</ItemTitle>
                        <ItemDate>{item.sessionDate}</ItemDate>
                    </ListItem>
                )
            })}
        </SessionsListContainer>
    )
}

export default SessionsList

const SessionsListContainer = styled.div`
    border-top: 1px solid black;
`

const ListTitle = styled.h1`
    text-align: center;
`

const ListItem = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    margin: 0.5rem;
    background: lightgrey;
    border-radius: 1rem;

    &:hover {
        background: grey;        
        cursor: pointer;
    }
`

const ItemTitle = styled.h2`
    margin-left: 3rem;

    @media screen and (max-width: 675px) {
        margin-left: 1rem;
    }
`

const ItemDate = styled.h2`
    text-align: center;
    margin: 1rem;
`