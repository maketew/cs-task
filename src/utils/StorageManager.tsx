import Session from '../types/session'

// Speichern der Daten/ Listen
// Unterscheidung in erledigte und nicht nicht erledigte Sessions (Auswahl über place)
// Sortierung nach Datum 
// geplante => als nächste geplante (vom Datum)
// erledigte => zu letzt absolvierte (vom Datum)


export const SaveSessions = (place: string, data: Session[]) => {
    console.log("Speichernde Daten: ",data);
    if (place === "planned") {
        data.sort((x, y) => +new Date(x.sessionDate) - +new Date(y.sessionDate));
    } else if (place === "history") {
        data.sort((x, y) => +new Date(y.sessionDate) - +new Date(x.sessionDate));
    } else {
        alert('Wrong Data in SaveSessions')
    }
    console.log("Was wird gezeigt: ",data);
    localStorage.setItem(place, JSON.stringify(data));
};


// Laden einer Liste
// Auswahl über place; wenn es keine Liste gibt => []
export const GetSessions = (place: string) => {
    return JSON.parse(localStorage.getItem(place) ?? '[]');
};