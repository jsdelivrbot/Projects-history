export const getActions = [];
export const postActions = [];
export const putActions = [];
export const deleteActions = [];
export const autocompleteActions = [];
export const parallelActions = [];

export const addActionsToSagas = (actions) => {
  actions.forEach((action) => {
    switch (true) {
      case action.REQUEST.includes('GET_PARALLEL'):
        parallelActions.push(action.REQUEST);
        break;
      case action.REQUEST.includes('GET_WITH_FILTER'):
      case action.REQUEST.includes('FILTER_SAVE'):
      case action.REQUEST.includes('SAVE'):
        postActions.push(action.REQUEST);
        break;
      case action.REQUEST.includes('GET'):
        getActions.push(action.REQUEST);
        break;
      case action.REQUEST.includes('UPDATE_DEFAULT_COLUMNS'):
      case action.REQUEST.includes('FILTER_UPDATE'):
      case action.REQUEST.includes('UPDATE'):
        putActions.push(action.REQUEST);
        break;
      case action.REQUEST.includes('FILTER_DELETE'):
      case action.REQUEST.includes('DELETE'):
        deleteActions.push(action.REQUEST);
        break;
      case action.REQUEST.includes('SEARCH'):
        autocompleteActions.push(action.REQUEST);
        break;
      default:
        break;
    }
  });
};

export const addMainContainerActionsToSagas = (actionsObj) => {
  const actions = Object.keys(actionsObj).map(key => actionsObj[key]);
  addActionsToSagas(actions);
};
