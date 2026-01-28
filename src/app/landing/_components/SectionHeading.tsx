import { motion } from 'framer-motion';

type SectionHeadingProps = {
  badge?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export const SectionHeading = ({ 
  badge, 
  title, 
  description, 
  centered = true 
}: SectionHeadingProps) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      transition={{ duration: 0.8 }}
      className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}
    >
      {badge && (
        <div className="inline-block mb-4 px-4 py-1 rounded-full bg-orange-900/30 text-orange-400 border border-orange-500/30 text-sm font-semibold">
          {badge}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
        {title.includes('<span>') ? (
          <span dangerouslySetInnerHTML={{ __html: title.replace(
            /<span>(.*?)<\/span>/g, 
            '<span class="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">$1</span>'
          ) }} />
        ) : (
          title
        )}
      </h2>
      {description && (
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
};