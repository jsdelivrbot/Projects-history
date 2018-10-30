/* - Loading gif - */
export let Loading = () => {

  return (
    <div style={{ width: '100%', height: window.innerHeight - 200, display: 'table' }}>
      <div style={{ display: 'table-cell', verticalAlign: 'middle', width: 64, height: 64 }}>
        <div style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
          <img src="/Art/Images/spinner_64.gif" alt="loading"/>
        </div>
      </div>
    </div>
  )
}
