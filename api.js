// lib/api.js
export async function loginAdmin(username, password) {
    try {
      const response = await fetch('http://localhost/pet/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          json: JSON.stringify({ username, password }),
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return data;
      } else {
        return { status: 'error', message: 'Login failed' };
      }
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }
  
const API_URL = 'http://localhost/pet/api/api.php'; // Update this URL accordingly

export async function fetchSpecies() {
  const response = await fetch(`${API_URL}?operation=getSpecies`);
  return response.json();
}

export async function addSpecies(species_name) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      operation: 'addSpecies',
      json: JSON.stringify({ species_name }),
    }),
  });
  return response.json();
}

// Owner API functions
export async function fetchOwners() {
  try {
    const response = await fetch(`${API_URL}?operation=getOwner`);
    if (!response.ok) {
      throw new Error(`Failed to fetch owners: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching owners:', error);
    return [];
  }
}

export async function addOwner(owner_name, owner_contact, owner_address) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        operation: 'addOwner',
        json: JSON.stringify({ owner_name, owner_contact, owner_address }),
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to add owner: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error adding owner:', error);
    return { status: 'error', message: error.message };
  }
}


export async function updateOwner(owner_id, owner_name, owner_contact, owner_address) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      operation: 'updateOwner',
      json: JSON.stringify({ owner_id, owner_name, owner_contact, owner_address }),
    }),
  });
  return response.json();
}

export async function deleteOwner(owner_id) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      operation: 'deleteOwner',
      json: JSON.stringify({ owner_id }),
    }),
  });
  return response.json();
}

// Breed API functions
export async function fetchBreeds() {
  const response = await fetch(`${API_URL}?operation=getBreed`);
  return response.json();
}

export async function addBreed(breed_name, SpeciesID) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      operation: 'addBreed',
      json: JSON.stringify({ breed_name, SpeciesID }),
    }),
  });
  return response.json();
}

// Pet API functions
export async function fetchPets() {
  const response = await fetch(`${API_URL}?operation=getPet`);
  return response.json();
}

export async function addPet(pet_name, SpeciesID, BreedID, owner_id, pet_birth) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      operation: 'addPet',
      json: JSON.stringify({ pet_name, SpeciesID, BreedID, owner_id, pet_birth }),
    }),
  });
  return response.json();
}

export async function updatePet(pet_id, pet_name, SpeciesID, BreedID, owner_id, pet_birth) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      operation: 'updatePet',
      json: JSON.stringify({ pet_id, pet_name, SpeciesID, BreedID, owner_id, pet_birth }),
    }),
  });
  return response.json();
}

export async function deletePet(pet_id) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      operation: 'deletePet',
      json: JSON.stringify({ pet_id }),
    }),
  });
  return response.json();
}

// Distribution and Popularity API functions
export async function fetchDistribution() {
  const response = await fetch(`${API_URL}?operation=distribution`);
  return response.json();
}

export async function fetchPopularity() {
  const response = await fetch(`${API_URL}?operation=popularity`);
  return response.json();
}
