import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, DollarSign, MoreVertical, AlertCircle, Edit, Trash2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

const generateMockProducts = (count: number): Product[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `prod-${i + 1}`,
    name: `Product ${i + 1}`,
    sku: `SKU-${Math.random().toString(36).substring(7).toUpperCase()}`,
    price: Math.floor(Math.random() * 1000) + 10,
    stock: Math.floor(Math.random() * 100),
    status: Math.random() > 0.7 ? 'low-stock' : Math.random() > 0.9 ? 'out-of-stock' : 'in-stock',
  }));
};

const ITEMS_PER_PAGE = 10;
const TOTAL_PRODUCTS = 50;
const mockProducts = generateMockProducts(TOTAL_PRODUCTS);

const Inventory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (id: string) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  const searchLower = searchTerm.toLowerCase();
  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchLower) ||
    product.sku.toLowerCase().includes(searchLower)
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const totalValue = filteredProducts.reduce((sum, product) => sum + product.price * product.stock, 0);
  const lowStockItems = filteredProducts.filter(p => p.status === 'low-stock').length;

  const getStatusColor = (status: Product['status']) => {
    return status === 'in-stock' ? 'text-green-600' :
           status === 'low-stock' ? 'text-yellow-600' : 'text-red-600';
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Inventory</h1>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredProducts.length}</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockItems}</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Products</h2>
          </div>
          <Input
            placeholder="Search products..."
            className="max-w-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <span className={`${getStatusColor(product.status)} capitalize`}>
                      {product.status.replace('-', ' ')}
                    </span>
                  </TableCell>
                  <TableCell className="text-right relative">
                    <button  
                      onClick={() => toggleMenu(product.id)}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                    {openMenu === product.id && (
                      <div className="absolute right-0 top-full z-50 mt-1 w-32 rounded-md border bg-background shadow-lg animate-in fade-in-0 zoom-in-95">
                        <div className="flex flex-col p-1">
                          <button
                            onClick={() => {
                              toggleMenu(product.id);
                              alert("Edit action triggered");
                            }}
                            className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              toggleMenu(product.id);
                              console.log("Delete action triggered");
                            }}
                            className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} items
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </Button>
            <Button variant="outline" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
