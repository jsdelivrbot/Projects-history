export let Styles = (color = '#eee') => ({
  base: {
    float: 'left',
    margin: 10,
    width: 370,
    height: 212,
    background: '#fff',
    borderTop: `3px solid ${color}`,
    boxShadow: '1px 0 2px 0 rgba(0,0,0,0.1)'
  },
  title: {
    width: '100%',
    padding: '10px 10px 10px 20px',
    fontSize: 16,
    fontFamily: 'Open Sans',
    fontWeight: 300
  },
  price: {
    integer: {
      fontSize: 16
    },
    decimal: {
      fontSize: 12
    }
  },
  description: {
    width: '100%',
    height: 125,
    padding: '13px 20px',
    background: '#f5f7fa'
  },
  footer: {
    base: {
      height: 40,
      width: '100%',
      background: '#EDF0F5',
      boxShadow: '-1px 1px 4px 0 rgba(0,0,0,0.15) inset'
    },
    item: ({ border, noPadding }) => {
      let props = {
        borderRight: (border ? '1px solid rgba(0, 0, 0, 0.05)' : 'none'),
        float: 'left',
        height: '100%'
      }

      if (!noPadding) props.padding = '10px 0 10px 10px'

      return props
    },
    import: {
      base: {
        paddingTop: 12,
        width: 52,
        height: '100%',
        textAlign: 'center',
        color: '#fff',
        cursor: 'pointer',
        opacity: '0.8',
        background: '#ee4415',
        ':hover': {
          opacity: '1'
        }
      },
      default: {
        background: '#ee4415'
      },
      needsUpdate: {
        background: "#f15a6b"
      },
      imported: {
        background: "#addd87"
      },
      importing: {
        opacity: 0.8,
        cursor: 'default'
      }
    }
  }
})

export let defaultStyle = Styles()
