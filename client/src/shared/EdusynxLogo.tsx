// client/src/shared/edusynx-logo.tsx
import * as React from "react";
import { Link } from "react-router-dom";

interface EduSynxLogoProps {
  href?: string;
  className?: string;
}

const EduSynxLogo: React.FC<EduSynxLogoProps> = ({
  href = "/",
  className = "",
}) => {
  return (
    <Link to={href} className={`text-[1rem] ml-4 font-bold text-teal-400 ${className}`}>
      Edu<span className="text-secondary">synx</span>
    </Link>
  );
};

export default EduSynxLogo;
