import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllTrains } from './api';
import moment from 'moment';

const TrainsList = () => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await getAllTrains(token);
        const { data } = response;
        const filteredData = data.filter((train) => {
          const now = moment();
          const departureTime = moment(train.departureTime, 'HH:mm:ss');
          const duration = moment.duration(departureTime.diff(now));
          const minutes = duration.asMinutes();
          return minutes > 30;
        });
        const sortedData = filteredData.sort(
          (a, b) =>
            a.price.AC - b.price.AC ||
            b.seatsAvailable.AC - a.seatsAvailable.AC ||
            moment(b.departureTime, 'HH:mm:ss').diff(
              moment(a.departureTime, 'HH:mm:ss')
            )
        );
        setTrains(sortedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrains();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Trains List</h2>
      <ul>
        {trains.map((train) => (
          <li key={train.trainNumber}>
            <Link to={`/train/${train.trainNumber}`}>
              {}
<h3>{train.trainName}</h3>
<p>
Departure Time: {moment(train.departureTime, 'HH:mm:ss').format('h:mm A')}
</p>
<p>
Arrival Time: {moment(train.arrivalTime, 'HH:mm:ss').format('h:mm A')}
</p>
<p>Duration: {train.duration}</p>
<p>Price: {train.price.AC}</p>
<p>Seats Available: {train.seatsAvailable.AC}</p>
</Link>
</li>
))}
</ul>
</div>
);
};

export default TrainsList;