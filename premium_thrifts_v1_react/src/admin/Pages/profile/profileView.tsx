import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { Edit, Save, X, Upload, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AdminData {
  name: string;
  email: string;
  role: string;
  department: string;
  phone: string;
  storeUrl: string;
  profilePicture: string;
  StartDate: string;
  location: string;
  company: string;
}

const ProfileView = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [adminData, setAdminData] = useState<AdminData>({
    name: "John Mark",
    email: "mark@site.com",
    role: "Store Administrator",
    department: "No department",
    phone: "+254799905673",
    storeUrl: "www.premiumthrifts.com",
    profilePicture: "/profile.png",
    StartDate: `Started ${new Date().toISOString().split("T")[0]}`,
    location: "Nairobi",
    company: "Premium Thrift."
  });
  const [tempData, setTempData] = useState<AdminData>(adminData);

  const handleEdit = () => {
    setTempData(adminData);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTempData(adminData);
    setIsEditing(false);
  };

  const handleSave = () => {
    if (!tempData.name || !tempData.email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Name and email are required fields"
      });
      return;
    }

    setAdminData(tempData);
    setIsEditing(false);
    toast({
      title: "Success",
      description: "Profile updated successfully"
    });
  };

  const handleChange = (field: keyof AdminData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTempData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempData(prev => ({
          ...prev,
          profilePicture: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Banner */}
      <div className="relative h-48 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800">
        <img src="/header.png" alt="header"  className="absolute inset-0 w-full h-full object-cover"/>
        <Button 
          variant="outline" 
          size="sm" 
          className="absolute top-4 right-4 bg-white dark:bg-gray-800 hover:bg-purple-400"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload header
        </Button>
        
        {/* Profile Section */}
        <div className="absolute -bottom-16 left-8 flex items-end space-x-4">
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-white dark:border-gray-800">
              <AvatarImage src={tempData.profilePicture} />
              <AvatarFallback className="bg-blue-100 dark:bg-blue-900">
                <User className="h-16 w-16" />
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button
                variant="outline"
                size="icon"
                className="absolute bottom-0 right-0 rounded-full bg-white dark:bg-gray-800"
                onClick={() => document.getElementById("picture-upload")?.click()}
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="picture-upload"
            />
          </div>
          
          <div className="mb-4 flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {adminData.name}
            </h1>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <span>{adminData.company}</span>
              <span>•</span>
              <span>{adminData.location}</span>
              <span>•</span>
              <span>{adminData.StartDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-20 px-8">
        <div className="flex justify-between items-center">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Profile Information</h2>
                    {!isEditing ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleEdit}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit profile
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCancel}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={handleSave}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save changes
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Full Name
                      </label>
                      {isEditing ? (
                        <Input
                          value={tempData.name}
                          onChange={handleChange("name")}
                          placeholder="Enter your name"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-gray-100">
                          {adminData.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Email
                      </label>
                      {isEditing ? (
                        <Input
                          type="email"
                          value={tempData.email}
                          onChange={handleChange("email")}
                          placeholder="Enter your email"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-gray-100">
                          {adminData.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Phone
                      </label>
                      {isEditing ? (
                        <Input
                          type="tel"
                          value={tempData.phone}
                          onChange={handleChange("phone")}
                          placeholder="Enter your phone number"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-gray-100">
                          {adminData.phone}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Department
                      </label>
                      {isEditing ? (
                        <Input
                          value={tempData.department}
                          onChange={handleChange("department")}
                          placeholder="Enter your department"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-gray-100">
                          {adminData.department}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Company
                      </label>
                      {isEditing ? (
                        <Input
                          value={tempData.company}
                          onChange={handleChange("company")}
                          placeholder="Enter your company"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-gray-100">
                          {adminData.company}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Location
                      </label>
                      {isEditing ? (
                        <Input
                          value={tempData.location}
                          onChange={handleChange("location")}
                          placeholder="Enter your location"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-gray-100">
                          {adminData.location}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;