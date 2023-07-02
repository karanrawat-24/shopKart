import { useState, useContext } from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';
import Button from '../button/button.component';
import { UserContext } from '../contexts/user.context';

import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  createUserDocFromAuth,
} from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFeilds, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFeilds;

  const { setCurrentUser } = useContext(UserContext);

  const onChangehandler = (event) => {
    const { name, value } = event.target;
    console.log(name, value);

    setFormFields({
      ...formFeilds,
      [name]: value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      setCurrentUser(user);

      setFormFields(defaultFormFields);
    } catch (error) {
      console.log(error);
    }
  };

  const SignInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    setCurrentUser(user);
    await createUserDocFromAuth(user);
  };

  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign In with your email and password</span>

      <form onSubmit={submitHandler}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={onChangehandler}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={onChangehandler}
          name='password'
          value={password}
        />

        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType='google' onClick={SignInWithGoogle}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
