import "dotenv/config";

import prisma from "@/lib/prisma";

async function main() {
  console.log("🌱 Début du seeding...");

  try {
    // Effacer complètement la base de données (ordre important !)
    console.log("🗑️ Suppression de toutes les données existantes...");

    // Fonction helper pour supprimer une table de manière sécurisée
    const safeDelete = async (model: any, name: string) => {
      try {
        await model.deleteMany();
      } catch (error: any) {
        if (error.code === "P2021") {
          // P2021 = Table does not exist, on ignore cette erreur
          console.log(`ℹ️  Table ${name} n'existe pas encore`);
        } else {
          throw error;
        }
      }
    };

    // Supprimer toutes les données (si les tables existent)
    // Ordre important : d'abord les tables avec relations, puis les tables principales
    await safeDelete(prisma.session, "Session");
    await safeDelete(prisma.account, "Account");
    await safeDelete(prisma.loginHistory, "LoginHistory");
    await safeDelete(prisma.verification, "Verification");
    await safeDelete(prisma.user, "User");

    console.log("✅ Base de données nettoyée");

    // Créer un utilisateur de test
    console.log("👥 Création des utilisateurs...");
    await prisma.user.create({
      data: {
        email: "admin@santu.com",
        firstName: "Admin",
        lastName: "Santu",
        emailVerified: true,
        isVerified: true,
        isActive: true,
      },
    });
    console.log("✅ Utilisateurs créés");
  } catch (error) {
    console.error("❌ Erreur lors du seeding:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });