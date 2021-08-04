import {useState, useEffect, createContext } from "react";
import firebase from "firebase";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        function loadStorage(){
            const storageUser = localStorage.getItem('SystemUser');
            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            setLoading(false);
        }
        loadStorage();
    }, [])

    return (
        <AuthContext.Provider value={{signed: !!user, user, loading}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;