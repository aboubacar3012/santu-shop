import React from 'react';
import { SectionHeading } from './SectionHeading';
import { ResponsiveContainer } from './ResponsiveContainer';
import { FAQItem } from './FAQItem';

export const FAQSection = () => {
  return (
    <section id="faq" className="py-20 px-4 bg-gray-900">
      <ResponsiveContainer>
        <SectionHeading 
          badge="QUESTIONS FRÉQUENTES"
          title="Tout ce que vous devez savoir"
          description="Des réponses aux questions les plus posées sur KodeCraft"
        />
        
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          <FAQItem
            question="Qu'est-ce que KodeCraft propose exactement ?"
            answer="KodeCraft est une plateforme d'apprentissage en ligne qui propose des formations complètes et interactives en développement web, mobile, DevOps et données. Nos cours incluent des vidéos explicatives, des exercices pratiques, des projets guidés et un environnement de développement intégré pour coder directement dans votre navigateur."
          />
          
          <FAQItem 
            question="Est-ce que KodeCraft convient aux débutants ?"
            answer="Absolument ! Nos parcours sont conçus pour tous les niveaux, du débutant complet au développeur expérimenté. Chaque formation commence par les bases et progresse graduellement vers des concepts plus avancés, avec un accompagnement pédagogique adapté à chaque étape."
          />
          
          <FAQItem 
            question="Combien de temps faut-il pour apprendre à coder avec KodeCraft ?"
            answer="La durée dépend de votre objectif et du temps que vous pouvez y consacrer. En moyenne, nos apprenants acquièrent des compétences professionnelles en développement web en 4 à 6 mois à raison de 10-15 heures par semaine. Mais nos formations sont flexibles et vous pouvez progresser à votre propre rythme."
          />
          
          <FAQItem 
            question="Quelles sont les technologies couvertes par les formations ?"
            answer="Nous couvrons les technologies les plus demandées sur le marché : HTML/CSS, JavaScript, TypeScript, React, Vue.js, Next.js, Node.js, Python, Django, Docker, Kubernetes, AWS, et bien d'autres. Notre catalogue est régulièrement mis à jour pour inclure les dernières tendances du développement."
          />
          
          <FAQItem 
            question="Vais-je obtenir un certificat à la fin de ma formation ?"
            answer="Oui, chaque formation complétée vous donne droit à un certificat de réussite. Nos certifications professionnelles sont reconnues par de nombreuses entreprises et attestent de votre maîtrise des compétences techniques enseignées dans nos parcours."
          />
          
          <FAQItem 
            question="Est-ce que j'aurai accès à de l'aide pendant ma formation ?"
            answer="Tout à fait ! KodeCraft offre un support communautaire où vous pouvez poser vos questions et échanger avec d'autres apprenants et des mentors. Nos formules premium incluent également du mentorat personnalisé avec des développeurs professionnels."
          />
        </div>
      </ResponsiveContainer>
    </section>
  );
};