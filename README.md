A multi-user React Native application allowing students to join chatrooms dedicated to courses in the current university semester. Course data was obtained from the Rutgers University online course catalog through Selenium webdriver.


React-redux-firebase bindings are used to sync app state with firebase state.


This application uses Google Firestore as well as Firebase for storage, and Redux for state management.

## Authentication
Sign up or log in to your existing account. User information is authenticated using Email Link via Google Firebase Authentication. <br />
![](SignUp.gif)
<br /><br />


## Firestore Integration

Find an open chatroom or join an open one. Subject and course data is populated from the Rutgers University course catalog and stored in Google's Cloud Firestore.<br /><br />
![](AddChat.gif)

Edit your display name within chatrooms, and change your user avatar by picking an image from the device's camera roll. User settings are updated in Firestore and avatars in Firebase Storage upon clicking 'Done'.<br /><br />
![](EditSettings.gif)

After joining a chatroom, users can send messages eachother. The messaging UI is provided by the Gifted Chat library, and past messages are stored in Firestore.<br />

Image support is planned for future release, as well as past message updates ( such as when the user changes their name/avatar ).
<br /><br />
![](SendMessages.gif)

Sign out of your account to return to the login screen.<br />
![](SignOut.gif)
<br />



