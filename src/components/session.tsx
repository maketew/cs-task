import React from 'react'
import styled from 'styled-components'
import Session from '../types/session'
import { SaveSessions, GetSessions } from '../utils/StorageManager'
import CheckBoxes from './checkboxes'

// Alle Aktivitäten aus dem einzelnen Fenster (nur Checkboxen sind ausgelagert, da leider nur hardcoded)
// neue Session erstellen oder geplante/erledigte Session angucken, verändern oder als erledigt markieren


const CurrentSession: React.FC<{input : Session, setInput: Function, setCurrentSession: Function }> = ({ input, setInput, setCurrentSession }) => {

    const goBack = ( ) => {
        setCurrentSession(false);
        const data: number = 10 ;
        console.log(data);
    }

    const handleChange = ( 
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> )  => {
            console.log(e.target.name, "Name => Value",e.target.value)
            setInput({...input, [e.target.name]: e.target.value});
    }

    // React.FormEventHandler<T = Element> = (event: FormEvent<T>) => void
    // Speichern einer neuen Session oder einer geänderten Session (geplant, erledigt)
    // Änderungen sind nicht obligatorisch, aber Titel und Datum müssen angegeben sein
    const handleSubmit = (e: React.SyntheticEvent ) => {
        e.preventDefault();        
        input.sessionId = Math.random();
        // Neue Session erstellen
        if (input.createdSession === false) {
            const plannedSessions = GetSessions("planned");
            plannedSessions.push(input);
            SaveSessions("planned", plannedSessions);
            setCurrentSession(false);
        }
        // Erledigte Session speichern (Änderung nicht obligatorisch) 
        else if (input.createdSession === true && input.sessionStore === 'planned') {
            const plannedSessions = GetSessions("planned");
            plannedSessions.splice(`${input.sessionIndex}`,1);
            plannedSessions.push(input);
            SaveSessions("planned", plannedSessions);
            setCurrentSession(false);
        } 
        // Geplante Session als erledigt markieren => Verschiebung zu erledigt
        else if (input.createdSession === true && input.sessionStore === 'history') {
            const historySessions = GetSessions("history");
            historySessions.splice(`${input.sessionIndex}`,1);
            historySessions.push(input);
            SaveSessions("history", historySessions);
            setCurrentSession(false);
        } 
        // Falls ein Fehler auftreten sollte
        else {
            alert('Error in handleSubmit');
            setCurrentSession(false);
        }
    }


    // Sessions erledigt
    const doneSession = () => {

        // Neue Session direkt unter erledigt speichern
        if (input.createdSession === false ) {
            input.sessionId = Math.random();  
            const historySessions = GetSessions("history");          
            historySessions.push(input);
            SaveSessions("history", historySessions);
            setCurrentSession(false);
        } 
        // Geplante Session aus geplant entfernen und zu erledigt hinzufügen
        else if ( input.createdSession === true && input.sessionStore === 'planned' ) {
            const plannedSessions = GetSessions("planned");
            const historySessions = GetSessions("history");
            const dataSplice = plannedSessions.splice(`${input.sessionIndex}`,1);
            const dataHistoryNew: any = [...historySessions, ...dataSplice];
            SaveSessions("planned", plannedSessions);
            SaveSessions("history", dataHistoryNew);
            setCurrentSession(false);
        } 
        // Schon erledigte Session wird nur geschloßen
        else if ( input.createdSession === true && input.sessionStore === 'history' ) {
            setCurrentSession(false);
        } 
        // Falls Fehler auftreten
        else {
            setCurrentSession(false);
            alert('Error in doneSessions')
        }
    }

    // Löschen einer Session
    // geht bei neuen, erledigten und geplanten Sessions
    const deleteSession = () => {

        // Geplante Session wird gelöscht
        if (input.createdSession === true && input.sessionStore === 'planned') {
            const plannedSessions = GetSessions("planned");
            plannedSessions.splice(`${input.sessionIndex}`,1);
            SaveSessions("planned", plannedSessions);
            setCurrentSession(false);
        } 
        // Erledigte Session wird gelöscht
        else if (input.createdSession === true && input.sessionStore === 'history') {
            const historySessions = GetSessions("history");
            historySessions.splice(`${input.sessionIndex}`,1);
            SaveSessions("history", historySessions);
            setCurrentSession(false);
        } 
        // Neue Session (alles andere) wird gar nicht gespeichert => session Fenster wird nur geschloßen
        else { 
            setCurrentSession(false)
        }
    }



    return (
        <CurrentSessionContainer>
            <Header>
                <HeadingType>{input.sessionType}</HeadingType>
                <StandardBtn type="button" onClick={goBack}>Zurück</StandardBtn>
            </Header>          
            <form onSubmit={handleSubmit}>            
                <SessionInformation>
                    <CurrentTitle 
                        type="text" 
                        name="sessionTitle" 
                        id="sessionTitle" 
                        value={input.sessionTitle} 
                        onChange={handleChange} 
                        placeholder="Title" 
                    >
                    </CurrentTitle>                   
                    <CurrentDate 
                        type="date" 
                        name="sessionDate" 
                        id="sessionDate"
                        value={input.sessionDate} 
                        onChange={handleChange} 
                        placeholder="Date"
                    >
                    </CurrentDate>
                </SessionInformation>
                <CheckBoxes
                    input={input} 
                    setInput={setInput} 
                    handleChange={handleChange}
                />                   
                <NoteContainer
                    name="sessionNote" 
                    id="sessionNote" 
                    value={input.sessionNote} 
                    onChange={handleChange} 
                    placeholder="Notizen..." 
                />
                {/* Button sind zum Teil noch individuell designed */}
                <ButtonBar>
                    <StandardBtn 
                        theme={btnDelete} 
                        type="button" 
                        onClick={deleteSession}
                        >   
                            Löschen
                    </StandardBtn>
                    <StandardBtn 
                        type="submit"
                        // onClick={handleSubmit}
                        disabled={!input.sessionTitle || !input.sessionDate}
                        >
                            Speichern
                    </StandardBtn>
                    <StandardBtn 
                        theme={btnDone} 
                        type="button" 
                        disabled={!input.sessionTitle || !input.sessionDate} 
                        onClick={doneSession}
                        >
                            Erledigt
                    </StandardBtn>
                </ButtonBar>
            </form>
        </CurrentSessionContainer>
    )
}

