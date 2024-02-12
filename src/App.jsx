import * as React from "react";

function App() {
  const [message, setMessage] = React.useState({});

  React.useEffect(() => {
    fetch("http://localhost:5500/")
      .then(res => {
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setMessage(data);
      })
      .catch(error => {
        
        console.error("There was a problem with the fetch operation:", error.message);
      });
  }, []); 

  return (
    <div>
      <h1>TEST HELLO WORLD</h1>
      <pre>{JSON.stringify(message, null, 2)}</pre>
    </div>
  );
}

export default App;
