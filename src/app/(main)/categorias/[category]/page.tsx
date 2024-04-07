import { supabase } from "@/lib/supabase/client";

export async function generateStaticParams() {
  const { data: products } = await supabase.from("products").select("*");
  if (!products) return [];
  return products.map((product) => ({ brand: product.brand }));
}

const CategoryPage = ({ params }: { params: { brand: string } }) => {
  return (
    <div className="h-dvh w-screen">
      <h1 className="h1">{params.brand}</h1>
    </div>
  );
};

export default CategoryPage;
