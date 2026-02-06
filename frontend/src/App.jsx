import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import SideDrawer from './components/SideDrawer';

import Home from './pages/Home';
import Father from './pages/Father';
import Mother from './pages/Mother';
import Chaea from './pages/Chaea';
import Sua from './pages/Sua';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <SideDrawer />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/father" element={<Father />} />
          <Route path="/mother" element={<Mother />} />
          <Route path="/chaea" element={<Chaea />} />
          <Route path="/sua" element={<Sua />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
