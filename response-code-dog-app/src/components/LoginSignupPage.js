import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    auth,
    db,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    ref,
    set
} from '../firebase';

const LoginSignupPage = ({ onLogin, onSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const validateForm = () => {
        if (!email || !password) {
            setError('Please fill out all fields.');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Invalid email address.');
            return false;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return false;
        }
        return true;
    };

    const handleSignup = async () => {
        if (!validateForm()) return;

        setLoading(true);
        setError('');

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await set(ref(db, 'users/' + user.uid), {
                email: user.email,
                uid: user.uid
            });

            onSignup(user);
            navigate('/search');
        } catch (error) {
            setError(error.message);
        }

        setLoading(false);
    };

    const handleLogin = async () => {
        if (!validateForm()) return;

        setLoading(true);
        setError('');

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            onLogin(user);
            navigate('/search');
        } catch (error) {
            setError('Invalid credentials. Please try again.');
        }

        setLoading(false);
    };

    const styles = {
        container: {
            display: 'flex',
            height: '100vh',
            background: 'linear-gradient(to left, #74ebd5, #acb6e5)',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Arial, sans-serif',
        },

        card: {
            display: 'flex',
            flexDirection: 'row',
            width: '750px',
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            overflow: 'hidden',
        },

        leftPanel: {
            flex: 1,
            background: '#f7f7f7',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },

        rightPanel: {
            flex: 1,
            background: 'linear-gradient(to bottom right, #43cea2, #185a9d)',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '30px',
        },

        input: {
            padding: '12px 16px',
            margin: '10px 0',
            width: '100%',
            fontSize: '15px',
            border: '1px solid #ccc',
            borderRadius: '8px',
        },

        buttonContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '30px',
        },
        button: {
            width: '48%',
            padding: '12px',
            fontSize: '15px',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: '0.3s ease-in-out',
        },
        title: {
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#333',
        },
        subtitle: {
            fontSize: '14px',
            marginBottom: '10px',
            color: '#666',
        },
        errorText: {
            color: 'red',
            fontSize: '14px',
            marginBottom: '10px',
        },
        sideTitle: {
            fontSize: '26px',
            fontWeight: 'bold',
            marginBottom: '15px',
        },
        sideText: {
            fontSize: '16px',
            textAlign: 'center',
            maxWidth: '250px',
        },
        loginBtn: {
            backgroundColor: '#4CAF50',
            color: 'white',
        },
        loginBtnHover: {
            backgroundColor: '#45a049',
        },
        signupBtn: {
            backgroundColor: '#2196F3',
            color: 'white',
        },
        signupBtnHover: {
            backgroundColor: '#1976D2',
        },
        disabled: {
            opacity: '0.5',
            cursor: 'not-allowed',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.leftPanel}>
                    <h2 style={styles.title}>Hello Again!</h2>
                    <p style={styles.subtitle}>Enter your details below</p>

                    {error && <p style={styles.errorText}>{error}</p>}

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />

                    <div style={styles.buttonContainer}>
                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            style={{
                                ...styles.button,
                                ...styles.loginBtn,
                                ...(loading ? styles.disabled : {}),
                            }}
                        >
                            {loading ? 'Logging...' : 'Login'}
                        </button>

                        <button
                            onClick={handleSignup}
                            disabled={loading}
                            style={{
                                ...styles.button,
                                ...styles.signupBtn,
                                ...(loading ? styles.disabled : {}),
                            }}
                        >
                            {loading ? 'Signing...' : 'Sign Up'}
                        </button>
                    </div>
                </div>

                <div style={styles.rightPanel}>
                    <h2 style={styles.sideTitle}>Welcome to MoEngage</h2>
                    <p style={styles.sideText}>
                        Fetching dog pics by <br /> <b>Akhil Pratap Singh</b>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginSignupPage;