export default CurrentSession

const CurrentSessionContainer = styled.div`
    background: rgb(220, 220, 220);
    padding: 0 1rem;
    border-radius: 3rem;
`
const Header = styled.div`
    margin: 0 1rem;
    width: calc(100% - 2 * 1rem);
    display: grid;
    grid-template-columns: 2fr 1fr;
    align-items: center;
`
const HeadingType = styled.h1`
    text-align: center;
    margin-right: 1rem;
`
const SessionInformation = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 2fr 1fr;
    grid-gap: 1rem;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
`
const CurrentTitle = styled.input`
    font-size: 1.1rem;
`

const CurrentDate = styled.input<{ value: Date }>`
    font-size: 1.1rem;
`

const NoteContainer = styled.textarea`
    min-height: 20vh;
    font-size: 1rem;
    background: rgb(250, 250, 250);
    width: 100%;
    box-sizing: border-box;
`
const ButtonBar = styled.div`
    width: 100%;
    display: grid;
    grid-gap: 1rem;
    margin: 1rem 1rem;
    width: calc(100% - 2*1rem);
    grid-template-columns: repeat(3, 1fr);
`
const StandardBtn = styled.button`
    height: 2rem;
    border-radius: 1rem;
    border: 1px solid black;
    color: ${props => props.theme.color};

    &:hover:enabled {
        background: ${props => props.theme.hoverBackground};        
        cursor: pointer;
        color: ${props => props.theme.hoverColor};
    }

    &:disabled {
        color: grey;
    }
`
// Anpassung der Buttons 
StandardBtn.defaultProps = {
    theme: {
      color: "black",
      hoverBackground: "grey",
    }
}
// Delete Button
const btnDelete = {
    color: "rgb(255, 43, 61)",
    hoverBackground: "rgb(255, 43, 61)",
    hoverColor: "black",
};
// Done Button
const btnDone = {
    color: "mediumseagreen",
    hoverBackground: "mediumseagreen",
    hoverColor: "black",
};



