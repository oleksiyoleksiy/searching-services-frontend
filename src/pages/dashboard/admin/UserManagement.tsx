import { useState } from "react";
import { Edit, Trash, Search, Filter, MoreHorizontal, User, UserX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Popover, PopoverContent, PopoverTrigger
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock user data
const users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "User",
    status: "Active",
    joinDate: "2023-01-15",
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Provider",
    status: "Active",
    joinDate: "2023-02-20",
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol@example.com",
    role: "User",
    status: "Inactive",
    joinDate: "2023-03-05",
    avatar: "/placeholder.svg"
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david@example.com",
    role: "Provider",
    status: "Active",
    joinDate: "2023-03-10",
    avatar: "/placeholder.svg"
  },
  {
    id: 5,
    name: "Eva Brown",
    email: "eva@example.com",
    role: "User",
    status: "Blocked",
    joinDate: "2023-04-15",
    avatar: "/placeholder.svg"
  },
  {
    id: 6,
    name: "Frank Miller",
    email: "frank@example.com",
    role: "Provider",
    status: "Active",
    joinDate: "2023-04-22",
    avatar: "/placeholder.svg"
  },
  {
    id: 7,
    name: "Grace Lee",
    email: "grace@example.com",
    role: "User",
    status: "Active",
    joinDate: "2023-05-10",
    avatar: "/placeholder.svg"
  },
];

// User statistics
const userStats = [
  { title: "Total Users", value: 238, icon: User, colorClass: "bg-blue-100 text-blue-600" },
  { title: "New This Month", value: 42, icon: User, colorClass: "bg-green-100 text-green-600" },
  { title: "Blocked Users", value: 5, icon: UserX, colorClass: "bg-red-100 text-red-600" }
];

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      setFilteredUsers(
        users.filter(user =>
          user.name.toLowerCase().includes(value.toLowerCase()) ||
          user.email.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredUsers(users);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      {/* User stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {userStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="flex items-center p-6">
              <div className={`p-3 rounded-full ${stat.colorClass}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Users</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search users..."
                className="pl-9"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
              <Button>Add User</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === "Active" ? "default" :
                            user.status === "Inactive" ? "secondary" : "destructive"
                        }
                        className="font-normal"
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-40 p-1" align="end">
                            <div className="flex flex-col">
                              <Button variant="ghost" className="justify-start text-red-500 hover:text-red-500 hover:bg-red-50">
                                <Trash className="mr-2 h-4 w-4" /> Delete
                              </Button>
                              <Button variant="ghost" className="justify-start">
                                <UserX className="mr-2 h-4 w-4" /> Block
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">
              Showing <strong>{filteredUsers.length}</strong> of <strong>{users.length}</strong> users
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;