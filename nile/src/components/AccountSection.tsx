// components/AccountSection.tsx
import InfoCard from "./InfoCard";

const AccountSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <InfoCard title="Order History" />
      <InfoCard title="Reviews" />
      <InfoCard title="Your Address" />
    </div>
  );
};

export default AccountSection;
