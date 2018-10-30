# Localization and language settings

For language support we use a library called react-intl.
It has many different react components, but the most notable for language support
is FormattedMessage

Formatted message works as follows:
We create a messages.js file that contains an object with properties, which contain
an object with id and defaultMessage. Both are required. The component breaks unless
you provide them

```javascript

import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.components.NotFoundPage.header',
    defaultMessage: 'This is NotFoundPage component!',
  },
});

```

and use it in our components like this

```javascript

import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

export default class NotFound extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
    );
  }
}

```

Now defaultMessages are what they seem to be: Just default messages.
For language support we must go to -[src/translations](src/translations)

which contains (or should contain) folders for each feature.
It also contains [en.js](src/translations/en.js) and [fi.js](src/translations/fi.js)

fi.js from the inside.
We import all the Finnish language files here, combine them to the default export via
spread operator, and export.

```JavaScript
  import medicationListFi from './MedicationList/fi.json'
  import notFoundFi from './NotFound/fi.json';

  const fiLocale = {...medicationListFi, ...notFoundFi};
  export default fiLocale;


```

the result is used in [i8n.js](src/i8n.js)

Now for the actual translations. They will look like something like this:

fi.json from [NotFound](src/translations/NotFound/fi.json)

```json
  {"app.components.NotFoundPage.header": "Sivua ei löydy"}
```

see that the property is extactly the same as the id in

```JavaScript
export default defineMessages({
  header: {
    id: 'app.components.NotFoundPage.header',
    defaultMessage: 'This is NotFoundPage component!',
  },
});
```

The default locale is defined in [App/constants.js](src/App/constants.js)

```JavaScript
  export const DEFAULT_LOCALE = 'fi';
```

and switching between locales will be done by changing this state.

[Back to Main Documentation Page] (../README.md)
