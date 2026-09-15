
const collections = [
  {
    id: 1,
    title: "As melhores noites do ano",
    subtitle: "Shows & Festivais",
    count: 47,
    emoji: "🎸",
    bg: "#1e3a5f",
  
  },
  {
    id: 2,
    title: "Fique por dentro do futuro",
    subtitle: "Inovação & Tech",
    count: 23,
    emoji: "🚀",
    bg: "#1e3a5f",

  },
];

export default function CollectionsSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="text-2xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8 text-center sm:text-left">
        Coleções especiais
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6  ">
        {collections.map((item) => (
          <div
            key={item.id}
            style={{ backgroundColor: item.bg }}
            className="relative rounded-3xl p-6 sm:p-8 h-28 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <span className="absolute top-4 right-4 text-6xl opacity-20">
              {item.emoji}
            </span>

            <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6 right-5">
              <span className="text-sm text-white/80">{item.subtitle}</span>
              <h3 className="text-white font-bold text-xl sm:text-xl mb-1">
                {item.title}
              </h3>

              <p className="text-white/60 text-xs sm:text-sm">
                {item.count} eventos disponíveis
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
