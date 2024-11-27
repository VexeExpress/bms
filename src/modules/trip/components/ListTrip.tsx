const trips = [
  { id: 1, name: "Trip 1", description: "Description for Trip 1" },
  { id: 2, name: "Trip 2", description: "Description for Trip 2" },
  { id: 3, name: "Trip 3", description: "Description for Trip 3" },
  { id: 1, name: "Trip 1", description: "Description for Trip 1" },
  { id: 2, name: "Trip 2", description: "Description for Trip 2" },
  { id: 3, name: "Trip 3", description: "Description for Trip 3" },
  { id: 1, name: "Trip 1", description: "Description for Trip 1" },
  { id: 2, name: "Trip 2", description: "Description for Trip 2" },
  { id: 3, name: "Trip 3", description: "Description for Trip 3" },
  { id: 1, name: "Trip 1", description: "Description for Trip 1" },
  { id: 2, name: "Trip 2", description: "Description for Trip 2" },
];
import t from "../style/ListTrip.module.css";
export default function ListTrip() {
  return (
    <div className={t.wrapper}>
      {trips.map((trip) => (
        <div key={trip.id} className={t.item_container}>
          <div className={t.header}>
            <span className="font-rounded text-[18px] font-bold text-black">
              16:30
            </span>
            <span className="font-rounded text-[17px] font-bold text-black">
              15/36
            </span>
          </div>
          <div className={t.body}>
            <span className="text-[12px] font-semibold">
              T: Đặng Tuấn Thành
            </span>
            <span className="text-[12px] font-semibold">
              P: Đặng Tuấn Thành
            </span>
          </div>
          <div className={t.footer}>
            <span className="text-[12px]">Limousine 36 Phòng</span>
          </div>
        </div>
      ))}
    </div>
  );
}
