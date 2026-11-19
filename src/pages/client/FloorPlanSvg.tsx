export function FloorPlanSvg() {
  return (
    <svg
      width={420}
      height={540}
      viewBox="0 0 420 540"
      className="rounded-sm border border-border bg-[#fafaf8] shadow-sm"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="420" height="540" fill="#fafaf8" />
      <rect x="20" y="20" width="380" height="500" fill="none" stroke="#888" strokeWidth="1" />
      <text x="210" y="14" textAnchor="middle" fontSize="9" fill="#aaa" fontFamily="DM Sans, sans-serif">
        VERMA VILLA · GROUND FLOOR PLAN · SCALE 1:100
      </text>
      <rect x="30" y="30" width="160" height="115" fill="none" stroke="#555" strokeWidth="1.5" />
      <text x="110" y="91" textAnchor="middle" fontSize="9" fill="#555" fontFamily="DM Sans, sans-serif">
        LIVING ROOM
      </text>
      <text x="110" y="103" textAnchor="middle" fontSize="8" fill="#999" fontFamily="DM Sans, sans-serif">
        5.2m × 4.6m
      </text>
      <rect x="190" y="30" width="100" height="115" fill="none" stroke="#555" strokeWidth="1.5" />
      <text x="240" y="91" textAnchor="middle" fontSize="9" fill="#555" fontFamily="DM Sans, sans-serif">
        DINING
      </text>
      <rect x="290" y="30" width="110" height="115" fill="none" stroke="#555" strokeWidth="1.5" />
      <text x="345" y="84" textAnchor="middle" fontSize="9" fill="#555" fontFamily="DM Sans, sans-serif">
        KITCHEN
      </text>
      <text x="345" y="96" textAnchor="middle" fontSize="8" fill="#999" fontFamily="DM Sans, sans-serif">
        (OPEN PLAN)
      </text>
      <line x1="190" y1="30" x2="190" y2="145" stroke="#777" strokeWidth="1" strokeDasharray="4,3" />
      <rect x="30" y="145" width="165" height="100" fill="none" stroke="#555" strokeWidth="1.5" />
      <text x="112" y="198" textAnchor="middle" fontSize="9" fill="#555" fontFamily="DM Sans, sans-serif">
        MASTER BEDROOM
      </text>
      <rect x="195" y="145" width="95" height="100" fill="none" stroke="#555" strokeWidth="1.5" />
      <text x="242" y="198" textAnchor="middle" fontSize="9" fill="#555" fontFamily="DM Sans, sans-serif">
        BEDROOM 2
      </text>
      <rect x="290" y="145" width="110" height="100" fill="none" stroke="#555" strokeWidth="1.5" />
      <text x="345" y="198" textAnchor="middle" fontSize="9" fill="#555" fontFamily="DM Sans, sans-serif">
        BEDROOM 3
      </text>
      <rect x="30" y="245" width="62" height="58" fill="none" stroke="#555" strokeWidth="1" />
      <text x="61" y="277" textAnchor="middle" fontSize="8" fill="#666" fontFamily="DM Sans, sans-serif">
        TOILET 1
      </text>
      <rect x="216" y="245" width="88" height="58" fill="#f4f2ee" stroke="#555" strokeWidth="1" />
      <text x="260" y="277" textAnchor="middle" fontSize="8" fill="#666" fontFamily="DM Sans, sans-serif">
        PASSAGE
      </text>
      <rect x="30" y="303" width="370" height="96" fill="none" stroke="#555" strokeWidth="1.5" />
      <text x="215" y="355" textAnchor="middle" fontSize="9" fill="#555" fontFamily="DM Sans, sans-serif">
        GARAGE / COVERED PARKING
      </text>
      <rect x="30" y="399" width="180" height="111" fill="#f0ede7" stroke="#555" strokeWidth="1.5" />
      <text x="120" y="458" textAnchor="middle" fontSize="9" fill="#555" fontFamily="DM Sans, sans-serif">
        GARDEN / OPEN AREA
      </text>
      <rect x="210" y="399" width="190" height="111" fill="none" stroke="#555" strokeWidth="1.5" />
      <text x="305" y="458" textAnchor="middle" fontSize="9" fill="#555" fontFamily="DM Sans, sans-serif">
        PATIO / TERRACE
      </text>
    </svg>
  );
}
