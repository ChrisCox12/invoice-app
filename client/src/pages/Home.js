import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import axios from "axios";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export default function HomePage() {
    const [user, setUser] = useState({});
    const [invoices, setInvoices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        const userToken = localStorage.getItem('user');

        if(!userToken) {
            navigate('/');
        }
        else {
            setUser( jwt_decode(userToken) );
            //console.log(jwt_decode(userToken))
            getInvoices( jwt_decode(userToken) );
        }

        async function getInvoices(user) {
            try {
                const response = await axios.get(REACT_APP_API_URL.concat('invoices/', user.username));

                console.log(response);

                if(response.data.success) {
                    setInvoices(response.data.invoices);
                }
                else {
                    alert(response.data.msg);
                }
            } 
            catch(error) {
                console.log(error)    
            }
        }

        return () => controller.abort();
    }, []);


    return (
        <Layout>
            <div>Home</div>
        </Layout>
    )
}