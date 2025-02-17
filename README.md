# Events App

Welcome to the **Events App**, a platform where users can browse community events, sign in using their Google account, sign up for events, and add them to their personal google calendar. Admin users also have access to create and delete events, giving them full control over the event listings.

This app integrates with Eventbrite for event retrieval, creation, and deletion, providing users with a rich and up-to-date event experience.

Hosted link: [Events App](https://rr-events-biz.netlify.app/)


---

### Features

- **Browse Community Events:** View a variety of community events in a user-friendly interface.
- **Google Sign-In:** Sign in securely using your Google account.
- **Sign Up for Events:** Easily register for events you're interested in.
- **Add Events to Calendar:** Add events directly to your personal Google calendar with a single click.
- **Admin Access:** Admins can create new events and delete existing ones via the admin panel.The delete functionality will unpublish the event (soft delete).
- **Eventbrite Integration:** Pulls in real-time event data from Eventbrite to ensure the app stays up to date with the latest events. These events are all private events, not public ones.
- **Supabase** manages authentication tokens and database operations.

***

### Steps for User and Admin login
1. **User Login:**
   - Click on User Login button
   - You can either your personal gmail account for login or use dummy user login credentials which is email address: general.role2025@gmail.com / password: eventbrite2025
   - This will take you "/eventslist" page where you can browse events, register and add to calendar which means login is successful
3. **Admin Login:**
   - Click on Admin Login button
   - Enter admin login credentials which is email address: roymanagement369@gmail.com and password: eventbrite2025
   - This will take you to "/admin" page 
   - Enter admin login email and user id which is:
      - login email address: roymanagement369@gmail.com
      - user id: 2593058948991
   - This will take you "/eventslist" page where you can create and delete events
     
 ***

### Setup Instructions
To get started with this project, follow these steps:

1. **Prerequisites**: Make sure you have the following tools installed:
   - Node.js (version 14 or higher)
   - npm or Yarn
   - Google Developer Console Account to set up Google OAuth credentials for sign in
   - Eventbrite API key (you can get it by creating an account on Eventbrite and accessing the Developer section)

2. **Clone the Repository**: First, clone the repository:
```
- git clone https://github.com/yourusername/events-app.git
- cd events-app
```
3. **Install Dependencies**: Install the required dependencies:
```
- npm install or if yarn install
```

4. **Set Up Environment Variables**:<br/>
Create a .env file in the root directory of the project and add the following variables:
  - Google OAuth credentials
     - GOOGLE_CLIENT_ID=your-google-client-id
     - GOOGLE_CLIENT_SECRET=your-google-client-secret
  - Eventbrite API credentials
    - EVENTBRITE_API_KEY=your-eventbrite-api-key

You will need to replace `your-google-client-id`, `your-google-client-secret`, and `your-eventbrite-api-key` with your actual credentials. You can get these from Google Developer Console and Eventbrite.

5. **Run the App**<br/>
Now you can run the development server:
```
npm run dev
```

---

## Tech Stack

- Frontend: React, TypeScript, Tailwind CSS
- API Integration: Eventbrite API
- Build Tool: Vite

---
