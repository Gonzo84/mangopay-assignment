# TaskMaster

Take-Home Assignment for Senior Frontend Developer (Vue 3)

## Prerequisites

- Node.js and npm installed on your system. You can download Node.js and npm from [here](https://nodejs.org/en/download/).
- An IDE like WebStorm or any text editor for code.

## Setup

1. Clone the repository to your local machine using Git. Open your terminal and run:

    ```bash
    git clone <repository-url>
    ``` 
2. Navigate into the project directory:
    
    ```bash
    cd taskmaster
    ```
3. Install the project dependencies:

    ```bash      
     npm install
     ```
   
Firebase setup:

1. Create a new project in Firebase.
2. Go to the Firebase console and click on the project you just created.
3. Click on the gear icon and go to Project settings.
4. Scroll down to the apps section and click on the web app icon.
5. Register the app and copy the Firebase SDK snippet.
6. Create a `.env` file in the root of the project and add the following environment variables:

    ```bash
    VUE_APP_FIREBASE_API_KEY=<your-firebase-api-key>
    VUE_APP_FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
    VUE_APP_FIREBASE_PROJECT_ID=<your-firebase-project-id>
    VUE_APP_FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
    VUE_APP_FIREBASE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>
    VUE_APP_FIREBASE_APP_ID=<your-firebase-app-id>
    ```
   
7. Enable Email/Password authentication in Firebase.
8. Create a Cloud Firestore database in Firebase.
9. Create a collection named `tasks` in the Cloud Firestore database.
10. Create a document in the `tasks` collection with the following fields:

    ```json
    {
      "title": "Task 1",
      "description": "Description of Task 1",
      "status": "In Progress",
      "dueDate": "2022-12-31"
    }
    ```
but to make your life easier and save time, I decided to break the first rule of internet security and leave my private Firebase credentials in the repo so that you don't need to do anything from above.

## Running the Application

1. To start the development server, run:

    ```bash
    npm run dev
    ```
   
2. Open your browser and navigate to `http://localhost:5173/` to view the application.

## Running Storybook

1. To start the Storybook server, run:

    ```bash
    npm run storybook
    ```
   
2. Open your browser and navigate to `http://localhost:6006/` to view the Storybook.
3. You can view the components in the Storybook and interact with them.
4. Views/SignIn.vue - WithError case has a Storybook Interaction Testing
5. To run all tests on stories via the command line, run:

    ```bash
    npm run test-storybook
    ```

# Design Choices and Libraries Used

## Design Choices

The application is built using a modular approach, where each component is designed to be reusable and independent. This allows for easier testing and maintenance. The application follows the Vue.js style guide for best practices.

The UI is designed to be user-friendly and intuitive. The use of Vue Router allows for seamless navigation between different views. The application also uses Vue's transition system to provide smooth animations for a better user experience.

## Libraries Used

### Vue.js

Vue.js is a progressive JavaScript framework used for building user interfaces. Its core library is focused on the view layer only, making it easy to integrate with other libraries or existing projects.

### Vue Router

Vue Router is the official router for Vue.js. It deeply integrates with Vue.js core to make building Single Page Applications a breeze.

### Pinia

Pinia is the Vue Store that's easy to use and TypeScript friendly. It's used for state management in the application.

### Firebase

Firebase is a platform developed by Google for creating mobile and web applications. It provides a real-time database and backend as a service, and is used for user authentication and data storage in the application.

### FontAwesome

FontAwesome is a font and icon toolkit based on CSS and Less. It's used for adding icons to the application.

### Vue Tailwind Datepicker

Vue Tailwind Datepicker is a lightweight and customizable datepicker component for Vue.js. It's used for date selection in the application.

### Storybook

Storybook is an open-source tool for developing UI components in isolation. It's used for building and testing the UI components in the application.

### Vite

Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects. It's used for serving and building the application.

### TypeScript

TypeScript is a strict syntactical superset of JavaScript and adds optional static typing to the language. It's used for writing the application code.

### Tailwind CSS

Tailwind CSS is a utility-first CSS framework for rapidly building custom designs. It's used for styling the application.

# Now real design choices that I made

I interacted with Firebase using service layer (communication layer) so that in the future I could change endpoints without changing anything in the components where it is used.

The architecture of the application is designed with a focus on modularity and separation of concerns. This is achieved through the use of container components, which encapsulate all the business logic and handle interactions with the communication layer. These container components serve as the main hubs of functionality, orchestrating the flow of data and events.  Furthermore, these container components communicate with their child components via props and events, ensuring a one-way data flow and making the components easier to test and maintain. This design choice promotes a clear and predictable flow of data throughout the application, enhancing its stability and reliability.

# Features implemented

1. User authentication using Firebase Email/Password authentication.
2. User registration using Firebase Email/Password authentication.
3. Error handling for displaying error messages to the user.
4. User sign-out functionality.
5. Displaying a list of tasks from the Firebase Cloud Firestore database.
6. Adding a new task to the Firebase Cloud Firestore database.
7. Datepicker for selecting the due date of a task.
8. Updating the task and task status in the Firebase Cloud Firestore database.
9. Deleting the task from the Firebase Cloud Firestore database.
10. Confirmation dialog for confirming the deletion of a task.
11. Filtering tasks based on their status (All, Pending, In Progress, Completed).
12. Sorting tasks based on their due date (Ascending, Descending).
13. Searching tasks based on their title or description.
14. Loading indicator for indicating the loading state of the application.
15. Responsive design for supporting different screen sizes.
16. Storybook for building and testing UI components in isolation.
17. Storybook Interaction Testing for testing the interaction of components in Storybook.
18. DB is seed with 3 tasks and one user "test@test.com" with password "password"