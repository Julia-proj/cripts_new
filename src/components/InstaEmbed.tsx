import { useEffect } from "react";

/**
 * Аккуратный Instagram Reels embed без растягивания.
 * - Контейнер с aspect-ratio 9/16 фиксирует пропорции.
 * - iframe/blockquote растягиваются на ширину контейнера без деформации.
 */
export default function InstaEmbed({ url }: { url: string }) {
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://www.instagram.com/embed.js";
    s.async = true;
    s.onload = () => (window as any).instgrm?.Embeds?.process();
    document.body.appendChild(s);
    return () => {
      try { s.remove(); } catch {}
    };
  }, []);

  return (
    <div className="insta-card">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ background: "#fff", border: 0, margin: 0, padding: 0, width: "100%" }}
      />
      <style jsx>{`
        .insta-card{
          width: 100%;
          max-width: 300px;     /* ширина карточки */
          aspect-ratio: 9 / 16; /* не даём деформироваться */
          overflow: hidden;
          border-radius: 16px;
        }
        /* Instagram сам встраивает внутренние обёртки — форсим ширину */
        :global(.instagram-media){ width:100% !important; min-width:0 !important; }
        :global(.instagram-media iframe){ width:100% !important; height:100% !important; }
      `}</style>
    </div>
  );
}
