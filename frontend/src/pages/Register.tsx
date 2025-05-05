import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Container, Form, Button, Card, Alert, InputGroup } from 'react-bootstrap';

const Register = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await API.post('/auth/register', form);
            login(res.data.user, res.data.token);
            navigate('/dashboard');
        } catch (err: any) {
            const msg = err.response?.data?.message || 'Kayıt başarısız';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-5">
            <div className="d-flex justify-content-center">
                <Card className="shadow auth-card" style={{ maxWidth: "450px", width: "100%" }}>
                    <Card.Body className="p-4">
                        <div className="text-center mb-4">
                            <h2 className="fw-bold">Create an Account</h2>
                            <p className="text-muted">Fill in your details to get started</p>
                        </div>

                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text className="bg-light">
                                        <span>👤</span>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        placeholder="Choose a username"
                                        value={form.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text className="bg-light">
                                        <span>✉️</span>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label>Password</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text className="bg-light">
                                        <span>🔒</span>
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Create a password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </InputGroup>
                                <Form.Text className="text-muted">
                                    Password must be at least 6 characters
                                </Form.Text>
                            </Form.Group>

                            <div className="d-grid">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Creating Account...' : 'Register'}
                                </Button>
                            </div>
                        </Form>

                        <div className="text-center mt-4">
                            <p className="mb-0">
                                Already have an account?{' '}
                                <Button variant="link" className="p-0" onClick={() => navigate('/login')}>
                                    Login
                                </Button>
                            </p>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    );
};

export default Register;