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
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('desc');

  const getLaunchData = async (pageNumber: number, sortingOrder: string) => {
    let apiDone = false;
    setTimeout(() => {
      if (!apiDone) {
        setLoading(true);
      }
    }, 500);

    if (error) {
      setError(false);
    }

    const response = await getLaunches(pageNumber, sortingOrder);
    apiDone = true;

    if (response.error) {
      setError(true);
    } else {
      setLaunches(response.launches);
      setHasNextPage(response.hasNextPage);
      setHasPrevPage(response.hasPrevPage);
      setTotalPages(response.totalPages);
    }

    setLoading(false);
  };

  useEffect(() => {
    getLaunchData(1, sortOrder);
  }, []);

  const getPage = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      getLaunchData(newPage, sortOrder);
      setPage(newPage);
    }
  };

  const goToPresskit = (presskitUrl: string | null) => {
    if (presskitUrl) {
      window.open(presskitUrl);
    }
  };

  const reSortLaunchDateOrder = () => {
    const order = sortOrder === 'asc' ? 'desc' : 'asc'
    setSortOrder(order)

    getLaunchData(page, order);
  };

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);
    return parsedDate.getUTCFullYear();
  };

  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    )
  } else {
    return (
      <div className="container">
        {error &&
          <div className="error-container">
            An error occurred - please try again.
            <span
              className="error-close"
              onClick={() => setError(false)}
            >
              &times;
            </span>
          </div>
        }

        {launches.length > 0 &&
          <div>
            <button
              onClick={() => reSortLaunchDateOrder()}
            >
              Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
            </button>

            <table>
              <caption>SpaceX Launches</caption>
              <thead>
                <tr>
                  <th>Flight Number</th>
                  <th>Launch Year</th>
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
                    <td>{formatDate(launch.date_utc)}</td>
                    <td>{launch.name}</td>
                    <td>{launch.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {page !== 1 && <button onClick={() => getPage(1)}>First Page</button>}
            {hasPrevPage && <button onClick={() => getPage(page - 1)}>Previous</button>}
            {hasNextPage && <button onClick={() => getPage(page + 1)}>Next</button>}
            {page !== totalPages && <button onClick={() => getPage(totalPages)}>Last Page</button>}
          </div>
        }
      </div>
    )
  }
};

export default App;
