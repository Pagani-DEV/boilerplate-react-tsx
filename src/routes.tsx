import { Routes, Route, Outlet, Navigate} from 'react-router-dom';
import Main from './views/Main/Index';
import GlobalContextProvider from './context/GlobalContextProvider';
import useUser from './hooks/useUser';

type Props = {
    redirectTo: string;
}

function ProtectedRoutes({redirectTo}: Props) {

    const { token } = useUser();

    return token ? <Outlet/> : <Navigate to={redirectTo}/>

}

function MainRoutes() {
    return (
        <GlobalContextProvider>
            <Routes>
                <Route path='/' element={<h1>SignIn</h1>} />

                <Route element={<ProtectedRoutes redirectTo='/' />}>
                    <Route path='/main' element={<Main/>}/>
                </Route>

                <Route path='*' element={<h1>404 Not found</h1>} />
            </Routes>
        </GlobalContextProvider>
    )
}

export default MainRoutes;