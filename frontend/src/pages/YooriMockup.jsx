import { useEffect, useState } from "react";

/**
 * Affiche le mockup statique "Yoori" (document HTML autonome produit hors React)
 * dans une iframe plein écran. Le fichier est servi comme asset brut
 * (public/yoori-mockup.txt) puis injecté via srcDoc — cela contourne le routage
 * SPA qui réécrit sinon toute URL "propre" vers l'application React.
 */
export default function YooriMockup() {
  const [html, setHtml] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`${process.env.PUBLIC_URL}/yoori-mockup.txt`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((text) => {
        if (!cancelled) setHtml(text);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
        Impossible de charger l’aperçu.
      </div>
    );
  }

  if (html === null) {
    return (
      <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
        Chargement de l’aperçu…
      </div>
    );
  }

  return (
    <iframe
      title="Yoori — Aperçu"
      srcDoc={html}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        border: 0,
      }}
    />
  );
}
