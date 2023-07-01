import { signInWithGooglePopup,createUserDocFromAuth } from '../../utils/firebase/firebase.utils';

const SignIn = () => {
  const userSignInWithGooglePopUp = async () => {
    const {user} = await signInWithGooglePopup();
    const userDocRef = await createUserDocFromAuth(user);
  };

  return (
    <button onClick={userSignInWithGooglePopUp}>Sign In with google</button>
  );
};

export default SignIn;
