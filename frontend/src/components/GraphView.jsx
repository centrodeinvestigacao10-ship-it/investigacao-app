import { useEffect, useRef } from "react";
import { Network } from "vis-network/standalone";

export function GraphView({ nodes, edges }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const data = {
      nodes,
      edges
    };

    const network = new Network(containerRef.current, data, {
      nodes: {
        shape: "dot",
        size: 14,
        color: {
          background: "#0f172a",
          border: "#1e293b",
          highlight: { background: "#2563eb", border: "#1e3a8a" }
        },
        font: { color: "#0f172a", size: 12 }
      },
      edges: {
        color: "#94a3b8",
        smooth: true
      },
      interaction: {
        hover: true,
        dragNodes: true,
        zoomView: true,
        dragView: true
      },
      physics: {
        stabilization: true
      }
    });

    return () => network.destroy();
  }, [nodes, edges]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-700">Grafo interativo</p>
          <p className="text-xs text-slate-500">
            Arraste nós, zoom com scroll e clique para destacar.
          </p>
        </div>
        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs text-white">
          Ativo
        </span>
      </div>
      <div ref={containerRef} className="h-80 w-full rounded-lg bg-slate-50" />
    </div>
  );
}
