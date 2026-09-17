"use client";

import { useState } from "react";
import { knowledgeGraph, type GraphNode } from "@/data/content";
import { Reveal, SectionHeading } from "./ui";

type FlatNode = {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  depth: number;
  parent?: string;
  isRoot?: boolean;
};

type Edge = { from: string; to: string };

function flatten(root: GraphNode): { nodes: FlatNode[]; edges: Edge[] } {
  const nodes: FlatNode[] = [];
  const edges: Edge[] = [];

  const N = (root.children?.length ?? 1) + 1;
  root.children?.forEach((child, i) => {
    const bx = ((i + 1) / N) * 100;
    const branchId = `b${i}`;
    nodes.push({
      id: branchId,
      label: child.label,
      sub: child.sub,
      x: bx,
      y: 34,
      depth: 1,
      parent: "root",
    });
    edges.push({ from: "root", to: branchId });

    const leaves = child.children ?? [];
    const k = Math.max(leaves.length, 1);
    leaves.forEach((leaf, j) => {
      const y = 60 + (j * 30) / Math.max(k - 1, 1) * (k > 1 ? 1 : 0);
      const leafId = `${branchId}-${j}`;
      nodes.push({
        id: leafId,
        label: leaf.label,
        sub: leaf.sub,
        x: bx + (k > 1 ? (j - (k - 1) / 2) * 12 : 0),
        y: k === 1 ? 62 : y,
        depth: 2,
        parent: branchId,
      });
      edges.push({ from: branchId, to: leafId });
    });
  });

  nodes.unshift({
    id: "root",
    label: root.label,
    sub: root.sub,
    x: 50,
    y: 8,
    depth: 0,
    isRoot: true,
  });

  return { nodes, edges };
}

const { nodes, edges } = flatten(knowledgeGraph);

function related(nodeId: string | null): Set<string> {
  const set = new Set<string>();
  if (!nodeId) return set;
  set.add(nodeId);
  const byParent = new Map<string, string[]>();
  for (const n of nodes) {
    if (n.parent) {
      const arr = byParent.get(n.parent) ?? [];
      arr.push(n.id);
      byParent.set(n.parent, arr);
    }
  }
  // ancestors
  let cur = nodes.find((n) => n.id === nodeId);
  while (cur?.parent) {
    set.add(cur.parent);
    cur = nodes.find((n) => n.id === cur!.parent);
  }
  // descendants
  const stack = [nodeId];
  while (stack.length) {
    const id = stack.pop()!;
    for (const child of byParent.get(id) ?? []) {
      set.add(child);
      stack.push(child);
    }
  }
  return set;
}

export function KnowledgeGraph() {
  const [active, setActive] = useState<string | null>(null);
  const rel = related(active);

  const dim = (id: string) => active !== null && !rel.has(id);
  const edgeHot = (e: Edge) => active !== null && rel.has(e.from) && rel.has(e.to);

  return (
    <section id="map" className="section">
      <div className="container-site">
        <SectionHeading
          index="07"
          label="knowledge graph"
          title={<>My technical map</>}
          sub="Hover a concept — its branch and children light up. This is how I think about the field: a graph, not a list."
        />

        <Reveal>
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between border-b border-line-soft bg-ink-2/70 px-4 py-3">
              <span className="mono-label">technical_map · interactive</span>
              <span className="hidden font-mono text-[10px] tracking-[0.18em] text-faint sm:inline">
                HOVER TO TRACE CONNECTIONS
              </span>
            </div>
            <div className="relative">
              <div className="overflow-x-auto px-2 py-6 sm:px-6 sm:py-8">
                <div className="relative h-[440px] min-w-[680px] sm:h-[460px]" role="img" aria-label="Knowledge graph of technical interests">
                  {/* edges */}
                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    {edges.map((e) => {
                      const a = nodes.find((n) => n.id === e.from)!;
                      const b = nodes.find((n) => n.id === e.to)!;
                      const hot = edgeHot(e);
                      return (
                        <line
                          key={e.from + e.to}
                          x1={a.x}
                          y1={a.y}
                          x2={b.x}
                          y2={b.y}
                          stroke={hot ? "#6e9bff" : "rgba(255,255,255,0.12)"}
                          strokeWidth={hot ? 1.4 : 1}
                          strokeOpacity={hot ? 0.7 : 1}
                          strokeDasharray={hot ? "0" : "2 3"}
                          style={{ transition: "stroke .25s, stroke-opacity .25s" }}
                          vectorEffect="non-scaling-stroke"
                        />
                      );
                    })}
                  </svg>

                  {/* nodes */}
                  {nodes.map((n) => {
                    const hot = active !== null && rel.has(n.id);
                    return (
                      <button
                        key={n.id}
                        onMouseEnter={() => setActive(n.id)}
                        onFocus={() => setActive(n.id)}
                        onMouseLeave={() => setActive(null)}
                        onBlur={() => setActive(null)}
                        aria-label={n.label}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-lg border px-2.5 py-1.5 transition-all duration-200 ${
                          n.depth === 0
                            ? "border-accent/50 bg-accent/[0.08]"
                            : "border-line bg-panel"
                        } ${dim(n.id) ? "opacity-30" : ""}`}
                        style={{
                          left: `${n.x}%`,
                          top: `${n.y}%`,
                          ...(hot
                            ? {
                                borderColor: "rgba(110,155,255,0.7)",
                                background: "rgba(110,155,255,0.12)",
                                boxShadow: "0 0 18px rgba(110,155,255,0.15)",
                              }
                            : {}),
                        }}
                      >
                        <span
                          className={`whitespace-nowrap ${
                            n.depth === 0
                              ? "font-display text-[13px] font-semibold text-fg"
                              : "text-[11.5px] text-fg/90"
                          }`}
                        >
                          {n.label}
                        </span>
                        {n.sub ? (
                          <span className="mt-0.5 block text-center font-mono text-[8.5px] tracking-[0.14em] text-faint">
                            {n.sub}
                          </span>
                        ) : null}
                        <span className="pointer-events-none absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-accent/60" />
                      </button>
                    );
                  })}

                  {/* decorative depth guide */}
                  <span className="pointer-events-none absolute top-[6px] left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.22em] text-faint/70">
                    CORE
                  </span>
                  <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.22em] text-faint/70">
                    SPECIALISATIONS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}