import SectionCard from "./components/Shared/Cards/SectionCard";
import { sections } from "./sections";

const AdminPage = () => {
  return (
    <div className="flex flex-col gap-6 w-full h-screen p-4">
      <h2 className="h2_bold  text-center">Dashboard</h2>
      <div className="flex flex-wrap gap-4 w-full">
        {sections.map((section, i) => (
          <SectionCard {...section} key={i} />
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
