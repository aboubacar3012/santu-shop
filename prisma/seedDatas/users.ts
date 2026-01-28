import { SubscriptionType } from "@prisma/client";

export const users: Array<{
  email: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  phone?: string;
  emailVerified?: boolean;
  isVerified?: boolean;
  isActive?: boolean;
  subscriptionType?: SubscriptionType;
  image?: string;
  dateOfBirth?: string;
}> = [
  {
    email: "admin@santu.com",
    firstName: "Admin",
    lastName: "Santu",
    title: "Administrateur",
    emailVerified: true,
    isVerified: true,
    isActive: true,
    subscriptionType: SubscriptionType.FREE,
  },
];
