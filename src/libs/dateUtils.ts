/**
 * Formate un timestamp en temps relatif lisible
 * @param timestamp - Date sous forme de string ou d'objet
 * @returns String formatée du temps relatif
 */
export const formatEventTime = (timestamp: string | Date | object): string => {
  const now = new Date();
  let eventTime: Date;

  try {
    // Si c'est un objet Date, l'utiliser directement
    if (timestamp instanceof Date) {
      eventTime = timestamp;
    } else if (typeof timestamp === "string") {
      // Si c'est une string, la parser directement
      eventTime = new Date(timestamp);
    } else if (typeof timestamp === "object" && timestamp !== null) {
      // Si c'est un objet avec une propriété getTime (comme Date sérialisé)
      if (typeof (timestamp as any).getTime === "function") {
        eventTime = timestamp as Date;
      } else {
        // Sinon, essayer de parser comme string ISO depuis une propriété
        // ou utiliser JSON.stringify comme fallback
        const timestampStr = (timestamp as any).timestamp || (timestamp as any).createdAt || JSON.stringify(timestamp);
        eventTime = new Date(timestampStr);
      }
    } else {
      // Cas par défaut : utiliser maintenant
      eventTime = now;
    }

    // Vérifier si la date est valide
    if (isNaN(eventTime.getTime())) {
      console.warn("Date invalide dans formatEventTime:", timestamp, "type:", typeof timestamp);
      return "Date invalide";
    }

    const diffMs = now.getTime() - eventTime.getTime();

    // Debug: logger les valeurs pour comprendre le problème
    if (Math.abs(diffMs) > 86400000) { // Plus d'un jour
      console.log("Debug formatEventTime:", {
        now: now.toISOString(),
        eventTime: eventTime.toISOString(),
        diffMs,
        diffDays: Math.floor(diffMs / 86400000),
        timestampInput: timestamp
      });
    }

    // Si la différence est négative (événement dans le futur), retourner "Récent"
    if (diffMs < 0) {
      return "Récent";
    }

    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffSecs < 10) {
      return "À l'instant";
    } else if (diffMins < 1) {
      return `Il y a ${diffSecs} sec`;
    } else if (diffMins < 60) {
      return `Il y a ${diffMins} min`;
    } else if (diffHours < 24) {
      return `Il y a ${diffHours} heure${diffHours > 1 ? "s" : ""}`;
    } else {
      return `Il y a ${diffDays} jour${diffDays > 1 ? "s" : ""}`;
    }
  } catch (error) {
    console.error("Erreur lors du formatage de la date:", error, timestamp);
    return "Date invalide";
  }
};

/**
 * Formate une date en format français
 * @param date - Date à formater
 * @returns String formatée en français
 */
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return "Date invalide";
  }

  return dateObj.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Formate une date en format court
 * @param date - Date à formater
 * @returns String formatée en format court
 */
export const formatDateShort = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return "Date invalide";
  }

  return dateObj.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

/**
 * Vérifie si une date est valide
 * @param date - Date à vérifier
 * @returns Boolean indiquant si la date est valide
 */
export const isValidDate = (date: any): boolean => {
  if (!date) return false;
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return !isNaN(dateObj.getTime());
};
