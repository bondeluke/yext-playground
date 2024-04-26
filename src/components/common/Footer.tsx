import type { CTA, ComplexImage } from "@yext/types";
import {
  Image,
  Link,
  LexicalRichText,
  AnalyticsScopeProvider,
  useAnalytics,
} from "@yext/pages-components";
import { FooterColumn } from "src/types/entities";
import { RTF2 } from "src/types/entities";

import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import c from "classnames";

interface FooterProps {
  copyrightMessage: string;
  youtube?: string;
  linkedIn?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  footerLinks?: FooterColumn[];
  phone?: CTA;
  logoPath?: string;
  copyright?: RTF2;
  footerImage?: ComplexImage;
  cFPLogic?: boolean;
  cFPCopyright?: RTF2;
}

const Footer = (props: FooterProps) => {
  const { logoPath, copyright, footerImage, cFPLogic, cFPCopyright } = props;

  const analytics = useAnalytics();
  const socialLinks = [
    {
      name: "facebook",
      link: props.facebook,
      label: <FaFacebookF className="w-6 h-6 mr-4" />,
    },
    {
      name: "twitter",
      link: props.twitter,
      label: <FaTwitter className="w-6 h-6 mr-4" />,
    },
    {
      name: "linkedin",
      link: props.linkedIn,
      label: <FaLinkedinIn className="w-6 h-6 mr-4" />,
    },
    {
      name: "instagram",
      link: props.instagram,
      label: <AiFillInstagram className="w-6 h-6 mr-4" />,
    },
  ].filter((link) => link.link);

  const footerLinks = props.footerLinks || [];

  return (
    <footer className="Footer bg-brand-primary pt-8 pb-8 md:pt-[100px] md:pb-16">
      <div className="container">
        <div className="border-b border-brand-secondary">
          {logoPath && (
            <div className="w-fit">
              <a
                className="flex w-[144px]"
                href="https://www.thrivent.com/"
                onClick={analytics?.trackClick("logo")}
              >
                <img className="w-full" src={logoPath} alt="Thrivent logo" />
              </a>
            </div>
          )}
          <div className="flex flex-col md:flex-row justify-between py-5 md:py-14 gap-4">
            {footerLinks.map((column, i) => (
              <FooterCol
                column={column}
                social={i === 1}
                socialMobile={i === 2}
                socialLinks={socialLinks}
                phone={i === footerLinks.length - 1 ? props.phone : null}
                key={column.title}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between text-white pt-2 md:pt-[40px]">
          <div className="Footer-copyright w-full md:w-[60%] text-[12px] text-brand-gray-300 py-4 pr-4">
            <LexicalRichText serializedAST={JSON.stringify(copyright?.json)} />
            {cFPLogic && (
              <div className="Footer-cFPCopyright w-full text-[12px] text-brand-gray-300 py-4 pr-4">
                {cFPCopyright}
              </div>
            )}
          </div>

          {footerImage && (
            <div className="w-full md:w-[30%] flex flex-col md:items-end justify-start">
              <a
                className="flex w-[120px] md:w-[144px] mb-4"
                href={footerImage.clickthroughUrl}
                onClick={analytics?.trackClick("brokercheck")}
              >
                <Image image={footerImage} layout="fill" />
              </a>
              <div className="text-[12px] text-brand-gray-300">
                {footerImage.description}
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

interface FooterColumnProps {
  column: FooterColumn;
  social: boolean;
  socialMobile: boolean;
  socialLinks: { link?: string; label: JSX.Element }[];
  phone: CTA | null | undefined;
}

const FooterCol = (props: FooterColumnProps) => {
  const { column, social, socialMobile, socialLinks, phone } = props;
  const { title, footerLink, footerText } = column;
  const analytics = useAnalytics();
  return (
    <div className="flex flex-col items-start w-full pb-4">
      <div
        className={c(
          "font-bold pb-3",
          { "text-brand-secondary": footerText },
          { "text-white": !footerText }
        )}
      >
        {title}
      </div>
      {footerLink?.map((link, i) => (
        <Link
          className="Link--footer text-[14px] py-1 text-brand-gray-300"
          key={i}
          cta={link}
          eventName="link"
        />
      ))}

      {footerText && (
        <div className="text-sm text-brand-gray-300 whitespace-break-spaces">
          {footerText}
        </div>
      )}
      {social && <SocialLinks links={socialLinks} mobile={false} />}
      {socialMobile && <SocialLinks links={socialLinks} mobile={true} />}
      {phone && (
        <>
          <a
            className="block md:hidden Link--footer font-extrabold mt-4 text-[14px]"
            href={`tel:${phone.link}`}
            onClick={analytics?.trackClick("link")}
          >
            {phone.label}
          </a>
          <div className="hidden md:block Link--footer font-extrabold mt-4 text-[14px]">
            {phone.label}
          </div>
        </>
      )}
    </div>
  );
};

interface SocialLinksProps {
  links: { name?: string; link?: string; label: JSX.Element }[];
  mobile?: boolean;
}

const SocialLinks = (props: SocialLinksProps) => {
  const { links, mobile } = props;
  return (
    <AnalyticsScopeProvider name={"social"}>
      <div
        className={c(
          { "block md:hidden": mobile },
          { "hidden md:block": !mobile }
        )}
      >
        <div className="font-extrabold text-white my-2">Follow Us</div>
        <div className="my-4 md:my-0 flex flex-row items-center justify-center md:justify-end">
          {links.map((socialLink, i) =>
            socialLink.link ? (
              <Link
                className="Link--footer"
                key={i}
                href={socialLink.link}
                eventName={`${socialLink.name}`}
              >
                {socialLink.label}
                <div className="hidden">{socialLink.label} Link</div>
              </Link>
            ) : null
          )}
        </div>
      </div>
    </AnalyticsScopeProvider>
  );
};

export { Footer };
