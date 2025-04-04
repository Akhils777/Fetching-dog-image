import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const ListDetailsPage = ({ lists }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const list = lists.find((list) => list.id === id);

    if (!list) {
        return (
            <div style={containerStyle}>
                <div style={notFoundStyle}>
                    <h2 style={headingStyle}>List Not Found</h2>
                    <p style={{ color: "#666", marginBottom: "1rem" }}>
                        The list you are looking for doesn't exist or has been deleted.
                    </p>
                    <Link to="/lists" style={buttonStyle("#2563eb")}>
                        Back to Lists
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            {/* Sidebar Section */}
            <aside style={sidebarStyle}>
                <h2 style={headingStyle}>{list.name}</h2>
                <p style={{ color: "#666" }}>Created: {new Date(list.createdAt).toLocaleString()}</p>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
                    <Link to={`/edit/${id}`} style={buttonStyle("#22c55e")}>Edit List</Link>
                    <Link to="/lists" style={buttonStyle("#6b7280")}>Back to Lists</Link>
                </div>
            </aside>

            {/* Main Content Section */}
            <main style={mainContentStyle}>
                <h3 style={subHeadingStyle}>Response Codes</h3>
                <div style={badgeContainer}>
                    {list.responseCodes.map((code) => (
                        <span key={code} style={badgeStyle}>{code}</span>
                    ))}
                </div>

                <h3 style={subHeadingStyle}>Images</h3>
                <div style={imageGridStyle}>
                    {list.responseCodes.map((code) => (
                        <div key={code} style={imageCardStyle}>
                            <img
                                src={`https://http.dog/${code}.jpg`}
                                alt={`Response Code ${code}`}
                                style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px 8px 0 0" }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://placehold.co/400x300?text=No+Image";
                                }}
                            />
                            
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

// Reusable styles
const containerStyle = {
    display: "flex",
    maxWidth: "1100px",
    margin: "2rem auto",
    gap: "2rem",
};

const sidebarStyle = {
    width: "250px",
    padding: "1.5rem",
    backgroundColor: "#f8fafc",
    borderRadius: "8px",
    boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
};

const mainContentStyle = {
    flex: 1,
    padding: "1.5rem",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
};

const headingStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
};

const subHeadingStyle = {
    fontSize: "1.2rem",
    fontWeight: "600",
    margin: "1.5rem 0 0.75rem",
};

const buttonStyle = (bgColor) => ({
    backgroundColor: bgColor,
    color: "#fff",
    padding: "0.6rem",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "0.9rem",
    textAlign: "center",
});

const badgeContainer = {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    padding: "1rem 0",
};

const badgeStyle = {
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    padding: "0.5rem 1rem",
    borderRadius: "20px",
    fontSize: "0.9rem",
    fontWeight: "500",
};

const imageGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "1rem",
};

const imageCardStyle = {
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#fff",
    boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
};

const notFoundStyle = {
    textAlign: "center",
    padding: "3rem 1rem",
};

export default ListDetailsPage;
