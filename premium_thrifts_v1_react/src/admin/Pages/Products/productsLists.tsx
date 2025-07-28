// import { SidebarProvider } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Edit, Trash, Plus, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Paginate from "@/admin/Paginate";
import {initialProducts, Product} from './Products'

// const itemsPerPage = 10; 

const Productlist = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleView = (id: string) => {
    console.log("Viewing product:", id);
  };

  const handleEdit = (id: string) => {
    console.log("Editing product:", id);
  };

  const handleAdd = () => {
    navigate('/admin/add-product');
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.productId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log('page number changed', page);
  };

  const handleItemsChange = (e)=>{
    setItemsPerPage(parseInt(e.target.value));
  }

  return (
      <div className="h-auto w-full flex flex-col p-4 bgbackground">
        <div className="flex-1 rounded-lg bg-background p-4 overflow-hidden flex flex-col shadow-sm">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <div className="flex items-center gap-2 order-2 md:order-1">
              <p className="text-sm text-gray-500">Show</p>
              <select
                className="border rounded px-2 py-1 bg-background text-sm"
                value={itemsPerPage}
                onChange={handleItemsChange}
              >
                {[5, 10, 20, 50].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <p className="text-sm text-gray-500">entries</p>
            </div>
            
            <div className="w-full md:w-auto flex flex-col md:flex-row gap-2 order-1 md:order-2">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search by product name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full text-sm"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <Button onClick={handleAdd} className="gap-1 text-sm">
                <Plus className="h-4 w-4" /> Add new
              </Button>
            </div>
          </div>
  
          {/* Table Section */}
          <div className="flex-1 overflow-auto rounded border">
            <Table className="min-w-full">
              <TableHeader className="sticky top-0 bg-background shadow-sm">
                <TableRow>
                  {["Product", "Product ID", "Price", "Quantity", "Sale", "Stock", "Start Date", "Actions"].map((header) => (
                    <TableHead key={header} className="font-medium text-sm">
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentProducts.map((product) => (
                  <TableRow key={product.id} className="text-sm">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <span>{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{product.productId}</TableCell>
                    <TableCell>${product.price.toLocaleString()}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.sale}%</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        {product.stock}
                      </span>
                    </TableCell>
                    <TableCell>{product.startDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
  
          {/* Pagination Section */}
          <div className="mt-4">
            <Paginate
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  };

  export default Productlist; 