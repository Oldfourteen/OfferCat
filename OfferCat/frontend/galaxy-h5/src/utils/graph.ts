export type Edge = { u: string; v: string }

export function shortestPathUndirected(edges: Edge[], start: string, end: string): string[] | null {
  if (start === end) return [start]
  const adj = new Map<string, string[]>()
  for (const e of edges) {
    if (!adj.has(e.u)) adj.set(e.u, [])
    if (!adj.has(e.v)) adj.set(e.v, [])
    adj.get(e.u)!.push(e.v)
    adj.get(e.v)!.push(e.u)
  }
  const q: string[] = [start]
  const prev = new Map<string, string | null>()
  prev.set(start, null)
  while (q.length) {
    const cur = q.shift()!
    if (cur === end) break
    for (const nb of adj.get(cur) ?? []) {
      if (prev.has(nb)) continue
      prev.set(nb, cur)
      q.push(nb)
    }
  }
  if (!prev.has(end)) return null
  const path: string[] = []
  let x: string | null = end
  while (x) {
    path.push(x)
    x = prev.get(x) ?? null
  }
  path.reverse()
  return path
}

export function hyperedgesContainingNode(
  nodeId: string,
  hyperedges: { id: string; member_node_ids: string[] }[],
): { hyperedgeIds: string[]; memberIds: Set<string> } {
  const hyperedgeIds: string[] = []
  const memberIds = new Set<string>()
  for (const he of hyperedges) {
    const members = he.member_node_ids
    if (!members?.length) continue
    if (members.includes(nodeId)) {
      hyperedgeIds.push(he.id)
      for (const m of members) memberIds.add(m)
    }
  }
  return { hyperedgeIds, memberIds }
}
