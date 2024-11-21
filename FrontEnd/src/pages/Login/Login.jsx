import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../Login/login.scss"
import busIcon from '../../assets/busIcon.png'

export function Login({ setToken }) {
    const [userCredentials, setUserCredentials] = useState({ email: '', senha: '', statusErros: null });
    const navigate = useNavigate();

    useEffect(() => {
        if (window.sessionStorage.getItem('token')) {
            navigate("/");
        }
    }, [navigate]);

    const logarUsuario = (e) => {
        e.preventDefault();

        axios.post('http://localhost/ViacaoCalango/BackEnd/crudUsuario/autenticarUsuario.php', {
            email: userCredentials.email,
            senha: userCredentials.senha
        })
            .then((response) => {
                const { status, tipo, nome } = response.data;
                window.sessionStorage.setItem('token', status);
                window.sessionStorage.setItem('typeUser', tipo);
                window.sessionStorage.setItem('nome', nome);
                setToken(status);
                navigate("/"); 
            })
            .catch((error) => {
                console.log(error);
                setUserCredentials((prev) => (
                    { ...prev, statusErros: error.response?.data?.mensagem || "Erro de autenticação" }
                ));
            });
    };

    return (
        <div>
            {!window.sessionStorage.getItem('token') && (
                <>
                    <img src={busIcon} alt="viação calango" />

                    <div id='login' className='d-flex justify-content-center align-items-center vw-100 vh-100 flex-column'>
                        <form className='text-center py-3 px-4' onSubmit={logarUsuario}>
                            <h1>Fazer Login</h1>
                            <div className='d-flex flex-column text-start mb-4 mt-4'>
                                <label className='fs-4' htmlFor="login">Login</label>
                                <input
                                    className='form-control mt-2'
                                    name='login'
                                    type='text'
                                    placeholder="Usuário"
                                    onChange={(e) => setUserCredentials(prev => ({ ...prev, email: e.target.value }))}
                                />
                            </div>

                            <div className='d-flex flex-column text-start mb-2'>
                                <label className='fs-4' htmlFor="senha">Senha</label>
                                <input
                                    className='form-control mt-2'
                                    name='senha'
                                    type="password"
                                    placeholder="Senha"
                                    onChange={(e) => setUserCredentials(prev => ({ ...prev, senha: e.target.value }))}
                                />
                            </div>

                            <button type="submit" className='btn btn-lg w-100 text-black mt-4'>
                                Entrar
                            </button>
                        </form>

                        {userCredentials.statusErros && <p>{userCredentials.statusErros}</p>}
                    </div>
                </>
            )}
        </div>
    );
}