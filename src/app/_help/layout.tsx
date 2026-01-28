import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Centre d\'Aide - CloudHero',
  description: 'Trouvez des réponses à vos questions sur CloudHero, notre application de quiz interactif pour AWS.',
  keywords: 'CloudHero, AWS, quiz, aide, FAQ, support',
};

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
