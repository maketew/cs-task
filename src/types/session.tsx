export default interface Session {
    sessionType: string,
    sessionTitle: string,
    sessionDate: Date,
    sessionNote: string,
    sessionTask1: string,
    sessionCheck1: boolean,
    sessionTask2: string,
    sessionCheck2: boolean,
    sessionTask3: string,
    sessionCheck3: boolean,
    sessionTask4: string,
    sessionCheck4: boolean,
    sessionId: number,
    sessionIndex: number, // Zum Löschen und Hinzufügen (Position in der jeweiligen Liste wird später ausgelesen)
    sessionStore: string, // Speicherort: planned (geplante) & history (erledigte)
    createdSession: boolean, // Unterscheidung zwischen bestehenden Sessions (geplant + erledigt) und neuen Sessions
  }
