#### Github Battle

![App screenshot](https://user-images.githubusercontent.com/7386478/35818233-7c39f11a-0a6d-11e8-9fe6-5ab0837638dc.png)

### Description

Select two GitHub users and  see who wins!

### Deployment

To play click [HERE](https://github-battle-b7cc4.firebaseapp.com/)

### Technologies used

* React
* React Router 4
* Javascript/ ES6
* FlexBox
* Git
* Firebase
* Webpack
* Babel


### App Design and Build

This was an excercise in learning additional aspects of React and the tooling involved. I learned and incorporated best practices of code organization, function composition, and client side routing. 

 In /utils/api.js, by exporting this module to other components, code reuse and api requests were maximized and organized centrally.

 Webpack.js has a basic conditional configuration that depends on if the node environment detected was in production or development. The build was optimized with the UglifyJsPlugin.

 App.js is the entry point for the app and here, a Routes are defined and a Switch component is used as a fallback for a 404.

 Battle.js contains a controlled component to handle player input. Battle holds state and passes props down to another component, PlayerPreview.js.

 The rest of the components provide additional functionality such as the Results component, and we data is generally mapped over and rendered in a flexible grid. this can be seen in the Popular component as well.







