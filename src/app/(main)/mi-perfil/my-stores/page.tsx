"use client";

import { ArrowLeft, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { CustomButton } from "@/components/Ui";
import { getStoresByOwner } from "@/services/stores";
import { useUserStore } from "@/stores";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CreateStoreModal from "../components/CreateStoreModal";

export default function MyStoresPage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const loadStores = useCallback(async () => {
    if (!user) return;

    try {
      const fetchedStores = await getStoresByOwner(user.id);
      setStores(fetchedStores || []);
    } catch (error) {
      console.error("Error loading stores:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadStores();
  }, [user, loadStores]);

  const handleCreateStore = () => {
    setShowCreateModal(true);
  };

  const handleStoreCreated = () => {
    loadStores(); // Reload stores after creation
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
          <h1 className="text-2xl font-bold">Mis Tiendas</h1>
        </div>

        {user?.is_seller && (
          <CustomButton
            btnTitle="Nueva Tienda"
            onClick={handleCreateStore}
            size="medium"
            variant="filled"
          />
        )}
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p>Cargando tiendas...</p>
        </div>
      ) : stores.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store: any) => (
            <div
              key={store.id}
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{store.name}</h3>
                  {store.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {store.description}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      store.is_active
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {store.is_active ? "Activa" : "Inactiva"}
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      store.is_verified
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {store.is_verified ? "Verificada" : "Pendiente"}
                  </span>
                </div>
              </div>

              <div className="space-y-1 mb-4">
                {store.email && (
                  <p className="text-sm text-gray-600">📧 {store.email}</p>
                )}
                {store.phone && (
                  <p className="text-sm text-gray-600">📞 {store.phone}</p>
                )}
                {store.website_url && (
                  <p className="text-sm text-blue-600">
                    <a
                      href={store.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      🌐 Sitio web
                    </a>
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/mi-perfil/my-stores/${store.slug}`}
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
              No tienes tiendas
            </h3>
            <p className="text-gray-500 mb-6">
              {user?.is_seller
                ? "Crea tu primera tienda para empezar a vender productos."
                : "Cambia tu tipo de usuario a 'Soy vendedor' para poder crear tiendas."}
            </p>
          </div>
          {user?.is_seller && (
            <CustomButton
              btnTitle="Crear Primera Tienda"
              onClick={handleCreateStore}
              size="medium"
              variant="filled"
            />
          )}
        </div>
      )}

      {/* Create Store Modal */}
      {showCreateModal && (
        <CreateStoreModal
          onSuccess={handleStoreCreated}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
}
