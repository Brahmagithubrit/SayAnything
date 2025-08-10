
# Real-Time Chat App

A simple, lightweight web application enabling real-time messaging using WebSocket technology.

## Features

* Real-time one-on-one and group chat
* Instant message delivery with low latency
* User-friendly interface with message timestamps
* Connection status indicators

## Tech Stack

* Frontend: ReactJs
* Backend: Node.js, WebSocket (ws library)

## Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/Brahmagithubrit/SayAnything.git
   ```
2. Navigate to the project folder:

  
3. Install dependencies:

   ```bash
   npm install
   ```
4. Start the server:

   ```bash
   node server.js   // for backend server 
   npm run dev  // for frontend ui
   ```


## Usage

* Open the app in multiple browser tabs or devices.
* Enter your username.
* Send messages instantly to connected users.

## How It Works

* The client connects to the server via WebSocket.
* Messages are broadcasted to all connected clients in real-time.
* The server manages active connections and relays messages efficiently.

## Future Improvements

* Add user management.
* Implement private messaging and chat rooms.
* Enhance UI/UX with better design and notifications.

