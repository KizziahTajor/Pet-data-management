"use client";
import { useState, useEffect } from 'react';
import { fetchPets, addPet, fetchSpecies, fetchBreeds, fetchOwners } from '../lib/api';
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

export default function PetsPage() {
  const [pets, setPets] = useState([]);
  const [species, setSpecies] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [owners, setOwners] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [newPet, setNewPet] = useState({ pet_name: '', SpeciesID: '', BreedID: '', owner_id: '', pet_birth: '' });
  const [filter, setFilter] = useState({ pet_name: '', SpeciesID: '' });

  useEffect(() => {
    async function loadPetsData() {
      const petsData = await fetchPets();
      const speciesData = await fetchSpecies();
      const breedsData = await fetchBreeds();
      const ownersData = await fetchOwners();
      setPets(petsData);
      setSpecies(speciesData);
      setBreeds(breedsData);
      setOwners(ownersData);
      setFilteredPets(petsData);
    }
    loadPetsData();
  }, []);

  const handleAddPet = async () => {
    if (newPet.pet_name.trim() !== '' && newPet.SpeciesID && newPet.BreedID && newPet.owner_id) {
      const result = await addPet(newPet.pet_name, newPet.SpeciesID, newPet.BreedID, newPet.owner_id, newPet.pet_birth);
      if (result) {
        const updatedPets = [...pets, { ...newPet, pet_id: result }];
        setPets(updatedPets);
        setFilteredPets(updatedPets);
        setNewPet({ pet_name: '', SpeciesID: '', BreedID: '', owner_id: '', pet_birth: '' });
      }
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
    filterPets({ ...filter, [name]: value });
  };

  const filterPets = (newFilter) => {
    let filtered = pets;
    if (newFilter.pet_name) {
      filtered = filtered.filter(pet => pet.pet_name.toLowerCase().includes(newFilter.pet_name.toLowerCase()));
    }
    if (newFilter.SpeciesID) {
      filtered = filtered.filter(pet => pet.SpeciesID === newFilter.SpeciesID);
    }
    setFilteredPets(filtered);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Pets List</h1>
        <nav style={styles.nav}>
          <Link href="/species" style={styles.link}>Species</Link> 
          <Link href="/breeds" style={styles.link}>Breeds</Link> 
          <Link href="/owners" style={styles.link}>Owners</Link> 
          <Link href="/pets" style={styles.link}>Display All</Link> 
          
        </nav>
      </header>

      <div style={styles.content}>
        {/* Add New Pet Form */}
        <div style={styles.formContainer}>
          <h2></h2>
          <input
            type="text"
            value={newPet.pet_name}
            onChange={(e) => setNewPet({ ...newPet, pet_name: e.target.value })}
            placeholder="Pet Name"
            style={styles.input}
          />
          <select
            value={newPet.SpeciesID}
            onChange={(e) => setNewPet({ ...newPet, SpeciesID: e.target.value })}
            style={styles.select}
          >
            <option value="">Select Species</option>
            {species.map((s) => (
              <option key={s.SpeciesID} value={s.SpeciesID}>
                {s.species_name}
              </option>
            ))}
          </select>
          <select
            value={newPet.BreedID}
            onChange={(e) => setNewPet({ ...newPet, BreedID: e.target.value })}
            style={styles.select}
          >
            <option value="">Select Breed</option>
            {breeds.map((b) => (
              <option key={b.BreedID} value={b.BreedID}>
                {b.breed_name}
              </option>
            ))}
          </select>
          <select
            value={newPet.owner_id}
            onChange={(e) => setNewPet({ ...newPet, owner_id: e.target.value })}
            style={styles.select}
          >
            <option value="">Select Owner</option>
            {owners.map((o) => (
              <option key={o.owner_id} value={o.owner_id}>
                {o.owner_name}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={newPet.pet_birth}
            onChange={(e) => setNewPet({ ...newPet, pet_birth: e.target.value })}
            style={styles.input}
          />
          <button onClick={handleAddPet} style={styles.button}>Add Pet</button>
        </div>

        {/* Display Pets in a Table */}
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Owners Name</th>
                <th style={styles.tableHeader}>Pet Name</th>
                <th style={styles.tableHeader}>Species</th>
                <th style={styles.tableHeader}>Breed</th>
                <th style={styles.tableHeader}>Date Of Birth</th>
              </tr>
            </thead>
            <tbody>
              {filteredPets.map((pet) => (
                <tr key={pet.pet_id}>
                  <td style={styles.tableData}>{owners.find(o => o.owner_name === pet.owner_name)?.owner_name || 'Unknown'}</td>
                  <td style={styles.tableData}>{pet.pet_name}</td>
                  <td style={styles.tableData}>{species.find(s => s.species_name === pet.species_name)?.species_name || 'Unknown'}</td>
                  <td style={styles.tableData}>{breeds.find(b => b.breed_name === pet.breed_name)?.breed_name || 'Unknown'}</td>
                  <td style={styles.tableData}>{pet.pet_birth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
