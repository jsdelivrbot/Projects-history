/*
 * ControlBar Messages
 *
 * This contains all the text for the ControlBar component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.components.ControlBar.header',
    defaultMessage: 'This is the ControlBar component !',
  },
  currentMedication: {
    id: 'app.containers.MedListView.currentMedication',
    defaultMessage: 'Current Medication',
  },
  allergies: {
    id: 'app.containers.MedListView.allergies',
    defaultMessage: 'Allergies & Marevan dosage',
  },
  administered: {
    id: 'app.containers.MedListView.administered',
    defaultMessage: 'Administered medication',
  },
  en: {
    id: 'medList.allergies',
    defaultMessage: 'Allergies',
  },
  fi: {
    id: 'medList.allergies',
    defaultMessage: 'Allergiat',
  },
});
