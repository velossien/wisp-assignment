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
          <>
            <div className="table-header">
              <h1 className="display-font">
                SpaceX Launches
              </h1>
              <div className="button-container">
                <button
                  className={`button ${page !== 1 ? '' : 'disabled'}`}
                  onClick={() => getPage(1)}
                >
                  &#171;
                </button>
                <button
                  className={`button ${hasPrevPage ? '' : 'disabled'}`}
                  onClick={() => getPage(page - 1)}
                >
                  &lsaquo;
                </button>
                <button
                  className={`button ${hasNextPage ? '' : 'disabled'}`}
                  onClick={() => getPage(page + 1)}
                >
                  &rsaquo;
                </button>
                <button
                  className={`button ${page !== totalPages ? '' : 'disabled'}`}
                  onClick={() => getPage(totalPages)}
                >
                  &#187;
                </button>
              </div>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th className="flight-number-col">Flight #
                      <span
                        onClick={() => reSortLaunchDateOrder()}>
                        {sortOrder === 'asc' ? '\u25B2' : '\u25BC'}
                      </span>
                    </th>
                    <th className="date-col">Launch Year</th>
                    <th className="name-col">Rocket Name</th>
                    <th className="details-col">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {launches.map((launch: Launch) => (
                    <tr
                      key={launch.flight_number}
                      onClick={() => goToPresskit(launch.links.presskit)}
                      className={launch.links.presskit ? "clickable-row" : ""}
                    >
                      <td>{launch.flight_number}</td>
                      <td>{formatDate(launch.date_utc)}</td>
                      <td>{launch.name}</td>
                      <td>{launch.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        }
      </div>
    )
  }
};

export default App;
