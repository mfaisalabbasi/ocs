import Firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyDfs0GARHolYfs4HLnW1JQKpZw3fe0Qla4',
  authDomain: 'on-click-services.firebaseapp.com',
  databaseURL: 'https://on-click-services.firebaseio.com',
  projectId: 'on-click-services',
  storageBucket: 'on-click-services.appspot.com',
  messagingSenderId: '479748201771',
  appId: '1:479748201771:web:98d292f562ded09796f96e',
  measurementId: 'G-8K4JN8CNRV',
};

let app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();
