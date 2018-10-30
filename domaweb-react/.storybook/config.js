import { configure, setAddon } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import chaptersAddon from 'react-storybook-addon-chapters';
import { setDefaults } from '@storybook/addon-info';

setAddon(chaptersAddon);

/* Info addon options */
setDefaults({
  header: false, // Toggles display of header with component name and description
  inline: true,
  source: true,
});

setOptions({
  name: 'Domacare 2.0 Storybook',
  url: 'https://localdev.domacare.fi/#/'
})

const req = require.context('../src/sharedComponents', true, /\.stories\.js$/)

function loadStories() {
    req.keys().forEach((filename) => req(filename));
}
configure(loadStories, module);
