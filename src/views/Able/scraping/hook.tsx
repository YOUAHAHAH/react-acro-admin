import { useEffect, useRef } from "react";
import { ctxProps } from "../type";

const Hook = (props: ctxProps) => {
  const {
    backgroundColor = "#eee",
    font = "22px serif",
    textColor = "#333",
    text = "react-acro-admin",
    clear = false,
    generate
  } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textCanvasRef = useRef<HTMLCanvasElement>(null);

  if (generate === false) {
    useEffect(() => {
      const canvas = canvasRef.current;
      const textCanvas = textCanvasRef.current;
      if (!canvas || !textCanvas) return;

      const ctx = canvas.getContext("2d");
      const textCtx = textCanvas.getContext("2d");
      if (!ctx || !textCtx) return;

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, 400, 200);

      textCtx.font = font;
      textCtx.fillStyle = textColor;

      textCtx.fillText(`${text}`, 400 / 2.5, 100);

      canvas.onmousedown = e => {
        if (e.button === 0) {
          canvas.onmousemove = m => {
            const x = m.clientX - canvas.offsetLeft;
            const y = m.clientY - canvas.offsetTop;
            ctx.clearRect(x - 5, y - 5, 20, 20);
          };
        }
      };
      canvas.onmouseup = e => {
        if (e.button === 0) {
          canvas.onmousemove = null;
        }
      };
    }, [clear]);
  } else {
    useEffect(() => {
      const canvas = canvasRef.current;
      const textCanvas = textCanvasRef.current;
      if (!canvas || !textCanvas) return;

      const ctx = canvas.getContext("2d");
      const textCtx = textCanvas.getContext("2d");
      if (!ctx || !textCtx) return;

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, 400, 200);

      textCtx.font = font;
      textCtx.fillStyle = textColor;

      textCtx.fillText(`${text}`, 400 / 2.5, 100);

      canvas.onmousedown = (e: any) => {
        if (e.button === 0) {
          const canvas = e.target;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          e.target.onmousemove = (m: any) => {
            const x = m.clientX - canvas.offsetLeft;
            const y = m.clientY - canvas.offsetTop;
            ctx.clearRect(x - 230, y - 160, 20, 20);
          };
        }
      };

      canvas.onmouseup = (e: any) => {
        if (e.button === 0) {
          e.target.onmousemove = null;
        }
      };
    }, [backgroundColor, font, textColor, text, clear]);
  }

  return (
    <>
      <canvas
        className="!absolute"
        width={400}
        height={200}
        ref={textCanvasRef}
      />
      <canvas className="!relative" width={400} height={200} ref={canvasRef} />
    </>
  );
};

export default Hook;
