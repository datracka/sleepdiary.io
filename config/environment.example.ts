/**
 *
 * @type {{production: boolean; firebase: {apiKey: string; authDomain: string; databaseURL: string; projectId: string; storageBucket: string; messagingSenderId: string}}}
 *
 * STEPS:
 *
 * 1.- rename file to environment.ts
 * 2.- copy keys from: https://console.firebase.google.com/project/sleepdiary-744c3/overview
 * (Click into: "Add Firebase to your WebApp")
 *
 */
export const environment = {
  production: false,
  firebase: {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  }
};
