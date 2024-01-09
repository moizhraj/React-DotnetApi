import React from 'react';
import { Route, Routes } from 'react-router';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';
import { MsalProvider, AuthenticatedTemplate, useMsal, UnauthenticatedTemplate } from '@azure/msal-react';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { WeatherForecast } from './components/WeatherForecast';
import { Counter } from './components/Counter';

import './custom.css'
import TokenService from './services/TokenService';
import WeatherService from './services/WeatherService';

const MainContent = () => {
	const { instance } = useMsal();
	const activeAccount = instance.getActiveAccount();
	let authService = new TokenService(instance);
	let weatherService = new WeatherService(authService);

	return(
		<div className='App'>
			<AuthenticatedTemplate>
				{activeAccount ? (
					<Layout tokenService={authService}>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/counter' element={<Counter />} />
							<Route path='/weather-forecast' element={<WeatherForecast weatherService={weatherService} />} />
						</Routes>
					</Layout>
				) : null }
			</AuthenticatedTemplate>
			<UnauthenticatedTemplate>
				<Layout tokenService={authService}>
					<Routes>
						<Route path='/' element={<Home />} />
					</Routes>
				</Layout>
			</UnauthenticatedTemplate>
		</div>
	);
}

const App = ({ instance }) => {
	return (
		<FluentProvider theme={teamsLightTheme}>
			<MsalProvider instance={instance}>
				<MainContent />
			</MsalProvider>
		</FluentProvider>
		
	);
}

export default App;