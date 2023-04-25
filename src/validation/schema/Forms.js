import * as Yup from 'yup';

const ProductListing = Yup.object().shape({
    name: Yup.string()
        .min(6, 'Name must be at least 6 characters')
        .max(30, 'Name must be at most 30 characters')
        .required('Name is required'),
    price: Yup.number()
        .max(100000, 'Price cannot exceed 100000')
        .required('Price is required'),
    discount: Yup.number()
        .min(1, 'Discount must be at least 1')
        .max(99, 'Discount cannot exceed 99')
        .required('Discount is required'),
    status: Yup.string()
        .min(4, 'Name must be at least 4 characters')
        .max(10, 'Name must be at most 10 characters')
        .required('Name is required'),
});



export default ProductListing;