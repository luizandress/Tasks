import { useEffect } from "react";
import { RouteIndex } from "./routes";
import { firebaseInitialize } from './services/firebaseConfig';
function App() {

  useEffect(() => {
    firebaseInitialize();
  }, []);

  return (
    <RouteIndex />
  )
}

export default App
