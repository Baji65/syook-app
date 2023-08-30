import React, { useEffect, useState } from 'react';
import {io} from 'socket.io-client';

const socket = io('http://localhost:4000'); // Replace with your listener URL

function App() {
  const [data, setData] = useState([]);
  const [successRate, setSuccessRate] = useState(0);
  const [uniqueData, setUniqueData] = useState(new Set());
  
  useEffect(() => {
    socket.on('successRate', newSuccessRate => {
      setSuccessRate(newSuccessRate);
    });
  },[successRate]);
    
    useEffect(() => {
    socket.on('decryptedDataToFrontend', decryptedData => {
      console.log('Received decrypted data from backend:', decryptedData);

      // Add the received data to the Set
      setUniqueData(prevData => new Set([...prevData, decryptedData]));

      // Convert the Set back to an array for rendering
      const uniqueDataArray = Array.from(uniqueData);
      setData(uniqueDataArray);
    });
  }, [uniqueData]);
   
    /*useEffect(() => {
      // Listen for the "decryptedDataToFrontend" event
      socket.on('decryptedDataToFrontend', decryptedData => {
        console.log( decryptedData);
        // Process and display the received data as needed
        setData(prevData=>[...prevData,decryptedData]);
        
      });
      
      // ...
    }, []);*/


  

  return (
    <div className="App">
      <h1>Real-Time Data Display</h1>
      <p>Success Rate: {successRate}%</p>
      <ul>
      
        {data.map((item, index) => (
          <li key={index}>
            <p>Name: {item.name}</p>
            <p>Origin: {item.origin}</p>
            <p>Destination: {item.destination}</p>
           
          </li>
        ))}
      </ul>
    </div>
  );
}


export default App;
