# Folder structures

## Folder structure for new feature


The bellow mentioned structure shows the typical Feature folder and Shared components structure we follow. The Feature folder is the main container components with sagas, reducers etc. We name it capital and camel case. This main container can have other containers inside and the supported UI components. For example -SomeComponent is usually a pure or functional components used in the Feature container. These components and containers are also named camel case. The api files contains functions to call the API endpoints we need.

All the tests are contained in the `test` folder. The `utils` folder and `Readme.md` files are optional. `libs` folder can contain any third party library which we will modify for our need. `messages.js` contains all the translation files.

```
FeatureContainer
 -components
   -SomeComponent
      -index.js
      -some-components-styles.scss
 -containers
   -SomeContainer
      -index.js
      -saga.js
      -reducers.js
      -actions.js
      -constants.js
      -selectors.js
      -api.js
 - tests
 - utils (Optional)
    - featureUtils.js
 - libs (When needed)
    - Third Part Modified Library
 -index.js
 -saga.js
 -reducers.js
 -actions.js
 -constants.js
 -selectors.js
 -api.js
 -messages.js
 -Readme.md (Optional)
 ```
Note: We don't usually have any styles in containers.

## Folder structure for shared Components ***(It will change in future)***
```
sharedComponents
 -UI
  -SomeComponent
    -index.js
    -some-components-styles.scss
    -some-component-stories.js
-Feature
  -SomeFeatureComponent
    -index.js
    -some-components-styles.scss
    -some-component-stories.js
```

[Back to Main Documentation Page] (../README.md)
