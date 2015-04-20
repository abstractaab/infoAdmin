//Images.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
Files.files.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
Attributes.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
Collections.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
	