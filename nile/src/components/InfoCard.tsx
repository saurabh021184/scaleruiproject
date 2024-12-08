// components/InfoCard.tsx
interface InfoCardProps {
  title: string;
}

const InfoCard = ({ title }: InfoCardProps) => {
  return (
    <div className="bg-blue-200 p-4 rounded-lg shadow-md text-center">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="h-16 bg-white rounded-md"></div>
      <div className="h-4 bg-white rounded-md mt-2"></div>
      <div className="h-4 bg-white rounded-md mt-2"></div>
    </div>
  );
};

export default InfoCard;
