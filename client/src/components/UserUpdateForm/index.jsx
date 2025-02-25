import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames';
import { USER_UPDATE_SCHEMA } from '../../validation/userValidation';
import styles from './UserUpdateForm.module.scss';
import { updateUser } from '../../store/slices/userSlice';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordRepeat: '',
  gender: '',
  // imgSrc: '',
};

const UserUpdateForm = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.user);

  const handleSubmit = (values, formikBag) => {
    const userUpdatedFields = {};

    Object.entries(values).forEach(([key, value]) => {
      if(value !== '' && key !== 'gender') {
        userUpdatedFields[key] = value;
      } else if (value !== '' && key === 'gender') {
        userUpdatedFields.isMale = value === 'male';
      }
    });

    // setUser({
    //   ...user,
    //   ...userUpdatedFields
    // });

    dispatch(updateUser({ userData: userUpdatedFields, userId: user.id }));

    formikBag.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={USER_UPDATE_SCHEMA}
    >
      <Form className={styles.form}>
        <div className={styles.inputContainer}>
          <label htmlFor='firstName' className={styles.label}>
            First name:
          </label>
          <Field
            name='firstName'
            type='text'
            id='firstName'
            placeholder='First name'
            className={styles.input}
          />
        </div>
        <ErrorMessage name='firstName' component='p' className={styles.error} />
        <div className={styles.inputContainer}>
          <label htmlFor='lastName' className={styles.label}>
            Last name:
          </label>
          <Field
            name='lastName'
            type='text'
            id='lastName'
            placeholder='Last name'
            className={styles.input}
          />
        </div>
        <ErrorMessage name='lastName' component='p' className={styles.error} />
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
        <div className={styles.inputContainer}>
          <label htmlFor='passwordRepeat' className={styles.label}>
            Repeat password:
          </label>
          <Field
            name='passwordRepeat'
            type='password'
            id='passwordRepeat'
            placeholder='Repeat password'
            className={styles.input}
          />
        </div>
        <ErrorMessage
          name='passwordRepeat'
          component='p'
          className={styles.error}
        />

        <fieldset>
          <legend>Gender</legend>
          <div>
            <Field
              type='radio'
              id='male'
              name='gender'
              value='male'
              className={cx(styles.label, styles.radioLabel)}
            />
            <label
              htmlFor='male'
              className={cx(styles.label, styles.radioLabel)}
            >
              Male
            </label>
          </div>

          <div>
            <Field
              type='radio'
              id='female'
              name='gender'
              value='female'
              className={cx(styles.label, styles.radioLabel)}
            />
            <label
              htmlFor='female'
              className={cx(styles.label, styles.radioLabel)}
            >
              Female
            </label>
          </div>
          <ErrorMessage name='gender' component='p' className={styles.error} />
        </fieldset>

        <div className={styles.btnContainer}>
          <button type='submit' className={styles.btn}>
            Update User data
          </button>
          <button type='reset' className={styles.btn}>
            Reset fields
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default UserUpdateForm;
