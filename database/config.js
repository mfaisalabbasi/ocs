import Firebase from 'firebase';
var firebaseConfig = {
  apiKey: 'AIzaSyAfVRLKqj_hBKc9HSuji_ujl0NEW-opQVE',
  authDomain: 'on-click-s.firebaseapp.com',
  databaseURL: 'https://on-click-s.firebaseio.com',
  projectId: 'on-click-s',
  storageBucket: 'on-click-s.appspot.com',
  messagingSenderId: '793430247391',
  appId: '1:793430247391:web:ae3cc323990650a19ee66a',
  measurementId: 'G-34RJXJG9RC',
};

let app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();
export const auth = app.auth();
