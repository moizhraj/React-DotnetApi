# dotnetreact
Boilerplate template with Dotnet core API and React app built with dotnet app

## Step 1: Web API Entra ID Configuration
- Create a new app registration
- Under Manage > Expose an API, click on the "Application ID URI" at the top to create the application URI e.g. api://{CLIENT_ID}.
- Under Manage > Expose an API, add scopes that your web API will accept. 
  - "App.Read" and "App.ReadWrite" with "Who can consent": "Admin and users", "Admin consent display name": "Read and write users request using API", "Admin consent description": "Allow the app to read and write the users request using the API". Same for User consent text.
  - Under Manage > App roles, create app roles that your api will use. i.e. "App Admin", "App User". Allowed membership: Users/Groups. Once the roles are created, you can click on those roles, this opens up a side panel and provides information on how to aassign users, groups and apps to the roles. Follow the instructions (Mostly can be assigned in the Enterprise App Registrations)
  - Under Manage > Manifest, update the value for "accessTokenAcceptedVersion" to "2".

## Step 2: Client App Entra ID Configuration
- Create a new app registration
- Under Manage > Authentication, click "Add a platform" and select type as "Single-page Application".
- Under Manage > API Permissions, click "Add a permission", then select "My APIs" tab and select the Web API App you created above in Step 1. Select the listed permissions/Scopes for that API app.
- Under Manage > Manifest, update the value for accessTokenAcceptedVersion to "2".

## Step 3: Authorize client app for Web API
- Open the Service Principle that belongs to your Web API
- Under Manage > Expose an API, click on "Add a client application" and input the app/client id of your Client app you created in step 2 above. Also select all the authorized scopes required for the client app.