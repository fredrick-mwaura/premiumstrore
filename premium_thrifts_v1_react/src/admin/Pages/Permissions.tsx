import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Permissions = () => {
    
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', description: 'Full system access' },
    { id: 2, name: 'Vendor', description: 'Manage users and content' },
    { id: 3, name: 'Regular User', description: 'Basic access' }
  ]);

  const [permissions, setPermissions] = useState({
    users: ['create', 'read', 'update', 'delete'],
    products: ['create', 'read', 'update', 'delete'],
    orders: ['create', 'read', 'update', 'delete'],
    content: ['create', 'read', 'update', 'delete']
  });

  const [rolePermissions, setRolePermissions] = useState({
    1: {
      users: ['create', 'read', 'update', 'delete'],
      products: ['create', 'read', 'update', 'delete'],
      orders: ['create', 'read', 'update', 'delete'],
      content: ['create', 'read', 'update', 'delete']
    },
    2: {
      users: ['read', 'update'],
      products: ['create', 'read', 'update'],
      orders: ['read', 'update'],
      content: ['create', 'read', 'update']
    },
    3: {
      users: ['read'],
      products: ['read'],
      orders: ['read'],
      content: ['read']
    }
  });

  const [editingRole, setEditingRole] = useState(null);
  const [newRole, setNewRole] = useState({ name: '', description: '' });

  const handlePermissionToggle = (roleId, module, permission) => {
    setRolePermissions(prev => {
      const updatedPermissions = { ...prev };
      const currentModulePermissions = [...(updatedPermissions[roleId][module] || [])];
      
      if (currentModulePermissions.includes(permission)) {
        updatedPermissions[roleId][module] = currentModulePermissions.filter(p => p !== permission);
      } else {
        updatedPermissions[roleId][module] = [...currentModulePermissions, permission];
      }
      
      return updatedPermissions;
    });
  };

  const handleAddRole = () => {
    if (newRole.name) {
      const newId = Math.max(...roles.map(r => r.id)) + 1;
      setRoles(prev => [...prev, { ...newRole, id: newId }]);
      setRolePermissions(prev => ({
        ...prev,
        [newId]: Object.keys(permissions).reduce((acc, module) => ({
          ...acc,
          [module]: []
        }), {})
      }));
      setNewRole({ name: '', description: '' });
    }
  };

  const handleDeleteRole = (roleId) => {
    setRoles(prev => prev.filter(role => role.id !== roleId));
    setRolePermissions(prev => {
      const updated = { ...prev };
      delete updated[roleId];
      return updated;
    });
  };

  const handleUpdateRole = (roleId) => {
    setRoles(prev => prev.map(role => 
      role.id === roleId ? { ...role, ...editingRole } : role
    ));
    setEditingRole(null);
  };

  const handleToggle = (roleId, module, permission) => () => handlePermissionToggle(roleId, module, permission);
  

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Role</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between gap-4">
            <Input
              type="text"
              placeholder="Role Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              value={newRole.name}
              onChange={(e) => setNewRole(prev => ({ ...prev, name: e.target.value }))}
            />
            <Input
              type="text"
              placeholder="Description"
              className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              value={newRole.description}
              onChange={(e) => setNewRole(prev => ({ ...prev, description: e.target.value }))}
            />
            <Button
              onClick={handleAddRole}
              className="px-4 py-2 bg-purple-500 text-white rounded-md flex items-center gap-2 "
            >
              <Plus size={16} /> Add Role
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {roles.map(role => (
          <Card key={role.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                {editingRole?.id === role.id ? (
                  <div className="flex gap-4 items-center flex-1">
                    <Input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      value={editingRole.name}
                      onChange={(e) => setEditingRole(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <Input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      value={editingRole.description}
                      onChange={(e) => setEditingRole(prev => ({ ...prev, description: e.target.value }))}
                    />
                    <button
                      onClick={() => handleUpdateRole(role.id)}
                      className="p-2 text-green-500 hover:bg-green-50 rounded-md"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => setEditingRole(null)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <div>
                      <CardTitle>{role.name}</CardTitle>
                      <p className="text-sm text-gray-500">{role.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingRole(role)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-md"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteRole(role.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(permissions).map(([module, modulePermissions]) => (
                  <div key={module} className="border rounded-md p-4">
                    <h3 className="font-medium capitalize mb-2">{module}</h3>
                    <div className="flex gap-4">
                      {modulePermissions.map(permission => (
                        <label key={permission} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={rolePermissions[role.id]?.[module]?.includes(permission) ?? false}
                            onChange={handleToggle(role.id, module, permission)}
                            className="rounded border"
                          />
                          <span className="capitalize">{permission}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Permissions;