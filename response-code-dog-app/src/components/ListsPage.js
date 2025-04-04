import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ListItem from './ListItem';

const ListsPage = ({ lists, onDeleteList }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredLists = lists.filter((list) =>
        list.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
            <div style={{
                width: '25%',
                padding: '2rem',
                backgroundColor: '#f0f4f8',
                borderRight: '1px solid #ccc'
            }}>
                <h2 style={{ marginBottom: '1rem' }}>List Controls</h2>

                <input
                    type="text"
                    placeholder="Search Lists"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '0.5rem',
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                        marginBottom: '1.5rem'
                    }}
                />

                <Link to="/search" style={{
                    display: 'inline-block',
                    textDecoration: 'none',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    padding: '0.6rem 1rem',
                    borderRadius: '6px',
                    textAlign: 'center'
                }}>
                    ➕ Create New List
                </Link>
            </div>

            <div style={{ flexGrow: 1, padding: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>My Saved Lists</h1>

                {filteredLists.length === 0 ? (
                    <div style={{ textAlign: 'center', marginTop: '5rem', color: '#777' }}>
                        <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>
                            No lists found. Start by creating a new one.
                        </p>
                        <Link to="/search" style={{
                            backgroundColor: '#2563eb',
                            color: 'white',
                            padding: '0.6rem 1rem',
                            borderRadius: '6px',
                            textDecoration: 'none'
                        }}>
                            ➕ Go to Search
                        </Link>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {filteredLists.map((list) => (
                            <ListItem key={list.id} list={list} onDelete={onDeleteList} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListsPage;
