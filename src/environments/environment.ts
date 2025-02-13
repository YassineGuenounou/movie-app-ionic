// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyCkgL2suanP_ba5K38HY4ZI_0g8_jMxf6Q",
    authDomain: "movieapp-fbdfb.firebaseapp.com",
    databaseURL: "https://movieapp-fbdfb-default-rtdb.firebaseio.com",
    projectId: "movieapp-fbdfb",
    storageBucket: "movieapp-fbdfb.firebasestorage.app",
    messagingSenderId: "78304015863",
    appId: "1:78304015863:web:c82efb231a254f85ffeaf2",
    measurementId: "G-E1V61W698Q"
  },
  tmdbConfig: {
    apiKey: "d9340b096852df2a80c7afea38206509",
    apiUrl: "https://api.themoviedb.org/3/movie/popular",
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
