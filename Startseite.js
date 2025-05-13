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