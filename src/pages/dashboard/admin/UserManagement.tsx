import { useEffect, useState } from "react";
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
import { AdminUserData, AdminUserErrors, AdminUserResponse, PaginationData, User as UserType } from "@/types";
import adminUserService from "@/services/admin/adminUserService";
import { useSearchParams } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import UserForm from "@/components/dashboard/admin/UserForm";
import { useDebounce } from 'use-debounce'
import Loader from "@/components/ui/loader";
import Pagination from "@/components/ui/pagination";

const UserManagement = () => {
  // const [filteredUsers, setFilteredUsers] = useState(users);
  const [users, setUsers] = useState<UserType[]>([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState<string>(searchParams.get('search') || '')
  const [debouncedSearch] = useDebounce(search, 500);
  const [selectedUser, setSelectedUser] = useState<UserType>()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [paginationData, setPaginationData] = useState<PaginationData>()
  const [userStats, setUserStats] = useState([
    { title: "Total Users", value: 0, icon: User, colorClass: "bg-blue-100 text-blue-600" },
    { title: "New This Month", value: 0, icon: User, colorClass: "bg-green-100 text-green-600" },
  ])
  const [errors, setErrors] = useState<AdminUserErrors>()
  const [isLoading, setIsLoading] = useState(true)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  const fetchUsers = async () => {
    setIsLoading(true)

    const response = await adminUserService.index(searchParams.toString())

    if (response) {
      setUsers(response.data.users)
      setUserStats(prev => [({ ...prev[0], value: response.data.total_users }), ({ ...prev[1], value: response.data.new_this_month })])
      setPaginationData({ meta: response.meta, links: response.links })
    }

  }

  const handleUserSave = async (formData: AdminUserData) => {
    try {
      let response

      if (!selectedUser) {
        response = await adminUserService.store(formData)
      } else {
        response = await adminUserService.update(formData, selectedUser.id)
      }


      if (response) {
        setUsers(response.data.users)
        setUserStats(prev => [({ ...prev[0], value: response.data.total_users }), ({ ...prev[1], value: response.data.new_this_month })])
        setPaginationData({ meta: response.meta, links: response.links })
        setIsDialogOpen(false)
      }
    } catch (e: any) {
      console.log(e);

      setErrors(e.response?.data?.errors)
    }
  }

  useEffect(() => {

    if (debouncedSearch) {
      setSearchParams({ search: debouncedSearch });
    } else {
      setSearchParams({})
    }

  }, [debouncedSearch]);

  useEffect(() => {
    fetchUsers().finally(() => setIsLoading(false))
  }, [searchParams])

  const handleAddButtonClick = () => {
    setIsDialogOpen(true)
  }

  const handleEditButtonClick = (user: UserType) => {
    setSelectedUser(user)
    setIsDialogOpen(true)
  }

  useEffect(() => {
    if (!isDialogOpen) {
      setErrors({})
      setSelectedUser(undefined)
    }
  }, [isDialogOpen])

  if (isLoading) return <Loader />

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {
          userStats.map(stat => (
            <Card key={stat.title}>
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
          ))
        }
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Users</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search users by name or email..."
                className="pl-9"
                value={search}
                onChange={handleSearch}
              />
            </div>
            <div className="flex gap-4">
              <Button onClick={handleAddButtonClick}>Add User</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead className="w-[250px]">User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.email}>
                    <TableCell>
                      {user.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage className="object-cover object-center" src={user.avatar} alt={user.name} />
                          {/* <AvatarFallback>{user.avatar}</AvatarFallback> */}
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.roles.map(r => (
                          <Badge key={r.name} variant="outline" className="font-normal">
                            {r.name}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{user.created_at}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button onClick={() => handleEditButtonClick(user)} variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination paginationData={paginationData} />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[500px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{!selectedUser ? 'Create New User' : 'Edit User'}</DialogTitle>
          </DialogHeader>
          <UserForm
            initialData={selectedUser}
            onSubmit={handleUserSave}
            onCancel={() => {
              setIsDialogOpen(false)
            }}
            initialErrors={errors}
          />
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default UserManagement;