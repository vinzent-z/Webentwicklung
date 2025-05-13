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