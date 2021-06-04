//npm install --save firebase
import firebase from "firebase/app";
import "firebase/analytics";
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: "AIzaSyDcHHFVLptLTdMkWCDR_mRuklNC6MV16eg",
	authDomain: "we-co-ce809.firebaseapp.com",
	databaseURL: "https://we-co-ce809.firebaseio.com",
	projectId: "we-co-ce809",
	storageBucket: "we-co-ce809.appspot.com",
	messagingSenderId: "398811986177",
	appId: "1:398811986177:web:17a36ed416ff9149b24300"
};


firebase.initializeApp(firebaseConfig);

const dataBase = firebase.database();
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.FacebookAuthProvider();
const providerMail = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();



export default {
	firebase,
	db,
	auth,
	provider,
	providerMail,
	storage,
	dataBase
}
