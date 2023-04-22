import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDH05Ki6VJmJcrN8sTMT3jjF_RCPO0BQWU',
  authDomain: 'nomina-umg.firebaseapp.com',
  projectId: 'nomina-umg',
  storageBucket: 'nomina-umg.appspot.com',
  messagingSenderId: '707694131227',
  appId: '1:707694131227:web:39d8b1cc2a082c4256a0be',
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
