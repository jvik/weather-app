<script>
	// @ts-ignore
	import { onMount, onDestroy } from 'svelte';
	// @ts-ignore
	import Counter from './Counter.svelte';
	// @ts-ignore
	import welcome from '$lib/images/svelte-welcome.webp';
	// @ts-ignore
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import { io } from 'socket.io-client';
	import weatherData from '$lib/objects/weather-data';
	import { fade } from 'svelte/transition';

	// @ts-ignore
	const endpoint = 'https://skodje.org/verdata/customclientraw.txt';

	let loaded = false;

	let weather = {
		Flemsoy: { ...weatherData },
		Skodje: { ...weatherData },
		Hahjem: { ...weatherData }
	};

	let socket;

	onMount(() => {
		// Connect to the Socket.IO server
		socket = io(import.meta.env.VITE_API_URL, { autoConnect: false }); // Change to the server's address
		socket.connect();

		socket.on('connect_error', (err) => {
			console.log(`connect_error due to ${err.message}`);
		});

		// // Listen for the 'event-name' event
		// socket.on('file-content', (data) => {
		// 	weather = data;

		// 	console.log(data);
		// });
		socket.on('file-content', (data) => {
			loaded = true;
			for (const location in data) {
				for (const key in data[location]) {
					// @ts-ignore
					weather[location][key] = data[location][key];
				}
			}
		});
	});
</script>

<svelte:head>
	<title>Været på Sunnmøre</title>
	<meta name="description" content="Svelte demo app" />
	<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
</svelte:head>

