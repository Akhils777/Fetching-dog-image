import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EditListPage = ({ lists, onUpdateList }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [list, setList] = useState(null);
    const [listName, setListName] = useState('');
    const [selectedCodes, setSelectedCodes] = useState([]);
    const [availableCodes, setAvailableCodes] = useState([]);

    const validStatusCodes = [
        100, 101, 102, 103,
        200, 201, 202, 203, 204, 205, 206, 207, 208, 226,
        300, 301, 302, 303, 304, 305, 306, 307, 308,
        400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424, 425, 426, 428, 429, 431, 451,
        500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511
    ].map(String);

    useEffect(() => {
        const foundList = lists.find((l) => l.id === id);
        if (foundList) {
            setList(foundList);
            setListName(foundList.name);
            const selected = foundList.responseCodes.map(String);
            setSelectedCodes(selected);
            setAvailableCodes(validStatusCodes.filter(code => !selected.includes(code)));
        } else {
            navigate('/lists');
        }
    }, [id, lists, navigate]);

    const handleSave = () => {
        if (!listName.trim()) {
            alert('Please enter a list name');
            return;
        }

        if (selectedCodes.length === 0) {
            alert('Please select at least one response code');
            return;
        }

        const updatedList = {
            ...list,
            name: listName.trim(),
            responseCodes: selectedCodes,
            updatedAt: new Date().toISOString()
        };

        onUpdateList(updatedList);
        alert('List updated successfully!');
        navigate(`/list/${id}`);
    };

    const handleRemoveCode = (code) => {
        setSelectedCodes(selectedCodes.filter(c => c !== code));
        setAvailableCodes([...availableCodes, code].sort());
    };

    const handleAddCode = (code) => {
        if (!selectedCodes.includes(code)) {
            setSelectedCodes([...selectedCodes, code].sort());
        }
        setAvailableCodes(availableCodes.filter(c => c !== code));
    };

    const groupCodesByPrefix = (codes) => {
        const groups = {};
        codes.forEach(code => {
            const prefix = code.charAt(0);
            if (!groups[prefix]) groups[prefix] = [];
            groups[prefix].push(code);
        });
        return groups;
    };

    if (!list) {
        return <div style={containerStyle}>Loading...</div>;
    }

    const groupedAvailableCodes = groupCodesByPrefix(availableCodes);

    return (
        <div style={containerStyle}>
            <div style={sidebarStyle}>
                <h3 style={subHeadingStyle}>Available Codes</h3>
                {Object.entries(groupedAvailableCodes).map(([prefix, codes]) => (
                    <div key={prefix} style={groupContainer}>
                        <h4 style={groupHeadingStyle}>{prefix}xx</h4>
                        <div style={codeGridStyle}>
                            {codes.map(code => (
                                <button
                                    key={code}
                                    onClick={() => handleAddCode(code)}
                                    style={codeButtonStyle}
                                >
                                    {code}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div style={mainContentStyle}>
                <h1 style={headingStyle}>Edit List</h1>

                <div style={inputContainer}>
                    <label style={labelStyle}>List Name</label>
                    <input
                        type="text"
                        style={inputStyle}
                        value={listName}
                        onChange={(e) => setListName(e.target.value)}
                        placeholder="Enter list name"
                    />
                </div>

                <div style={selectedCodesContainer}>
                    <h3 style={subHeadingStyle}>Selected Response Codes ({selectedCodes.length})</h3>
                    <div style={badgeContainer}>
                        {selectedCodes.length === 0 ? (
                            <p style={{ color: '#777' }}>No codes selected</p>
                        ) : (
                            selectedCodes.map(code => (
                                <div key={code} style={badgeStyle}>
                                    {code}
                                    <button onClick={() => handleRemoveCode(code)} style={removeButtonStyle}>
                                        ×
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div style={buttonContainer}>
                    <Link to={`/list/${id}`} style={cancelButtonStyle}>
                        Cancel
                    </Link>
                    <button onClick={handleSave} style={saveButtonStyle}>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

const containerStyle = {
    display: 'flex',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    gap: '2rem',
};

const sidebarStyle = {
    width: '300px',
    background: '#f3f4f6',
    padding: '1rem',
    borderRadius: '8px',
    height: 'fit-content',
};

const mainContentStyle = {
    flex: 1,
    padding: '1rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
};

const headingStyle = {
    fontSize: '1.75rem',
    fontWeight: 'bold',
};

const subHeadingStyle = {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '1rem',
};

const inputContainer = {
    marginBottom: '1rem',
};

const labelStyle = {
    display: 'block',
    fontWeight: '500',
    marginBottom: '0.5rem',
};

const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
};

const selectedCodesContainer = {
    marginBottom: '1.5rem',
};

const badgeContainer = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
};

const badgeStyle = {
    background: '#e0f2fe',
    color: '#0369a1',
    padding: '0.5rem',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
};

const removeButtonStyle = {
    background: 'none',
    border: 'none',
    color: 'red',
    fontWeight: 'bold',
    cursor: 'pointer',
};

const buttonContainer = {
    display: 'flex',
    justifyContent: 'space-between',
};

const cancelButtonStyle = {
    background: '#6b7280',
    color: '#fff',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    textDecoration: 'none',
};

const saveButtonStyle = {
    background: '#22c55e',
    color: '#fff',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
};

const groupContainer = { marginBottom: '1rem' };
const groupHeadingStyle = { fontWeight: 'bold' };
const codeGridStyle = { display: 'flex', flexWrap: 'wrap', gap: '0.5rem' };
const codeButtonStyle = { background: '#ccc', padding: '0.5rem', borderRadius: '6px' };

export default EditListPage;
