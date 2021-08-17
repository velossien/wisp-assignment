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
  const [hasPrevPage, setHasPrevPage] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  const getLaunchData = async (pageNumber: number) => {
    let apiDone = false;
    setTimeout(() => {
      if (!apiDone) {
        setLoading(true);
      }
    }, 500);

    if (error) {
      setError(false);
    }

    const response = await getLaunches(pageNumber);
    apiDone = true;

    if (response.error) {
      setError(true);
    } else {
      setLaunches(response.launches);
      setHasNextPage(response.hasNextPage);
      setHasPrevPage(response.hasPrevPage);
    }

    setLoading(false);
  };

  useEffect(() => {
    getLaunchData(1);
  }, []);

  const getPrevPage = () => {
    if (page > 1) {
      const newPage = page - 1;
      getLaunchData(newPage);
      setPage(newPage);
    }
  };

  const getNextPage = () => {
    const newPage = page + 1;
    getLaunchData(newPage);
    setPage(newPage);
  };

  const goToPresskit = (presskitUrl: string | null) => {
    console.log(presskitUrl)
    if(presskitUrl) {
      window.open(presskitUrl);
    }
  };


  return (
    <div className="container">
      {loading &&
        <Loader />
      }

      {launches.length > 0 &&
        <div>
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
                <tr
                  key={launch.flight_number}
                  onClick={() => goToPresskit(launch.links.presskit)}
                >
                  <td>{launch.flight_number}</td>
                  <td>{launch.date_utc}</td>
                  <td>{launch.name}</td>
                  <td>{launch.details}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {hasPrevPage && <button onClick={() => getPrevPage()}>Previous</button>}
          {hasNextPage && <button onClick={() => getNextPage()}>Next</button>}
        </div>
      }
    </div>
  )
};

export default App;
