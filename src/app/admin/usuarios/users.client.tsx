"use client";

import { banUser, verifyUser } from "@/services/moderation";
import { changeUserRole, deactivateUser, reactivateUser } from "@/services";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { CustomButton } from "@/components/Ui";

type RoleOption = { label: string; value: string };

export const UsersAdminClient = () => {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["admin_users", { search }],
    queryFn: async () => {
      const url = new URL("/api/admin/users", window.location.origin);
      if (search) url.searchParams.set("search", search);
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to fetch users");
      const body = await res.json();
      return body.users as any[];
    },
  });

  const roleOptions: RoleOption[] = useMemo(
    () => [
      { label: "buyer", value: "buyer" },
      { label: "seller", value: "seller" },
      { label: "moderator", value: "moderator" },
      { label: "admin", value: "admin" },
      { label: "super_admin", value: "super_admin" },
    ],
    []
  );

  const changeRoleMut = useMutation({
    mutationFn: (v: { user_id: string; role_name: string }) =>
      changeUserRole(v.user_id, v.role_name),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin_users"] }),
  });
  const deactivateMut = useMutation({
    mutationFn: (user_id: string) => deactivateUser(user_id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin_users"] }),
  });
  const reactivateMut = useMutation({
    mutationFn: (user_id: string) => reactivateUser(user_id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin_users"] }),
  });
  const banMut = useMutation({
    mutationFn: (v: { user_id: string; reason?: string }) =>
      banUser(v.user_id, v.reason),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin_users"] }),
  });
  const verifyMut = useMutation({
    mutationFn: (user_id: string) => verifyUser(user_id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin_users"] }),
  });

  const doChangeRole = (id: string, role: string) =>
    changeRoleMut.mutate({ user_id: id, role_name: role });

  return (
    <div className="flex flex-col gap-6 py-6">
      <h2 className="h2">Usuarios</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          className="border rounded-lg px-3 py-2"
          placeholder="Buscar por email o nombre"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {isLoading && <p>Cargando...</p>}
      <ul className="flex flex-col gap-3">
        {(data as any[])?.map((u) => (
          <li key={u.id} className="border rounded-lg p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex flex-col">
                <span className="b1 font-semibold">{u.email}</span>
                <span className="b2 text-neutral-600">
                  {u.first_name} {u.last_name} · {u.phone}
                </span>
                <span className="b2 text-neutral-600">
                  Role: {u.user_roles?.name || "-"}
                </span>
                {u.banned_at && (
                  <span className="b2 text-red-600">
                    Banned: {new Date(u.banned_at).toLocaleString()}
                  </span>
                )}
                {u.suspended_until && (
                  <span className="b2 text-amber-700">
                    Suspended until:{" "}
                    {new Date(u.suspended_until).toLocaleString()}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <select
                  className="border rounded-md px-2 py-1"
                  defaultValue={u.user_roles?.name || "buyer"}
                  onChange={(e) => doChangeRole(u.id as string, e.target.value)}
                >
                  {roleOptions.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
                {!u.is_active ? (
                  <CustomButton
                    size="small"
                    variant="transparent"
                    btnTitle="Reactivar"
                    onClick={() => reactivateMut.mutate(u.id)}
                  />
                ) : (
                  <CustomButton
                    size="small"
                    variant="transparent"
                    btnTitle="Desactivar"
                    onClick={() => deactivateMut.mutate(u.id)}
                  />
                )}
                {!u.banned_at ? (
                  <CustomButton
                    size="small"
                    variant="transparent"
                    btnTitle="Banear"
                    onClick={() =>
                      banMut.mutate({
                        user_id: u.id,
                        reason: "Violación de normas",
                      })
                    }
                  />
                ) : (
                  <CustomButton
                    size="small"
                    variant="transparent"
                    btnTitle="Quitar ban"
                    onClick={() => reactivateMut.mutate(u.id)}
                  />
                )}
                {!u.is_verified && (
                  <CustomButton
                    size="small"
                    btnTitle="Verificar"
                    onClick={() => verifyMut.mutate(u.id)}
                  />
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
