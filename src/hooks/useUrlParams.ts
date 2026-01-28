import { useRouter, useSearchParams } from "next/navigation";

/**
 * Hook personnalisé pour la gestion des paramètres d'URL
 * @returns Objet contenant des fonctions utilitaires pour manipuler les paramètres d'URL
 */
export function useUrlParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * Vérifie si un ou plusieurs paramètres existent dans l'URL
   * @param {string | string[]} paramNames - Nom(s) du/des paramètre(s) à vérifier
   * @returns {boolean} - True si le(s) paramètre(s) existe(nt), false sinon
   */
  const hasParams = (paramNames: string | string[]): boolean => {
    if (typeof paramNames === "string") {
      return searchParams.has(paramNames);
    }
    return paramNames.every((param) => searchParams.has(param));
  };

  /**
   * Récupère la valeur d'un ou plusieurs paramètres d'URL
   * @param {string | string[]} paramNames - Nom(s) du/des paramètre(s) à récupérer
   * @returns {string | null | Record<string, string | null>} - Valeur(s) du/des paramètre(s) ou null si non trouvé(s)
   */
  const getParams = (
    paramNames: string | string[]
  ): string | null | Record<string, string | null> => {
    if (typeof paramNames === "string") {
      return searchParams.get(paramNames);
    }

    const result: Record<string, string | null> = {};
    paramNames.forEach((param) => {
      result[param] = searchParams.get(param);
    });
    return result;
  };

  /**
   * Définit ou met à jour un ou plusieurs paramètres d'URL et navigue vers la nouvelle URL
   * @param {string | Record<string, string>} paramNameOrObject - Nom du paramètre ou objet de paires clé-valeur
   * @param {string} [value] - Valeur à assigner au paramètre (non utilisé si un objet est fourni)
   */
  const setParams = (
    paramNameOrObject: string | Record<string, string>,
    value?: string
  ): void => {
    const params = new URLSearchParams(searchParams);

    if (typeof paramNameOrObject === "string" && value !== undefined) {
      params.set(paramNameOrObject, value);
    } else if (typeof paramNameOrObject === "object") {
      Object.entries(paramNameOrObject).forEach(([key, val]) => {
        params.set(key, val);
      });
    }

    // Navigue vers la nouvelle URL avec les paramètres mis à jour
    router.push(`?${params.toString()}`, { scroll: false });
  };

  /**
   * Supprime un ou plusieurs paramètres de l'URL et navigue vers la nouvelle URL
   * @param {string | string[]} paramNames - Nom(s) du/des paramètre(s) à supprimer
   */
  const deleteParams = (paramNames: string | string[]): void => {
    const params = new URLSearchParams(searchParams);

    if (typeof paramNames === "string") {
      params.delete(paramNames);
    } else {
      paramNames.forEach((param) => {
        params.delete(param);
      });
    }

    // Navigue vers la nouvelle URL avec les paramètres mis à jour
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const resetParams = (): void => {
    router.push("/academy", { scroll: false });
  };

  return {
    hasParams,
    getParams,
    setParams,
    deleteParams,
    resetParams,
  };
}
