import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import {
  auth,
  signInWithGooglePopup,
  createUserDocFromAuth,
  signInWithGoogleRedirect,
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
  const userSignInWithGooglePopUp = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocFromAuth(user);
  };

  useEffect(
    () => async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        const userDocRef = await createUserDocFromAuth(response.user);
      }
    },
    []
  );

  return (
    <div>
      <button onClick={userSignInWithGooglePopUp}>
        Sign In with google popup
      </button>
      <button onClick={signInWithGoogleRedirect}>
        Sign In with google redirect
      </button>
    </div>
  );
};

export default SignIn;
