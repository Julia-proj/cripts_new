import { useEffect, useRef } from "react";

/**
 * Умный Instagram embed без деформации/растяжения.
 * - Базовый размер реального iframe Instagram ~ 360x640 (мин. ширина у них около 326px).
 * - Мы рендерим embed в "базовом масштабе" 360px и дальше аккуратно уменьшаем transform-ом,
 *   чтобы карточка была компактной и не тянула сетку (особенно на мобилке).
 *
 * Параметры:
 * - url: публичная ссылка на Reels/Post.
 * - maxWidth: желаемая видимая ширина карточки (например, 320 или 240).
 *   Высота подтянется сама через aspect-ratio 9/16.
 */
export default function InstaEmbed({ url, maxWidth = 320 }: { url: string; maxWidth?: number }) {
  const baseWidth = 360; // "нативная" ширина карточки инсты, от которой считаем масштаб
  const scale = Math.min(1, maxWidth / baseWidth);

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
    <div className="insta-outer" style={{ width: `${maxWidth}px`, aspectRatio: "9/16" }}>
      <div
        className="insta-inner"
        style={{
          width: `${baseWidth}px`,
          height: `${(baseWidth * 16) / 9}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
          style={{
            background: "#fff",
            border: 0,
            margin: 0,
            padding: 0,
            width: "100%",
            minWidth: 0,      // если вдруг инста навязывает min-width, мы прячем это внутри скейла
            maxWidth: "100%", // не даём переполнить базовый контейнер
          }}
        />
      </div>

      <style jsx>{`
        .insta-outer {
          position: relative;
          overflow: hidden; /* подстраховка на случай внутренних отступов инсты */
          border-radius: 12px;
          background: #fff;
        }
        .insta-inner {
          /* здесь реальный embed в базовых размерах; мы его уменьшаем transform-ом */
        }
      `}</style>
    </div>
  );
}
