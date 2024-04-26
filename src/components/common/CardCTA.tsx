import { useAnalytics } from "@yext/pages-components";
import c from "classnames";
import { FaArrowRight } from "react-icons/fa";

interface CardCTAProps {
  url: string;
  label: string;
  primary?: boolean;
}

const CardCTA = (props: CardCTAProps) => {
  const { url, label, primary } = props;
  const analytics = useAnalytics();

  return (
    <div>
      <a
        href={url}
        className={c(
          "CardCTA p-3 my-3 border-2 border-brand-secondary font-bold text-[17px] text-center",
          { block: primary },
          { "flex items-center justify-between bg-brand-secondary": !primary }
        )}
        onClick={analytics?.trackClick("cta")}
      >
        <div className="mx-2 sm:mx-0 flex-grow pr-4 whitespace-nowrap">
          {label}
        </div>
        {!primary && <FaArrowRight className="CardCTA-arrow" />}
      </a>
    </div>
  );
};

export default CardCTA;
