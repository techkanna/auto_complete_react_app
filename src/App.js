import React, { useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [dropdownVaules, setDropDownValues] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const searchState = async searchText => {
    setInputValue(searchText);
    const res = await Axios('http://127.0.0.1:5000/states.json');
    const states = res.data;

    let matches = states.filter(state => {
      const regex = new RegExp(`^${inputValue}`, `gi`);
      return state.name.match(regex) || state.abbr.match(regex);
    });

    if (searchText.length === 0) {
      matches = [];
    }

    setDropDownValues(matches);
  };

  // const outputsHtml = matches => {
  //   if (matches.length > 0) {
  //     const html = matches
  //       .map(
  //         match => `
  // <div class='card card-body mb-1'>
  //   <h4>${match.name} (${match.abbr}) <span class='text-primary'>${match.capital}</span>
  //   </h4>
  //   <small>lat: ${match.lat} / long: ${match.long}</small>
  // </div>
  //     `
  //       )
  //       .join('');

  //     matchList.innerHTML = html;
  //   }
  // };
  return (
    <div className="App">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 m-auto">
            <h3 className="text-center mb-3">
              <i className="fas fa-flag-usa"></i> State Capital Lookup
            </h3>
            <div className="form-group">
              <input
                type="text"
                id="search"
                placeholder="Enter state Name or abbreviation..."
                className="form-control control-lg"
                onChange={e => searchState(e.target.value)}
                value={inputValue}
              />
            </div>

            {dropdownVaules.length > 0 ? (
              <div style={{ backgroundColor: '#222', marginTop: '-1rem' }}>
                {dropdownVaules.map((match, i) => (
                  <div
                    key={i}
                    onClick={() => setInputValue(match.name)}
                    style={{ backgroundColor: '#444', margin: '0.2rem' }}
                  >
                    <h6 style={{ margin: '0' }}>
                      {match.name} ({match.abbr})
                      <span className="text-primary">${match.capital}</span>
                    </h6>
                  </div>
                ))}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
