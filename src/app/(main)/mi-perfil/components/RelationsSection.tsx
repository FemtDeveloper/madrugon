"use client";

import { CustomButton } from "@/components/Ui";
import Link from "next/link";

interface Props {
  stores: any[];
  brands: any[];
  loading: boolean;
  onCreateBrand: () => void;
  onCreateStore: () => void;
  showCreateButtons?: boolean;
}

export default function RelationsSection({
  stores,
  brands,
  loading,
  onCreateBrand,
  onCreateStore,
  showCreateButtons = true,
}: Props) {
  return (
    <>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Mis Tiendas</h3>
              {stores.length > 0 && (
                <Link
                  href="/mi-perfil/my-stores"
                  className="text-xs text-primary hover:underline"
                >
                  Ver todas ({stores.length})
                </Link>
              )}
            </div>
            {showCreateButtons && (
              <CustomButton
                btnTitle="Crear"
                onClick={onCreateStore}
                size="small"
                variant="filled"
              />
            )}
          </div>
          {loading ? (
            <p>Cargando...</p>
          ) : stores.length ? (
            <ul className="space-y-2">
              {stores.map((s: any) => (
                <li
                  key={s.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <span className="font-medium">{s.name}</span>
                  <Link
                    href={`/mi-perfil/my-stores/${s.slug}`}
                    className="text-sm text-primary hover:underline"
                  >
                    Editar
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-sm text-gray-500">
              {showCreateButtons ? (
                <p>
                  No tienes tiendas. Haz clic en &quot;Crear&quot; para crear tu
                  primera tienda.
                </p>
              ) : (
                <p>No tienes tiendas</p>
              )}
            </div>
          )}
        </div>
        <div className="p-4 border rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Mis Marcas</h3>
              {brands.length > 0 && (
                <Link
                  href="/mi-perfil/my-brands"
                  className="text-xs text-primary hover:underline"
                >
                  Ver todas ({brands.length})
                </Link>
              )}
            </div>
            {showCreateButtons && (
              <CustomButton
                btnTitle="Crear"
                onClick={onCreateBrand}
                size="small"
                variant="filled"
              />
            )}
          </div>
          {loading ? (
            <p>Cargando...</p>
          ) : brands.length ? (
            <ul className="space-y-2">
              {brands.map((b: any) => (
                <li
                  key={b.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <span className="font-medium">{b.name}</span>
                  <Link
                    href={`/mi-perfil/my-brands/${b.slug}`}
                    className="text-sm text-primary hover:underline"
                  >
                    Editar
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-sm text-gray-500">
              {showCreateButtons ? (
                <p>
                  No tienes marcas. Haz clic en &quot;Crear&quot; para crear tu
                  primera marca.
                </p>
              ) : (
                <p>No tienes marcas</p>
              )}
            </div>
          )}
        </div>
      </div>

      {!showCreateButtons && stores.length === 0 && brands.length === 0 && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>¿Quieres vender productos?</strong> Cambia tu tipo de
            usuario a &quot;Soy vendedor&quot; en la sección de arriba para
            poder crear tiendas y marcas.
          </p>
        </div>
      )}
    </>
  );
}
