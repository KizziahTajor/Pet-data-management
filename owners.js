"use client";
import { useState, useEffect } from 'react';
import { fetchOwners, addOwner } from '../lib/api';
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
export default function OwnersPage() {
  const [owners, setOwners] = useState([]);
  const [newOwner, setNewOwner] = useState({ owner_name: '', owner_contact: '', owner_address: '' });

  useEffect(() => {
    async function loadOwners() {
      try {
        const ownersData = await fetchOwners();
        console.log('Fetched Owners:', ownersData); // Log data to check
        setOwners(ownersData);
      } catch (error) {
        console.error('Failed to load owners:', error);
      }
    }
    loadOwners();
  }, []);

  const handleAddOwner = async () => {
    if (newOwner.owner_name.trim() !== '') {
      try {
        const result = await addOwner(newOwner.owner_name, newOwner.owner_contact, newOwner.owner_address);
        console.log('Add Owner Result:', result); // Log to check
        if (result) {
          setOwners([...owners, result]); // Use result from API
          setNewOwner({ owner_name: '', owner_contact: '', owner_address: '' });
        }
      } catch (error) {
        console.error('Failed to add owner:', error);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Owners List</h1>
      <header style={styles.header}>
        <nav style={styles.nav}>
          <Link href="/species" style={styles.link}>Species</Link>
          <Link href="/breeds" style={styles.link}>Breeds</Link>
          <Link href="/owners" style={styles.link}>Owners</Link>
          <Link href="/pets" style={styles.link}>Pets</Link>
         
        </nav>
      </header>

      <div style={styles.content}>
        {/* Form Container */}
        <div style={styles.formContainer}>
          <h2 style={styles.formTitle}></h2>
          <input
            type="text"
            value={newOwner.owner_name}
            onChange={(e) => setNewOwner({ ...newOwner, owner_name: e.target.value })}
            placeholder="Owner Name"
            style={styles.input}
          />
          <input
            type="text"
            value={newOwner.owner_contact}
            onChange={(e) => setNewOwner({ ...newOwner, owner_contact: e.target.value })}
            placeholder="Owner Contact"
            style={styles.input}
          />
          <input
            type="text"
            value={newOwner.owner_address}
            onChange={(e) => setNewOwner({ ...newOwner, owner_address: e.target.value })}
            placeholder="Owner Address"
            style={styles.input}
          />
          <button onClick={handleAddOwner} style={styles.button}>Add Owner</button>
        </div>

        {/* Table Container */}
        <div style={styles.tableContainer}>
          <h2 style={styles.formTitle}>Owner Details</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Owner Name</th>
                <th style={styles.tableHeader}>Contact</th>
                <th style={styles.tableHeader}>Address</th>
              </tr>
            </thead>
            <tbody>
              {owners.map(owner => (
                <tr key={owner.owner_id}>
                  <td style={styles.tableData}>{owner.owner_name}</td>
                  <td style={styles.tableData}>{owner.owner_contact}</td>
                  <td style={styles.tableData}>{owner.owner_address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}