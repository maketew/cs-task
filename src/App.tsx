import React from 'react'
import styled from 'styled-components'
import CurrentSession from './components/session'
import SessionsList from './components/sessionsList'
import { BsPlusSquareFill } from 'react-icons/bs'
import Session from './types/session'

const App = () => {

  // "Hauptmenu" oder einzelne Session offen
  const [currentSession, setCurrentSession] = React.useState<boolean>(false);

  // Informationen, die zu jedem Post gespeichert werden
  // Der Einfachheit halber Checkboxen + dazugehöriger Text nicht ausgegliedert
  const [input, setInput] = React.useState<Session>({
    sessionType: "... Session",
    sessionTitle: "Title",
    sessionDate: new Date(),
    sessionNote: "Notizen",
    sessionTask1: "1. Unteraufgabe",
    sessionCheck1: false,
    sessionTask2: "2. Unteraufgabe",
    sessionCheck2: false,
    sessionTask3: "3. Unteraufgabe",
    sessionCheck3: false,
    sessionTask4: "4. Unteraufgabe",
    sessionCheck4: false,
    sessionId: 0,
    sessionIndex: 0, // Zum Löschen und Hinzufügen (Position in der jeweiligen Liste wird später ausgelesen)
    sessionStore: "", // Speicherort: planned (geplante) & history (erledigte)
    createdSession: false, // Unterscheidung zwischen bestehenden Sessions (geplant + erledigt) und neuen Sessions
  })

  const newSession = () => {
    setInput({
      sessionType: "Neue Session",
      sessionTitle: "",
      sessionDate: new Date(),
      sessionNote: "",
      sessionTask1: "",
      sessionCheck1: false,
      sessionTask2: "",
      sessionCheck2: false,
      sessionTask3: "",
      sessionCheck3: false,
      sessionTask4: "",
      sessionCheck4: false,
      sessionId: 0,
      sessionIndex: 0, // Zum Löschen und Hinzufügen (Position in der jeweiligen Liste wird später ausgelesen)
      sessionStore: "", // Speicherort: planned (geplante) & history (erledigte)
      createdSession: false, // Unterscheidung zwischen bestehenden Sessions (geplant + erledigt) und neuen Sessions
    });
    setCurrentSession(true);
  }

 

  return (
    <AppContainer>
      {!currentSession ? (
        <AppWrapper>
          <NewSessionBtn onClick={newSession}>
            <Symbol />
            <NewSessionText>Neue Session</NewSessionText>
          </NewSessionBtn>
          <PlannedSessions>
            <SessionsList stype={"Geplante Sessions"} store="planned" setCurrentSession={setCurrentSession} setInput={setInput} />
          </PlannedSessions>
          <FinishedSessions>
            <SessionsList stype={"Erledigte Sessions"} store="history" setCurrentSession={setCurrentSession} setInput={setInput} />
          </FinishedSessions>          
        </AppWrapper>
        ) : null}
      {currentSession ? (
          <CurrentSession 
            input={input}
            setInput={setInput}
            setCurrentSession={setCurrentSession}
          />
        ) : null }
    </AppContainer>  
  );
}

export default App;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
const AppWrapper = styled.div`
  display: flex;
  width: 50vw;
  flex-direction: column;
  align-items: center;
  border-radius: 3rem;
  border: 1px solid black;
  margin-top: 1rem;
  
  @media screen and (max-width: 675px) {
      width: 100%;
      margin: 1rem;  
  }
`
const NewSessionBtn = styled.button`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 3rem 3rem 0 0;

  &:hover {
    background: grey;
    cursor: pointer;
  }
`
const Symbol = styled(BsPlusSquareFill)`
  font-size: 3rem;
`
const NewSessionText = styled.h1`
  margin-left: 2rem;
`
const PlannedSessions = styled.div`
  width: 100%;
`

const FinishedSessions = styled.div`
  width: 100%;
  margin-bottom: 3rem;
`

