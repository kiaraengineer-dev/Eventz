import { Icon } from "lucide-react";
import { Music, Laptop, Utensils } from "lucide-react";

type CategoryFilterProps = {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

function CategoryFilter({
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const categories = [
    { id: 1, name: "Todos", Icon: "✨" },
    { id: 2, name: "Esporte", Icon: "⚽" },
    { id: 3, name: "Cinema", Icon: "🎬" },
    { id: 4, name: "Teatro", Icon: "🎭" },
    { id: 5, name: "Tecnologia", Icon: "💻" },
    { id: 6, name: "Arte & Cultura", Icon: "🎨" },
    { id: 7, name: "Workshop", Icon: "💼" },
    { id: 8, name: "Bem-estar", Icon: "🧘" },
    { id: 9, name: "Gastronomia", Icon: "🍽️" },
    { id: 10, name: "Música", Icon: "🎵" },
    
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <h2 className="text-2xl   font-bold text-gray-800 mb-6 sm:mb-8 text-center sm:text-left">
        Navegue por categoria
      </h2>

      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 max-w-5xl mx-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.name)}
            className={`inline-flex items-center  cursor-pointer  rounded-full p-2 transition-all duration-300 active:scale-95  gap-2 px-3 py-2 ${
              category.name === activeCategory
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <span>{category.Icon}</span>
            <span className="text-sm font-medium">{category.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default CategoryFilter;
