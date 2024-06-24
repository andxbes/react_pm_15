import { useState } from 'react';
import Places from './Places.jsx';
import { useEffect } from 'react';
import Error from './Error.jsx'

const places = localStorage.getItem('places');

export default function AvailablePlaces({ onSelectPlace }) {


  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    fetch('http://localhost:3000/placesss').then((response) => {

      if (!response.ok) {
        throw new Error('Failed to fetch places');
      }

      return response.json();
    }).then((resData) => {

      setAvailablePlaces(resData.places);
      setIsFetching(false);
    }).catch((error) => {
      setError({ message: error.message || 'Could not fetch places, please try again later.' });
    });
  }, []);

  if (error) {
    return (
      <Error title="An error occurred!" message={error.message}></Error>
    );
  }

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
