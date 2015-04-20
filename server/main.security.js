Files.files.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
Attributes.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
Collections.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
	