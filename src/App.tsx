import "./App.scss";
import { useState } from "react";

function App() {
  const [message, setMessage] = useState("test");
  return (
    <div className="App">
      <h1>Demo zustand</h1>
      <main>
        <section className="controlArea">
          <div className="data">
            <label>Message:</label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </section>
      </main>
      <p>Welcome to this site.</p>
      <p>Message: {message}</p>
    </div>
  );
}

export default App;
