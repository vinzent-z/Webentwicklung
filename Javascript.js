function updateStats() {
    const activities = JSON.parse(localStorage.getItem("activities")) || {};
    const activityCount = Object.keys(activities).length;
    const totalTime = Object.values(activities).reduce(
      (sum, activity) => sum + parseInt(activity.duration || 0, 10),
      0
    );

    // Statistiken in die HTML-Elemente einfügen
    document.getElementById("activity-count").textContent = `Aktivitäten seit Beginn: ${activityCount}`;
    document.getElementById("total-time").textContent = `Gesamte Zeit in Aktivitäten: ${totalTime} Minuten`;
  }

  // Statistiken laden, wenn die Seite geladen wird
  document.addEventListener("DOMContentLoaded", updateStats);

  async function requestTextWithGET(url) {
  const response = await fetch(url);
  console.log('Response:', response); // vollständiges Response-Objekt
  const text = await response.text();
  console.log('Response-Text:', text); // Text aus dem Response-Body
}
//Trainingseinträge//
// Funktion zum Laden und Anzeigen der gespeicherten Aktivitäten
    function loadActivities() {
        const activities = JSON.parse(localStorage.getItem("activities")) || {};
        const activityList = document.getElementById("activity-list");

        // Liste leeren
        activityList.innerHTML = "";

        // Aktivitäten durchlaufen und anzeigen
        for (const [date, activity] of Object.entries(activities)) {
          const listItem = document.createElement("li");
          listItem.textContent = `Datum: ${date}, Sportart: ${activity.sport}, Dauer: ${activity.duration} Minuten, Gefühl: ${activity.feeling}`;

          // Bearbeiten-Button hinzufügen
          const editButton = document.createElement("button");
          editButton.textContent = "Bearbeiten";
          editButton.onclick = () => editActivity(date, activity);

          // Löschen-Button hinzufügen
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Löschen";
          deleteButton.onclick = () => deleteActivity(date);

          listItem.appendChild(editButton);
          listItem.appendChild(deleteButton);
          activityList.appendChild(listItem);
        }

        // Wenn keine Aktivitäten vorhanden sind
        if (Object.keys(activities).length === 0) {
          const noActivities = document.createElement("li");
          noActivities.textContent = "Keine Aktivitäten gespeichert.";
          activityList.appendChild(noActivities);
        }
      }

      // Funktion zum Bearbeiten einer Aktivität
      function editActivity(date, activity) {
        const newSport = prompt("Neue Sportart:", activity.sport);
        const newDuration = prompt("Neue Dauer (in Minuten):", activity.duration);
        const newFeeling = prompt("Neues Gefühl:", activity.feeling);

        if (newSport && newDuration && newFeeling) {
          const activities = JSON.parse(localStorage.getItem("activities")) || {};
          activities[date] = {
            sport: newSport,
            duration: newDuration,
            feeling: newFeeling,
          };
          localStorage.setItem("activities", JSON.stringify(activities));
          loadActivities(); // Liste neu laden
          alert("Aktivität wurde aktualisiert.");
        }
      }

      // Funktion zum Löschen einer Aktivität
      function deleteActivity(date) {
        const activities = JSON.parse(localStorage.getItem("activities")) || {};
        delete activities[date]; // Aktivität mit dem angegebenen Datum löschen
        localStorage.setItem("activities", JSON.stringify(activities)); // Aktualisierte Daten speichern
        loadActivities(); // Liste neu laden
        alert(`Aktivität am ${date} wurde gelöscht.`);
      }

      // Aktivitäten laden, wenn die Seite geladen wird
      document.addEventListener("DOMContentLoaded", loadActivities);


      //neue-aktivitäten//
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

async function sendJsonWithPOST(url, jsonData) {
  const response = await fetch(url, {
    method: 'post',
    body: jsonData}
  )
  // Auf Response kann wie bei GET reagiert werden
}

const activity ;
const jsonData = JSON.stringify(activity);

sendJsonWithPOST('http://127.0.0.1:3000/', jsonData); // Hier URL zu lokalem Server für Entwicklung