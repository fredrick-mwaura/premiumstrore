import { useEffect, useState, useRef} from "react";
import { UserCog, Pencil, Trash2, Plus } from "lucide-react";
import { Admin } from "./Admintypes";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"; // Fixed incorrect Label import
import {Ellipsis} from 'lucide-react'

const mockAdmins: Admin[] = [
  { id: "1", name: "Admin User", email: "admin@gmail.com", role: "super-admin", joinedDate: "2023-10-05", isActive: true },
  { id: "2", name: "Moderator User", email: "moderator@gmail.com", role: "moderator", joinedDate: "2023-11-15", isActive: true },
  { id: "3", name: "Support Staff", email: "support@gmail.com", role: "support", joinedDate: "2024-01-20", isActive: true },
  { id: "4", name: "Inactive Admin", email: "inactive@gmail.com", role: "moderator", joinedDate: "2023-08-10", isActive: false },
];



export const AdminList = () => {
  const [admins, setAdmins] = useState(mockAdmins);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", role: "support" });
  const [isOpen, setIsOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const dropdownRef = useRef(null);

  const getRoleBadgeClasses = (role: Admin["role"]) => {
    switch (role) {
      case "super-admin":
        return "bg-purple-100 text-purple-700";
      case "moderator":
        return "bg-blue-100 text-blue-700";
      case "support":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const toggleDropdown = ()=>{
    setDrop(!drop);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdmin.name || !newAdmin.email) return;

    const newEntry = { ...newAdmin, id: String(admins.length + 1), joinedDate: new Date().toISOString().split("T")[0], isActive: true };
    setAdmins([...admins, newEntry]);
    
    toast.success(`${newAdmin.name} has been added as ${newAdmin.role}`);

    setNewAdmin({ name: "", email: "", role: "support" });
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setNewAdmin((prev) => ({ ...prev, role: value }));
  };

  const handleEdit = (admin: Admin) => {
    console.log("Edit:", admin);
  };

  const handleDelete = (admin: Admin) => {
    setAdmins(admins.filter((a) => a.id !== admin.id));
    toast.info(`${admin.name} has been removed`);
  };

    // function getRoleBadgeClasses(role: string): import("clsx").ClassValue {
    //     throw new Error("Function not implemented.");
    // }

  return (
    <div className="w-full mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <UserCog className="h-8 w-8 text-blue-500" />
          <h1 className="text-3xl font-semibold">Admin Users</h1>
        </div>
        
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            <Plus className="h-5 w-5 mr-2" />
            Add Admin
          </SheetTrigger>
          <SheetContent side="right" className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Add New Admin</SheetTitle>
            </SheetHeader>
            <div className="space-y-6">
              <form onSubmit={handleAddAdmin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" placeholder="John Doe" value={newAdmin.name} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="john.doe@example.com" value={newAdmin.email} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={newAdmin.role} onValueChange={handleRoleChange} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="super-admin">Super Admin</SelectItem>
                        <SelectItem value="moderator">Moderator</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <SheetFooter className="pt-4">
                  <Button type="submit" className="w-full">Add Admin</Button>
                </SheetFooter>
              </form>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.length > 0 ? (
              admins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>
                    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", getRoleBadgeClasses(admin.role))}>
                      {admin.role}
                    </span>
                  </TableCell>
                  <TableCell>{admin.isActive ? "Active" : "Inactive"}</TableCell>
                  <TableCell>{new Date(admin.joinedDate).toLocaleDateString()}</TableCell>
                  <TableCell className="relative text-right">
                    <button onClick={toggleDropdown} className="relative focus:outline-none">
                        <Ellipsis className="cursor-pointer" />
                    </button>

                    {isOpen && (
                        <div
                        ref={dropdownRef}
                        className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg border z-50"
                        >
                        <button
                            onClick={() => handleEdit(admin)}
                            className="flex items-center px-3 py-2 hover:bg-gray-100 w-full text-left"
                        >
                            <Pencil className="mr-2" size={16} />
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(admin)}
                            className="flex items-center px-3 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
                        >
                            <Trash2 className="mr-2" size={16} />
                            Delete
                        </button>
                        </div>
                    )}
                    </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={6} className="text-center p-4 text-red-700">No admins found</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminList;
