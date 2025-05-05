import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import {
    Container,
    Card,
    Form,
    Button,
    ListGroup,
    Alert,
    InputGroup,
    Row,
    Col,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

type Task = {
    id: number;
    title: string;
    completed: boolean;
};

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const res = await API.get('/tasks');
            const dataArray = Array.isArray(res.data)
                ? res.data
                : Object.values(res.data).filter(Boolean);
            setTasks(dataArray);
            setError('');
        } catch (err: any) {
            setError('Görevler alınamadı.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        try {
            const response = await API.post('/tasks', { title: newTask.trim() });
            const data = Array.isArray(response.data)
                ? response.data[0]
                : Object.values(response.data)[0];

            const safeTask: Task = {
                id: data?.id ?? Math.random(),
                title: data?.title ?? newTask.trim(),
                completed: !!data?.completed,
            };

            setTasks((prev) => [...prev, safeTask]);
            setNewTask('');
        } catch (err) {
            setError('Görev eklenemedi.');
        }
    };

    const toggleTask = async (id: number, currentCompleted: boolean) => {
        try {
            const res = await API.put(`/tasks/${id}`, { completed: !currentCompleted });
            const updated = Array.isArray(res.data)
                ? res.data[0]
                : Object.values(res.data)[0];

            setTasks((prev) =>
                prev.map((task) =>
                    task.id === id
                        ? { ...task, completed: updated?.completed ?? !task.completed }
                        : task
                )
            );
        } catch (err) {
            setError('Görev güncellenemedi.');
        }
    };

    const deleteTask = async (id: number) => {
        try {
            await API.delete(`/tasks/${id}`);
            setTasks((prev) => prev.filter((task) => task.id !== id));
        } catch (err) {
            setError('Görev silinemedi.');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;

    return (
        <Container fluid className="dashboard-container">
            <Card className="dashboard-card">
                <Card.Header className="dashboard-header">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4>📝 Task Dashboard</h4>
                        <Button
                            variant="outline-light"
                            size="sm"
                            onClick={() => {
                                logout();
                                navigate('/');
                            }}
                        >
                            <span className="me-2">🚪</span> Logout
                        </Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className="mb-4">
                        <h5 className="mb-1">Hello, {user?.username}</h5>
                        <p className="text-muted">Manage your tasks efficiently</p>
                    </div>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleAddTask} className="mb-4">
                        <InputGroup>
                            <Form.Control
                                placeholder="Enter a new task..."
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                            />
                            <Button variant="primary" type="submit" disabled={!newTask.trim()}>
                                ➕ Add
                            </Button>
                        </InputGroup>
                    </Form>

                    <Row className="mb-4">
                        <Col>
                            <div className="stat-box">
                                <p className="stat-label">Total Tasks</p>
                                <h2>{total}</h2>
                            </div>
                        </Col>
                        <Col>
                            <div className="stat-box">
                                <p className="stat-label">Completed</p>
                                <h2>{completed}</h2>
                            </div>
                        </Col>
                    </Row>

                    <ListGroup>
                        {loading ? (
                            <p>Loading tasks...</p>
                        ) : tasks.length === 0 ? (
                            <p>No tasks added yet.</p>
                        ) : (
                            tasks.map((task) => (
                                <ListGroup.Item
                                    key={task.id}
                                    className="d-flex justify-content-between align-items-center task-item"
                                >
                                    <div
                                        className="d-flex align-items-center"
                                        onClick={() => toggleTask(task.id, task.completed)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className={`task-toggle ${task.completed ? 'completed' : ''}`}>
                                            {task.completed && '✓'}
                                        </div>
                                        <span className={`task-title ${task.completed ? 'completed' : ''}`}>
                                            {task.title}
                                        </span>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="outline-danger"
                                        onClick={() => deleteTask(task.id)}
                                    >
                                        🗑️
                                    </Button>
                                </ListGroup.Item>
                            ))
                        )}
                    </ListGroup>
                </Card.Body>
                <Card.Footer className="text-center small">
                    developers by whoischat
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default Dashboard;
