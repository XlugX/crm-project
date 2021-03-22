import { useAuth } from './hooks/auth.hook';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import Pages from './pages';

function App() {
    const { token, login, logout, userId } = useAuth();
    const isAuthenticated = !!token;

    return <BrowserRouter>
        <UserContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
            <Pages isAuthenticated={isAuthenticated} />
        </UserContext.Provider>
    </BrowserRouter>;
}

export default App;
