import "./App.scss";
import { useStore } from "./store";
import { InfoBox } from "./components/InfoBox";
import { useRef, useEffect } from "react";
function App() {
  const techBookSearchRef = useRef<HTMLInputElement>(null);
  const store = useStore((state) => state);
  useEffect(() => {
    if (techBookSearchRef.current !== null) {
      techBookSearchRef.current.focus();
    }
  }, [store.techBooks]);

  return (
    <div className="App">
      <h1>Demo zustand</h1>
      <main>
        <section className="controlArea">
          <div className="data">
            <label>Message:</label>
            <input
              type="text"
              onChange={(e) => store.setMessage(e.target.value)}
            />
            Message: {store.message}
          </div>
          <div className="data">
            <label>Colors:</label>
            <div>
              <button onClick={() => store.addColor("blue")}>blue</button>
              <button onClick={() => store.addColor("red")}>red</button>
              <button onClick={() => store.addColor("yellow")}>yellow</button>
            </div>
            <button onClick={() => store.deleteColor()}>delete color</button>
            <button onClick={() => store.setColors([])}>
              delete all colors
            </button>
          </div>
          {/*MULTIPLE VALUES */}
          <div className="data">
            <label>Change multiple values:</label>
            <div>
              <button onClick={() => store.deleteVowelsAndColorRed()}>
                delete vowels from message and color red from colors
              </button>
            </div>
          </div>
          {/* Object */}
          <div className="data">
            <label>Object:</label>
            <div>
              <button onClick={() => store.toggleCurrentUserStatusOnline()}>
                toggle online status
              </button>
              <button onClick={() => store.toggleCurrentUserStatusEmail()}>
                toggle email status
              </button>
            </div>
          </div>
          <div className="data">
            {store.techBooks.length === 0 && (
              <div className="data">
                <label>Load data</label>
                <div>
                  <button
                    disabled={store.techBooksAreLoading}
                    onClick={() => store.loadTechBooks()}
                  >
                    load tech books
                  </button>
                </div>
              </div>
            )}

            {store.techBooks.length > 0 && (
              <div className="data">
                <label>Search tech books:</label>
                <input
                  type="text"
                  ref={techBookSearchRef}
                  value={store.techBookSearch}
                  onChange={(e) => store.setTechBookSearch(e.target.value)}
                />
              </div>
            )}
          </div>
        </section>
        <section className="dataArea">
          <InfoBox />
        </section>
      </main>
    </div>
  );
}

export default App;
