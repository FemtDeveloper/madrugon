"use client";

import Link from "next/link";

export default function RelationsSection({ stores, brands, loading }: any) {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">Mis Tiendas</h3>
        {loading ? (
          <p>Cargando...</p>
        ) : stores.length ? (
          <ul className="space-y-2">
            {stores.map((s: any) => (
              <li key={s.id} className="flex items-center justify-between">
                <span>{s.name}</span>
                <Link
                  href={`mi-perfil/stores/`}
                  className="text-sm text-primary"
                >
                  Ver
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No tienes tiendas</p>
        )}
      </div>
      <div className="p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">Mis Marcas</h3>
        {loading ? (
          <p>Cargando...</p>
        ) : brands.length ? (
          <ul className="space-y-2">
            {brands.map((b: any) => (
              <li key={b.id} className="flex items-center justify-between">
                <span>{b.name}</span>
                <Link
                  href={`mi-perfil/brands/`}
                  className="text-sm text-primary"
                >
                  Ver
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No tienes marcas</p>
        )}
      </div>
    </div>
  );
}
