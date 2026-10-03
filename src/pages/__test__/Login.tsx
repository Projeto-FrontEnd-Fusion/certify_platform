import { useState } from 'react';
import { useLoginAuth } from '@/hooks/Auth/useLoginAuth';
import type { LoginSchemaType } from '@/schemas/Login';
import { useAuthStoreData } from '@/stores/useAuthStore';

export function TestLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { dataAuthApi, mutate, isSuccess } = useLoginAuth();
    const { auth, authLogout } = useAuthStoreData()

    const onSubmit = () => {

        const formData: LoginSchemaType = {
            email: email,       // replace with your actual state variables
            password: password,
        };

        mutate(formData);
    };

    if(isSuccess){
        alert(JSON.stringify(dataAuthApi, null, 2));
        console.log(dataAuthApi);
    }

    return (
        <div>

            <div> AuthStoreData: {JSON.stringify(auth, null, 2)} </div>    
            
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
            />

            <br/>

            <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="senha"
            />

            <br/>
            
            <button onClick={onSubmit}>
                login
            </button>

            <br/>

            <button onClick={authLogout}>
                logout
            </button>
        </div>
    );
};
