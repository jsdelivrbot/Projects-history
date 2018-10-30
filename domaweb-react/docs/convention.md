# Conventions
We have some predefined conventions to make the code maintainable and readable for other coders.  

## JavaScript

- ***Import statements***

  Import statements can be organized as follows.

  1. First import default export of a module from third party libraries. For example

   `import React from 'react';`
  2. Then named export of a module from third party libraries. For Example

    `import { connect } from 'react-redux';`

  3. Then default import of our own sharedComponents

    `import AuthRequired from '../sharedComponents/AuthRequired';`

  4. Action, Selectors etc. comes next

  `import { loadUserTasks, tasksLoaded } from './actions';`

  5. Add the styles afterword

  `import styles from './tasks-styles.scss';`

  Complete example can be seen as

  ```
  import React from 'react';
  import PropTypes from 'prop-types'

  import { connect } from 'react-redux';
  import { Row, Col } from 'react-bootstrap';
  import { bindActionCreators } from 'redux';
  import { createStructuredSelector } from 'reselect';

  import Spinner from '../sharedComponents/Spinner';

  import { loadUserTasks, tasksLoaded } from './actions';
  import { getTasksList, getTaskDetail, getshowLoadingBttn} from './selectors';

  import utilites from '../assets/styles/utilities.scss';
  import styles from './tasks-styles.scss';
  ```

- ***Class Names***

  Class names always starts with uppercase and use Camel cases. For example

  ```
  class Tasks extends React.Component {
    ///
  }
  ```

- ***function names***

   Function names starts with small case and use camel case.

   ```
    afterFinishTask
   ```
- ***Variables names***

  variables are named in a similar way as functions.

- ***Use arrow functions***

  Use Arrow function because it doesn't need explicit biding in React.

    ```
    afterFinishTask = () =>{
        this.loadTasks(this.props.params.date);
    }
    ```

- ***mapStateToProp and mapDispatchToProp***

 mapStateToProp and mapDispatchToProp are defined at the end of file after the render function and before export statement.


## CSS


- ***Class Names***

  For class naming conventions, check [Style Guidelines](docs/stylesGuidelines.md)

- ***File names***

  For file naming conventions, check [Folder structure](docs/folderstructure.md)

- ***Variables Names***

 Use variables for commonly occur styles such as color. These variables are stored in `variables.scss`


 [Back to Main Documentation Page] (../README.md)
