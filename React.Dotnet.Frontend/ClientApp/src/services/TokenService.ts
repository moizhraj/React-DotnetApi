import { AccountInfo, Configuration, AuthenticationResult, PublicClientApplication, SilentRequest, RedirectRequest, EndSessionRequest, IPublicClientApplication } from "@azure/msal-browser";

class TokenService {

	// msal application object
	msalInstance: IPublicClientApplication;
	// cached account info
	account?: AccountInfo;

	constructor(_msalInstance: IPublicClientApplication) {
		if(!_msalInstance)
			throw new Error('The msalInstance is not valid.');

		this.msalInstance = _msalInstance;
		this.account = this.msalInstance.getActiveAccount()!;
	}

	// HandlePageLoadEvent(): Promise<void> {
	// 	// let exceptions bubble up to the caller to handle
	// 	return this.msalInstance.handleRedirectPromise().then((authResult: AuthenticationResult | null) => {
	// 		this.HandleRedirectResponse(authResult);
	// 	});
	// }

	// HandleRedirectResponse(authResult: AuthenticationResult | null): void {
	// 	// if this page load is redirect from the Microsoft Identity platform then the
	// 	// authResult will be populated. Otherwise null on other page loads.

	// 	if (authResult !== null) {
	// 		// save the fresh account info from the result.
	// 		this.account = authResult.account;
	// 	}
	// 	else {
	// 		// see if we have cached accounts.
	// 		const currentAccounts = this.msalInstance.getAllAccounts();

	// 		if (currentAccounts === null) {
	// 			// no cached accounts. 
	// 			// user will need to click the sign-in button and redirect to login.
	// 			return;
	// 		}
	// 		else if (currentAccounts.length > 1) {
	// 			// there are some situations where the user may have multiple (different) cached logins.
	// 			// this code sample does not cover that scenario but just logs a warning here.
	// 			// this conditional block would need to be updated to support multiple accounts.
	// 			// otherwise it will just grab the first one below.
	// 			console.warn("Multiple accounts detected in MSAL account cache.");
	// 			this.account = currentAccounts[0];
	// 		}
	// 		else if (currentAccounts.length === 1) {
	// 			// we have exactly 1 cached account.
	// 			// set the account info. user may not need to sign in.
	// 			this.account = currentAccounts[0];
	// 		}
	// 	}
	// }
	
	// GetMsalClientConfiguration(): Configuration {
	// 	return {
	// 		auth: {
	// 			clientId: process.env.REACT_APP_MSAL_CLIENT_ID as string,
	// 			authority: process.env.REACT_APP_MSAL_TENANT_AUTHORITY_URI as string,
	// 			redirectUri: process.env.REACT_APP_MSAL_LOGIN_REDIRECT_URI as string
	// 		},
	// 		cache: {
	// 			cacheLocation: process.env.REACT_APP_MSAL_CACHE_LOCATION as string,
	// 			storeAuthStateInCookie: (process.env.REACT_APP_MSAL_AUTH_STATE_IN_COOKIE as string) === 'true' ? true : false
	// 		}
	// 	}
	// }

	GetToken(): Promise<AuthenticationResult> {
		let tokenRequest: SilentRequest = {
			account: this.account as AccountInfo,
			scopes: [ process.env.REACT_APP_MSAL_CLIENT_SCOPE as string ]
		}
		
		// msal will return the cached token if present, or call to get a new one
		// if it is expired or near expiring.
		return this.msalInstance.acquireTokenSilent(tokenRequest);
	}

	// SignIn() {
	// 	let loginRedirectRequestPayload: RedirectRequest = {
	// 		scopes: [ process.env.REACT_APP_MSAL_CLIENT_SCOPE as string ],
	// 		prompt: "select_account"
	// 	}

	// 	// this will redirect the web application to the Microsoft Identity platform sign in pages.
	// 	// no code will execute after this point.
	// 	this.msalInstance.loginRedirect(loginRedirectRequestPayload);
	// }

	// SignOut() {
	// 	if (!this.account) {
	// 		// no cached login to signout
	// 		return;
	// 	}

	// 	let accountInfo: AccountInfo | null = this.msalInstance.getAccountByUsername(this.account?.username as string);

	// 	if (accountInfo !== null) {
	// 		let logoutRequestPayload: EndSessionRequest = {
	// 			account: accountInfo
	// 		}
	
	// 		this.msalInstance.logout(logoutRequestPayload)
	// 	}
	// }
}

export default TokenService;