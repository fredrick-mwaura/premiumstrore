import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Edit, Eye } from 'lucide-react';
import { format } from 'date-fns';

const AnnouncementStatus = {
  ACTIVE: 'active',
  SCHEDULED: 'scheduled',
  EXPIRED: 'expired'
};

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'System Maintenance',
      message: 'Scheduled maintenance this weekend',
      status: AnnouncementStatus.ACTIVE,
      priority: 'high',
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
    }
  ]);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    message: '',
    priority: 'medium',
    startDate: '',
    endDate: '',
  });

  const handleAdd = () => {
    // if (!selectedAnnouncement || !selectedAnnouncement.title || !selectedAnnouncement.message || !selectedAnnouncement.priority || !selectedAnnouncement.status || !selectedAnnouncement.startDate || !selectedAnnouncement.endDate) {
    //   const paragraph = document.createElement('p');
    //   paragraph.textContent = 'some fields are empty';
    //   paragraph.classList.add("bg-red-300", "rounded-lg", "mt-2", "flex", "justify-center");
    //   const warning = document.getElementsByClassName('warning');
    //   warning[0].appendChild(paragraph);
    // }else{
        const announcement = {
          id: Date.now(),
          ...newAnnouncement,
          status: AnnouncementStatus.ACTIVE,
          createdAt: new Date(),
          startDate: new Date(newAnnouncement.startDate),
          endDate: new Date(newAnnouncement.endDate),
        };
    
      setAnnouncements(prev => [...prev, announcement]);
      setIsAddModalOpen(false);
      setNewAnnouncement({
        title: '',
        message: '',
        priority: 'medium',
        startDate: '',
        endDate: '',
      });
    // }
  };

  const handleDelete = (id) => {
    setAnnouncements(prev => prev.filter(announcement => announcement.id !== id));
  };

  const handleView = (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsViewModalOpen(true);
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      low: 'bg-blue-100 text-blue-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800',
    };
    return <Badge className={colors[priority]}>{priority}</Badge>;
  };

  const getStatusBadge = (status) => {
    const colors = {
      [AnnouncementStatus.ACTIVE]: 'bg-green-100 text-green-800',
      [AnnouncementStatus.SCHEDULED]: 'bg-purple-100 text-purple-800',
      [AnnouncementStatus.EXPIRED]: 'bg-gray-100 text-gray-800',
    };
    return <Badge className={colors[status]}>{status}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Announcements</h1>
          <p className="text-gray-500">Manage your system announcements</p>
        </div>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader className='warning'>
              <DialogTitle>Create New Announcement</DialogTitle>
              <DialogDescription>
                Add a new announcement to the system
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement(prev => ({...prev, title: e.target.value}))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={newAnnouncement.message}
                  onChange={(e) => setNewAnnouncement(prev => ({...prev, message: e.target.value}))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select 
                  value={newAnnouncement.priority}
                  onValueChange={(value) => setNewAnnouncement(prev => ({...prev, priority: value}))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="datetime-local"
                    value={newAnnouncement.startDate}
                    onChange={(e) => setNewAnnouncement(prev => ({...prev, startDate: e.target.value}))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="datetime-local"
                    value={newAnnouncement.endDate}
                    onChange={(e) => setNewAnnouncement(prev => ({...prev, endDate: e.target.value}))}
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd}>Create Announcement</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-background rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {announcements.map((announcement) => (
              <TableRow key={announcement.id}>
                <TableCell className="font-medium">{announcement.title}</TableCell>
                <TableCell>{getStatusBadge(announcement.status)}</TableCell>
                <TableCell>{getPriorityBadge(announcement.priority)}</TableCell>
                <TableCell>{format(announcement.startDate, 'MMM dd, yyyy')}</TableCell>
                <TableCell>{format(announcement.endDate, 'MMM dd, yyyy')}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleView(announcement)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Announcement</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this announcement? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => handleDelete(announcement.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>View Announcement</DialogTitle>
          </DialogHeader>
          
          {selectedAnnouncement && (
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <p className="mt-1">{selectedAnnouncement.title}</p>
              </div>
              
              <div>
                <Label>Message</Label>
                <p className="mt-1">{selectedAnnouncement.message}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Priority</Label>
                  <div className="mt-1">
                    {getPriorityBadge(selectedAnnouncement.priority)}
                  </div>
                </div>
                
                <div>
                  <Label>Status</Label>
                  <div className="mt-1">
                    {getStatusBadge(selectedAnnouncement.status)}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <p className="mt-1">
                    {format(selectedAnnouncement.startDate, 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
                
                <div>
                  <Label>End Date</Label>
                  <p className="mt-1">
                    {format(selectedAnnouncement.endDate, 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setIsViewModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Announcements;