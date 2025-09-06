"use client";

import { ArrowLeft, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { CustomButton } from "@/components/Ui";
import { getBrandsByOwner } from "@/services/brands";
import { useUserStore } from "@/stores";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CreateBrandModal from "../components/CreateBrandModal";

export default function MyBrandsPage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const loadBrands = useCallback(async () => {
    if (!user) return;

    try {
      const fetchedBrands = await getBrandsByOwner(user.id);
      setBrands(fetchedBrands || []);
    } catch (error) {
      console.error("Error loading brands:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadBrands();
  }, [user, loadBrands]);

  const handleCreateBrand = () => {
    setShowCreateModal(true);
  };

  const handleBrandCreated = () => {
    loadBrands(); // Reload brands after creation
    setShowCreateModal(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/mi-perfil")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={20} />
            Volver al perfil
          </button>
          <h1 className="text-2xl font-bold">Mis Marcas</h1>
        </div>

        {user?.is_seller && (
          <CustomButton
            btnTitle="Nueva Marca"
            onClick={handleCreateBrand}
            size="medium"
            variant="filled"
          />
        )}
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p>Cargando marcas...</p>
        </div>
      ) : brands.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand: any) => (
            <div
              key={brand.id}
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{brand.name}</h3>
                  {brand.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {brand.description}
                    </p>
                  )}
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    brand.is_active
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {brand.is_active ? "Activa" : "Inactiva"}
                </span>
              </div>

              {brand.website_url && (
                <p className="text-sm text-blue-600 mb-4">
                  <a
                    href={brand.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Sitio web
                  </a>
                </p>
              )}

              <div className="flex gap-2">
                <Link
                  href={`/mi-perfil/my-brands/${brand.slug}`}
                  className="flex-1"
                >
                  <CustomButton
                    btnTitle="Editar"
                    size="small"
                    variant="filled"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mb-4">
            <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Plus size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No tienes marcas
            </h3>
            <p className="text-gray-500 mb-6">
              {user?.is_seller
                ? "Crea tu primera marca para empezar a vender productos."
                : "Cambia tu tipo de usuario a 'Soy vendedor' para poder crear marcas."}
            </p>
          </div>
          {user?.is_seller && (
            <CustomButton
              btnTitle="Crear Primera Marca"
              onClick={handleCreateBrand}
              size="medium"
              variant="filled"
            />
          )}
        </div>
      )}

      {/* Create Brand Modal */}
      {showCreateModal && (
        <CreateBrandModal
          onSuccess={handleBrandCreated}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
}
