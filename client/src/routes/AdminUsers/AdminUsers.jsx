import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import UserCard from "../../components/userCard/UserCard";

const AdminUsers = () => {
  const [search, setSearch] = useState("");

  // Fetch users
  const { data, isLoading, error } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      const response = await apiRequest.get(`/admin/users`);
      return response.data;
    },
    staleTime: 1000 * 10,
    cacheTime: 1000 * 60,
  });

  // Filter users by name or phone
  const filteredUsers = useMemo(() => {
    if (!data) return [];

    if (search.trim() === "") return data;

    const isPhone = /^\d+$/.test(search.trim());

    return data.filter((user) => {
      if (isPhone) {
        return user.phone?.includes(search.trim());
      } else {
        return user.name?.toLowerCase().includes(search.trim().toLowerCase());
      }
    });
  }, [data, search]);

  return (
    <div className="">
      <div className="header pt-md-1">
        <div className="head d-flex flex-column my-3 mt-4 justify-content-center align-items-center gap-1">
          <h2 className="text-center fw-bold">Tourist Bus Users</h2>
          <p className="p-0 m-0">All users will appear here</p>
        </div>

        {/* Search Box */}
        <div className="container mt-3 ">
          <input
            type="text"
            className="form-control mx-auto mb-3 mt-3 rounded-4 box-shadow w-75"
            placeholder="Search by name or phone number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="others box-shadow bg-white py-md-5 py-3 px-2 px-md-4">
        <div className="cards row px-md-4 px-3 mb-5">
          {isLoading ? (
            <div className="text-center w-100">Loading users...</div>
          ) : error ? (
            <div className="text-center w-100 text-danger">
              Error loading users. Please try again.
            </div>
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div className="col-md-6" key={user.id}>
                <UserCard user={user} />
              </div>
            ))
          ) : (
            <p className="text-center w-100">No user found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
