import { useField } from 'formik';

const FileInput = ({ name, ...restProps }) => {

  const [{value, ...field}, meta, helpers ] = useField(name);

  const onChange = (e) => {
    const file = e.target.files[0];

    helpers.setValue(file);
  }

  return <input type='file' {...restProps} {...field} onChange={onChange} />;
};

export default FileInput;
