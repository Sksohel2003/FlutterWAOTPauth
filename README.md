### WhatsApp OTP Authentication using Flutter + Node.js

Authenticate users using their phone numbers via WhatsApp OTP. If a user is new, register them; otherwise, log them in. Built using:

Flutter (Frontend)
Node.js + Express (Backend)
Twilio (WhatsApp Messaging)
MongoDB (Database)

---

Features

 WhatsApp OTP-based login  
 Auto OTP verification  
 New user registration with name/email  
 Existing user auto-login  
 MongoDB storage  
 Attractive UI with background and custom font  
 Flutter-Web compatible  
 Clean and scalable folder structure  

---

Folder Structure

frontend
```
flutter_app/ → Flutter frontend
├── lib/
│ ├── main.dart → App entry point
│ ├── screens/ → UI screens (input, OTP, register, home)
│ ├── services/ → API service layer (calls Node.js)
│ └── widgets/ → Reusable components (optional)
├── assets/
│ ├── fonts/ → Custom font (Poppins)
│ └── images/ → Background image
└── pubspec.yaml → Flutter config
```

backend

```
backend/ → Node.js backend
├── controllers/ → Logic (sendOtp, verifyOtp, registerUser)
│ └── authController.js
├── models/ → Mongoose schema (User.js)
├── routes/ → Auth routes
├── utils/ → Twilio client + OTP generator
├── .env → Environment secrets (Twilio credentials)
├── app.js → Entry point for backend server
└── package.json → Node dependencies
```

 Setup Instructions

 Backend (Node.js)

1. Go to backend directory:
   ```
   cd backend
   ```
Install dependencies:
```
npm install
```
Add a .env file:

env contains
```
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=whatsapp:+14155238886
MONGO_URI=your_mongodb_connection_string
```
Start backend:
```
node server.js
```
Server will run on http://localhost:5000

Frontend (Flutter)
Navigate to Flutter app:

```
cd flutter_app
```
Install packages:
```
flutter pub get
```
Add custom font & background image:

```
assets/fonts/Poppins-Regular.ttf

assets/images/bg.jpg
```

Run app (Chrome or emulator):
```
flutter run -d chrome
```
How It Works
1. User Enters Phone Number
Flutter UI collects phone number and calls the backend via /send-otp.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/7156714e-5f1e-4716-8c3b-95828e28c768" />


2.  Backend Generates OTP
Random OTP is generated and stored temporarily in memory.

Twilio API sends OTP to user via WhatsApp.


3.  User Enters OTP
OTP is verified on /verify-otp.

If correct → check user in DB:

✅ Exists → return user info

❌ Not found → redirect to registration form

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/37afe70b-b94e-45ed-b1ab-f0129377b28c" />


4. New User Registration
Name and email fields are submitted via /register.



5. Home Screen
After login or registration, user is navigated to HomeScreen.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/22d7d27b-4b98-4eaf-ae62-b2934b4ff31d" />


 Security Notes
OTPs are stored in memory for demo. Use Redis or cache with expiry in production.

.env file is used to secure credentials.

HTTPS + rate limiting is recommended in production.

##  Twilio Free Trial Limitations

If you're using a **Twilio Free Trial account**, you should be aware of the following restrictions:

-  You can **only send messages to verified phone numbers** added in your Twilio console.
-  You **cannot send OTPs to arbitrary/unverified numbers** until you upgrade your account.
-  The WhatsApp message will be prefixed with “Sent from your Twilio trial account”.
-  The free trial includes **$15.50 USD credit**, which is sufficient for limited testing.

###  How to Verify Numbers on Free Tier:

1. Go to your Twilio Console → [Verified Caller IDs](https://console.twilio.com/us1/develop/verified-numbers/verified-caller-ids)
2. Click **“Add a new Verified Caller ID”**
3. Enter the phone number you want to send OTPs to
4. Confirm via SMS/Call

> Once verified, you can test WhatsApp OTP with your own number or teammates'.

---

### How to Upgrade:

To send WhatsApp messages to anyone (not just verified numbers):

- Add payment method and upgrade your Twilio account.
- Enable the **WhatsApp sender** on your Twilio number.
- Follow Twilio’s [WhatsApp Business API onboarding guide](https://www.twilio.com/docs/whatsapp).





