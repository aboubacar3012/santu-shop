import "dotenv/config";

import prisma from "@/libs/prisma";

/**
 * Génère un ID aléatoire dans le format: 60FKSgvNgi9CvbOnfP1pwmNza9hARxOX
 * Format: 32 caractères alphanumériques (majuscules, minuscules, chiffres)
 */
function generateId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

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
    // await safeDelete(prisma.orderItem, "OrderItem");
    // await safeDelete(prisma.order, "Order");
    // await safeDelete(prisma.product, "Product");
    // await safeDelete(prisma.seller, "Seller");
    await safeDelete(prisma.category, "Category");
    // await safeDelete(prisma.session, "Session");
    // await safeDelete(prisma.account, "Account");
    // await safeDelete(prisma.loginHistory, "LoginHistory");
    // await safeDelete(prisma.verification, "Verification");
    // await safeDelete(prisma.user, "User");

    console.log("✅ Base de données nettoyée");

    // Seed des catégories
    console.log("📦 Création des catégories...");
    const categories = [
      {
        id: generateId(),
        label: "Vêtements",
        slug: "vetements",
        description: "Vêtements et accessoires de mode",
      },
      {
        id: generateId(),
        label: "Chaussures",
        slug: "chaussures",
        description: "Chaussures pour tous les styles",
      },
      {
        id: generateId(),
        label: "Électronique",
        slug: "electronique",
        description: "Appareils électroniques et gadgets",
      },
      {
        id: generateId(),
        label: "Maison",
        slug: "maisons",
        description: "Articles pour la maison et le jardin",
      },
      {
        id: generateId(),
        label: "Autres",
        slug: "autres",
        description: "Autres produits divers",
      },
    ];

    for (const category of categories) {
      const created = await prisma.category.create({
        data: category,
      });
      console.log(`  ✓ Catégorie "${category.label}" créée (ID: ${created.id}, slug: ${created.slug})`);
    }
    console.log("✅ Catégories créées");

    console.log("✅ Seed terminé avec succès !");
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
