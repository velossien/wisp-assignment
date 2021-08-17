import React, { useEffect, useState } from 'react';
import './styles/app.scss';
import { Launch } from './services/types';

import Loader from './components/Loader';

import { getLaunches } from './services/api';

const App = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getLaunchData = async () => {
    let apiDone = false;
    setTimeout(() => {
      if (!apiDone) {
        setLoading(true);
      }
    }, 500);

    if (error) {
      setError(false);
    }

    const response = await getLaunches(page);
    apiDone = true;

    if (response.error) {
      setError(true);
    } else {
      setLaunches(response.launches);
    }

    setLoading(false);
  };

  useEffect(() => {
    getLaunchData();
  }, []);

  return (
    <div className="container">
      {loading &&
        <Loader />
      }

      {launches.length > 0 &&
        <table>
          <caption>SpaceX Launches</caption>
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>Date (UTC)</th>
              <th>Rocket Name</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {launches.map((launch: Launch) => (
              <tr key={launch.flight_number}>
                <td>{launch.flight_number}</td>
                <td>{launch.date_utc}</td>
                <td>{launch.name}</td>
                <td>{launch.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  )
};

export default App;
