import { useState, useEffect } from 'react';
import useBreedList from './useBreedList';
import Results from './Results';

const ANIMALS = ['bird', 'cat', 'rabbit', 'reptile', 'dog']

const SearchParam = () => {
  const [location, SetLocation] = useState("");
  const [animal, SetAnimal] = useState("");
  const [breed, SetBreed] = useState("");
  const [pets, SetPets] = useState([])
  const [breedList, status] = useBreedList(animal);
  useEffect(() => {
    requestPets();
  }, [])

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    SetPets(json.pets)
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          location
          <input id="location" onChange={(e) => SetLocation(e.target.value)} value={location} placeholder="Location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => SetAnimal(e.target.value)}
            onBlur={(e) => SetAnimal(e.target.value)}
          >
            <option />
            {
              ANIMALS.map(animal => (
                <option value={animal} key={animal}>
                  {animal}
                </option>
              ))
            }
          </select>
        </label>

        <label htmlFor="breed">
          breed
          <select
            id="breed"
            value={breed}
            onChange={(e) => SetBreed(e.target.value)}
            onBlur={(e) => SetBreed(e.target.value)}

          >
            <option />
            {
              breedList.map(breed => (
                <option value={breed} key={breed}>
                  {breed}
                </option>
              ))
            }
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />

    </div>
  )
}

export default SearchParam;
