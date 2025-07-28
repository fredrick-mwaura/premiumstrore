import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

const AddUpdate = ({
  isModalOpen,
  setIsModalOpen,
  editingCategory,
  newCategory,
  setNewCategory,
  handleSaveCategory,
  mainCategories,
}) => {
  return (
    <div className={`fixed inset-y-0 right-0 w-96  bg-background shadow-lg transform transition-transform duration-300 ease-in-out ${
      isModalOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="h-full flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {editingCategory ? 'Edit Category' : 'Add New Category'}
          </h2>
          <button
            onClick={() => {
              setIsModalOpen(false);
              setNewCategory({
                id: '',
                name: '',
                mainCategory: '',
                description: '',
                active: true,
                image: null,
              });
            }}
            className="p-1 hover: bg-background rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <form className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Name
              </label>
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2 border rounded-md bg-background"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 bg-background">
                Main Category
              </label>
              <select
                value={newCategory.mainCategory || ''}
                onChange={(e) => setNewCategory(prev => ({ ...prev, mainCategory: e.target.value || null }))}
                className="w-full p-2 border rounded-md bg-background"
              >
                <option value="">None (Main Category)</option>
                {mainCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className=' bg-background'>
              <label className="block text-sm font-medium text-gray-700 mb-1 ">
                Description
              </label>
              <textarea
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory((prev) => ({ ...prev, description: e.target.value }))
                }
                className="w-full p-2 border rounded-md bg-background text-foreground border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring focus:ring-primary"
                rows={3}
                required
              />

            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Image
              </label>
              <div className="border-2 border-dashed rounded-md p-4 text-center">
                {newCategory.image ? (
                  <div className="relative">
                    <img
                      src={newCategory.image}
                      alt="Category"
                      className="max-h-32 mx-auto"
                    />
                    <button
                      type="button"
                      onClick={() => setNewCategory(prev => ({ ...prev, image: null }))}
                      className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="text-sm text-gray-500 cursor-pointer">
                      Upload category image
                    </div>
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setNewCategory(prev => ({
                            ...prev,
                            image: URL.createObjectURL(file),
                          }));
                        }
                      }}
                      accept="image/*"
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="inline-block px-4 py-2  bg-background rounded-md cursor-pointer"
                    >
                      Browse
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="active-status"
                checked={newCategory.active}
                onChange={(e) => setNewCategory(prev => ({ ...prev, active: e.target.checked }))}
                className="rounded border-gray-300"
              />
              <label htmlFor="active-status" className="text-sm text-gray-700">
                Active Category
              </label>
            </div>
          </div>
        </form>

        <div className="p-4 border-t">
          <button
            onClick={handleSaveCategory}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {editingCategory ? 'Update Category' : 'Add Category'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUpdate;