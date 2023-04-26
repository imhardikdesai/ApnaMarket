import React, { useContext, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import ProductListing from '../validation/schema/Forms';
import { AddProductListing } from '../utils/product';
import { AuthContext } from '../context/AuthContext';
import CircularProgressBar from '../components/common/CircularProgress';

function AddProduct() {
  const [image, setImage] = useState(null)
  const [progress, setProgress] = useState(0)
  const [show, setShow] = useState(false)
  const { currentUser } = useContext(AuthContext)


  const initialValues = {
    name: '',
    price: '',
    discount: '',
    status: '',
  }
  const handleFormReset = () => {
    values.name = ''
    values.price = ''
    values.discount = ''
    values.status = ''
  }
  const handleFormSubmit = (values) => {
    setShow(prev => !prev)
    setProgress(prev => prev + 10)
    AddProductListing(values, image, currentUser, setProgress).then(() => {
      setProgress(prev => prev + 20)
      setShow(prev => !prev)
      handleFormReset()
      setImage(null)
    })
  };

  const { values, errors, handleBlur, touched, handleSubmit, handleChange } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: ProductListing,
  })

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white p-6 max-w-md mx-auto rounded-lg shadow-lg">
        <h1 className='text-4xl text-center'>Product Listing</h1>
        <hr className='my-5' />
        <div className='flex justify-between items-center mb-4'>
          <div className="relative w-52">
            <input accept=".png, .jpg, .jpeg" onChange={(e) => setImage(e.target.files[0])} type="file" name="image" id="image" className="absolute opacity-0 w-full" />
            <label htmlFor="image" className="text-center block px-6 py-3 border border-blue-500 text-blue-500 font-semibold rounded-md cursor-pointer hover:bg-blue-600 hover:text-white transition duration-200 ease-in-out">
              Choose file
            </label>
            <span id="file-name" className="inline-block mt-2 ml-3"></span>
          </div>
          <div className='w-[100px] h-[100px] border rounded-md'>
            <img className='object-cover w-[100px] h-[100px]' src={image ? URL.createObjectURL(image) : "https://hinacreates.com/wp-content/uploads/2021/06/dummy2-450x341.png"} alt="Product" />
          </div>
        </div>
        <TextField
          error={Boolean(touched.name && errors.name)}
          helperText={touched.name && errors.name}
          className="w-full mb-4"
          label="Name"
          id='name'
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          type='number'
          error={Boolean(touched.price && errors.price)}
          helperText={touched.price && errors.price}
          className="w-full mb-4"
          label="Price"
          id='price'
          value={values.price}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          type='number'
          error={Boolean(touched.discount && errors.discount)}
          helperText={touched.discount && errors.discount}
          className="w-full mb-4"
          label="Discount"
          id='discount'
          value={values.discount}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          type='text'
          error={Boolean(touched.status && errors.status)}
          helperText={touched.status && errors.status}
          className="w-full mb-4"
          label="Status"
          id='status'
          value={values.status}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {
          !show &&
          <Button
            disabled={!image}
            className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:text-gray-300 "
            type="submit"
            onClick={handleSubmit}
          >
            Add Product
          </Button>
        }
      </form>
      {
        show &&
        <div className='flex justify-center mt-10'>
          <CircularProgressBar progress={progress} />
        </div>
      }
    </>
  );
}

export default AddProduct;
