import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      title
      category
    }
  }
`;

const UPLOAD_IMAGE = gql`
  mutation UploadImage(
    $fileBuffer: String!
    $originalName: String!
    $mimeType: String!
    $folder: String
  ) {
    uploadImage(
      fileBuffer: $fileBuffer
      originalName: $originalName
      mimeType: $mimeType
      folder: $folder
    ) {
      url
    }
  }
`;

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'shirts',
    inStock: true,
  });
  const [file, setFile] = useState<File | null>(null);

  const [createProduct] = useMutation(CREATE_PRODUCT);
  const [uploadImage] = useMutation(UPLOAD_IMAGE);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked, files } = target;

    if (type === 'file' && files && files[0]) {
      setFile(files[0]);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = '';

      if (file) {
        const base64String = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            const base64 = result.split(',')[1];
            resolve(base64);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        const uploadRes = await uploadImage({
          variables: {
            fileBuffer: base64String,
            originalName: file.name,
            mimeType: file.type,
            folder: 'productImages', // ✅ Send to correct S3 folder
          },
        });

        imageUrl = uploadRes.data.uploadImage.url;
        console.log('🖼 Uploaded image URL:', imageUrl);
      }

      await createProduct({
        variables: {
          input: {
            ...formData,
            price: parseFloat(formData.price),
            image: imageUrl,
          },
        },
      });

      alert('✅ Product created!');
      setFormData({
        title: '',
        description: '',
        price: '',
        category: 'shirts',
        inStock: true,
      });
      setFile(null);
    } catch (err) {
      console.error('❌ Error creating product:', err);
    }
  };

  return (
    <div className='form-wrapper'>
      <form className='product-form' onSubmit={handleSubmit}>
        <h2>Add a New Product</h2>
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <input name="price" type="number" step="0.01" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="shirts">Shirts</option>
          <option value="necklaces">Necklaces</option>
          <option value="purses">Purses</option>
          <option value="stanley-cups">Stanley Cups</option>
        </select>
        <input type="file" accept="image/*" onChange={handleChange} />
        <label>
          <input name="inStock" type="checkbox" checked={formData.inStock} onChange={handleChange} />
          In Stock
        </label>
        <button type="submit" disabled={!formData.title || !formData.price}>Create Product</button>
      </form>
    </div>
  );
};

export default ProductForm;