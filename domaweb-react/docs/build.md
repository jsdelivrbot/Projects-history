# Jenkin builds and build release flow
- Build the feature branch in Jenkin at this URL https://jenkins.domacare.fi/.
- To Build Jenkin branch
  1. Select `domaweb-react`
  2. Select `Build with Parameters`
  3. Select the feature branch
  4. The built branch will be available at https://reactdev.domacare.fi/yourfeature/#/login
- Test the app first in feature branch before merging to master. Get the approval for merging in master.
- Master will serve as the staging.
- Build the staging branch by going to `domaweb-react-staging` and test the app in https://apptest.domacare.fi/#/login.
- Push the changes to the production branch and build it by going to `domaweb-react-production`

[Back to Main Documentation Page] (../README.md)
