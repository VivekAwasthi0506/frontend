'use client';

import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

// ------------------- Validation Schema -------------------
const AddProductSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is required'),
    description: Yup.string().min(5, 'Too Short!').required('Description is required'),
    price: Yup.number().positive("Price must be positive").required("Price is required"),
    stock: Yup.number().integer("Stock must be a number").min(0).required("Stock is required"),
    category: Yup.string().required("Category is required"),
    // image: Yup.string().url("Enter valid image URL").required("Image URL is required"),
});

// ------------------- Component -------------------
const AddProduct = () => {

    const productForm = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: '',
            stock: '',
            category: '',
            image: ''
        },
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            
            axios.post('http://localhost:5000/product/add', values)
                .then(() => {
                    toast.success("Product Added Successfully!");
                    resetForm();
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Failed to Add Product!");
                });
        },
        validationSchema: AddProductSchema,
    });

    const upload = (e) => {
        const file = e.target.files[0];
        const fd = new FormData();
        fd.append('file', file);
        fd.append('upload_preset', 'MERN_6:30')
        fd.append('cloud_name', 'dzjjvydkz')

        axios.post('https://api.cloudinary.com/v1_1/dzjjvydkz/image/upload', fd)
            .then((result) => {
                toast.success('Image uploaded successfully');
                console.log(result.data);
                setPreview(result.data.url);
                setImageUrl(result.data.url);
            }).catch((err) => {
                toast.error('Error while uploading image');
                console.log(err);
            });
    }

    return (
        <div className="mt-7 w-1/3 mx-auto bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-700 dark:border-neutral-800">
            <div className="p-6">
                <h1 className="text-center text-2xl font-bold text-gray-800 dark:text-white">
                    Add New Product
                </h1>

                <form onSubmit={productForm.handleSubmit} className="mt-5 grid gap-y-4 text-white">

                    {/* Name */}
                    <div>
                        <label className="block text-sm mb-1 text-gray-700 dark:text-white">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            onChange={productForm.handleChange}
                            value={productForm.values.name}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                        {productForm.touched.name && productForm.errors.name && (
                            <p className="text-xs text-red-600">{productForm.errors.name}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm mb-1 text-gray-700 dark:text-white">Description</label>
                        <input
                            type="text"
                            name="description"
                            onChange={productForm.handleChange}
                            value={productForm.values.description}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                        {productForm.touched.description && productForm.errors.description && (
                            <p className="text-xs text-red-600">{productForm.errors.description}</p>
                        )}
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm mb-1 text-gray-700 dark:text-white">Price</label>
                        <input
                            type="number"
                            name="price"
                            onChange={productForm.handleChange}
                            value={productForm.values.price}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                        {productForm.touched.price && productForm.errors.price && (
                            <p className="text-xs text-red-600">{productForm.errors.price}</p>
                        )}
                    </div>

                    {/* Stock */}
                    <div>
                        <label className="block text-sm mb-1 text-gray-700 dark:text-white">Stock</label>
                        <input
                            type="number"
                            name="stock"
                            onChange={productForm.handleChange}
                            value={productForm.values.stock}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                        {productForm.touched.stock && productForm.errors.stock && (
                            <p className="text-xs text-red-600">{productForm.errors.stock}</p>
                        )}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm mb-1 text-gray-700 dark:text-white">Category</label>
                        <input
                            type="text"
                            name="category"
                            onChange={productForm.handleChange}
                            value={productForm.values.category}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                        {productForm.touched.category && productForm.errors.category && (
                            <p className="text-xs text-red-600">{productForm.errors.category}</p>
                        )}
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm mb-1 text-gray-700 dark:text-white">Image URL</label>
                        <input
                            type="file"
                            // onChange={}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                        {productForm.touched.image && productForm.errors.image && (
                            <p className="text-xs text-red-600">{productForm.errors.image}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
