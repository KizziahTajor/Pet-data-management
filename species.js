"use client";
import { useState, useEffect } from 'react';
import { fetchSpecies, addSpecies } from '../lib/api';
import Link from 'next/link';

export default function SpeciesPage() {
  const [species, setSpecies] = useState([]);
  const [newSpecies, setNewSpecies] = useState('');

  useEffect(() => {
    async function loadSpecies() {
      const speciesData = await fetchSpecies();
      setSpecies(speciesData);
    }
    loadSpecies();
  }, []);

  const handleAddSpecies = async () => {
    if (newSpecies.trim() !== '') {
      const result = await addSpecies(newSpecies);
      if (result) {
        setSpecies([...species, { species_name: newSpecies }]);
        setNewSpecies('');
      }
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <Link href="/" style={styles.homeButton}>Home</Link>
        <h1 style={styles.title}>Species List</h1>
        <nav style={styles.nav}>
          <Link href="/species" style={styles.link}>Species</Link>
          <Link href="/breeds" style={styles.link}>Breeds</Link>
          <Link href="/owners" style={styles.link}>Owners</Link>
          <Link href="/pets" style={styles.link}>Pets</Link>
          
        </nav>
      </header>
      <div style={styles.content}>
        <div style={styles.formContainer}>
          <input
            type="text"
            value={newSpecies}
            onChange={(e) => setNewSpecies(e.target.value)}
            placeholder="New species name"
            style={styles.input}
          />
          <button onClick={handleAddSpecies} style={styles.button}>Add Species</button>
        </div>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Species Name</th>
              </tr>
            </thead>
            <tbody>
              {species.map((s, index) => (
                <tr key={index}>
                  <td style={styles.tableData}>{s.species_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f7f7f7',
    minHeight: '100vh',
  },
  header: {
    marginBottom: '20px',
  },
  homeButton: {
    color: '#ff8f9d',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
    marginBottom: '10px', // Adds space below the home button
    display: 'block',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  nav: {
    display: 'flex',
    gap: '15px',
    fontSize: '1rem',
    marginBottom: '20px',
  },
  link: {
    color: '#ff8f9d',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'color 0.3s ease',
  },
  linkHover: {
    color: '#ff5c5c',
  },
  content: {
    display: 'flex',
    gap: '20px',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#ff8f9d',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#ff5a6c',
  },
  tableContainer: {
    flex: 2,
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    padding: '10px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
  },
  tableData: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
};
