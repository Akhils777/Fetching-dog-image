import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchPage = ({ onSaveList, user }) => {
    const [images, setImages] = useState([]);
    const [query, setQuery] = useState("");
    const [listName, setListName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validStatusCodes = [
        100, 101, 102, 103, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226,
        300, 301, 302, 303, 304, 305, 306, 307, 308, 400, 401, 402, 403, 404,
        405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418,
        421, 422, 423, 424, 425, 426, 428, 429, 431, 451, 500, 501, 502, 503,
        504, 505, 506, 507, 508, 510, 511
    ];

    const fetchDogImages = (searchQuery) => {
        setIsLoading(true);
        if (!searchQuery) {
            setImages([]);
            setIsLoading(false);
            return;
        }

        let matchedCodes = [];

        if (/^\d{1,3}$/.test(searchQuery)) {
            const pattern = new RegExp(`^${searchQuery}`);
            matchedCodes = validStatusCodes.filter(code => pattern.test(code.toString()));
        } else if (/^\d+x{1,2}$/.test(searchQuery)) {
            const prefix = searchQuery.replace(/x/g, '');
            const wildcardCount = searchQuery.length - prefix.length;

            if (wildcardCount === 1) {
                matchedCodes = validStatusCodes.filter(code =>
                    code.toString().startsWith(prefix) && code.toString().length === prefix.length + 1
                );
            } else if (wildcardCount === 2) {
                matchedCodes = validStatusCodes.filter(code =>
                    code.toString().startsWith(prefix) && code.toString().length === prefix.length + 2
                );
            }
        }

        const imageObjects = matchedCodes.map(code => ({
            url: `https://http.dog/${code}.jpg`,
            code: code.toString()
        }));

        setImages(imageObjects);
        setIsLoading(false);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchDogImages(query);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query]);

    const saveList = () => {
        if (!listName || images.length === 0) {
            alert("Please enter a list name and ensure you have filtered some images");
            return;
        }

        const newList = {
            id: Date.now().toString(),
            name: listName,
            createdAt: new Date().toISOString(),
            responseCodes: images.map(img => img.code),
            imageUrls: images.map(img => img.url),
            userId: user.email
        };

        onSaveList(newList);
        alert("List saved successfully!");
        setListName("");
        navigate("/lists");
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
            <div style={{
                width: '25%',
                padding: '2rem',
                backgroundColor: '#f0f4f8',
                borderRight: '1px solid #ccc'
            }}>
                <h2 style={{ marginBottom: '1rem' }}>Search Filters</h2>

                <input
                    type="text"
                    placeholder="Enter code (e.g. 2xx, 200)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '0.5rem',
                        marginBottom: '1rem',
                        borderRadius: '6px',
                        border: '1px solid #ccc'
                    }}
                />

                <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '2rem' }}>
                    Examples: 2, 20, 200, 2xx, 20x
                </p>

                <hr style={{ margin: '2rem 0' }} />

                <h3 style={{ marginBottom: '0.5rem' }}>Save List</h3>
                <input
                    type="text"
                    placeholder="Enter list name"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '0.5rem',
                        marginBottom: '1rem',
                        borderRadius: '6px',
                        border: '1px solid #ccc'
                    }}
                />
                <button
                    onClick={saveList}
                    style={{
                        width: '100%',
                        padding: '0.6rem',
                        backgroundColor: '#2563eb',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}
                >
                    Save
                </button>
            </div>

            <div style={{ flexGrow: 1, padding: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
                    Dog Results {isLoading && '...'}
                </h1>

                {!isLoading && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {images.map((img) => (
                            <div key={img.code} style={{
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                            }}>
                                <img
                                    src={img.url}
                                    alt={`Code ${img.code}`}
                                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://placehold.co/400x300?text=No+Image";
                                    }}
                                />
                                <div style={{ padding: '0.5rem', backgroundColor: '#f9f9f9', textAlign: 'center' }}>
                                    <strong>Code {img.code}</strong>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
