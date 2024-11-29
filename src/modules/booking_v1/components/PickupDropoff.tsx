interface PickupDropoffProps {
  tripId: number;
}
const PickupDropoff: React.FC<PickupDropoffProps> = ({ tripId }) => {
  return <div>đón trả {tripId}</div>;
};

export default PickupDropoff;
