export default function DashboardPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard</h1>
      <p style={styles.welcomeMessage}>Welcome to the dashboard!</p>
     
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    color: '#fff',
    backgroundImage: 'url("/img/we.png")', // Replace with your image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  title: {
    fontSize: "3rem",
    color: "#333",
    marginBottom: "20px",
    fontFamily: "'Poppins', sans-serif",
    textTransform: "uppercase",
    letterSpacing: "2px",
  },
  welcomeMessage: {
    fontSize: "1.5rem",
    color: "#666",
    marginBottom: "30px",
  },
  button: {
    backgroundColor: "#FFC0CB", // Baby pink color
    color: "#fff",
    padding: "10px 20px",
    fontSize: "1.2rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    boxShadow: "0px 4px 10px rgba(255, 182, 193, 0.5)",
  },
  buttonHover: {
    backgroundColor: "#FFB6C1", // Slightly darker pink for hover effect
  },
};
