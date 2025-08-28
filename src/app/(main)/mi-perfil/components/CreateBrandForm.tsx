"use client";

import { useState } from "react";
import { createBrand } from "@/services/brands";

export default function CreateBrandForm({ _user, onCreated }: any) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createBrand({ name, slug: slug || name.toLowerCase().replaceAll(" ", "-") });
      setName("");
      setSlug("");
      if (onCreated) await onCreated();
      alert("Marca creada");
    } catch (err: any) {
      alert(err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleCreate} className="flex flex-col gap-2">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre de la marca"
        className="input"
        required
      />
      <input
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        placeholder="Slug (opcional)"
        className="input"
      />
      <button className="btn-primary" disabled={loading}>
        {loading ? "Creando..." : "Crear Marca"}
      </button>
    </form>
  );
}
