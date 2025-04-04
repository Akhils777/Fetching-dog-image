import React from 'react';
import { Link } from 'react-router-dom';

const ListItem = ({ list, onDelete }) => {
    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete "${list.name}"?`)) {
            onDelete(list.id);
        }
    };

    const formattedDate = new Date(list.createdAt).toLocaleDateString();

    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1rem',
            backgroundColor: '#fff',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%'
        }}>
            <div>
                <h3 style={{
                    fontSize: '1.1rem',
                    marginBottom: '0.25rem',
                    color: '#333'
                }}>
                    {list.name}
                </h3>

                <p style={{ fontSize: '0.85rem', color: '#444', marginBottom: '1rem' }}>
                    {list.responseCodes.length} response codes
                </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link to={`/list/${list.id}`} style={buttonStyle('#2563eb')}>
                    View
                </Link>
                <Link to={`/edit/${list.id}`} style={buttonStyle('#22c55e')}>
                    Edit
                </Link>
                <button onClick={handleDelete} style={buttonStyle('#ef4444')}>
                    Delete
                </button>
            </div>
        </div>
    );
};

const buttonStyle = (bgColor) => ({
    backgroundColor: bgColor,
    color: '#fff',
    padding: '0.4rem 0.8rem',
    borderRadius: '6px',
    border: 'none',
    fontSize: '0.85rem',
    cursor: 'pointer',
    textDecoration: 'none'
});

export default ListItem;
