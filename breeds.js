"use client";
import { useState, useEffect } from 'react';
import { fetchBreeds, addBreed, fetchSpecies } from '../lib/api';
import Link from 'next/link';

export default function BreedsPage() {
  const [breeds, setBreeds] = useState([]);
  const [species, setSpecies] = useState([]);
  const [newBreed, setNewBreed] = useState({ breed_name: '', SpeciesID: '' });

  useEffect(() => {
    async function loadBreedsAndSpecies() {
      const breedsData = await fetchBreeds();
      const speciesData = await fetchSpecies();
      setBreeds(breedsData);
      setSpecies(speciesData);
    }
    loadBreedsAndSpecies();
  }, []);

  const handleAddBreed = async () => {
    if (newBreed.breed_name.trim() !== '' && newBreed.SpeciesID.trim() !== '') {
      const result = await addBreed(newBreed.breed_name, newBreed.SpeciesID);
      if (result) {
        setBreeds([...breeds, newBreed]);
        setNewBreed({ breed_name: '', SpeciesID: '' });
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Breeds List</h1>
      <header style={styles.header}>
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
            value={newBreed.breed_name}
            onChange={(e) => setNewBreed({ ...newBreed, breed_name: e.target.value })}
            placeholder="Breed Name"
            style={styles.input}
          />
          <select
            value={newBreed.SpeciesID}
            onChange={(e) => setNewBreed({ ...newBreed, SpeciesID: e.target.value })}
            style={styles.select}
          >
            <option value="">Select Species</option>
            {species.map((s) => (
              <option key={s.SpeciesID} value={s.SpeciesID}>
                {s.species_name}
              </option>
            ))}
          </select>
          <button onClick={handleAddBreed} style={styles.button}>Add Breed</button>
        </div>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Breed Name</th>
                <th style={styles.tableHeader}>Species Name</th>
              </tr>
            </thead>
            <tbody>
              {breeds.map((breed) => {
                const speciesName = species.find(s => s.SpeciesID === breed.SpeciesID)?.species_name;
                return (
                  <tr key={breed.BreedID}>
                    <td style={styles.tableData}>{breed.breed_name}</td>
                    <td style={styles.tableData}>{speciesName || ''}</td>
                  </tr>
                );
              })}
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