import React from 'react';

const ShimmerEffect = () => (
  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
);

const CardShimmer = () => (
  <div className="w-full h-32 bg-gray-200 rounded-lg overflow-hidden relative">
    <ShimmerEffect />
  </div>
);

const ColumnShimmer = ({ isCompleted = false }) => (
  <div className="w-full max-w-sm bg-white p-4 rounded-lg shadow-md">
    <div className="h-6 bg-gray-200 rounded mb-4 relative overflow-hidden">
      <ShimmerEffect />
    </div>
    <div className="flex justify-between mb-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="w-12 h-4 bg-gray-200 rounded relative overflow-hidden">
          <ShimmerEffect />
        </div>
      ))}
    </div>
    <div className="space-y-4">
      {isCompleted ? (
        <>
          {[1, 2].map((groupIndex) => (
            <div key={groupIndex} className="bg-gray-100 p-3 rounded-lg">
              <div className="h-5 bg-gray-200 rounded mb-2 relative overflow-hidden">
                <ShimmerEffect />
              </div>
              <div className="space-y-2">
                {[1, 2].map((cardIndex) => (
                  <div key={cardIndex} className="h-8 bg-gray-200 rounded relative overflow-hidden">
                    <ShimmerEffect />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {[1, 2, 3].map((i) => (
            <CardShimmer key={i} />
          ))}
        </>
      )}
    </div>
  </div>
);

export function KanbanBoardShimmer() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className=" self-end h-6 w-40 bg-gray-200 rounded relative overflow-hidden">
        <ShimmerEffect />
      </div>
      <div className="flex flex-col md:flex-row gap-6 overflow-x-auto">
        <ColumnShimmer />
        <ColumnShimmer />
        <ColumnShimmer isCompleted={true} />
      </div>
    </div>
  );
}

