# AgoraChat Documentation

## Introduction

AgoraChat is a React Native application designed for instant messaging using the Agora Chat SDK. This documentation provides an overview of the application's architecture, key functionalities, and setup instructions.

### Prerequisites

Before proceeding, ensure that you have the following:

- https://docs.agora.io/en/agora-chat/get-started/get-started-sdk?platform=react-native#prerequisites
- A valid Agora account.
- An Agora project for which you have enabled Chat.
- The App Key for the project.
- Internet access.
- Ensure that no firewall is blocking your network communication.

**For iOS Platform:**

- macOS 10.15.7 or later
- Xcode 12.4 or later, including command line tools
- React Native 0.63.4 or later
- NodeJs 16 or later, including npm package management tool
- CocoaPods package management tool
- Yarn compile and run tool
- Watchman debugging tool
- A physical or virtual mobile device running iOS 10.0 or later

**For Android Platform:**

- macOS 10.15.7 or later, or Windows 10 or later
- Android Studio 4.0 or later, including JDK 1.8 or later
- React Native 0.63.4 or later
- CocoaPods package management tool (if your operating system is macOS)
- Powershell 5.1 or later (if your operating system is Windows)
- NodeJs 16 or later, including npm package management tool
- Yarn compile and run tool
- Watchman debugging tool
- A physical or virtual mobile device running Android 6.0 or later

### Troubleshooting

If you encounter issues related to CMake during the setup process, follow these steps to resolve them:

1. **Download CMake:** Follow the instructions provided in [this Stack Overflow thread](https://stackoverflow.com/questions/71853200/cmake-3-10-2-not-found-in-sdk-path-or-by-cmake-dir-prop).

## Dependencies

- **React:** ^18.2.0
- **React Native:** ^0.73.6
- **React Native Agora Chat:** ^1.2.1

## Usage

### Initialization

The initialization process involves setting up the Chat SDK with the provided app key. It includes registering listeners for connection events and message reception.

#### Functions:

- `init()`: Initializes the Chat SDK with the provided app key.

### Login

The login process authenticates the user with their username and chat token.

#### Functions:

- `login()`: Logs in the user with the provided username and chat token.

### Logout

The logout process terminates the user's session on the chat server.

#### Functions:

- `logout()`: Logs out the user from the chat server.

### Send Message

Allows users to send text messages to specific recipients.

#### Functions:

- `sendmsg()`: Sends a text message to a specified target user.

### Receive Message

Enables users to receive incoming messages.

#### Functions:

- `receiveMessage()`: Sets up a listener to receive incoming messages.

## UI Components

The application's user interface consists of various components for input fields, buttons, and display areas.

### Components:

- **TextInput**: Input fields for username, chat token, target user ID, and message content.
- **Text**: Display components for titles, buttons, and log area.
- **ScrollView**: Container for scrolling through input fields and log area.

## Scripts

Scripts for running, testing, and linting the application.

### Commands:

- **android**: Runs the application on Android devices.
- **ios**: Runs the application on iOS devices.
- **lint**: Runs ESLint for code linting.
- **start**: Starts the React Native packager.
- **test**: Runs Jest for testing.

## Installation

Instructions for installing and running the application.

1. Clone the repository.
2. Install dependencies using `npm install` or `yarn install`.
3. Run the application using `npm start` or `yarn start`.
4. For Android, use `npm run android` or `yarn android`.
5. For iOS, use `npm run ios` or `yarn ios`.

## Conclusion

By following the provided instructions, users can effectively set up and utilize AgoraChat for instant messaging in their React Native applications.
