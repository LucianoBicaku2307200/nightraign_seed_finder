"use client";
import { useState, useMemo } from "react";
import { ChevronRight } from "lucide-react";
import patternsData from "@/public/nightreign_patterns.json";
import Image from "next/image";

const PatternViewer = () => {
  const [patterns] = useState(patternsData);
  const [selectedNightlord, setSelectedNightlord] = useState("");
  const [selectedShiftingEarth, setSelectedShiftingEarth] = useState("");
  const [selectedSpawnPoint, setSelectedSpawnPoint] = useState("");
  const [selectedPattern, setSelectedPattern] = useState("");

  // Extract unique values
  const uniqueNightlords = useMemo(
    () => [...new Set(patterns.map((p) => p.nightlord))].filter(Boolean).sort(),
    [patterns]
  );

  // Get available Shifting Earth options based on selected Nightlord
  const availableShiftingEarths = useMemo(() => {
    if (!selectedNightlord) return [];
    return [
      ...new Set(
        patterns
          .filter((p) => p.nightlord === selectedNightlord)
          .map((p) => p.shifting_earth)
      ),
    ]
      .filter(Boolean)
      .sort();
  }, [patterns, selectedNightlord]);

  // Get available Spawn Points based on selected Nightlord and Shifting Earth
  const availableSpawnPoints = useMemo(() => {
    if (!selectedNightlord || !selectedShiftingEarth) return [];
    return [
      ...new Set(
        patterns
          .filter(
            (p) =>
              p.nightlord === selectedNightlord &&
              p.shifting_earth === selectedShiftingEarth
          )
          .map((p) => p.spawn_point)
      ),
    ]
      .filter(Boolean)
      .sort();
  }, [patterns, selectedNightlord, selectedShiftingEarth]);

  // Filter patterns based on selections
  const filteredPatterns = useMemo(() => {
    return patterns.filter((pattern) => {
      if (selectedNightlord && pattern.nightlord !== selectedNightlord)
        return false;
      if (
        selectedShiftingEarth &&
        pattern.shifting_earth !== selectedShiftingEarth
      )
        return false;
      if (selectedSpawnPoint && pattern.spawn_point !== selectedSpawnPoint)
        return false;
      return true;
    });
  }, [patterns, selectedNightlord, selectedShiftingEarth, selectedSpawnPoint]);

  const resetFilters = () => {
    setSelectedNightlord("");
    setSelectedShiftingEarth("");
    setSelectedSpawnPoint("");
    setSelectedPattern("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-amber-500">
            Elden Ring Nightreign
          </h1>
          <p className="text-gray-400">Pattern Database & Map Viewer</p>
        </div>

        {/* Step-by-Step Filters */}
        <div className="mb-8 space-y-6">
          {!selectedSpawnPoint && !selectedSpawnPoint && (
            <>
              {/* Step 1: Nightlord */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-gray-900 flex items-center justify-center font-bold">
                    1
                  </div>
                  <h2 className="text-xl font-semibold">Select Nightlord</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {uniqueNightlords.map((nightlord) => (
                    <button
                      key={nightlord}
                      onClick={() => {
                        setSelectedNightlord(nightlord);
                        setSelectedShiftingEarth("");
                        setSelectedSpawnPoint("");
                      }}
                      className={`px-6 py-3 rounded-lg font-medium transition flex flex-col gap-2 justify-center items-center ${
                        selectedNightlord === nightlord
                          ? "bg-amber-500 text-gray-900"
                          : "bg-gray-800 border border-gray-700 hover:border-amber-500 text-gray-100"
                      }`}
                    >
                      {nightlord}
                      <Image src={`/bosses/${nightlord.toLocaleLowerCase()}.jpg`} alt={nightlord} width={200} height={200} className="inline-block ml-2 align-middle"/>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Shifting Earth */}
              {selectedNightlord && (
                <div className="animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500 text-gray-900 flex items-center justify-center font-bold">
                      2
                    </div>
                    <h2 className="text-xl font-semibold">
                      Select Shifting Earth
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {availableShiftingEarths.map((earth) => (
                      <button
                        key={earth}
                        onClick={() => {
                          setSelectedShiftingEarth(earth);
                          setSelectedSpawnPoint("");
                        }}
                        className={`px-6 py-3 rounded-lg font-medium transition flex flex-col gap-2 justify-center items-center ${
                          selectedShiftingEarth === earth
                            ? "bg-amber-500 text-gray-900"
                            : "bg-gray-800 border border-gray-700 hover:border-amber-500 text-gray-100"
                        }`}
                      >
                        {earth}
                      </button>
                    ))}
                  </div>
                </div>
              )} 

              {/* Step 3: Spawn Point */}
              {selectedShiftingEarth && (
                <div className="animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500 text-gray-900 flex items-center justify-center font-bold">
                      3
                    </div>
                    <h2 className="text-xl font-semibold">
                      Select Spawn Point
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {availableSpawnPoints.map((point) => (
                      <button
                        key={point}
                        onClick={() => setSelectedSpawnPoint(point)}
                        className={`px-6 py-3 rounded-lg font-medium transition flex flex-col gap-2 justify-center items-center${
                          selectedSpawnPoint === point
                            ? "bg-amber-500 text-gray-900"
                            : "bg-gray-800 border border-gray-700 hover:border-amber-500 text-gray-100"
                        }`}
                      >
                        {point}
                        <Image src={`/spawnPoints/${point}.png`} alt={point} width={200} height={200} className="inline-block ml-2 align-middle"/>
                      </button>
                    ))}
                  </div>
                </div>
              )} 
            </>
          )}

          {/* Reset Button */}
          {selectedNightlord && (
            <button
              onClick={resetFilters}
              className="px-6 py-2 bg-red-900/30 border border-red-700 rounded-lg hover:bg-red-900/50 transition"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Results */}
        <div className="mb-4 text-gray-400">
          {filteredPatterns.length === patterns.length
            ? "Select filters to find patterns"
            : `Found ${filteredPatterns.length} pattern${
                filteredPatterns.length !== 1 ? "s" : ""
              }`}
        </div>

        {/* Pattern List */}
        {selectedNightlord && selectedSpawnPoint && selectedSpawnPoint && (
          <div className="space-y-4">
            {filteredPatterns.map((pattern) => (
              <div
                key={pattern.pattern_id}
                className={`bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-amber-500 transition cursor-pointer ${
                  selectedPattern === ""
                    ? "block"
                    : selectedPattern === pattern.pattern_id
                    ? "block"
                    : "hidden"
                }`}
                onClick={() => setSelectedPattern(pattern.pattern_id)}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image - 70% */}
                  <div className="md:w-[70%] aspect-video md:aspect-auto bg-gray-900 relative">
                    <img
                      src={`/patterns/${pattern.pattern_id}`}
                      alt={`Pattern ${pattern.pattern_id}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const img = e.currentTarget as HTMLImageElement;
                        img.src =
                          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect width="800" height="400" fill="%23374151"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%239CA3AF"%3EPattern ' +
                          pattern.pattern_id +
                          "%3C/text%3E%3C/svg%3E";
                      }}
                    />
                    <div className="absolute top-4 left-4 bg-black/80 px-4 py-2 rounded-lg">
                      <div className="text-xs text-gray-400">Pattern</div>
                      <div className="text-2xl font-bold text-amber-400">
                        #{pattern.pattern_id}
                      </div>
                    </div>
                  </div>

                  {/* Data - 30% */}
                  <div className="md:w-[30%] p-6 space-y-4">
                    {/* Special Event */}
                    {pattern.special_event && (
                      <div>
                        <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide">
                          Special Event
                        </div>
                        <div className="text-sm font-medium text-purple-400">
                          {pattern.special_event}
                        </div>
                      </div>
                    )}

                    {/* Castle */}
                    <div>
                      <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide">
                        Castle
                      </div>
                      <div className="text-sm font-medium">
                        {pattern.castle}
                      </div>
                    </div>

                    {/* Bosses */}
                    <div className="pt-3 border-t border-gray-700">
                      <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">
                        Boss Encounters
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="text-xs text-gray-500">Night 1</div>
                          <div className="text-sm text-red-400">
                            {pattern.night_1_boss}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Night 2</div>
                          <div className="text-sm text-red-400">
                            {pattern.night_2_boss}
                          </div>
                        </div>
                        {pattern.extra_night_boss && (
                          <div>
                            <div className="text-xs text-gray-500">
                              Extra Night
                            </div>
                            <div className="text-sm text-red-400">
                              {pattern.extra_night_boss}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Finishing Circles */}
                    <div className="pt-3 border-t border-gray-700">
                      <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">
                        Finishing Circles
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 text-amber-500" />
                          <span className="text-sm">
                            {pattern.night_1_circle}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 text-amber-500" />
                          <span className="text-sm">
                            {pattern.night_2_circle}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredPatterns.length === 0 && selectedSpawnPoint && (
          <div className="text-center py-16 text-gray-500">
            <p className="text-xl mb-2">No patterns found</p>
            <p className="text-sm">Try different filter combinations</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatternViewer;
