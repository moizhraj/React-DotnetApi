import { LogLevel } from '@azure/msal-browser';

export const msalConfig = {
	auth: {
		clientId: '{FRONTEND_CLIEND_ID}',
		authority: 'https://login.microsoftonline.com/{TENANT_ID}/',
		redirectUri: '/',
		postLogoutRedirectUri: '/',
		navigateToLoginRequestUrl: false
	},
	cache: {
		cacheLocation: 'sessionStorage',
		storeAuthStateInCookie: false
	},
	system: {
		loggerOptions: {
			loggerCallback: (level, message, containsPii) => {
				if(containsPii)
					return;

					switch(level) {
						case LogLevel.Error:
							console.error(message);
							return;
						case LogLevel.Info:
							console.info(message);
							return;
						case LogLevel.Verbose:
							console.debug(message);
							return;
						case LogLevel.Warning:
							console.warn(message);
							return;
						default:
							return;
					}
			}
		}
	}
};

export const loginRequest = {
	scopes: ["profile", "api://{API_CLIENT_ID}/App.Read", "api://{API_CLIENT_ID}/App.ReadWrite"],
}

