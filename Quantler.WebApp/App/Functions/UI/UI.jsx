let uiState = ui => ({ state: { ui } })

export let UI =
{
  load ()
  {
    return UI.updateLayoutWidth()
  },

  typeUpdate (activeLayout, { ui })
  {
    return {
      ...uiState({ activeLayout })
    }
  },

  toggleLayout ({ ui })
  {
    return (ui.activeLayout == ui.layoutTypes.expanded)
      ? (UI.typeUpdate(ui.layoutTypes.collapsed, { ui }))
      : (UI.typeUpdate(ui.layoutTypes.expanded, { ui }))
  },

  updateLayoutWidth ({ ui })
  {
    let layoutWidth =
      (ui.activeLayout == ui.layoutTypes.expanded)
        ? 220 : 60

    return {
      ...uiState({ layoutWidth })
    }
  }
}
