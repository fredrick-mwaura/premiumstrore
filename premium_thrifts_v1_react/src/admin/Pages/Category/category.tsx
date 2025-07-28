import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit2, Trash2, Search, MoreVertical } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import AddUpdate from './AddUpdate'; 
import Paginate from '@/admin/Paginate';

const Category = () => {
  const [categories, setCategories] = useState([
    { 
      id: "C-1", 
      name: 'trousers', 
      mainCategory: null,
      description: 'demin jeans', 
      active: true,
      image: '/placeholder.svg'
    },
    { 
      id: "C-2", 
      name: 'Jordan 4', 
      mainCategory: "snickers",
      description: 'foot wear', 
      active: true,
      image: '/placeholder.svg'
    },
    { 
      id: "C-3", 
      name: 'high heals', 
      mainCategory: null,
      description: 'female wear', 
      active: false,
      image: '/placeholder.svg'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [newCategory, setNewCategory] = useState({
    id: '',
    name: '',
    mainCategory: '',
    description: '',
    active: true,
    image: null
  });

  const itemsPerPage = 5;

  // Auto-increment ID
  const generateNextId = () => {
    if (categories.length === 0) return "C-1";
    const highestId = categories.reduce((maxId, category) => {
      const idNumber = parseInt(category.id.replace("C-", ""), 10);
      return idNumber > maxId ? idNumber : maxId;
    }, 0);

    const nextIdNumber = highestId + 1;
    return `C-${String(nextIdNumber)}`;
  };

  // Add or update category
  const handleSaveCategory = () => {
    if (editingCategory) {
      setCategories(prev => prev.map(cat => 
        cat.id === editingCategory.id ? newCategory : cat
      ));
    } else {
      const nextId = generateNextId();
      setCategories(prev => [...prev, { ...newCategory, id: nextId }]);
    }

    // Reset modal and form
    setIsModalOpen(false);
    setEditingCategory(null);
    setNewCategory({
      id: '',
      name: '',
      mainCategory: '',
      description: '',
      active: true,
      image: null
    });
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.mainCategory?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = filteredCategories.slice(startIndex, endIndex);

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when searching
  };

  const resetSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  //page number set
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log('page number changed', page);
  };

  // Dropdown menu
  // const handleDropdownToggle = (categoryId: string) => {
  //   setActiveDropdown(activeDropdown === categoryId? null : categoryId);
  // };

  const handleDropdownSelect = (categoryId: string, mainCategory: string) => {
    setNewCategory({...newCategory, mainCategory });
    setActiveDropdown(null);
  };

  // Delete category
  const handleDeleteCategory = (categoryId: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(prev => prev.filter(cat => cat.id!== categoryId));
    }
  };

  // Edit category

  // Get main categories for dropdown
  const mainCategories = categories.filter(cat => !cat.mainCategory).map(cat => cat.name);

  return (
    <div className="relative">
      <Card className={`p-6 text-center transition ${isModalOpen ? "blur-sm" : ""}`}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Categories</CardTitle>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2 hover:bg-blue-600"
          >
            <Plus size={16} /> Add Category
          </button>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className="mb-4 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 " />
              <input
                type="text"
                placeholder="Search by ID, name, or main category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full p-2 border rounded-md bg-background"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Search
            </button>
            <button
              onClick={resetSearch}
              className="px-4 py-2 border rounded-md"
            >
              {/* <RefreshCcw size={16} /> */}
              Reset
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table >
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Main Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentCategories.map(category => (
                  <TableRow key={category.id}>
                    <TableCell>{category.id}</TableCell>
                    <TableCell>
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.mainCategory || '-'}</TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell className="text-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        category.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {category.active ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end">
                        <div className="relative">
                          <button
                            onClick={() => setActiveDropdown(activeDropdown === category.id ? null : category.id)}
                            className="p-1 hover:bg-gray-100 rounded-md"
                          >
                            <MoreVertical size={16} />
                          </button>
                          {activeDropdown === category.id && (
                            <div className="absolute right-0 mt-1 w-32 bg-background border rounded-md shadow-lg z-10">
                              <button
                                onClick={() => {
                                  setEditingCategory(category);
                                  setNewCategory(category);
                                  setIsModalOpen(true);
                                  setActiveDropdown(null);
                                }}
                                className="w-full px-4 py-2 text-left text-sm flex items-center gap-2"
                              >
                                <Edit2 size={14} />
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  setCategories(prev => prev.filter(cat => cat.id !== category.id));
                                  setActiveDropdown(null);
                                }}
                                className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 text-red-500"
                              >
                                <Trash2 size={14} />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>    

          {/* Pagination */}         
          <div>
            <Paginate
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </CardContent>
      </Card>

      {/* Add/Update Modal */}
      <AddUpdate
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editingCategory={editingCategory}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        handleSaveCategory={handleSaveCategory}
        mainCategories={mainCategories}
      />
    </div>
  );
};

export default Category;