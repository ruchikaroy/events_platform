# Events App

**Events App** is a platform where users can browse community events, sign in using their Google account, sign up for events, and add them to their personal google calendar. Admin users also have access to create and delete events, giving them full control over the event listings.

This app integrates with Eventbrite for event retrieval, creation, and deletion.

🔗 Live App: [Events App](https://rr-events-biz.netlify.app/)

---

### 🚀 Features

✅ **General Features**

- **Browse Community Events:** View a variety of community events in a user-friendly interface.
- **Sign in:** Sign in securely using Email and Password or your Google account.
- **Sign Up for Events:** Easily register for events you're interested in.
- **Add Events to Google Calendar:** Add events to your personal Google calendar.

🔑 **Admin Features**

- **Admin Access:** Admins can create new events and delete existing ones via the admin panel.
- **Soft Delete Functionality:** The delete functionality will unpublish the event (soft delete).
- **Eventbrite Integration:** Pulls in real-time event data from Eventbrite to ensure the app stays up to date with the latest events. These events are all private events, not public ones.

🔒 **Authentication & Database**

- **Supabase** manages authentication tokens and database operations.

---

### 🔐 User & Admin Login Instructions

👤 **User Login:**

- Use your **personal Gmail account** or create a new account.
- Alternatively, use the **test user credentials**
  - **Email:** `general.role2025@gmail.com`
  - **Password:** `eventbrite2025`
- This will take you "/eventslist" page where you can browse events, register and add events to your Google Calendar

🛠️ **Admin Login:**

- Use the admin credentials:

  - **Email:** `roymanagement369@gmail.com`
  - **Password:** `eventbrite2025`

- This will take you "/eventslist" page where you can create and delete events

---

### 🛠️ Setup Instructions

To get started with this project, follow these steps:

1️⃣ **Prerequisites**: Make sure you have the following tools installed:

- Node.js (version 14 or higher)
- npm or Yarn
- Google Developer Console Account to set up Google OAuth credentials for sign in
- Eventbrite API key (you can get it by creating an account on Eventbrite and accessing the Developer section)

2️⃣ **Clone the Repository**: First, clone the repository:

```
- git clone https://github.com/yourusername/events-app.git
- cd events-app
```

3️⃣ **Install Dependencies**: Install the required dependencies:

```
- npm install or if yarn install
```

4️⃣ **Set Up Environment Variables**:<br/>
Create a .env file in the root directory of the project and add the following variables:

- Google OAuth credentials
  - GOOGLE_CLIENT_ID=your-google-client-id
  - GOOGLE_CLIENT_SECRET=your-google-client-secret
- Eventbrite API credentials
  - EVENTBRITE_API_KEY=your-eventbrite-api-key

You will need to replace `your-google-client-id`, `your-google-client-secret`, and `your-eventbrite-api-key` with your actual credentials. You can get these from Google Developer Console and Eventbrite.

5️⃣ **Run the App**<br/>
Now you can run the development server:

```
npm run dev
```

---

## 📌 Tech Stack
| Technology          | Description                     |
| ------------------- | ------------------------------- |
| **Frontend**        | React, TypeScript, Tailwind CSS |
| **API Integration** | Eventbrite API                  |
| **Authentication**  | Google OAuth via Supabase       |
| **Build Tool**      | Vite                            |
