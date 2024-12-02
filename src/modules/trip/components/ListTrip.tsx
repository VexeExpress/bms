import { Add } from "@mui/icons-material";
import t from "../style/ListTrip.module.css";
import { TripData } from "../types/TripData";

interface ListTripProps {
  trips: TripData[];
  selectedRoute: number;
  selectedDate: Date | null;
  onTripSelect: (trip: TripData) => void;
  onAddTrip: () => void;
}
const ListTrip: React.FC<ListTripProps> = ({
  trips,
  onTripSelect,
  selectedDate,
  onAddTrip,
}) => {
  const sortedTrips = trips.sort((a, b) =>
    a.timeDeparture.localeCompare(b.timeDeparture),
  );

  return (
    <div className="px-1">
      <div className={t.wrapper}>
        {sortedTrips.map((trip) => (
          <div
            key={trip.id}
            className={t.item_container}
            onClick={() => onTripSelect(trip)}
          >
            <div className={t.header}>
              <span className="font-rounded text-[18px] font-semibold text-black">
                {trip.timeDeparture.substring(0, 5)}
              </span>
              <span className="font-rounded text-[17px] font-semibold text-black">
                15/36
              </span>
            </div>
            <div className={t.body}>
              <span className="text-[12px] font-semibold text-black">
                T:{" "}
                {Array.isArray(trip?.drivers) && trip.drivers.length > 0
                  ? trip.drivers.join(", ")
                  : "N/A"}
              </span>
              <span className="text-[12px] font-semibold text-black">
                P:{" "}
                {trip.assistant ? trip.assistant.join(", ") : "No assistants"}
              </span>
            </div>
            <div className={t.footer}>
              <span className="text-[12px] text-black">
                {trip.seatingChartName}
              </span>
            </div>
          </div>
        ))}
        {selectedDate && (
          <button className={t.item_add} onClick={onAddTrip}>
            <Add />
          </button>
        )}
      </div>
    </div>
  );
};
export default ListTrip;
