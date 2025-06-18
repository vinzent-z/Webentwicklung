
//Trainingseinträge//

// Funktion zum Laden und Anzeigen der gespeicherten Aktivitäten
    function loadActivities() {
  fetch('http://localhost:3000/activities')
    .then(response => response.json())
    .then(activities => {
      const activityList = document.getElementById("activity-list");
      activityList.innerHTML = "";

      if (!activities.length) {
        const noActivities = document.createElement("li");
        noActivities.textContent = "Keine Aktivitäten gespeichert.";
        activityList.appendChild(noActivities);
        return;
      }

      activities.forEach(activity => {
        const listItem = document.createElement("li");
        listItem.textContent = `Datum: ${activity.date}, Sportart: ${activity.sport}, Dauer: ${activity.duration} Minuten, Gefühl: ${activity.feeling}`;

        // Löschen-Button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Löschen";
        deleteButton.onclick = function () {
          if (confirm("Wirklich löschen?")) {
            fetch(`http://localhost:3000/activity/${encodeURIComponent(activity.date)}`, {
              method: 'DELETE'
            })
              .then(response => response.json())
              .then(() => loadActivities());
          }
        };

        listItem.appendChild(deleteButton);
        activityList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Fehler beim Laden der Aktivitäten:', error);
    });
}

// Aktivitäten laden, wenn
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

  const activity = {
    date,
    sport,
    duration,
    feeling,
  };

  fetch('http://localhost:3000/activity', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(activity)
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'ok') {
        alert("Aktivität gespeichert!");
        document.getElementById("activity-form").reset?.();
        loadActivities?.();
        updateStats?.();
      } else {
        alert("Fehler beim Speichern!");
      }
    });
}