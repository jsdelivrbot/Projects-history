import * as API from '../Networking/API/API.jsx'

let samples = (value) => ({ state: { samples: value } })

export let Samples = {

  deleteSample (sample)
  {
    return {
      ...samples({
        details: {
          delete: {
            loading: true
          }
        }
      }),
      ajax: [
        [API.Sample.deleteSample,
          Object.deepExtend(sample, { Deleted: true }),
          Samples._deleteSample]]
    }
  },

  _deleteSample (response)
  {
    window.location.replace('/#/samples')

    return {
      ...samples({
        details: {
          delete: {
            loading: false
          }
        }
      })
    }
  },

  toggleDeleteSampleModal (state)
  {
    let modalOpen =
      !state.samples.details.delete.modalOpen

    return {
      ...samples({
        details: {
          delete: {
            modalOpen
          }
        }
      })
    }
  }

}
