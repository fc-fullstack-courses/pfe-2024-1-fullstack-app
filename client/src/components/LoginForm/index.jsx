import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { USER_LOGIN_SCHEMA } from '../../validation/userValidation';
import styles from './LoginForm.module.scss';
import { login } from '../../store/slices/userSlice';

const initialValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const {user, isLoading, error } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async (values, formikBag) => {
    dispatch(login(values));

    formikBag.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={USER_LOGIN_SCHEMA}
    >
      <Form className={styles.form}>
        <div className={styles.inputContainer}>
          <label htmlFor='email' className={styles.label}>
            Email:
          </label>
          <Field
            name='email'
            type='email'
            id='email'
            placeholder='Email'
            className={styles.input}
          />
        </div>
        <ErrorMessage name='email' component='p' className={styles.error} />
        <div className={styles.inputContainer}>
          <label htmlFor='password' className={styles.label}>
            Password:
          </label>
          <Field
            name='password'
            type='password'
            id='password'
            placeholder='Password'
            className={styles.input}
          />
        </div>
        <ErrorMessage name='password' component='p' className={styles.error} />

        <button type='submit' className={styles.btn}>
          Login
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
