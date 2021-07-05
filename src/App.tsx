// import { Button } from "./components/Button";
import { BrowserRouter, Route } from 'react-router-dom';
//precisa add types/react-router-dom em -d por causa do TS

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { AuthContexProvider } from './contexts/AuthContext';




function App() {
  
  return (
    <BrowserRouter>
    <AuthContexProvider>   
      <Route path="/" exact component={Home} />
      <Route path="/rooms/new" component={NewRoom} />
    </AuthContexProvider>
    </BrowserRouter> 
  );
}

export default App;
 