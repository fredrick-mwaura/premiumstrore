import React, { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { ChevronDown, Plus, Upload, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {toast} from 'react-toastify'
import axios from 'axios';

interface FormData {
  name: string
  stock: number
  price: number
  category: string
  subCategory: string
  gender: string
  brand: string
  description: string
  imageLink: string
}

interface Variant {
  id: number
  type: string
  value: string
}

export default function AddProduct() {
  const [dragActive, setDragActive] = useState(false)
  const [selectedImages, setSelectedImages] = useState<Array<File | string>>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [variants, setVariants] = useState<Variant[]>([{ id: Date.now(), type: 'size', value: '' }])
  const [formData, setFormData] = useState<FormData>({
    name: '',
    stock: null,
    price: null,
    category: '',
    subCategory: '',
    gender: '',
    brand: '',
    description: '',
    imageLink: ''
  })

  const MAX_VARIANTS = 3

  useEffect(() => {
    const savedDraft = localStorage.getItem('productDraft')
    if (savedDraft) {
      const draftData = JSON.parse(savedDraft)
      setFormData(draftData.formData)
      setVariants(draftData.variants)
      setSelectedImages(draftData.images)
    }
  }, [])

  const handleDraft = async (e: React.MouseEvent) => {
    e.preventDefault()
    
    const imageDataUrls = await Promise.all(
      selectedImages.map(async (image) => {
        if (image instanceof File) {
          return new Promise<string>((resolve) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.readAsDataURL(image)
          })
        }
        return image
      })
    )

    const draftData = {
      formData,
      variants,
      images: imageDataUrls
    }
    
    localStorage.setItem('productDraft', JSON.stringify(draftData))
    toast.success('Draft saved successfully!')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.category || !formData.subCategory || 
        !formData.gender || !formData.brand || !formData.description) {
      toast.info('Please fill in all required fields')
      return
    }

    const formDataToSend = new FormData()
    
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value)
    })

    formDataToSend.append('variants', JSON.stringify(variants))
   
    selectedImages.forEach((image, index) => {
      if (image instanceof File) {
        formDataToSend.append(`images[${index}]`, image)
      } else if (typeof image === 'string') {
        const blob = dataURLtoBlob(image)
        formDataToSend.append(`images[${index}]`, blob, `image-${index}.png`)
      }
    })

    try {
    const token = localStorage.getItem('token');

      const response = await axios.post('http://localhost:8000/api/products', {
      formData,
      headers: {
        "content-type": "application/json",
        // Authorization: `Bearer ${token}`,
        // "x-access-token": token,
      },
      withCredentials: true,
    });
    
      if (response.status !== 200 && response.status !== 201) {
        toast.error('product creation failed')
        throw new Error('Submission failed');      
      }
    
      toast.success('Product saved successfully!');
      // localStorage.removeItem('productDraft');
    
      setFormData({
        name: '',
        stock: null,
        price: null,
        category: '',
        subCategory: '',
        gender: '',
        brand: '',
        description: '',
        imageLink: ''
      });
    
      setVariants([{ id: Date.now(), type: 'size', value: '' }]);
      setSelectedImages([]);
    }catch (error) {
      if (error.response?.status === 422) {
        console.log("Validation Errors:", error.response.data.errors);
        toast.error(Object.values(error.response.data.errors).flat().join("\n"));
      } if(error.status === 419) {
        toast.error("error 419 occurred while saving the product.", error.response.data.errors);
      }
      if(error.status === 401){
        toast.error('you are not  authoried')
      }
      else{
        toast.error("unknown error while saving the product.");
      }
    }
  }

  const handleVariantChange = (id: number, field: keyof Variant, value: string) => {
    setVariants(variants.map(variant => 
      variant.id === id ? { ...variant, [field]: value } : variant
    ))
  }

  const addVariant = () => {
    if (variants.length < MAX_VARIANTS) {
      setVariants([...variants, { id: Date.now(), type: 'size', value: '' }])
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files)
      setSelectedImages((prev) => [...prev, ...files])
      event.target.value = ''
    }
    event.target.value = ''
  }

  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (event.type === 'dragenter' || event.type === 'dragover') {
      setDragActive(true)
    } else if (event.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files)
      setSelectedImages((prev) => [...prev, ...files])
      e.dataTransfer.clearData()
    }
  }

  useEffect(() => {
    const cleanup = selectedImages.map(image => {
      if (image instanceof File) {
        const url = URL.createObjectURL(image)
        return () => URL.revokeObjectURL(url)
      }
      return () => {}
    })

    return () => cleanup.forEach(fn => fn())
  }, [selectedImages])

  const handleUpload=() => {
    fileInputRef.current?.click()
  }


  function dataURLtoBlob(dataURL: string) {
    const arr = dataURL.split(',')
    const mime = arr[0].match(/:(.*?);/)![1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) u8arr[n] = bstr.charCodeAt(n)
    return new Blob([u8arr], { type: mime })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {/* Left Side - Product Details */}
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-medium mb-1 ">
                Product Name <span className="text-red-600">*</span>
              </label>
              <Input
                required
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter product name"
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 bg-background"
              />
              <p className="text-gray-400 text-sm mt-1">Do not exceed 20 characters</p>
            </div>
            <div>
              <label htmlFor="price" className="block font-medium mb-1 ">
                Price <span className="text-red-600">*</span>
              </label>
              <Input
                required
                type="number"
                id="price"
                value={formData.price}
                onChange={(e) => {
                  const value = Math.max(0, Number(e.target.value)); // Ensures non-negative value
                  setFormData({ ...formData, price: value });
                }}
                placeholder="Price"
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 bg-background"
              />

            <div>
              <label htmlFor="name" className="block font-medium mb-1 ">
                stock <span className="text-red-600">*</span>
              </label>
              <Input
                required
                type="number"
                id="stock"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number (e.target.value) })}
                placeholder="Enter product stock"
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 bg-background"
              />
              <p className="text-gray-400 text-sm mt-1">Do not exceed 20 characters</p>
            </div>

            </div>

            <div className="flex gap-4">
              <div className="w-full">
                <label htmlFor="category" className="block font-medium mb-1">
                  Category <span className="text-red-600">*</span>
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg bg-background outline-none"
                >
                  <option value="">Select category</option>
                  <option value="electronics">Electronics</option>
                  <option value="shoes">Shoes</option>
                  <option value="clothing">Clothing</option>
                </select>
              </div>

              <div className="w-full">
                <label htmlFor="subCategory" className="block font-medium mb-1">
                  Sub Category <span className="text-red-600">*</span>
                </label>
                <select
                  required
                  id="subCategory"
                  value={formData.subCategory}
                  onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg bg-background outline-none"
                >
                  <option value="">Select subcategory</option>
                  <option value="laptops">Laptops</option>
                  <option value="sneakers">Sneakers</option>
                  <option value="tshirts">T-Shirts</option>
                </select>
              </div>
            </div>

            <div className="w-full">
              <label htmlFor="gender" className="block font-medium mb-1">
                Gender <span className="text-red-600">*</span>
              </label>
              <select
                required
                id="gender"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg bg-background outline-none"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>

            <div>
              <label htmlFor="brand" className="block font-medium mb-1">
                Brand <span className="text-red-600">*</span>
              </label>
              <Input
                type="text"
                id="brand"
                required
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                placeholder="Enter brand name"
                className="w-full px-4 py-2 border rounded-lg outline-none"
              />
            </div>

            <div>
              <label htmlFor="description" className="block font-medium mb-1">
                Description <span className="text-red-600">*</span>
              </label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter description..."
                rows={4}
                className="w-full px-4 py-2 border rounded-lg outline-none resize-none"
              />
              <p className="text-gray-400 text-sm mt-1">Do not exceed 1000 characters</p>
            </div>
          </div>
        </Card>

        {/* Right Side - Media & Variants */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Media</h2>
                <Input
                  type="url"
                  value={formData.imageLink}
                  onChange={(e) => setFormData({ ...formData, imageLink: e.target.value })}
                  placeholder="Add image via link"
                  className="w-64 p-2 border rounded-lg"
                />
              </div>

              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleChange}
                  onClick={handleUpload}
                />
                <div className="space-y-4">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="text-gray-600">
                    <p>Drag and drop files or</p>
                    <span className="text-blue-600 cursor-pointer">Browse files</span>
                  </div>
                  <p className="text-sm text-gray-500">PNG, JPG, JPEG up to 10MB</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setSelectedImages(prev => prev.filter((_, i) => i !== index))}
                      className="absolute top-1 right-1 bg-red-500 rounded-full p-0.5"
                    >
                      <X className="h-4 w-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              {variants.map((variant) => (
                <div key={variant.id} className="p-4 border rounded-lg">
                  <div className="flex gap-4">
                    <select
                      value={variant.type}
                      onChange={(e) => handleVariantChange(variant.id, 'type', e.target.value)}
                      className="w-full p-2 border rounded-lg bg-background"
                    >
                      <option value="size">Size</option>
                      <option value="color">Color</option>
                      <option value="material">Material</option>
                    </select>
                    <Input
                      value={variant.value}
                      onChange={(e) => handleVariantChange(variant.id, 'value', e.target.value)}
                      placeholder="Enter value"
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                </div>
              ))}

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={addVariant}
                  disabled={variants.length >= MAX_VARIANTS}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                  Add Variant
                </button>
                <button
                  type="button"
                  onClick={() => setVariants([{ id: Date.now(), type: 'size', value: '' }])}
                  className="px-4 py-2 border rounded-lg"
                >
                  Reset
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Form Actions */}
        <div className="col-span-full flex justify-end p-4 gap-2">
          <button
            type="button"
            onClick={handleDraft}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Save Draft
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Publish Product
          </button>
        </div>
      </div>
    </form>
  )
}
