 // Funktion zum Speichern der Aktivität
 function saveActivity() {
    const date = document.getElementById("date").value;
    const sport = document.getElementById("sport").value;
    const duration = document.getElementById("duration").value;
    const feeling = document.getElementById("feeling").value;

    if (!date || !sport || !duration || !feeling) {
      alert("Bitte alle Felder ausfüllen!");
      return;
    }

    // Aktivität als Objekt speichern
    const activity = {
      sport,
      duration,
      feeling,
    };

    // Bestehende Daten aus Local Storage abrufen
    const activities = JSON.parse(localStorage.getItem("activities")) || {};

    // Neue Aktivität unter dem angegebenen Datum speichern
    activities[date] = activity;

    // Daten zurück in Local Storage speichern
    localStorage.setItem("activities", JSON.stringify(activities));

    alert("Aktivität gespeichert!");
}