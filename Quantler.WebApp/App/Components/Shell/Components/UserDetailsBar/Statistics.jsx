import _ from 'lodash'

let types = {
  templates: {
    title: "Number of templates",
  },
  timeanalyzed: {
    title: "Years of data analyzed",
  },
  totalbacktests: {
    title: "Backtests",
  }
}

export let Statistics = ({ statistics }) => {
  return (
    <div>
      <h4 style={{ fontWeight: 'lighter' }}>Statistics</h4>
      <ul style={{ marginTop: 10 }}>
          {
            statistics.map(statistic =>
              <li key={_.uniqueId()}>
                <span>{ statistic.Value }</span>
                <span>{ types[statistic.Type].title }</span>
              </li>)
          }
          {
            (statistics.length == 0) &&
            <span>Loading...</span>
          }
      </ul>
    </div>
  )
}
