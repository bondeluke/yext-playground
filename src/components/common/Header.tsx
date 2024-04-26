import type { CTA } from "@yext/types";
import { Link } from "@yext/pages-components";
import { MaybeLink } from "src/components/common/MaybeLink";

type HeaderProps = {
  links: CTA[];
  logoPath?: string;
  logoLink?: string;
};

const Header = (props: HeaderProps) => {
  const { logoPath, logoLink, links } = props;

  return (
    <header className="Header relative bg-brand-primary">
      <div className="container py-5 flex justify-between">
        {logoPath && (
          <MaybeLink
            className="Header-logoLink"
            href={logoLink}
            eventName="logo"
          >
            <div className="flex w-[120px] sm:w-[162px] mr-2">
              <img className="w-full" src={logoPath} alt="Thrivent Logo" />
            </div>
          </MaybeLink>
        )}

        <div className="flex items-center">
          <ul className="flex">
            {links.map((item: CTA) => (
              <li key={item.label}>
                <Link
                  className="Link Link--header text-white text-[14px] bg-brand-gray-400 rounded px-8 py-[10px] mx-2 lg:mx-5"
                  cta={item}
                  eventName={`${item.label}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export { Header };
