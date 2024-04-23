import { supabase } from "@/lib/supabase/client";

export async function generateStaticParams() {
  const { data: products } = await supabase.from("products").select("*");
  console.log({ products });

  if (!products) return [];
  return products.map((product) => ({ brand: product.category }));
}

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  console.log({ params });

  return (
    <div className="h-dvh w-screen">
      <h1 className="h1">{params.category}</h1>
    </div>
  );
};

export default CategoryPage;
