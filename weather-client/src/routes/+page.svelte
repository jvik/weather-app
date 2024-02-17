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
	<title>Skodje</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	{#if loaded}
		<div in:fade={{ duration: 500 }} class="weather-card mt-4">
			<div class="parameter-box">
				<div class="parameter">
					<i class="fas fa-thermometer-half" />
					<label>Temperatur:</label>
					<value>
						<span id="flem-temp">{weather.Skodje.temp}</span>
						°C</value
					>
				</div>
				<div class="parameter">
					<i class="fas fa-chart-bar" />
					<label>Barometer:</label>
					<value>
						<span id="flem-pressure">{weather.Skodje.press}</span>
						hPa</value
					>
				</div>
			</div>
			<div class="parameter-box">
				<div class="parameter">
					<i class="fas fa-tint" />
					<label>Luftfuktighet:</label>
					<value>
						<span id="flem-humidity">{weather.Skodje.hum}</span>
						%</value
					>
				</div>
				<div class="parameter">
					<i class="fas fa-cloud-showers-heavy" />
					<label>Nedbør nå:</label>
					<value>
						<span id="flem-rain">{weather.Skodje.rrate}</span>
						mm/t</value
					>
				</div>
				<div class="parameter">
					<i class="fas fa-cloud" />
					<label>Regn totalt i dag:</label>
					<value>
						<span id="flem-total-rain">{weather.Skodje.rfall}</span>
						mm</value
					>
				</div>
			</div>
			<div class="parameter-box">
				<div class="parameter">
					<i class="fas fa-wind" />
					<label>Vindhastighet (middelvind):</label>
					<value>
						<span id="flem-wind-speed">{weather.Skodje.wlatest}</span>
						m/s</value
					>
				</div>
				<div class="parameter">
					<i class="fas fa-wind" />
					<label>Vindhastighet (sanntid):</label>
					<value>
						<span id="flem-wind-speed-now">{weather.Skodje.wspeed}</span>
						m/s</value
					>
				</div>
				<div class="parameter">
					<i class="fas fa-wind" />
					<label>Høyeste vindkast i dag:</label>
					<value>
						<span id="flem-wind-gust">{weather.Skodje.wgust}</span>
						m/s</value
					>
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
</style>
