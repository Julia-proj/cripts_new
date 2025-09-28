import { useEffect, useRef } from "react";

export default function InstaEmbed({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => {
      (window as any).instgrm?.Embeds?.process();
    };
    document.body.appendChild(script);
    return () => {
      script.remove();
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
          max-width: 360px; /* под формат рилса */
          aspect-ratio: 9/16;
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
