import { useState, useEffect } from 'react';

const localCache = {};

export default function useBreedList(animal) {
  const [breedlist, SetBreedList] = useState([]);
  const [status, setStatus] = useState('unloaded');

  useEffect(() => {
    if (!animal) {
      SetBreedList([])
    } else if (localCache[animal]) {
      SetBreedList(localCache[animal])
    } else {
      requestBreedList()
    }
    async function requestBreedList() {
      SetBreedList([]);
      setStatus('loading');

      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      )
      const json = await res.json();
      localCache[animal] = json.breeds || [];
      SetBreedList(localCache[animal]);
      setStatus('loaded')
    }
  }, [animal])
  return [breedlist, status];
}
