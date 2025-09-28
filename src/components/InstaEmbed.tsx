import { useEffect, useRef } from "react";

export default function InstaEmbed({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // подключаем скрипт Instagram один раз
    const s = document.createElement("script");
    s.src = "https://www.instagram.com/embed.js";
    s.async = true;
    s.onload = () => (window as any).instgrm?.Embeds?.process();
    document.body.appendChild(s);
    return () => {
      // не ломаем другие эмбед-ы при unmount
      try { s.remove(); } catch {}
    };
  }, []);

  return (
    <div className="insta-wrap">
      <blockquote
        ref={ref}
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ background: "#fff", border: 0, margin: 0, padding: 0, width: "100%" }}
      />
      <style jsx>{`
        .insta-wrap {
          position: relative;
          width: 100%;
          max-width: 360px;     /* под формат рилсов */
          aspect-ratio: 9 / 16; /* сохраняем карточку вертикальной */
          overflow: hidden;
          margin: 0 auto;
        }
        :global(.instagram-media) {
          width: 100% !important;
          min-width: auto !important;
        }
      `}</style>
    </div>
  );
}
