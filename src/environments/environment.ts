// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  firebaseConfig : {
    apiKey: "AIzaSyDAIyRDUKlsCygO6g8dYJANXqdKBgu9BNo",
    authDomain: "donapp-342910.firebaseapp.com",
    projectId: "donapp-342910",
    storageBucket: "donapp-342910.appspot.com",
    messagingSenderId: "793983751073",
    appId: "1:793983751073:web:91cebed3702d2a9e06f1e0",
    measurementId: "G-QWT46Q69ME"
  },

  //UrlApi:'https://sitedev.poclab.pe/donappdev/api',  
  //UrlImage:'assets/',

      UrlApi:'http://localhost:48394/api',  
      UrlImage:'assets/',

  TOKEN_NAME: 'access_token',
  TOKEN_GOOGLE: 'access_google',

  ERROR: 0,
  EXITO: 1,
  ALERT: 2
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
