import React from "react";

interface MissionTypesProps {
  missionTypes: string[];
  selectedMissionType: string;
  onMissionTypeChange: (missionType: string) => void;
}

const MissionTypes = ({
  missionTypes,
  selectedMissionType,
  onMissionTypeChange,
}: MissionTypesProps) => {
  return (
    <div className="flex flex-col">
      <div className="mx-auto text-slate-500">Choose Mission Type</div>
      <ul className="flex flex-wrap gap-2 justify-center">
        {missionTypes.map((missionType: string) => (
          <li
            key={missionType}
            className={
              "mission-type " +
              (selectedMissionType === missionType
                ? "bg-slate-200 duration-300"
                : "")
            }
          >
            <button
              type="button"
              onClick={() => {
                onMissionTypeChange(missionType);
              }}
            >
              {missionType}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MissionTypes;
