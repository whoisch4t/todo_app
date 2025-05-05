import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container text-center mt-5">
            <h1 className="mb-4">Todo App</h1>
            <p>Organize, track and complete your tasks.</p>
            <div className="mt-4">
                <Link to="/login" className="btn btn-primary me-2">
                    Login
                </Link>
                <Link to="/register" className="btn btn-outline-primary">
                    Register
                </Link>
            </div>
        </div>
    );
};

export default Home;
