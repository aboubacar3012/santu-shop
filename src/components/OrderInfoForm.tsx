"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

export interface OrderInfoData {
  nom: string;
  prenom: string;
  telephone: string;
  quartier: string;
  commune: string;
  ville: string;
  latitude?: number;
  longitude?: number;
}

const initialValues: OrderInfoData = {
  nom: "",
  prenom: "",
  telephone: "",
  quartier: "",
  commune: "",
  ville: "",
};

export interface OrderInfoFormProps {
  onSubmit: (data: OrderInfoData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function OrderInfoForm({
  onSubmit,
  onCancel,
  isLoading = false,
}: OrderInfoFormProps) {
  const [data, setData] = useState<OrderInfoData>(initialValues);
  const [gpsStatus, setGpsStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  const update = (field: keyof OrderInfoData, value: string | number | undefined) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  const handleUseGps = () => {
    if (!navigator.geolocation) {
      setGpsStatus("error");
      return;
    }
    setGpsStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        update("latitude", pos.coords.latitude);
        update("longitude", pos.coords.longitude);
        setGpsStatus("ok");
      },
      () => setGpsStatus("error"),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const inputClass =
    "w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-shadow";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="order-prenom" className="block text-sm font-medium text-gray-700 mb-1">
            Prénom <span className="text-red-500">*</span>
          </label>
          <input
            id="order-prenom"
            type="text"
            required
            value={data.prenom}
            onChange={(e) => update("prenom", e.target.value)}
            className={inputClass}
            placeholder="Prénom"
          />
        </div>
        <div>
          <label htmlFor="order-nom" className="block text-sm font-medium text-gray-700 mb-1">
            Nom <span className="text-red-500">*</span>
          </label>
          <input
            id="order-nom"
            type="text"
            required
            value={data.nom}
            onChange={(e) => update("nom", e.target.value)}
            className={inputClass}
            placeholder="Nom"
          />
        </div>
      </div>

      <div>
        <label htmlFor="order-tel" className="block text-sm font-medium text-gray-700 mb-1">
          Numéro de téléphone <span className="text-red-500">*</span>
        </label>
        <input
          id="order-tel"
          type="tel"
          required
          value={data.telephone}
          onChange={(e) => update("telephone", e.target.value)}
          className={inputClass}
          placeholder="+224 6XX XX XX XX"
        />
      </div>

      <div>
        <label htmlFor="order-quartier" className="block text-sm font-medium text-gray-700 mb-1">
          Quartier <span className="text-red-500">*</span>
        </label>
        <input
          id="order-quartier"
          type="text"
          required
          value={data.quartier}
          onChange={(e) => update("quartier", e.target.value)}
          className={inputClass}
          placeholder="Quartier"
        />
      </div>

      <div>
        <label htmlFor="order-commune" className="block text-sm font-medium text-gray-700 mb-1">
          Commune <span className="text-red-500">*</span>
        </label>
        <input
          id="order-commune"
          type="text"
          required
          value={data.commune}
          onChange={(e) => update("commune", e.target.value)}
          className={inputClass}
          placeholder="Commune"
        />
      </div>

      <div>
        <label htmlFor="order-ville" className="block text-sm font-medium text-gray-700 mb-1">
          Ville <span className="text-red-500">*</span>
        </label>
        <input
          id="order-ville"
          type="text"
          required
          value={data.ville}
          onChange={(e) => update("ville", e.target.value)}
          className={inputClass}
          placeholder="Ville"
        />
      </div>

      <div>
        <span className="block text-sm font-medium text-gray-700 mb-1">
          Position GPS <span className="text-gray-400 font-normal">(optionnel)</span>
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleUseGps}
            disabled={gpsStatus === "loading"}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors disabled:opacity-60"
          >
            <MapPin className="w-4 h-4" />
            {gpsStatus === "loading"
              ? "Récupération…"
              : gpsStatus === "ok"
                ? "Position enregistrée"
                : gpsStatus === "error"
                  ? "Réessayer"
                  : "Utiliser ma position"}
          </button>
          {data.latitude != null && data.longitude != null && (
            <span className="text-xs text-gray-500">
              {data.latitude.toFixed(5)}, {data.longitude.toFixed(5)}
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 py-2.5 px-4 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {isLoading ? "Envoi…" : "Confirmer la commande"}
        </button>
      </div>
    </form>
  );
}
