import CardCTA from "src/components/common/CardCTA";

interface BannerProps {
  text: string;
  url: string;
}

const Banner = (props: BannerProps) => {
  const { text, url } = props;

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-brand-primary mx-4 lg:m-auto lg:w-[800px] px-8 py-4 my-6 lg:my-6">
      <div className="text-white text-[14px] sm:text-[18px] sm:pr-[30px]">
        {text}
      </div>
      <CardCTA url={url} label="Get In Touch" />
    </div>
  );
};

export default Banner;
