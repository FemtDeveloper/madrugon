"use client";

import { useState } from "react";
import { createStore } from "@/services/stores";

export default function CreateStoreForm({ _user, onCreated }: any) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createStore({ name, slug: slug || name.toLowerCase().replaceAll(" ", "-") });
      setName("");
      setSlug("");
      if (onCreated) await onCreated();
      alert("Tienda creada");
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
        placeholder="Nombre de la tienda"
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
        {loading ? "Creando..." : "Crear Tienda"}
      </button>
    </form>
  );
}
