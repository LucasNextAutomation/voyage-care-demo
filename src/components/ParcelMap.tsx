"use client"

import { useEffect, useRef, useState } from "react"
import type { Deal } from "@/data/deals"

interface ParcelMapProps {
  deals: Deal[]
  selectedDeal?: Deal | null
  onSelect: (deal: Deal) => void
  highlightIds?: string[]
}

// Dynamic-imported Leaflet map. Uses OpenStreetMap tiles (OGL-compatible,
// free, no API key). Client-side only because Leaflet touches window at
// module load.
export default function ParcelMap({ deals, selectedDeal, onSelect, highlightIds = [] }: ParcelMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<unknown>(null)
  const markersRef = useRef<Map<string, unknown>>(new Map())
  const [ready, setReady] = useState(false)

  // Initialise map once
  useEffect(() => {
    let cancelled = false

    const init = async () => {
      if (!containerRef.current || mapRef.current) return
      const L = (await import("leaflet")).default

      if (cancelled || !containerRef.current) return

      const map = L.map(containerRef.current, {
        center: [53.2, -2.2], // Midlands / North West pivot
        zoom: 7,
        scrollWheelZoom: true,
        attributionControl: true,
        zoomControl: true,
      })

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map)

      mapRef.current = map
      setReady(true)
    }

    void init()

    return () => {
      cancelled = true
      if (mapRef.current) {
        // @ts-expect-error - leaflet runtime object
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  // Sync markers when deals change
  useEffect(() => {
    if (!ready || !mapRef.current) return

    let stillMounted = true

    const sync = async () => {
      const L = (await import("leaflet")).default
      if (!stillMounted || !mapRef.current) return

      const map = mapRef.current as InstanceType<typeof L.Map>
      const existing = markersRef.current as Map<string, InstanceType<typeof L.Marker>>

      // Remove markers no longer in list
      const idsNow = new Set(deals.map(d => d.id))
      for (const [id, marker] of existing) {
        if (!idsNow.has(id)) {
          marker.remove()
          existing.delete(id)
        }
      }

      // Add/update
      for (const deal of deals) {
        if (typeof deal.lat !== "number" || typeof deal.lng !== "number") continue

        const isHighlight = highlightIds.includes(deal.id)
        const isSelected = selectedDeal?.id === deal.id
        const score = deal.distressScore
        const ringColour = score >= 8 ? "#dc2626" : score >= 6 ? "#f59e0b" : "#10b981"

        const html = `
          <div style="
            position: relative;
            width: 34px;
            height: 34px;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            ${isHighlight ? `<span style="position:absolute;inset:0;border-radius:9999px;background:${ringColour};opacity:.25;animation:pulse 1.6s ease-out infinite"></span>` : ""}
            <div style="
              width: 30px;
              height: 30px;
              border-radius: 9999px;
              background: ${isSelected ? "#1E3A5F" : "#fff"};
              color: ${isSelected ? "#fff" : "#111827"};
              border: 2.5px solid ${ringColour};
              box-shadow: 0 4px 10px rgba(15,23,42,.18);
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 700;
              font-family: 'JetBrains Mono', ui-monospace, monospace;
              font-size: 11px;
              letter-spacing: -.02em;
            ">${score.toFixed(1)}</div>
          </div>
        `
        const icon = L.divIcon({
          html,
          className: "voyage-marker",
          iconSize: [34, 34],
          iconAnchor: [17, 17],
        })

        const already = existing.get(deal.id)
        if (already) {
          already.setIcon(icon)
          already.setLatLng([deal.lat, deal.lng])
        } else {
          const m = L.marker([deal.lat, deal.lng], { icon, zIndexOffset: isHighlight ? 1000 : 0 })
            .addTo(map)
            .on("click", () => onSelect(deal))
          existing.set(deal.id, m)
        }
      }
    }

    void sync()

    return () => {
      stillMounted = false
    }
  }, [deals, selectedDeal, highlightIds, ready, onSelect])

  // Fly to selected deal
  useEffect(() => {
    if (!ready || !mapRef.current || !selectedDeal) return
    if (typeof selectedDeal.lat !== "number" || typeof selectedDeal.lng !== "number") return

    let stillMounted = true
    const flyTo = async () => {
      const L = (await import("leaflet")).default
      if (!stillMounted || !mapRef.current) return
      const map = mapRef.current as InstanceType<typeof L.Map>
      map.flyTo([selectedDeal.lat!, selectedDeal.lng!], 11, { duration: 0.8 })
    }
    void flyTo()

    return () => {
      stillMounted = false
    }
  }, [selectedDeal, ready])

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
      <div ref={containerRef} className="w-full h-full" style={{ minHeight: 320 }} />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50/80 backdrop-blur-sm pointer-events-none">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="w-2 h-2 rounded-full bg-[#1E3A5F] animate-pulse" />
            Loading UK map...
          </div>
        </div>
      )}
      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(0.6); opacity: 0.6; }
          100% { transform: scale(2.0); opacity: 0; }
        }
        .leaflet-container { background: #e2e8f0; font-family: 'Inter', ui-sans-serif, system-ui; }
        .leaflet-control-attribution { font-size: 9px !important; background: rgba(255,255,255,0.8) !important; }
        .leaflet-control-zoom a { border-radius: 6px !important; color: #1E3A5F !important; }
        .voyage-marker { background: transparent !important; border: none !important; }
      `}</style>
    </div>
  )
}
