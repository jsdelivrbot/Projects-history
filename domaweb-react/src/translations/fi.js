import medicationListFi from './MedicationList/fi.json'
import addTaskFi from './AddTask/fi.json';
import tasksFi from './Tasks/fi.json';
import notFoundFi from './NotFound/fi.json';
import sidenavitemFi from './Sidenavitem/fi.json';
import searchBarFi from './SearchBar/fi.json';
import reportDisplayFi from './ReportDisplay/fi.json';
import topHeaderFi from './TopHeader/fi.json';

const fiLocale = {
  ...medicationListFi,
  ...notFoundFi,
  ...sidenavitemFi,
  ...searchBarFi,
  ...addTaskFi,
  ...tasksFi,
  ...reportDisplayFi,
  ...topHeaderFi,
};
export default fiLocale;
