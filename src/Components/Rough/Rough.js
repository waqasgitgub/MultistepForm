import React, { useState } from 'react';

const WorkMissedDueToCovid = () => {
  const [missed2020, setMissed2020] = useState(null);
  const [missed2021, setMissed2021] = useState(null);

  const handle2020Change = (value) => {
    setMissed2020(value);
  };

  const handle2021Change = (value) => {
    setMissed2021(value);
  };

  return (
    <div>
      <h2>Did you miss any self-employed work due to COVID-19 related issues?</h2>

      <div>
        <label>
          <input
            type="radio"
            name="2020"
            value="YES"
            checked={missed2020 === 'YES'}
            onChange={() => handle2020Change('YES')}
          />
          YES
        </label>

        <label>
          <input
            type="radio"
            name="2020"
            value="No"
            checked={missed2020 === 'No'}
            onChange={() => handle2020Change('No')}
          />
          No
        </label>
      </div>

      <div>
        <label>
          <input
            type="radio"
            name="2021"
            value="YES"
            checked={missed2021 === 'YES'}
            onChange={() => handle2021Change('YES')}
          />
          YES
        </label>

        <label>
          <input
            type="radio"
            name="2021"
            value="No"
            checked={missed2021 === 'No'}
            onChange={() => handle2021Change('No')}
          />
          No
        </label>
      </div>
    </div>
  );
};

export default WorkMissedDueToCovid;
