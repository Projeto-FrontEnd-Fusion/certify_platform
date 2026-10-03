import { useState } from 'react';
import { useListCertificateByUserId } from '@/hooks/Certificate/useListCertificate';
import { useAuthStoreData } from '@/stores/useAuthStore';
import { useCreateCertificate } from '@/hooks/Certificate/useCreateCertificate';
import { useCheckAvailableCertificate } from '@/hooks/Certificate/useCheckAvailable';

import type { CertificateRequest } from '@/api/@types';

function TestListCertificate() {

    const { data, isLoading, isSuccess, refetch, error} = useListCertificateByUserId();
    const { auth } = useAuthStoreData()

    return (
        <div>

            <div> AuthStoreData: {JSON.stringify(auth, null, 2)} </div>    
            
            <button onClick={() => refetch()}>
                refresh
            </button>

            <div>
                {isLoading ? (<div>carregando</div>) : 
                (!isSuccess ? 
                    (<div>{error?.message}</div>) 
                : 
                    (<div>{JSON.stringify(data, null, 2)}</div>))
                }
            </div>

        </div>
    );
};

function TestCreateCertificate() {

    const { mutate } = useCreateCertificate();


    const [id_user, setIdUser] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [event, setEvent] = useState('');

    const VITE_ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;

    const create = () => {
        const formData: CertificateRequest = {
            fullname: name,
            email: email,
            event_id: event,
            access_key: VITE_ACCESS_KEY,
            status: "pending"
        };

        mutate({userId: id_user, certificate_data: formData});
    }
    
    return (
        <div>

           <input
                type="text"
                value={id_user}
                onChange={(e) => setIdUser(e.target.value)}
                placeholder="id_user"
            />

            <br/>

            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="name"
            />

            <br/>

            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
            />

            <br/>

            <input
                type="text"
                value={event}
                onChange={(e) => setEvent(e.target.value)}
                placeholder="event"
            />

            <br/>

            <button onClick={create}>
                create
            </button>

        </div>
    );
}

function TestGetCertificate() {

    const [idCertificate, setIdCertificate] = useState('');

    const { data, isLoading, isError, error } = useCheckAvailableCertificate(idCertificate);

    return (
        <div>
            <input
                type="text"
                value={idCertificate}
                onChange={(e) => {
                        setIdCertificate(e.target.value)
                    }
                }
                placeholder="idCertificate"
            />

            <div>
                {isLoading ? "carregando" : 
                    isError ? error?.message :
                    JSON.stringify(data, null, 2)
                }
            </div>

        </div>
    )

}


export function TestCertificate() {


    return (
        <div>
            <TestListCertificate/>
            <TestCreateCertificate/>
            <TestGetCertificate/>
        </div>
    )
}