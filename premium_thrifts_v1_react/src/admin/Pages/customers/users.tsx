import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Paginate from "@/admin/Paginate";
import { FileUp, MoreHorizontal, Trash2, Columns, PenLine, Plus } from "lucide-react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios'

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  google_id: string;
  guest_token: string;
  is_subscribed: number;
  role: string;
  created_at: string;
  updated_at: string;
}

interface UsersResponse {
  users: {
    current_page: number;
    data: Customer[];
    // Add other pagination fields if needed
  }
}

export default function Users() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCount, setSelectedCount] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 5;

  const token = localStorage.getItem('token');

  // Fetch customers function
  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get<UsersResponse>('http://localhost:8000/api/users', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`             
        }
      });

      if (response.status === 200) {
        setCustomers(response.data.users.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  // Fetch customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCustomers = filteredCustomers.length;
  const totalPages = Math.ceil(totalCustomers / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  const navigate = useNavigate();

  const addUser = () => {
    navigate('/admin/add-users')
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log('page number changed', page);
  };

  // Generate avatar URL (placeholder or initials)
  const getAvatarUrl = (name: string) => {
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=32`;
  };

  if (loading) {
    return (
      <div className="p-8 bg-background">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading users...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-background">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-background">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold">Customers</h2>
          <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
            {totalCustomers.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="text-sm" size="sm">
            <FileUp className="w-4 h-4 mr-2" />
            Export customers
          </Button>
          <Button variant="outline" className="text-sm" size="sm">
            <PenLine className="w-4 h-4 mr-2" />
            Edit users
          </Button>
          <Button variant="outline" className="text-sm" size="sm">
            <MoreHorizontal className="w-4 h-4 mr-2" />
            More options
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={addUser}>
            <Plus/>
            Add customers
          </Button>
        </div>
      </div>

      <div className="bg-background rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search customers"
              className="max-w-sm"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="ml-auto flex items-center gap-2">
              {selectedCount > 0 && (
                <>
                  <span className="text-sm text-gray-500">
                    {selectedCount} Selected
                  </span>
                  <Button variant="outline" className="text-sm text-red-500">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </>
              )}
              <Button variant="outline" className="text-sm">
                <Columns className="w-4 h-4 mr-2" />
                Columns
              </Button>
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <input type="checkbox" name="select" id="select" />
              </TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>E-MAIL</TableHead>
              <TableHead>PHONE</TableHead>
              <TableHead>ROLE</TableHead>
              <TableHead>SUBSCRIBED</TableHead>
              <TableHead>JOINED</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentCustomers.length > 0 ? (
              currentCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <input type="checkbox" name="select" id={`select-${customer.id}`} />
                  </TableCell>
                  <TableCell className="flex items-center gap-3">
                    <img
                      src={getAvatarUrl(customer.name)}
                      alt={customer.name}
                      className="w-8 h-8 rounded-full"
                    />
                    {customer.name}
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      customer.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {customer.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      customer.is_subscribed 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {customer.is_subscribed ? 'Yes' : 'No'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(customer.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No customers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div>
          <Paginate
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}