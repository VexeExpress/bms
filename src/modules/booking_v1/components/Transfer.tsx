interface TransferProps {
    tripId: number;
}
const Transfer: React.FC<TransferProps> = ({ tripId }) => {
    return <div>trung chuyển {tripId}</div>;
  };
  
  export default Transfer;