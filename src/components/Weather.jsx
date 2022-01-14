// Import React
import React, { useEffect, useState } from 'react';
// Import Styled Components
import styled from 'styled-components';
// Import Components
import Card from './Card/Card';
import Footer from './Footer/Footer';

// Styles
const Loading = styled.div`
  border: 6px solid rgba(0, 0, 0, 0.1);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border-left-color: var(--dark-color);
  animation: spin 1s ease infinite;
  margin: auto;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadText = styled.span`
  font-size: 3.6rem;
  font-weight: bold;
  margin: auto;
  padding: 30px 0;
  font-family: 'Oswald', sans-serif;
`;

const LoadWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  justify-content: center;
  margin: auto;
`;

const MainContainer = styled.div`
  background: #e9f5fa;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 30px;
  flex-wrap: wrap;
  padding: 10px 0;
`;

const Title = styled.span`
  background: #e9f5fa;
  font-size: 3.6rem;
  color: #4db0d3;
  padding: 10px 0;
  font-family: 'Oswald', sans-serif;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

function Weather() {
  // States
  const [results, setResults] = useState('');
  const [location, setLocation] = useState('Medellin');
  const [loading, setLoading] = useState(false);

  const lat = 6.25184;
  const lon = -75.563591;

  //   Request for data
  useEffect(() => {
    const exclude = 'current,minutely,hourly,alerts';
    const key = '5245ee9cec0d5720409ff9ba68ee8a29';
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${key}`;
    fetch(url)
      .then((res) => res.json())
      .then((response) => {
        const { daily } = response;
        const reduced = daily.splice(0, daily.length - 1);
        setResults(reduced);
        setLoading(true);
      });
  }, []);

  useEffect(() => {
    const key = '';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${key}`;
    fetch(url)
      .then((res) => res.json())
      .then((response) => {
        // eslint-disable-next-line
        const { plus_code } = response;
        // eslint-disable-next-line
        const loc = plus_code.compound_code.slice(8).split(',');
        setLocation(loc[0]);
      });
  }, []);

  return (
    <>
      <Title>{`This week weather in ${location}`}</Title>
      <MainContainer>
        {!loading ? (
          <LoadWrap>
            <Loading>
              <div />
            </Loading>
            <LoadText>Loading</LoadText>
          </LoadWrap>
        ) : (
          results.map((day) => (
            <Card
              date={day.dt}
              temp={day.temp.day}
              lowtemp={day.temp.min}
              id={day.weather[0].id}
              pop={day.pop}
            />
          ))
        )}
      </MainContainer>
      <Footer />
    </>
  );
}

export default Weather;
