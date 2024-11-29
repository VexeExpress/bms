interface CargoProps {
  tripId: number;
}
const Cargo: React.FC<CargoProps> = ({ tripId }) => {
  return <div>hàng hóa {tripId}</div>;
};

export default Cargo;
