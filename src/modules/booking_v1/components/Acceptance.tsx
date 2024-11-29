interface AcceptanceProps {
  tripId: number;
}
const Acceptance: React.FC<AcceptanceProps> = ({ tripId }) => {
  return <div>nghiệm thu {tripId}</div>;
};

export default Acceptance;
