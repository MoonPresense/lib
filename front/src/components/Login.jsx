import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundPict from '../assets/background.jpg'
import AuthService from "../services/AuthService";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "../css/login.css";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });
    let navigate = useNavigate();

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    // const goHome = () => {
    //     navigate("/");
    // }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // const handleSubmit = (event) => {
    //     const form = event.currentTarget;
    //     if (form.checkValidity() === false) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //     }
    // };

    const loginUser = async () => {
        try {
            const responce = await AuthService.login(login, password)

            if (responce.data.accessToken) {
                localStorage.setItem('token', responce.data.accessToken);
                localStorage.setItem("user", JSON.stringify(responce.data));
                console.log(responce)
            }
            navigate("/")
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div className="login">
            <div className="login-picture">
                <img
                    src={backgroundPict}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                    }}
                    alt="logo"
                />
            </div>
            <div className='login-form'>
                <div className='login-from-item'>
                    <h1 style={{ marginTop: "40px" }}>Вход</h1>

                    <div style={{
                        display: "flex",
                        width: "100%",
                        height: "100%",
                        flexDirection: "column",
                        margin: "40px 0 55px 0"
                    }}>
                        <TextField style={{ margin: "0 20px 10px 20px" }} id="standard-basic" label="Логин" variant="standard"
                            value={login}
                            onChange={(e => setLogin(e.target.value))} />

                        <FormControl style={{ margin: "20px" }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Пароль</InputLabel>
                            <Input

                                id="standard-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e => setPassword(e.target.value))}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </div>

                    <Button variant="contained" style={{ backgroundColor: "#1a83ff", display: "flex", margin: "0 0 40px 0", width: "100px" }}
                        onClick={() => loginUser(login, password)}
                    >
                        Войти
                    </Button>
                </div>
            </div>
        </div >
    )
}

export default Login