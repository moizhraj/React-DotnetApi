import http from './HttpBase'
import { Forecast }  from '../types/Forecast';
import TokenService from './TokenService';
import { AuthenticationResult, IPublicClientApplication } from '@azure/msal-browser';

class WeatherService {

    tokenService: TokenService;

    constructor(_tokenService: TokenService) {
        if(!_tokenService)
            throw new Error('The authService was not provided.');

        this.tokenService = _tokenService;
    }

    getAll() {
        return this.tokenService.GetToken()
            .then((response: AuthenticationResult) => {
                return http.get<Array<Forecast>>('/weatherforecast', {
                    headers: {
                        Authorization: `Bearer ${response.accessToken}`
                    }
                })
                .then((response: any) => {
                    return response;
                })
                .catch((error: any) => {
                    throw Error(`An error occured calling the api: ${error}`);
                });
            })
            .catch((error: any) => {
                throw Error(`An error occured: ${error}`);
            });
        // return http.get<Array<Forecast>>('/weatherforecast');
    }

    get(id: any) {
        return http.get<Forecast>(`/forecast/${id}`);
    }
};

export default WeatherService;