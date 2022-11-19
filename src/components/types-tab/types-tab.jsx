import React from 'react';

class TypesTab extends React.Component {
  render() {

    const [current, setCurrent] = React.useState('one')

    return (
      <div style={{ display: 'flex' }}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          One
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Two
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Three
        </Tab>
      </div>
    )
  }
}

export default TypesTab;
