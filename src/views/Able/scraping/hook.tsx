import { useEffect, useRef } from "react";
import { ctxProps } from "../type";

const Hook = (props: ctxProps) => {
  const {
    backgroundColor = "#eee",
    font = "22px serif",
    textColor = "#333",
    text = "acroReact_ts",
    onMouseDown,
    onMouseUp,
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
    }, []);
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

      if (onMouseDown) {
        canvas.onmousedown = onMouseDown;
      }

      if (onMouseUp) {
        canvas.onmouseup = onMouseUp;
      }
    }, [backgroundColor, font, textColor, text, onMouseDown, onMouseUp]);
  }

  return (
    <>
      <canvas
        width={400}
        height={200}
        ref={textCanvasRef}
        style={{ position: "absolute" }}
      />
      <canvas
        width={400}
        height={200}
        ref={canvasRef}
        style={{ position: "relative" }}
      />
    </>
  );
};

export default Hook;
