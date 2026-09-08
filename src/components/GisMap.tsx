import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Parcel, Language } from '../types';

interface GisMapProps {
  parcels: Parcel[];
  selectedParcelUlpin?: string;
  onSelectParcel: (ulpin: string) => void;
  language: Language;
}

export const GisMap: React.FC<GisMapProps> = ({
  parcels,
  selectedParcelUlpin,
  onSelectParcel,
  language,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersGroupRef = useRef<L.LayerGroup | null>(null);
  const [filterAttention, setFilterAttention] = useState<'all' | 'critical' | 'medium' | 'clean'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const isHindi = language === 'hi';

  const defaultCenter: [number, number] = [28.806, 79.027]; // Rampur Khurd centroid

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: defaultCenter,
        zoom: 14,
        zoomControl: true,
      });

      // CartoDB Positron clean map tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CartoDB</a>, OpenStreetMap',
        maxZoom: 19,
      }).addTo(map);

      // Add environmental nala/drainage reserve line
      const drainagePath: [number, number][] = [
        [28.812, 79.021],
        [28.808, 79.025],
        [28.805, 79.028],
        [28.801, 79.032],
      ];
      L.polyline(drainagePath, {
        color: '#0284c7',
        weight: 4,
        dashArray: '5, 8',
      })
        .addTo(map)
        .bindTooltip('Public Drainage Nala (Statutory Reserve Zone)', { sticky: true });

      const layerGroup = L.layerGroup().addTo(map);
      layersGroupRef.current = layerGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      // Keep map alive or clean up
    };
  }, []);

  // Update parcel polygons & markers
  useEffect(() => {
    if (!layersGroupRef.current || !mapInstanceRef.current) return;

    layersGroupRef.current.clearLayers();

    const filtered = parcels.filter((p) => {
      if (filterAttention === 'critical') return p.attentionLevel === 'Critical' || p.attentionLevel === 'High';
      if (filterAttention === 'medium') return p.attentionLevel === 'Medium';
      if (filterAttention === 'clean') return p.attentionLevel === 'Low';
      return true;
    }).filter((p) => {
      if (!searchTerm) return true;
      return (
        p.ulpin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.surveyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.recordedHolder.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    filtered.forEach((p) => {
      const isSelected = p.ulpin === selectedParcelUlpin;
      const isCrit = p.attentionLevel === 'Critical' || p.attentionLevel === 'High';
      const isMed = p.attentionLevel === 'Medium';

      const strokeColor = isCrit ? '#ba1a1a' : isMed ? '#d97706' : '#16a34a';
      const fillColor = isCrit ? '#ba1a1a' : isMed ? '#f59e0b' : '#22c55e';

      if (p.polygonCoordinates && p.polygonCoordinates.length > 2) {
        const polygon = L.polygon(p.polygonCoordinates, {
          color: isSelected ? '#00142f' : strokeColor,
          weight: isSelected ? 4 : 2,
          fillColor: fillColor,
          fillOpacity: isSelected ? 0.65 : 0.4,
        });

        const popupContent = `
          <div style="font-family: Inter, sans-serif; min-width: 200px; padding: 4px;">
            <div style="font-size: 11px; font-weight: bold; color: #44474e;">ULPIN: ${p.ulpin}</div>
            <div style="font-size: 14px; font-weight: bold; color: #00142f; margin-top: 2px;">Survey ${p.surveyNumber}</div>
            <div style="font-size: 12px; color: #131b2e; margin-top: 4px;"><strong>Owner:</strong> ${p.recordedHolder}</div>
            <div style="font-size: 12px; color: #131b2e;"><strong>Village:</strong> ${p.village}</div>
            <div style="margin-top: 6px; padding: 4px 8px; border-radius: 4px; background: #f2f3ff; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 11px; font-weight: bold;">Health Score:</span>
              <span style="font-size: 14px; font-weight: bold; color: ${strokeColor}">${p.healthScore}/100</span>
            </div>
            <div style="font-size: 11px; font-weight: bold; margin-top: 4px; color: ${strokeColor}">Status: ${p.attentionLevel} Attention</div>
            <button id="inspect-btn-${p.ulpin}" style="width: 100%; margin-top: 8px; background: #00142f; color: white; border: none; padding: 6px; font-size: 12px; font-weight: bold; border-radius: 4px; cursor: pointer;">
              Open Full Dossier →
            </button>
          </div>
        `;

        polygon.bindPopup(popupContent);

        polygon.on('popupopen', () => {
          const btn = document.getElementById(`inspect-btn-${p.ulpin}`);
          if (btn) {
            btn.onclick = () => {
              onSelectParcel(p.ulpin);
            };
          }
        });

        if (isSelected && mapInstanceRef.current) {
          polygon.openPopup();
          mapInstanceRef.current.panTo([p.coordinates.lat, p.coordinates.lng]);
        }

        polygon.addTo(layersGroupRef.current!);
      }
    });
  }, [parcels, selectedParcelUlpin, filterAttention, searchTerm, onSelectParcel]);

  return (
    <div className="bg-white border border-[#c4c6cf] rounded-xl overflow-hidden shadow-xs space-y-3">
      {/* Map Control Toolbar */}
      <div className="p-4 bg-[#f2f3ff] border-b border-[#c4c6cf] flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[18px]">🗺️</span>
            <h3 className="font-headline text-[18px] font-bold text-[#00142f]">
              {isHindi ? 'कैडस्ट्रल जीआईएस एक्सप्लोरर' : 'Unified Cadastral GIS Explorer'}
            </h3>
          </div>
          <p className="text-[12px] text-[#44474e]">
            {isHindi
              ? '120+ भूखंडों का सैटेलाइट व वैक्टर सीमा मानचित्रण। रंग स्वास्थ्य स्तर को दर्शाता है।'
              : 'Interactive vector map with 120+ synthetic parcels color-coded by Land Health.'}
          </p>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search map by survey/owner..."
            className="bg-white border border-[#c4c6cf] rounded px-2.5 py-1 text-[12px] text-[#00142f] w-44"
          />

          <div className="flex items-center bg-white border border-[#c4c6cf] rounded p-0.5 text-[11px] font-medium">
            <button
              onClick={() => setFilterAttention('all')}
              className={`px-2 py-0.5 rounded ${filterAttention === 'all' ? 'bg-[#00142f] text-white font-bold' : 'text-[#44474e]'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilterAttention('critical')}
              className={`px-2 py-0.5 rounded ${filterAttention === 'critical' ? 'bg-[#ba1a1a] text-white font-bold' : 'text-[#ba1a1a]'}`}
            >
              Critical
            </button>
            <button
              onClick={() => setFilterAttention('medium')}
              className={`px-2 py-0.5 rounded ${filterAttention === 'medium' ? 'bg-amber-600 text-white font-bold' : 'text-amber-800]'}`}
            >
              Medium
            </button>
            <button
              onClick={() => setFilterAttention('clean')}
              className={`px-2 py-0.5 rounded ${filterAttention === 'clean' ? 'bg-emerald-700 text-white font-bold' : 'text-emerald-800'}`}
            >
              Clean
            </button>
          </div>
        </div>
      </div>

      {/* Map Element Container */}
      <div className="relative">
        <div ref={mapContainerRef} className="w-full h-[520px] z-10" />

        {/* Floating Legend */}
        <div className="absolute bottom-4 right-4 z-20 bg-white/95 backdrop-blur-xs p-3 rounded-lg border border-[#c4c6cf] shadow-md text-[11px] space-y-1.5 min-w-[160px]">
          <div className="font-bold text-[#00142f] pb-1 border-b border-[#c4c6cf]">Health Legend</div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-emerald-600"></span>
            <span className="text-[#131b2e]">Clean Title (75–100)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-amber-500"></span>
            <span className="text-[#131b2e]">Medium Review (40–74)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-[#ba1a1a]"></span>
            <span className="text-[#131b2e]">Critical Attention (&lt;40)</span>
          </div>
          <div className="flex items-center gap-2 pt-1 border-t border-[#c4c6cf]/60">
            <span className="w-4 h-1 bg-[#0284c7]"></span>
            <span className="text-[#131b2e]">Nala Drainage Buffer</span>
          </div>
        </div>
      </div>
    </div>
  );
};
