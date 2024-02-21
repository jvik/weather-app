<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
	<h1>About this app</h1>

    <!-- Inkluderer JavaScript-biblioteket for kalenderen -->
    <script src="https://cdn.jsdelivr.net/npm/pikaday/pikaday.js"></script>
    <script>
        // Oppretter en ny kalenderinstans og knytter den til input-elementet med ID 'datepicker'
        var picker = new Pikaday({ field: document.getElementById('datepicker') });
        
        // Funksjonen som blir kalt når søkeknappen blir klikket
        function search() {
            // Henter datoen fra kalenderen
            var selectedDate = picker.toString();

            // Sender dato til backend-serveren for å utføre søket i databasen
            fetch('/search?date=' + selectedDate)
                .then(response => response.json())
                .then(data => {
                    // Håndterer svaret fra serveren
                    console.log(data);
                    // Her kan du vise resultatet på nettsiden eller gjøre andre ting med dataene
                })
                .catch(error => console.error('Error:', error));
        }
    </script>
</div>
