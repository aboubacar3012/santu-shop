"use client";

import { useMemo, useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminToast from "./AdminToast";
import CreateTab from "./CreateTab";
import InvoicesTab from "./InvoicesTab";
import ParcelsTab from "./ParcelsTab";
import type {
  AdminTab,
  Invoice,
  Parcel,
  ParcelStatus,
  ShipmentDraft,
  ToastState,
} from "./types";
import { parseNumberOrZero, routeLabel } from "./utils";

const defaultDraft: ShipmentDraft = {
  route: "FR_TO_GN",
  service: "standard",
  size: "M",
  weightKg: "",
  lengthCm: "",
  widthCm: "",
  heightCm: "",
  declaredValueEur: "",
  currency: "EUR",
  notes: "",
  senderName: "",
  senderPhone: "",
  senderEmail: "",
  senderAddress: "",
  recipientName: "",
  recipientPhone: "",
  recipientEmail: "",
  recipientAddress: "",
};

export default function AdminPage() {
  const [tab, setTab] = useState<AdminTab>("create");
  const [draft, setDraft] = useState<ShipmentDraft>(defaultDraft);
  const [createUi, setCreateUi] = useState<{
    optionsOpen: boolean;
    senderOpen: boolean;
    recipientOpen: boolean;
  }>({
    optionsOpen: false,
    senderOpen: true,
    recipientOpen: true,
  });
  const [toast, setToast] = useState<ToastState>(null);

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "FAC-000128",
      createdAtIso: new Date().toISOString(),
      customerName: "Client Test",
      routeLabel: "France → Conakry",
      totalEur: 49.9,
      status: "brouillon",
    },
  ]);

  const [parcels, setParcels] = useState<Parcel[]>([
    {
      trackingId: "SE-123456",
      createdAtIso: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      route: "FR_TO_GN",
      service: "standard",
      size: "M",
      weightKg: 3.5,
      senderName: "Expéditeur Test",
      recipientName: "Destinataire Test",
      status: "En transit",
      comment: "Pris en charge et en route vers le hub.",
    },
  ]);
  const [parcelSearch, setParcelSearch] = useState("");
  const [parcelCommentDrafts, setParcelCommentDrafts] = useState<Record<string, string>>({});

  const [invoiceSearch, setInvoiceSearch] = useState("");
  const filteredInvoices = useMemo(() => {
    const q = invoiceSearch.trim().toLowerCase();
    if (!q) return invoices;
    return invoices.filter((inv) => {
      return (
        inv.id.toLowerCase().includes(q) ||
        inv.customerName.toLowerCase().includes(q) ||
        inv.routeLabel.toLowerCase().includes(q) ||
        inv.status.toLowerCase().includes(q)
      );
    });
  }, [invoiceSearch, invoices]);

  const filteredParcels = useMemo(() => {
    const q = parcelSearch.trim().toLowerCase();
    if (!q) return parcels;
    return parcels.filter((p) => {
      return (
        p.trackingId.toLowerCase().includes(q) ||
        routeLabel(p.route).toLowerCase().includes(q) ||
        p.senderName.toLowerCase().includes(q) ||
        p.recipientName.toLowerCase().includes(q) ||
        p.status.toLowerCase().includes(q)
      );
    });
  }, [parcelSearch, parcels]);

  const estimate = useMemo(() => {
    // Estimation simple (UI seulement). Ajustable plus tard.
    const weight = parseNumberOrZero(draft.weightKg);
    const declared = parseNumberOrZero(draft.declaredValueEur);
    const base =
      draft.service === "express"
        ? draft.route === "FR_TO_GN" || draft.route === "GN_TO_FR"
          ? 35
          : 55
        : draft.route === "FR_TO_GN" || draft.route === "GN_TO_FR"
          ? 25
          : 45;
    const perKg = draft.service === "express" ? 4.5 : 3.2;
    const sizeFee = draft.size === "S" ? 0 : draft.size === "M" ? 3 : draft.size === "L" ? 7 : 12;
    const insurance = declared > 0 ? Math.min(12, Math.max(0, declared * 0.01)) : 0;
    const subtotal = base + perKg * Math.max(0, weight) + sizeFee + insurance;
    const total = Math.round(subtotal * 100) / 100;
    return { total, base, perKg, sizeFee, insurance };
  }, [draft]);

  const canCreate = useMemo(() => {
    const required = [
      draft.senderName,
      draft.senderPhone,
      draft.senderAddress,
      draft.recipientName,
      draft.recipientPhone,
      draft.recipientAddress,
      draft.weightKg,
    ];
    return required.every((v) => String(v).trim().length > 0);
  }, [draft]);

  const showToast = (kind: "ok" | "warn", msg: string) => {
    setToast({ kind, msg });
    window.setTimeout(() => setToast(null), 2500);
  };

  const createShipment = () => {
    if (!canCreate) {
      showToast("warn", "Veuillez remplir au minimum expéditeur, destinataire, adresse et poids.");
      return;
    }
    // TODO: brancher API / DB
    showToast("ok", "Envoi créé (simulation).");
    const nextTracking = `SE-${String(100000 + parcels.length + 1).slice(-6)}`;
    setParcels((prev) => [
      {
        trackingId: nextTracking,
        createdAtIso: new Date().toISOString(),
        route: draft.route,
        service: draft.service,
        size: draft.size,
        weightKg: parseNumberOrZero(draft.weightKg),
        senderName: draft.senderName || "Expéditeur",
        recipientName: draft.recipientName || "Destinataire",
        status: "Créé",
        comment: draft.notes ? `Note: ${draft.notes}` : undefined,
      },
      ...prev,
    ]);
    setDraft(defaultDraft);
  };

  const createInvoiceFromDraft = () => {
    if (!draft.senderName && !draft.recipientName) {
      showToast("warn", "Renseignez au moins un nom (expéditeur ou destinataire).");
      return;
    }
    const nextId = `FAC-${String(100000 + invoices.length + 1).slice(-6)}`;
    setInvoices((prev) => [
      {
        id: nextId,
        createdAtIso: new Date().toISOString(),
        customerName: draft.senderName || draft.recipientName || "Client",
        routeLabel: routeLabel(draft.route),
        totalEur: estimate.total,
        status: "brouillon",
      },
      ...prev,
    ]);
    showToast("ok", "Facture générée (brouillon).");
    setTab("invoices");
  };

  const markInvoiceSent = (invoiceId: string) => {
    setInvoices((prev) => prev.map((x) => (x.id === invoiceId ? { ...x, status: "envoyée" } : x)));
    showToast("ok", "Facture marquée comme envoyée.");
  };

  const markInvoicePaid = (invoiceId: string) => {
    setInvoices((prev) => prev.map((x) => (x.id === invoiceId ? { ...x, status: "payée" } : x)));
    showToast("ok", "Facture marquée comme payée.");
  };

  const updateParcelStatus = (trackingId: string, next: ParcelStatus) => {
    setParcels((prev) => prev.map((x) => (x.trackingId === trackingId ? { ...x, status: next } : x)));
    showToast("ok", "Statut du colis mis à jour.");
  };

  const updateParcelCommentDraft = (trackingId: string, next: string) => {
    setParcelCommentDrafts((prev) => ({ ...prev, [trackingId]: next }));
  };

  const saveParcelComment = (trackingId: string) => {
    const nextComment = (parcelCommentDrafts[trackingId] ?? "").trim();
    setParcels((prev) =>
      prev.map((x) =>
        x.trackingId === trackingId ? { ...x, comment: nextComment || undefined } : x,
      ),
    );
    showToast("ok", "Commentaire enregistré.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-white text-slate-900">
      {/* Header */}
      <AdminHeader tab={tab} onTabChange={setTab} />

      {/* Toast */}
      <AdminToast toast={toast} />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-5 sm:py-8">
        {tab === "create" ? (
          <CreateTab
            draft={draft}
            setDraft={setDraft}
            createUi={createUi}
            setCreateUi={setCreateUi}
            estimate={estimate}
            canCreate={canCreate}
            routeLabel={routeLabel}
            onCreateShipment={createShipment}
            onCreateInvoice={createInvoiceFromDraft}
            onGoInvoices={() => setTab("invoices")}
            onGoParcels={() => setTab("parcels")}
          />
        ) : tab === "invoices" ? (
          <InvoicesTab
            invoiceSearch={invoiceSearch}
            onInvoiceSearchChange={setInvoiceSearch}
            filteredInvoices={filteredInvoices}
            onNewInvoice={() => setTab("create")}
            onMarkSent={markInvoiceSent}
            onMarkPaid={markInvoicePaid}
          />
        ) : (
          <ParcelsTab
            parcelSearch={parcelSearch}
            onParcelSearchChange={setParcelSearch}
            filteredParcels={filteredParcels}
            routeLabel={routeLabel}
            commentDrafts={parcelCommentDrafts}
            onCommentDraftChange={updateParcelCommentDraft}
            onSaveComment={saveParcelComment}
            onStatusChange={updateParcelStatus}
            onNewShipment={() => setTab("create")}
          />
        )}
      </main>

      <footer className="pb-10" />
    </div>
  );
}