<section>
	{#if loaded}
		<div in:fade={{ duration: 500 }} class="weather-card mt-4">
			<div class="parameter-box">
				<div class="parameter">
					<div class="icon-and-label">
						<i class="fas fa-thermometer-half"></i>
						<label>Temperatur:</label>
					</div>
					<p>
						<span class="location">Skodje:</span>
						<span class="temperature"><b><value><span id="flem-temp">{weather.Skodje.temp}</span> °C</value></b></span><br>
						<span class="location">Håhjem:</span>
						<span class="temperature"><b><value><span id="flem-temp">{weather.Hahjem.temp}</span> °C</value></b></span><br>
						<span class="location">Longva:</span>
						<span class="temperature"><b><value><span id="flem-temp">{weather.Flemsoy.temp}</span> °C</value></b></span>								
					</p>
				</div>
			
<p>
				<div class="parameter">
					<div class="icon-and-label">
						<i class="fas fa-chart-bar"></i>
						<label>Barometer:</label>
					</div>
					<p>
						<span class="location">Skodje:</span>
						<span class="temperature"><b><value><span id="flem-bar">{weather.Skodje.press}</span> hPa</value></b></span><br>
						<span class="location">Håhjem:</span>
						<span class="temperature"><b><value><span id="flem-temp">{weather.Hahjem.press}</span> hPa</value></b></span><br>
						<span class="location">Longva:</span>
						<span class="temperature"><b><value><span id="flem-temp">{weather.Flemsoy.press}</span> hPa</value></b></span>								
					</p>
				</div>

				<p>
					<div class="parameter">
						<div class="icon-and-label">
							<i class="fas fa-tint"></i>
							<label>Luftfuktighet:</label>
						</div>
						<p>
							<span class="location">Skodje:</span>
							<span class="temperature"><b><value><span id="flem-temp">{weather.Skodje.hum}</span> %</value></b></span><br>
							<span class="location">Håhjem:</span>
							<span class="temperature"><b><value><span id="flem-temp">{weather.Hahjem.hum}</span> %</value></b></span><br>
							<span class="location">Longva:</span>
							<span class="temperature"><b><value><span id="flem-temp">{weather.Flemsoy.hum}</span> %</value></b></span>								
						</p>
					</div>


					<p>
						<div class="parameter">
							<div class="icon-and-label">
								<i class="fas fa-cloud-showers-heavy"></i>
								<label>Nedbør nå:</label>
							</div>
							<p>
								<span class="location">Skodje:</span>
								<span class="temperature"><b><value><span id="flem-temp">{weather.Skodje.rrate}</span> mm/t</value></b></span><br>
								<span class="location">Håhjem:</span>
								<span class="temperature"><b><value><span id="flem-temp">{weather.Hahjem.rrate}</span> mm/t</value></b></span><br>
								<span class="location">Longva:</span>
								<span class="temperature"><b><value><span id="flem-temp">{weather.Flemsoy.rrate}</span> mm/t</value></b></span>								
							</p>
						</div>

						<p>
							<div class="parameter">
								<div class="icon-and-label">
									<i class="fas fa-cloud"></i>
									<label>Nedbør totalt i dag:</label>
								</div>
								<p>
									<span class="location">Skodje:</span>
									<span class="temperature"><b><value><span id="flem-temp">{weather.Skodje.rfall}</span> mm</value></b></span><br>
									<span class="location">Håhjem:</span>
									<span class="temperature"><b><value><span id="flem-temp">{weather.Hahjem.rfall}</span> mm</value></b></span><br>
									<span class="location">Longva:</span>
									<span class="temperature"><b><value><span id="flem-temp">{weather.Flemsoy.rfall}</span> mm</value></b></span>								
								</p>
							</div>


						<p>
							<div class="parameter">
								<div class="icon-and-label">
									<i class="fas fa-wind"></i>
									<label>Vind nå (middelvind):</label>
								</div>
								<p>
									<span class="location">Skodje:</span>
									<span class="temperature"><b><value><span id="flem-temp">{weather.Skodje.wspeed}</span> m/s</value></b></span><br>
									<span class="location">Håhjem:</span>
									<span class="temperature"><b><value><span id="flem-temp">{weather.Hahjem.wspeed}</span> m/s</value></b></span><br>
									<span class="location">Longva:</span>
									<span class="temperature"><b><value><span id="flem-temp">{weather.Flemsoy.wspeed}</span> m/s</value></b></span>								
								</p>
							</div>
		
							<p>
								<div class="parameter">
									<div class="icon-and-label">
										<i class="fas fa-wind"></i>
										<label>Vind nå (vindkast):</label>
									</div>
									<p>
										<span class="location">Skodje:</span>
										<span class="temperature"><b><value><span id="flem-temp">{weather.Skodje.wlatest}</span> m/s</value></b></span><br>
										<span class="location">Håhjem:</span>
										<span class="temperature"><b><value><span id="flem-temp">{weather.Hahjem.wlatest}</span> m/s</value></b></span><br>
										<span class="location">Longva:</span>
										<span class="temperature"><b><value><span id="flem-temp">{weather.Flemsoy.wlatest}</span> m/s</value></b></span>								
									</p>
								</div>

								<p>
									<div class="parameter">
										<div class="icon-and-label">
											<i class="fas fa-wind"></i>
											<label>Høyeste vindkast i dag:</label>
										</div>
										<p>
											<span class="location">Skodje:</span>
											<span class="temperature"><b><value><span id="flem-temp">{weather.Skodje.wgustTM}</span> m/s</value></b></span><br>
											<span class="location">Håhjem:</span>
											<span class="temperature"><b><value><span id="flem-temp">{weather.Hahjem.wgustTM}</span> m/s</value></b></span><br>
											<span class="location">Longva:</span>
											<span class="temperature"><b><value><span id="flem-temp">{weather.Flemsoy.wgustTM}</span> m/s</value></b></span>								
										</p>
									</div>

			</div>
		</div>
	{/if}

	<!-- <Counter /> -->
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}

.parameter {
    display: flex;
    align-items: left; 
    flex-direction: column; 
}

.parameter p {
    margin: 0; 
    text-align: left; 
}

.icon-and-label {
    display: flex;
    align-items: center; 
    margin-bottom: 10px; 
}

.icon-and-label i {
    margin-right: 10px; 
}

.location {
    width: 80px; 
    display: inline-block;
}

</style>
