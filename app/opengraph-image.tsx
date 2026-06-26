import { ImageResponse } from "next/og";

export const alt = "ID-Night — Software de control de acceso y gestión de incidentes para boliches y eventos";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Imagen Open Graph / Twitter compartida por todo el sitio.
// Refleja la identidad visual: fondo oscuro + acento violeta→cyan.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#08080F",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "44px" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
            }}
          />
          <div style={{ color: "white", fontSize: "42px", fontWeight: 700, letterSpacing: "-0.02em" }}>
            ID-Night
          </div>
        </div>
        <div
          style={{
            color: "white",
            fontSize: "62px",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            maxWidth: "1000px",
          }}
        >
          Software de control de acceso y gestión de incidentes para boliches y eventos
        </div>
        <div style={{ color: "#94a3b8", fontSize: "32px", marginTop: "36px" }}>
          Identidad validada · Trazabilidad · Decisiones con más contexto
        </div>
      </div>
    ),
    { ...size },
  );
}
