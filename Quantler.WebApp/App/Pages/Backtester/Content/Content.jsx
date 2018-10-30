import {MiddleContainer}  from './MiddleContainer.jsx';
import {RightContainer}   from './RightContainer.jsx';
import {LeftContainer}    from './LeftContainer.jsx';

export function Content () {
  return (
    <div style={{ minWidth: 1000 }} className="row backtester-content">
      <LeftContainer/>
      <RightContainer/>
      <div style={{ margin: '0 250px' }}>
        <MiddleContainer/>
      </div>
    </div>
  )
}
