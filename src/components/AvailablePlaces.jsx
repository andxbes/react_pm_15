import { useState } from 'react';
import Places from './Places.jsx';
import { useEffect } from 'react';

const places = localStorage.getItem('places');

export default function AvailablePlaces({ onSelectPlace }) {


  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    setIsFetching(true);
    fetch('http://localhost:3000/places').then((response) => {
      return response.json();
    }).then((resData) => {

      setAvailablePlaces(resData.places);
      setIsFetching(false);
    });
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
