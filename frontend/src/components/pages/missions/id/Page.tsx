import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import Section from "../../../../UI/Section";
import { Drone } from "../../../../types/Drone";
import { Point } from "../../../../types/Point";
import { formatDate } from "../../../../utils/formatDate";
import { CustomMarkerIcon } from "../new/CustomMarkerIcon";
import { Image } from "../../../../types/Image";

interface MissionData {
  id: number;
  title: string;
  description: string;
  type: string;
  drone: Drone;
  missionPoints: Point[];
  missionImages: Image[];
  startDate: string;
  endDate: string;
}

const Page: FC = () => {
  const { id: missionId } = useParams();
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([
    54.413, 16.919,
  ]);
  const [missionData, setMissionData] = useState<MissionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // FETCH MISSION DATA
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchMissionData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/mission/${missionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);

        if (
          response.data.missionPoints &&
          response.data.missionPoints.length > 0
        ) {
          const firstPoint = response.data.missionPoints[0];
          setMapCenter([firstPoint.lat, firstPoint.lng]);
        }

        setMissionData(response.data);
      } catch (error) {
        console.error("Failed to fetch mission data", error);
        setError("Failed to fetch mission data");
      }
    };

    if (missionId) {
      fetchMissionData();
    }
  }, [missionId]);

  return (
    <Section>
      <div className="max-w-[800px] w-full flex flex-col mx-auto">
        {/* ERROR CONTAINER */}
        {error && <div className="text-red-500 mx-auto">{error}</div>}

        {missionData && (
          <>
            <div className="relative">
              {/* DATE */}
              <div className=" text-slate-500 rounded-bl rounded-tr px-2 shadow w-fit mb-[50px]">
                {formatDate(new Date(missionData.startDate))} ~{" "}
                {formatDate(new Date(missionData.endDate))}
              </div>

              {/* DRONE IMAGE */}
              {missionData.drone.imageSrc ? (
                <img
                  src={`${missionData.drone.imageSrc}`}
                  alt="Drone Image"
                  className="h-fit rounded mx-auto mt-[20px] sm:w-full sm:min-w-[200px] max-w-[300px] sm:mt-0"
                />
              ) : (
                <div className="h-fit rounded mx-auto mt-[20px] sm:w-full sm:min-w-[200px] sm:mt-0 bg-gray-200 flex items-center justify-center">
                  No Image
                </div>
              )}
              {/* DRONE NAME */}
              <div className="text-slate-600 font-bold text-lg absolute w-full text-center bottom-3 sm:bottom-0">
                {missionData.drone.name || "Unknown Drone"}
              </div>
            </div>

            {/* DETAILS */}
            <div className="p-2 flex flex-col gap-4">
              {/* MISSION CATEGORY */}
              <div className="rounded w-fit bg-slate-600 text-white px-2">
                {missionData.type}
              </div>

              {/* MISSION TITLE */}
              <div className="text-violet-900 font-bold text-lg">
                {missionData.title}
              </div>

              {/* MISSION DESCRIPTION */}
              <div className="text-slate-500 text-justify">
                {missionData.description}
              </div>

              {/* MAP WITH POINTS */}
              <div className="mx-auto text-slate-500 text-lg mt-[30px]">
                Destination Points
              </div>
              <div className="border-2 h-96 rounded">
                <MapContainer
                  center={mapCenter}
                  zoom={12.5}
                  className="rounded h-full"
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {missionData.missionPoints.map((point: Point, index) => (
                    <Marker
                      key={index}
                      position={[point.lat, point.lng]}
                      icon={CustomMarkerIcon}
                    >
                      <Popup>
                        {point.lat} {point.lng}
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>

            {/* IMAGES */}
            <div className="mx-auto text-slate-500 text-lg mt-[30px]">
              Photos Taken
            </div>
            <div className="mx-auto text-slate-500 text-lg mt-[30px] flex flex-wrap gap-4 justify-center">
              {missionData.missionImages.map((image: Image) => (
                <div className="rounded border-2 border-slate-200 shadow">
                  <img
                    className="rounded max-w-[350px]"
                    key={image.imageUrl}
                    src={image.imageUrl}
                    alt="Image taken by drone"
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Section>
  );
};

export default Page;
