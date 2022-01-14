// Import React
import React from 'react';
// Import Styled Components
import styled from 'styled-components';
// Import Images
import Cloudy from '../../assets/images/cloudy';
import PartlyCloudy from '../../assets/images/partly-cloudy';
import Rainy from '../../assets/images/rainy';
import Snowy from '../../assets/images/snowy';
import Stormy from '../../assets/images/stormy';
import Sunny from '../../assets/images/sunny';
import LowTemp from '../../assets/images/low';
import Pop from '../../assets/images/precipitation';

// Styles
const CardContainer = styled.div`
  min-height: 425px;
  border-radius: 50px;
  position: relative;
  width: 164px;
  padding-top: 252px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1),
    11px 4px 34px rgba(32, 77, 92, 0.25);
  background-color: ${(props) => props.backgroundColor || 'white'};
`;

const Cloud = styled.div`
  position: absolute;
  left: -26px;
  top: 77px;
`;

const Content = styled.div`
  color: ${(props) => props.tcolor || 'white'};
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  text-transform: uppercase;
  color: #4db0d3;
`;

const DayWeek = styled.span``;

const DayNumber = styled.span`
  font-size: 4.5rem;
`;

const Deg = styled.span`
  position: absolute;
  font-size: 3rem;
  top: 20px;
`;

const Icon = styled.div`
  display: inline-block;
  position: relative;
  top: 10px;
  fill: ${(props) => props.tcolor || 'white'};
`;

const LowerTemp = styled.div`
  left: -3px;
  position: relative;
`;

const MainCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 164px;
  margin: 20px auto;
  font-family: 'Krona One', sans-serif;
  text-align: center;
`;

const Precipitation = styled.div`
  margin-bottom: 10px;
`;

const PCloud = styled.div`
  position: absolute;
  left: -14px;
  top: 20px;
`;

const Rain = styled.div`
  position: absolute;
  left: 31px;
  top: -13px;
  mix-blend-mode: none;
`;

const Snow = styled.div`
  position: absolute;
  left: -25px;
  top: 20px;
`;

const Str = styled.div`
  position: absolute;
  left: -21px;
  top: 40px;
`;

const Sun = styled.div`
  position: absolute;
  left: -21px;
  top: 20px;
`;

const Temperature = styled.div`
  font-family: 'Oswald', sans-serif;
  color: ${(props) => props.tcolor || 'white'};
  font-size: 7rem;
  position: relative;
  padding-bottom: 60px;
`;

// Weather Card
function Card({
  date = 1642093200,
  temp = 294.71,
  lowtemp = 288.99,
  id = 500,
  pop = 0.2,
}) {
  // Array to get day
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];
  // Calendar day
  const dayNumber = (e) => new Date(e * 1000).getDate();
  // Weekday number to read array
  const dayWeek = (e) => new Date(e * 1000).getDay();
  // Conversion from Kelvin to Centigrades
  const centigrades = (e) => Math.round(e - 273.15);
  // Choosing icon acording to API codes
  const icon = (e) => {
    if (e >= 200 && e <= 232) {
      return (
        <Str>
          <Stormy />
        </Str>
      );
    }
    if (e >= 300 && e <= 531 && e !== 511) {
      return (
        <Rain>
          <Rainy />
        </Rain>
      );
    }
    if ((e >= 600 && e <= 622) || e === 511) {
      return (
        <Snow>
          <Snowy />
        </Snow>
      );
    }
    if (e === 800) {
      return (
        <Sun>
          <Sunny />
        </Sun>
      );
    }
    if (e === 801) {
      return (
        <PCloud>
          <PartlyCloudy />
        </PCloud>
      );
    }
    if (e >= 802 && e <= 804) {
      return (
        <Cloud>
          <Cloudy />
        </Cloud>
      );
    }
    return 'Invalid id';
  };

  const background = (e) => {
    if (e >= 200 && e <= 232) {
      return '#0E2E3A';
    }
    if (e >= 300 && e <= 531 && e !== 511) {
      return '#2B8BAD';
    }
    if ((e >= 600 && e <= 622) || e === 511) {
      return '#BCE1EF';
    }
    if (e === 800) {
      return '#E6DF95';
    }
    if (e >= 801 && e <= 804) {
      return '#4DB0D3';
    }
    return 'Invalid id';
  };

  const content = (e) => {
    if ((e >= 200 && e <= 531 && e !== 511) || (e >= 801 && e <= 804)) {
      return '#D3EBF4';
    }
    return '#247490';
  };

  const temperature = (e) => {
    if ((e >= 200 && e <= 531 && e !== 511) || (e >= 801 && e <= 804)) {
      return '#E6DF95';
    }
    if ((e >= 600 && e <= 622) || e === 511) {
      return '#0E2E3A';
    }
    if (e === 800) {
      return '#4DB0D3';
    }
    return 'Invalid id';
  };

  return (
    // Main Container
    <MainCard>
      {/* Date Container */}
      <DateContainer>
        <DayWeek>{days[dayWeek(date)]}</DayWeek>
        <DayNumber>{dayNumber(date)}</DayNumber>
      </DateContainer>
      {/* Data Container */}
      <CardContainer backgroundColor={background(id)}>
        <div>{icon(id)}</div>
        <Temperature tcolor={temperature(id)}>
          {centigrades(temp)}
          <Deg>°</Deg>
        </Temperature>
        {/* Precipitation and lower temperature Container */}
        <Content tcolor={content(id)}>
          <Precipitation>
            <Icon tcolor={content(id)}>
              <Pop />
            </Icon>
            {` ${Math.round(pop * 100)}%`}
          </Precipitation>
          <LowerTemp>
            <Icon tcolor={content(id)}>
              <LowTemp />
            </Icon>
            {` ${centigrades(lowtemp)}°`}
          </LowerTemp>
        </Content>
      </CardContainer>
    </MainCard>
  );
}

export default Card;
