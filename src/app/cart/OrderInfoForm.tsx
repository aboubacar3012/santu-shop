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

export const initialOrderInfoValues: OrderInfoData = {
  nom: "",
  prenom: "",
  telephone: "",
  quartier: "",
  commune: "",
  ville: "",
};

export interface OrderInfoFormProps {
  onSubmit?: (data: OrderInfoData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  /** Mode contrôlé : le parent gère les données (ex. modal avec OrderRecap) */
  value?: OrderInfoData;
  onChange?: (data: OrderInfoData) => void;
}

export function OrderInfoForm({
  onSubmit,
  onCancel,
  isLoading = false,
  value,
  onChange,
}: OrderInfoFormProps) {
  const [internalData, setInternalData] = useState<OrderInfoData>(initialOrderInfoValues);
  const [gpsStatus, setGpsStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  const isControlled = value !== undefined && onChange !== undefined;
  const data = isControlled ? value! : internalData;

  const update = (field: keyof OrderInfoData, val: string | number | undefined) => {
    const next = { ...data, [field]: val };
    if (isControlled) onChange(next);
    else setInternalData(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit(data);
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
    "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-shadow";
  const labelClass = "block text-xs font-medium text-gray-700 mb-0.5";

  return (
    <form
      onSubmit={isControlled ? (e) => e.preventDefault() : handleSubmit}
      className="space-y-3"
    >
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div>
          <label htmlFor="order-prenom" className={labelClass}>
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
          <label htmlFor="order-nom" className={labelClass}>
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
        <label htmlFor="order-tel" className={labelClass}>
          Téléphone <span className="text-red-500">*</span>
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

      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div>
          <label htmlFor="order-quartier" className={labelClass}>
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
          <label htmlFor="order-commune" className={labelClass}>
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
      </div>

      <div>
        <label htmlFor="order-ville" className={labelClass}>
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
        <span className={labelClass}>
          GPS <span className="text-gray-400 font-normal">(optionnel)</span>
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleUseGps}
            disabled={gpsStatus === "loading"}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors disabled:opacity-60"
          >
            <MapPin className="w-3.5 h-3.5" />
            {gpsStatus === "loading"
              ? "…"
              : gpsStatus === "ok"
                ? "OK"
                : gpsStatus === "error"
                  ? "Réessayer"
                  : "Ma position"}
          </button>
          {data.latitude != null && data.longitude != null && (
            <span className="text-[10px] sm:text-xs text-gray-500 truncate max-w-[140px]">
              {data.latitude.toFixed(4)}, {data.longitude.toFixed(4)}
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-2 pt-2 sm:pt-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className={`rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50 py-2 px-3 sm:py-2.5 sm:px-4 ${isControlled ? "w-full" : "flex-1"}`}
        >
          Annuler
        </button>
        {!isControlled && (
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 py-2 px-3 sm:py-2.5 sm:px-4 rounded-lg text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Envoi…" : "Confirmer"}
          </button>
        )}
      </div>
    </form>
  );
}
