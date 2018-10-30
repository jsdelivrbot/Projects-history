# Domacare2.0
![Logo](docs/images/domacare_icon.png "Logo")

A living documentation of Domacare2.0.

# Technologies
### Core
 - React v16.3.2
 - React Router v3.2.0
 - Redux (state management) v3.6.0
 - Redux Saga (API and side effect management) v0.16.0
 - Reselect (memoization, composability) v2.5.4
 - ImmutableJS v3.8.1

### Others
- Tooling > Wepback v2.2.0-rc.3
- Responsive grid > Bootstrap v3.3.7
- SASS with CSS3 (Features supported in target browsers).
- HTML5 (Features supported in target browsers).
- JavaScript ES6 (transpilled to ES5).
- Modernizr (for feature detection) v3.6.0

# Prerequisites
- install ``node.js`` [https://nodejs.org/en/](https://nodejs.org/en/)
- Install SSH key ``https://git.domacare.fi/profile/keys``
- ``git clone https://git.domacare.fi/domaweb/domaweb-react``
- ``npm install``
- Setup host mac and linux
	- ``nano /etc/hosts``
	- add new line and save ``127.0.0.1       localdev.domacare.fi:443``
- ``npm start``
- open ``https://localdev.domacare.fi/`` in your browser.
- Happy coding 😎


# Design principal

- **Cross Browser**:- The application should be cross browser. The browsers which we are supporting are mentioned in the later section. Every view and feature which we will be using in the app need to be checked for these browsers and if not we need to use moderniz for fall back. We use Browserstack for cross browser testing.

- **Cross Device**:-The app need to be supported in both mobile and desktop devices with varying resolutions.

- **Accessible**:-  Since many of our users are from healthcare, we should try make application more accessible to users. The performance of the app should be high. We use like lazy loading for it and in future We will might use server side rendering. We will also use gzip for compression.

- **Security**:- Since we will be transferring and fetching important user data, the app need to be secure.

- **Sacalable**:- The app should be scalable so we can add more features easily.

- **Maintainable**:- The app should be easily maintainable in case of any bug found for all the developers.

- **Readable**:- The developer should be able to understand each other code if needed and for that we follow some guidelines mentioned in later sections. Proper documentation should be used for both components and code.

- **Testing**:- All the important features of the app should have properly tested. We will have both end to end tests and unit tests. For unit test we use Jest and for end to end we will decide later.


# Supported browsers
- IE 9 to up
- All Edge browsers
- IOS safari (version here)
- Safari (version here)
- Chrome (version here)
- Firefox (version here)
- Opera (version here)
- Samsung Internet v1.6.28 till v7.0.10.44


# Documentation
- [Getting started](docs/gettingstarted.md)
- [Folder structure](docs/folderstructure.md)
- [Global reducers and sagas](docs/global.md)
- [Git Work flow](docs/gitWorkflow.md)
- [Build Guide] (docs/build.md)
- [Naming and general conventions](docs/convention.md)
- [Style guidelines](docs/stylesGuidelines.md)
- [Some general Guidelines] (docs\generalGuidelines.md)
- [CLI Commands](docs/commands.md)
- [Language support and localization](docs/localization.md)
- [Testing](docs/testing.md)
