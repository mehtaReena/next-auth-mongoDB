import { useState, useRef } from 'react';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

import classes from './auth-form.module.css';

async function createUser(email, password) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
}

function AuthForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setLoading(true)
    // optional: Add validation

    if (isLogin) {

      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (!result.error) {
        // set some auth state
        setLoading(false)
        router.replace('/ticket');
      }
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result)
        if (result.status == 401) {

          console.log(result.message);

        }
        console.log(result);
        router.replace('/');

      } catch (error) {

        console.log(error);
        setError(error)

      }
    }
  }


  const resetPassword = () => {
    router.replace('/profile');


  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />



        </div>
        {loading ?<h4>loading....</h4> :" "}

          <div className={classes.actions}>
            <button >{isLogin ? 'Login' : 'Create Account'}</button>
            <button
              type='button'
              disabled={loading}
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
          </div>
          <div className={classes.control}>
            <label htmlFor='msg'>{error.message}</label>
          </div>
      </form>

    </section>
      );
}

      export default AuthForm;
