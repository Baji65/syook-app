# syook-app
# Real-Time Data Streaming and Display

This project demonstrates a real-time data streaming application using Socket.io for communication between an emitter service and a listener service. The data is encrypted using AES-256-CTR and decrypted on the listener side. Validated data is saved in a MongoDB database for time-series analysis, and the decrypted data is displayed in a React frontend app.

## Features

- Real-time data streaming using Socket.io
- Data encryption and decryption using AES-256-CTR
- Data validation using secret keys
- Saving validated data to MongoDB for time-series analysis
- Displaying decrypted data in a React frontend app
- Displaying success rate of data transmission and processing

## Setup Instructions

### Emitter Service

1. Clone this repository.
2. Navigate to the `emitter` directory.
3. Install dependencies: `npm install`
4. Configure environment variables in `.env` file.
5. Start the emitter service: `npm run dev`



### Frontend App

1. Navigate to the `frontend` directory.
2. Install dependencies: `npm install`
3. Configure Socket.io endpoint in `App.js`.
4. Start the frontend app: `npm start`

## Project Structure

- `emitter/` - Emitter service code.
- `listener/` - Listener service code.
- `frontend/` - Frontend app code.
- `models/` - MongoDB models for data schema.
- `data.json` - Sample data for generating messages.
- `README.md` - Project documentation.

## Technologies Used

- Node.js
- Express.js
- Socket.io
- MongoDB
- React
- AES-256-CTR Encryption
- CORS for Cross-Origin Resource Sharing

## Contributions

Contributions are welcome! If you find any issues or want to add new features, feel free to open a pull request.


