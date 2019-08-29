'use strict'

const rootDiv = document.getElementById('root');

axios.get('https://swapi.co/api/planets/')
  .then(function (response) {
    const planets = response.data.results;

    planets.forEach((planet) => {
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card');
      const planetNameHolder = document.createElement('h3');
      const planetClimateHolder = document.createElement('p');
      planetClimateHolder.textContent = 'Climate: ';
      const planetTerrainHolder = document.createElement('p');
      planetTerrainHolder.textContent = 'Terrain: '

      planetNameHolder.textContent = planet.name;
      planetClimateHolder.textContent += planet.climate;
      planetTerrainHolder.textContent += planet.terrain;

      const residentList = document.createElement('ul');
      residentList.textContent = 'Residents: ';

      planet.residents.forEach(resident => {

        axios.get(resident)
          .then(function (response) {
            const resident = response.data;
            const residentItem = document.createElement('li');
            const residentItemLink = document.createElement('a');

            residentItemLink.textContent = resident.name;

            residentItem.appendChild(residentItemLink);
            residentList.appendChild(residentItem);

            cardDiv.appendChild(residentList);
          })
      });



      cardDiv.appendChild(planetNameHolder);
      cardDiv.appendChild(planetClimateHolder);
      cardDiv.appendChild(planetTerrainHolder);
      rootDiv.appendChild(cardDiv);
    })


  })
  .catch(function (error) {
    console.log(error);
  });

