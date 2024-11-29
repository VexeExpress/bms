interface PssengerListProps {
  tripId: number;
}
const PssengerList: React.FC<PssengerListProps> = ({ tripId }) => {
  return <div>danh sách hành khách {tripId}</div>;
};

export default PssengerList;
