import { ArrowRight } from "lucide-react";
import { ResponsiveContainer } from './ResponsiveContainer';
import { SectionHeading } from './SectionHeading';
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const TechnologiesSection = () => {
  const technologies = [
    {
      category: "Frontend",
      items: [
        { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/E34F26" },
        { name: "CSS3", icon: "https://cdn.simpleicons.org/css3/1572B6" },
        { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
        { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
        { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
        { name: "Vue.js", icon: "https://cdn.simpleicons.org/vuedotjs/4FC08D" },
        { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/000000" },
        { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
      ]
    },
    {
      category: "Backend",
      items: [
        { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
        { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "Java", icon: "https://cdn.simpleicons.org/openjdk/FFFFFF" }, // Using OpenJDK as a common Java icon
        { name: "PHP", icon: "https://cdn.simpleicons.org/php/777BB4" },
        { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
        { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
        { name: "GraphQL", icon: "https://cdn.simpleicons.org/graphql/E10098" },
        { name: "Redis", icon: "https://cdn.simpleicons.org/redis/DC382D" },
      ]
    },
    {
      category: "DevOps & Cloud",
      items: [
        { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
        { name: "GitHub Actions", icon: "https://cdn.simpleicons.org/githubactions/2088FF" },
        { name: "Kubernetes", icon: "https://cdn.simpleicons.org/kubernetes/326CE5" },
        { name: "AWS", icon: "https://cdn.simpleicons.org/amazonwebservices/232F3E" },
        { name: "Ansible", icon: "https://cdn.simpleicons.org/ansible/EE0000" },
        { name: "Jenkins", icon: "https://cdn.simpleicons.org/jenkins/D24939" },
        { name: "Linux", icon: "https://cdn.simpleicons.org/linux/FCC624" },
        { name: "Terraform", icon: "https://cdn.simpleicons.org/terraform/7B42BC" },
      ]
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-900 relative overflow-hidden" id="technologies">
      <ResponsiveContainer className="relative z-10">
        <SectionHeading
          badge="TECHNOLOGIES"
          title="Maîtrisez les technologies modernes"
          description="Nos formations couvrent les technologies les plus demandées sur le marché"
        />

        <div className="space-y-12">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="cursor-pointer space-y-6"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white">{tech.category}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6">
                {tech.items.map((item, i) => (
                  <div
                    key={i}
                    className="bg-gray-800 p-4 rounded-xl border border-gray-700 hover:border-orange-500/30 hover:bg-orange-900/10 transition-all duration-300 group"
                  >
                    <div className="aspect-square relative mb-3">
                      <Image
                        src={item.icon}
                        alt={item.name}
                        fill
                        className="object-contain p-2 filter group-hover:brightness-110 transition-all duration-300"
                        unoptimized // Add this if SVGs don't render correctly, but try without first
                      />
                    </div>
                    <p className="text-center text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/learning">
            <button className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300">
              Voir toutes les formations
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </Link>
        </div>
      </ResponsiveContainer>
    </section>
  );
};