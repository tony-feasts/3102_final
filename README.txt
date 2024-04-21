Back-End:

There is a folder named 'server' with a file named 'index.js' in it. This 
Node.js application acts as a backend for a note-taking service, utilizing the
Express framework to handle HTTP interactions and Mongoose for MongoDB
database operations. It initializes middleware for JSON body parsing and
cross-origin resource sharing, facilitating communication with client-side
applications. The MongoDB connection is established with a URI containing the
required credentials, pointing to the "Keeper" database where notes are stored.

Functionalities are accessible via three endpoints: a GET endpoint retrieves
notes for a user specified by a userId query parameter, a POST endpoint at
/api adds new notes to the database from request body data, and a DELETE
endpoint removes a note by its unique identifier. Notes data is structured using
a Mongoose schema with userId, title, and content fields, ensuring data
consistency across the application.

Upon launch, the app listens on port 5000 and signals readiness through a
console log. Its architecture lays a foundation for scalability and security,
ready for further development to incorporate additional features like user
authentication, improved data validation, and expanded query functionality.

Front-End:

There is a folder named 'client' containing a folder called 'src'. Within this
folder, there is a folder named 'components'. This folder contains all the react
components that are being used on the front-end. 

The App component serves as the core of the React-based web application, 
managing user authentication and note functionalities. It imports essential 
React hooks such as useState and useEffect for managing state and life-cycle 
events, alongside UI components and authentication functions. This component 
controls several state variables to handle user data, inputs for email and 
password, an array of notes, and fields for note inputs.

The useEffect hook is used to monitor changes in authentication status with 
onAuthChange, updating the user state as needed. Another useEffect is 
configured to fetch notes specific to the user from the server when there 
is a change in the user state. The handleAuth function is tasked with managing 
user login attempts, opting to register the user if initial login attempts 
fail. The handleLogout function effectively clears the user session and resets 
associated state variables.

In terms of note management, handleChange updates the state based on user 
inputs for new notes, addNote handles the submission of these notes to the 
server and updates the local list of notes, and deleteNote removes a note from 
the server and updates the state to reflect this. The component's rendering 
logic is contingent on the user's authentication status; it displays a form 
for creating notes, lists existing notes, and a logout button when the user 
is logged in. If the user is not logged in, it presents a login form. This 
architecture ensures seamless integration of user management and note 
management functions essential for the operations of the Keeper app.


Key Developments:

1. created a repo for the final on github
2. made client and server directories in the cloned repo
3. copied the contents from the midterm to the client folder
4. installed react-scripts and used node to test the front-end code locally
5. initialized the server folder with npm; installed cors, express, & mongoose
6. set up a mongodb cluster with a database with a notes collection
7. implemented index.js in the server directory
8. added a proxy to the client's package.json
9. implemented App.jsx in the client directory
10. set up a firebase project with a web app on the firebase website
11. installed firebase with npm
12. imported firebase functions and connected to firebase app
13. imported server directory from github to glitch
14. added a start script to package.json in server
15. made the server listen on port env variable
16. added backend url env varible to client
17. installed glitch dependencies (body parser and then npm install)
18. added engine to server package.json so glitch works