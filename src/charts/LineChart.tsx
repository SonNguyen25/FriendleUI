"use client"

export function LineChart() {
  const data = [3, 4, 2, 5, 3, 4, 3]
  const maxValue = 6 

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 relative">
        {[0, 1, 2, 3].map((line) => (
          <div
            key={line}
            className="absolute w-full border-t border-gray-200"
            style={{ bottom: `${(line / 3) * 100}%` }}
          ></div>
        ))}

        <div className="absolute inset-0 flex items-end justify-between">
          <svg className="absolute inset-0" viewBox={`0 0 ${data.length * 40} 100`} preserveAspectRatio="none">
            <polyline
              points={data.map((value, index) => `${index * 40 + 20}, ${100 - (value / maxValue) * 100}`).join(" ")}
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
            />
          </svg>

          {data.map((value, index) => (
            <div key={index} className="flex flex-col items-center z-10" style={{ width: `${100 / data.length}%` }}>
              <div className="w-6 bg-green-500 rounded-t-sm" style={{ height: `${(value / maxValue) * 100}%` }}></div>
              <div className="text-xs mt-1">{index + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

