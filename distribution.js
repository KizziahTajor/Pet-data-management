"use client";
import { useState, useEffect } from 'react';
import { fetchDistribution } from '../lib/api';
import Link from 'next/link';


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f7f7f7',
    minHeight: '100vh',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  header: {
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
  select: {
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
export default function DistributionPage() {
  const [distribution, setDistribution] = useState([]);

  useEffect(() => {
    async function loadDistribution() {
      const distributionData = await fetchDistribution();
      setDistribution(distributionData);
    }
    loadDistribution();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Records</h1>
      <header style={styles.header}>
        <nav style={styles.nav}>
          <Link href="/species" style={styles.link}>Species</Link>
          <Link href="/breeds" style={styles.link}>Breeds</Link>
          <Link href="/owners" style={styles.link}>Owners</Link>
          <Link href="/pets" style={styles.link}>Pets</Link>
          <Link href="/distribution" style={styles.link}>Records</Link>
        </nav>
      </header>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Species</th>
              <th style={styles.tableHeader}>Breed</th>
              <th style={styles.tableHeader}>Count</th>
            </tr>
          </thead>
          <tbody>
            {distribution.map((d, index) => (
              <tr key={index}>
                <td style={styles.tableData}>{d.species_name}</td>
                <td style={styles.tableData}>{d.breed_name}</td>
                <td style={styles.tableData}>{d.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
