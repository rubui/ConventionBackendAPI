# ConventionBackendAPI
An API to manage talks, attendees, and speakers for a convention

# Set Up
Add your information for MongoDB in the .env file to connect to the database 

# Routes

## /attendees
### /post
Creates an attendee using the request provided. Verifies for a unique email address.

### /get
If no query is specified, returns all attendees in the collection. If ?days=n is provided as a query, returns attendees who registered in the last n days.

## /attendees/:id

### /get
Returns the information of the attendee whose id was provided.

### /delete
Deletes the attendee whose id is provided from the collection

### /put
Updates the information of the attendee whose id was provided using the request sent.

## /talks
### /post
Creates a talk using the provided information through the request.

### /get
Returns all talks from the collection.

## /talks/:id

### /get
Returns the information of the talk whose id was provided.

### /delete
Deletes the talk whose id is provided from the collection

### /put
Updates the information of the talk whose id was provided using the request sent.

## /talks/:id/add
### /patch
Updates the attendees of the talk whose id is provided. Not fully functional!

# What Else Needs to Be Done:
Overall, the API needs more validation and sanitization of the data coming in and more constraints should be added to the existing schema.
I would like to add models, routes, and a controller for the speakers too.
The fuctionality to update attendees in talks needs to be fixed. I wasn't sure if the right way to go about this. I was indecisive regarding whether to combine or separate functionality in the case that an attendee did or did not already exist in the collection and didn't quite finish. 
Look over the current nested Schema and re-evaluate if this is the right way to go about this, potentially need to look into using dependency injection for the type of relationship described.

# Assumption
Emails for all attendees must be unique.
