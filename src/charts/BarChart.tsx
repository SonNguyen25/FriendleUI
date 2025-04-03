"use client"

export function BarChart() {
  const data = [80, 65, 90, 75, 85, 95, 70, 60, 80, 85, 90, 75]

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 relative">
        {[0, 25, 50, 75, 100].map((line) => (
          <div key={line} className="absolute w-full border-t border-gray-200" style={{ bottom: `${line}%` }}></div>
        ))}

        <div className="absolute inset-0 flex items-end justify-between">
          <svg className="absolute inset-0" viewBox={`0 0 ${data.length * 20} 100`} preserveAspectRatio="none">
            <polyline
              points={data.map((value, index) => `${index * 20 + 10}, ${100 - value}`).join(" ")}
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
            />
          </svg>

          {data.map((value, index) => (
            <div key={index} className="flex flex-col items-center z-10" style={{ width: `${100 / data.length}%` }}>
              <div className="w-4 bg-green-500 rounded-t-sm" style={{ height: `${value}%` }}></div>
              <div className="text-[10px] mt-1">{index + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

