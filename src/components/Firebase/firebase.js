// import app from '/firebase/app';
// import 'firebase/auth';
// import 'firebase/database';

// const config = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET
// }

// class Firebase {
//     constructor(){
//         app.initializeApp(config);
//         this.db = app.database();
//         this.auth = app.auth();
//         this.googleAuthProvider = new app.auth.GoogleAuthProvider();
//     }

//     doGoogleSignIn = () => this.auth.signInWithPopup(this.googleAuthProvider);

//     user = (uid) => this.db.ref(`users/${uid}`);

//     onAuthChangeListener = (next) =>{
//         return this.auth.onAuthStateChanged(authUser =>{
//             if(authUser) {
//                 console.log(`authUser: listener: ${authUser}`);
//                 next(authUser);
//             } else {
//                 //TODO: handle case if user is not logged in
//             }
//         })
//     }
// }

// export default Firebase;
