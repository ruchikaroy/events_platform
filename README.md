# Events App

Welcome to the **Events App**, a platform where users can browse community events, sign in using their Google account, sign up for events, and add them to their personal calendar. Admin users also have access to create and delete events, giving them full control over the event listings.

This app integrates with Eventbrite for event retrieval, creation, and deletion, providing users with a rich and up-to-date event experience.

---

## Features

- **Browse Community Events:** View a variety of community events in a user-friendly interface.
- **Google Sign-In:** Sign in securely using your Google account.
- **Sign Up for Events:** Easily register for events you're interested in.
- **Add Events to Calendar:** Add events directly to your personal calendar with a single click.
- **Admin Access:** Admins can create new events and delete existing ones via the admin panel.
- **Eventbrite Integration:** Pulls in real-time event data from Eventbrite to ensure the app stays up to date with the latest events.

  ***

## Setup Instructions
To get started with this project, follow these steps:

- Prerequisites
  Make sure you have the following tools installed:

- Node.js (version 14 or higher)
- npm or Yarn
- Google Developer Console Account to set up Google OAuth credentials for sign in
- Eventbrite API key (you can get it by creating an account on Eventbrite and accessing the Developer section)

## Clone the Repository
First, clone the repository:

- git clone https://github.com/yourusername/events-app.git
- cd events-app

## Install Dependencies
Install the required dependencies:

- npm install or if yarn install

## Set Up Environment Variables:

Create a .env file in the root directory of the project and add the following variables:

**Google OAuth credentials**

GOOGLE_CLIENT_ID=your-google-client-id

GOOGLE_CLIENT_SECRET=your-google-client-secret

**Eventbrite API credentials**

EVENTBRITE_API_KEY=your-eventbrite-api-key

**Your server URL**

REACT_APP_API_URL=http://localhost:5000

You will need to replace your-google-client-id, your-google-client-secret, and your-eventbrite-api-key with your actual credentials. You can get these from Google Developer Console and Eventbrite.

## Run the App

Now you can run the development server:
npm run dev

---

## Admin Access

To access the admin panel and manage events, you must be logged in as an admin. You can implement your admin system based on the user roles after integrating authentication. Admins will have access to create new events or delete them directly from the app's interface.

---

## Tech Stack

- Frontend: React, TypeScript, Tailwind CSS
- API Integration: Eventbrite API
- Build Tool: Vite

---
