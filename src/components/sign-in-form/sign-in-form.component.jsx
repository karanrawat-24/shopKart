import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';
import Button from '../button/button.component';

import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFeilds, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFeilds;


  const onChangehandler = (event) => {
    const { name, value } = event.target;

    setFormFields({
      ...formFeilds,
      [name]: value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
       await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      setFormFields(defaultFormFields);
    } catch (error) {
      console.log(error);
    }
  };

  const SignInWithGoogle = async () => {
      await signInWithGooglePopup();
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
