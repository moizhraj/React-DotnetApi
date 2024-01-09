import React, { useEffect, useState } from 'react';
import { Forecast } from '../types/Forecast';
import WeatherService from '../services/WeatherService';

type WeatherForecastProps = {
	weatherService: WeatherService
}

function WeatherForecast({ weatherService }: WeatherForecastProps) {

	const [loading, setLoading] = useState<boolean>(true);
	const [forecasts, setForecasts] = useState<Array<Forecast>>([]);

	// Takes the place of componentDidMount()
	useEffect(() => {
		const populateWeatherData = async () => {
			const response = await weatherService.getAll(); // await fetch('weatherforecast');
			// const data = await response.json();
			setForecasts(response.data);
			setLoading(false);
		}

		populateWeatherData()
	}, [weatherService]);

	let contents = loading
		? <p><em>Loading...</em></p>
		: renderForecastsTable(forecasts);

	return (
		<div>
			<h1 id="tabelLabel" >Weather forecast</h1>
			<p>This component demonstrates fetching data from the server.</p>
			{contents}
		</div>
	);
}

const renderForecastsTable = (forecasts: Forecast[]) => {
	return (
		<table className='table table-striped' aria-labelledby="tabelLabel">
			<thead>
				<tr>
					<th>Date</th>
					<th>Temp. (C)</th>
					<th>Temp. (F)</th>
					<th>Summary</th>
				</tr>
			</thead>
			<tbody>
				{forecasts.map(forecast =>
					<tr key={forecast.date}>
						<td>{forecast.date}</td>
						<td>{forecast.temperatureC}</td>
						<td>{forecast.temperatureF}</td>
						<td>{forecast.summary}</td>
					</tr>
				)}
			</tbody>
		</table>
	);
}

export { WeatherForecast };