import type { CardProps } from "@yext/search-ui-react";
import classNames from "classnames";
import { LocationProfile } from "src/types/entities";
import { useTemplateData } from "src/common/useTemplateData";
import { Image, Link } from "@yext/pages-components";
import { formatPhone } from "src/common/helpers";
import { Address } from "@yext/pages-components";
import CardCTA from "src/components/common/CardCTA";
export interface LocatorCardProps {
  useKilometers?: boolean;
  cFPFooter?: any;
  updateModalState?: (open: boolean, title: string, content: string) => void;
}

const LocatorCard = (props: LocatorCardProps & CardProps<LocationProfile>) => {
  const { result, updateModalState } = props;
  const { rawData } = result;
  const {
    address,
    c_title,
    photoGallery,
    c_fPName,
    c_virtualAgent,
    c_designations,
    mainPhone,
    c_cTALocator1,
    c_cTALocator2,
    c_baseURL,
    c_contactURL,
    name,
  } = rawData;

  const { document } = useTemplateData();
  const teaserImage =
    photoGallery?.[0]?.image || document._site.c_placeholderPhoto;

  const footerCFPCopyright = props.cFPFooter.cFPFooter;

  if (c_designations?.includes("CFP®")) {
    footerCFPCopyright.style.display = "flex";
  }

  return (
    <div className="LocatorCard flex-col md:flex-row flex border border-brand-secondary lg:border-brand-gray-500 h-full w-full min-h-[200px]">
      <div>lol</div>
      <div className="hidden md:flex border-r sm:border-r-0 md:border-r border-brand-secondary lg:border-brand-gray-500 w-1/3 lg:max-w-[150px] items-center">
        <div className="flex justify-center border border-brand-secondary lg:border-0 md:min-w-[150px] md:w-[150px] pr-[1px]">
          <Image layout="fill" image={teaserImage} />
        </div>
      </div>

      <div className="pb-0 p-4 md:p-4 h-full md:w-2/3 md:max-w-[335px] mt-5 md:mt-0">
        <div className="flex flex-row md:block w-fit">
          <div className="flex md:hidden mr-4 border border-brand-secondary items-center">
            <div className="flex justify-center min-w-[80px] max-w-[80px]">
              <Image layout="fill" image={teaserImage} />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">
              <div className="Heading--teaser">
                {(c_fPName ? c_fPName : name).replaceAll(" - Thrivent", "")}
              </div>
            </h3>

            {c_designations && (
              <div className="mr-2 text-brand-dark-gold text-[14px] md:text-[18px]">
                {c_designations.map((designation, i) => {
                  const name =
                    abbrToDesignationMap[designation]?.name ?? designation;
                  const description =
                    abbrToDesignationMap[designation]?.description ?? "";
                  return (
                    <button
                      className="hover:underline pr-1"
                      key={designation}
                      onClick={() => {
                        updateModalState?.(true, name, description);
                      }}
                    >
                      {designation}
                      {i < c_designations.length - 1 && ", "}
                    </button>
                  );
                })}
              </div>
            )}

            {c_title && (
              <div className="mb-2 text-[14px] uppercase text-brand-dark-gold font-extrabold">
                {c_title}
              </div>
            )}

            {mainPhone && (
              <>
                <div className="hidden md:block text-[18px]">
                  {formatPhone(mainPhone, "US")}
                </div>
                <Link
                  className="md:hidden text-brand-blue underline hover:no-underline"
                  href={`tel:${mainPhone}`}
                >
                  {formatPhone(mainPhone, "US")}
                </Link>
              </>
            )}
          </div>
        </div>

        {address && !c_virtualAgent && (
          <div className="text-[18px] pt-2 md:pb-2 w-fit">
            <Address
              address={address}
              lines={[
                ["line1"],
                ["line2"],
                ["city", ",", "region", "postalCode"],
              ]}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between w-fit md:w-[40%] md:mt-auto">
        <TeaserDistance
          {...props}
          className="hidden md:block self-end bg-gray-100 pt-[50px] pb-[10px] px-[18px]"
        />
        <div className="flex px-2 gap-4 md:block">
          {c_cTALocator1 && c_baseURL && (
            <CardCTA url={c_baseURL} label={c_cTALocator1} primary={true} />
          )}

          {c_cTALocator2 && c_contactURL && (
            <CardCTA url={c_contactURL} label={c_cTALocator2} primary={false} />
          )}
        </div>
      </div>
    </div>
  );
};

const TeaserDistance = (
  props: LocatorCardProps & CardProps<LocationProfile> & { className?: string }
) => {
  const { className, result, useKilometers = false } = props;
  const { distanceFromFilter } = result;

  if (!distanceFromFilter) {
    return null;
  }

  return (
    <div className={classNames("whitespace-nowrap text-[14px]", className)}>
      {`${getDistance(distanceFromFilter, useKilometers)} ${
        useKilometers ? "km" : "mi"
      }`}
    </div>
  );
};

// Convert meters to miles or kilometers.
function getDistance(distance: number, useKilometers: boolean) {
  if (useKilometers) {
    return (distance / 1000).toFixed(2);
  }
  return (distance / 1609.344).toFixed(2);
}

export const DefaultLocatorCard = () => {
  const { document } = useTemplateData();
  const { photo, name, title, phone, cTA1, cTA2 } =
    document._site.c_defaultResultCard;

  return (
    <div className="ResultList-item ResultList-default">
      <div className="LocatorCard flex-col md:flex-row flex border border-brand-secondary lg:border-black h-full w-full min-h-[200px]">
        {photo && (
          <div className="hidden md:flex border-r sm:border-r-0 md:border-r border-brand-secondary lg:border-brand-gray-500 w-1/3 lg:max-w-[150px] items-center">
            <div className="flex justify-center border border-brand-secondary lg:border-0 md:min-w-[150px] md:w-[150px] pr-[1px]">
              <Image layout="fill" image={photo} />
            </div>
          </div>
        )}

        <div className="pb-0 p-4 w-fit md:p-4 h-full 4 md:w-2/3 md:max-w-[335px]">
          <div className="flex flex-row md:block w-fit">
            {photo && (
              <div className="flex md:hidden mr-4 border border-brand-secondary items-center">
                <div className="flex justify-center min-w-[63px] max-w-[63px]">
                  <Image layout="fill" image={photo} />
                </div>
              </div>
            )}
            <div>
              <h3 className="text-lg font-medium md:mb-1">
                <div className="Heading--teaser">{name}</div>
              </h3>

              {title && (
                <div className="mb-2 text-[14px] uppercase text-brand-dark-gold font-extrabold">
                  {title}
                </div>
              )}

              {phone && (
                <>
                  <div className="hidden md:block text-[18px]">
                    {phone.label}
                  </div>
                  <Link
                    className="md:hidden text-brand-blue underline hover:no-underline"
                    href={`tel:${phone.link}`}
                  >
                    {phone.label}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-end gap-4 w-fit md:w-[40%]">
          <div className="flex gap-4  m-2 md:block">
            <div></div>
            {cTA1 && (
              <CardCTA url={cTA1.link} label={cTA1.label} primary={true} />
            )}

            {cTA2 && (
              <CardCTA url={cTA2.link} label={cTA2.label} primary={false} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface DesignationInfo {
  [designation: string]: { name: string; description: string };
}

const abbrToDesignationMap: DesignationInfo = {
  "AAMS®": {
    name: "Accredited Asset Management SpecialistSM",
    description:
      "Designation awarded by the College for Financial Planning. The program offers fundamental financial knowledge with additional focus on asset management. Topics include asset selection and allocation, investment strategies, taxation, ethics, and regulatory issues for financial professionals. To receive the AAMS® designation, candidates must successfully complete the AAMS® education program, pass a final exam, and complete continuation requirements every two years.",
  },
  "ADPA®": {
    name: "Accredited Domestic Partnership AdvisorSM",
    description:
      "Designation granted by the College for Financial Planning. The ADPA® or Accredited Domestic Partnership AdvisorSM prepares financial professionals to address the unique planning needs specific to unmarried, coupled persons. Topics include wealth transfer, federal taxation issues, retirement planning, and planning for financial, medical, and end-of-life needs of domestic partners. To receive the ADPA® designation, candidates must successfully complete the ADPA® education program and pass the final exam. Continuing education requirements to maintain the designation must be satisfied every two years.",
  },
  "AEP®": {
    name: "Accredited Estate Planner®",
    description:
      "Designation granted by the National Association of Estate Planners and Councils (NAEPC). The AEP® designation is a graduate-level designation specializing in estate planning and recognizes estate planning professionals who meet stringent requirements of experience, knowledge, education, professional reputation, and character. To receive the AEP® designation, candidates must successfully complete the AEP® education program, pass the final exam, meet ethics standards and have a minimum of five years of experience in estate planning and hold one or more of the following professional credentials: JD (active law license required), CPA, CLU®, CFP®, ChFC®, CPWA®, CFA, CAP®, and MSFS. Continuing education requirements to maintain the AEP® designation must be satisfied every two years.",
  },
  "AFC®": {
    name: "Accredited Financial Counselor®",
    description:
      "Designation granted by the Association for Financial Counseling and Planning Education. The AFC® designation is designed to help financial professionals work with clients in a financial counseling or education setting to assess and improve their financial decision making. Topics covered include retirement and estate planning, credit card and debt management, budgeting, consumer debt, personal/marital property, valuing/dividing property, retirement assets and pensions and more. To receive the AFC® designation, candidates must successfully complete the required courses, pass the final exam, complete 1,000 hours of financial counseling and submit three letters of reference attesting to professional competence. Once the designation has been awarded, holders must complete 30 hours of approved continuing education every two years in order to maintain their credentials.",
  },
  "APMA™": {
    name: "Accredited Portfolio Management Advisor™",
    description:
      "Designation granted by the College for Financial Planning. The Accredited Portfolio Management Advisor™, or APMA™ program educates professionals on the finer points of portfolio creation, augmentation, and maintenance. Coursework includes hands-on practice analyzing investment policy statements, building portfolios, and making asset allocation decisions. To receive the APMA™ designation, candidates must successfully complete a graduate level course and pass a final exam. Continuing education requirements to maintain the APMA™ designation must be satisfied every two years.",
  },
  "BFA™": {
    name: "Behavioral Financial Advisor™",
    description:
      "Certification granted by think2 perform. The BFA™ program provides training to demonstrate how traditional finance practices are influenced by psychology and neuroscience to help financial professionals mentor and coach clients in their financial decisions, transition to advice-based fees, and offer a holistic approach to strengthen the advisor-client relationship. To receive the BFA™ certification, candidates must successfully complete the BFA™ education program and pass the final exam. Continuing education requirements to maintain the BFA™ designation must be satisfied every two years.",
  },
  "CAP®": {
    name: "Chartered Advisor in Philanthropy®",
    description:
      "Designation granted by The American College of Financial Services. The CAP® provides the knowledge and tools needed to help clients articulate and advance their highest aspirations for self, family, and society when considering philanthropic planning and giving. Courses provide an insight into the philanthropic planning process, including, but not limited to, tax, tools, and techniques. To receive the CAP® designation, candidates must successfully complete three graduate level courses, meet experience requirements and ethics standards. Continuing education requirements to maintain the CAP® designation must be satisfied every two years.",
  },
  "CASL®": {
    name: "Chartered Advisor for Senior Living®",
    description:
      "Designation granted by The American College of Financial Services®. The CASL® program is a rigorous credential showing a commitment to helping aging clients achieve financial security now and into the future assisting them with the management, preservation, and transfer of wealth. To receive the CASL® designation, candidates must successfully complete the CASL® education program, meet experience requirements and ethics standards. The CASL® designation has been sunset and is no longer available for enrollment. Continuing education requirements to maintain the CASL® designation must be satisfied every two years.",
  },
  "CCPS®": {
    name: "Certified College Planning Specialist™",
    description:
      "Designation granted by the National Institute of Certified College Planners (NICCP). CCPS® focuses on the accumulation and distribution phases of college financial planning. The Certified College Planning Specialist™ (CCPS®) designation is recognized by both the Certified Financial Planner (CFP®) board and Certified Public Accountant (CPA) board. Topics include financial aid overview, Section 529 qualified tuition programs, Roth and traditional IRAs, and advanced college funding strategies. To receive the CCPS® designation, candidates must meet one of the following prequalifying criteria: professional financial licensing (securities, insurance, or state licensing), professional designation (CFP, ChFC, CLU, CPA, etc.), or a combination of education and experience deemed satisfactory by the NICCP Advisory Council. Continuing education requirements to maintain the CCPS® designation must be satisfied every year.",
  },
  "CDFA®": {
    name: "Certified Divorce Financial Analyst®",
    description:
      "Designation granted by the Institute for Divorce Financial Analysts®. The CDFA® program is designed to provide financial professionals with specific knowledge on the financial aspects of divorce. Topics covered include separate/marital property, retirement plans and pensions, spousal and child support fundamentals, related tax issues, and more. To receive the CDFA® designation, candidates must successfully complete the CDFA® education program and meet experience requirements. Continuing education requirements to maintain the CDFA® designation must be satisfied every two years.",
  },
  CEPA: {
    name: "Certified Exit Planning Advisor",
    description:
      "Certification granted by the Exit Planning Institute. Certificants complete a five-day education program designed to provide financial professionals with strategic tools to help advance exit planning practices and services into business, personal and financial goals of the business owner. Topics include the need for exit planning, financial planning for business owners, valuation, creating action plans, third party sales, family transitions, adopting a successful selling process and more. To receive the CEPA certificate, candidates must successfully complete the CEPA education program, pass the final exam and meet experience requirements. Continuing education requirements to maintain the CEPA designation must be satisfied every three years.",
  },
  "CFA®": {
    name: "Chartered Financial Analyst®",
    description:
      "Designation granted by the CFA Institute. The CFA® program provides the highest distinction in the investment management profession with a strong foundation in advanced investment, analysis, and real-world portfolio management skills. Topics covered include economics, quantitative methods, financial reporting and analysis, portfolio management, wealth planning, equity investments, fixed income and more. To receive the CFA® designation, candidates must successfully complete the graduate level education, pass the course exams, meet experience requirements and ethics standards. There are no required continuing education requirements to maintain this designation.",
  },
  CFFM: {
    name: "Certified Fraternal Field Manager",
    description:
      "Designation granted by Kinder Brothers International. By completing the CFFM education program, the financial professional gains specialized knowledge in the areas of selection, training, recruiting, maintaining, and supervising field force agents and agencies. Completion of the education is recognized by The American College allowing for credit toward the Chartered Leadership Fellow designation. There are no required continuing education requirements to maintain this designation.",
  },
  "CFP®": {
    name: "CERTIFIED FINANCIAL PLANNER™",
    description:
      "Designation granted by the Certified Financial Planner Board of Standards, Inc. (CFP Board). The CFP® designation is a professional certification for financial professionals who have completed extensive training and experience requirements and are held to rigorous ethical standards. These financial planning topics include general principles of finance, insurance, employee benefits, investments and securities, state and federal income taxes, retirement, and estate and asset protection. To receive the CFP® designation, candidates must successfully complete the CFP® education program, pass the final exam, meet experience requirements and ethics standards. Continuing education requirements to maintain the CFP® designation must be satisfied every two years. Certified Financial Planner Board of Standards, Inc. (CFP Board) owns the CFP® certification mark, the CERTIFIED FINANCIAL PLANNER™ certification mark, and the CFP® certification mark (with plaque design) logo in the United States, which it authorizes use of by individuals who successfully complete CFP Board's initial and ongoing certification requirements.",
  },
  "ChFC®": {
    name: "Chartered Financial Consultant®",
    description:
      "Designation granted by The American College of Financial Services. The ChFC® designation provides education covering the essentials of financial planning, including insurance, income taxation, retirement planning, investments and estate planning. It also addresses areas such as behavioral finance, financial planning for families with special needs dependents, small business planning, financial planning for clients in the LGBT community, financial planning for divorce, and more. To receive the ChFC® designation, candidates must successfully complete the ChFC® education program, pass course exams, meet experience requirements and ethics standards. Continuing education requirements to maintain the ChFC® designation must be satisfied every two years.",
  },
  "ChSNC®": {
    name: "Chartered Special Needs Consultant®",
    description:
      "Designation granted by The American College of Financial Services. The ChSNC® is the only credential on the market designed to provide special needs families with a financial professional competent to address their unique concerns. Families and caregivers of persons with special needs require the support of a financial professional who is well versed in such unique issues as special education, family dynamics, language considerations, disability law, special needs trusts, life insurance, government benefits, The ABLE Act, retirement planning for three people and estate planning. To receive the ChSNC® designation, candidates must successfully complete the ChSNC® education program, pass the course exams, meet experience requirements and ethics standards. Continuing education requirements to maintain the ChSNC® designation must be satisfied every two years.",
  },
  "CIMA®": {
    name: "Certified Investment Management Analyst®",
    description:
      "Designation granted by Investment & Wealth Institute®. CIMA® is the premier technical portfolio construction program for investment consultants, analysts, financial professionals and wealth management professionals. Topics include statistics and methods, applied finance and economic, investments, portfolio theory and behavioral finance, risk and return, and Portfolio Construction and Consulting Process. To receive the CIMA® designation, candidates must successfully complete the CIMA® education program, pass the comprehensive exam, meet experience requirements and ethics standards. Continuing education requirements to maintain the CIMA® designation must be satisfied every two years.",
  },
  "CIPM®": {
    name: "Certificate in Investments Performance Measurement™",
    description:
      "Certification granted by the CFA Institute. The CIPM® credential develops skills in effective investment performance and risk evaluation, manager selection and investment reports grounded in accountability. Topics include performance measurement, attribution and appraisal, manager selection and ethical standards. To receive the CIPM® certificate, candidates must successfully complete the CIPM® education program, pass the course exams, meet experience requirements and ethics standards. Continuing education requirements to maintain the CIPM® designation must be satisfied every year.",
  },
  "CKA®": {
    name: "Certified Kingdom Advisor®",
    description:
      "Designation granted by Kingdom Advisors. The CKA® designation offers training for the financial professional to confidently integrate technical expertise and biblically wise counsel with their clients. With this certification, financial professionals can elevate their practice to a higher level of expertise and understanding, as well as offer their clients peace of mind and purpose in stewarding their wealth. To receive the CKA® designation, candidates must complete the Kingdom Advisors' Core Training, pass the final exam, assert their belief in Jesus Christ, commit to incorporating biblical wisdom into their financial advice and provide evidence of their technical competence. Continuing education requirements to maintain the CKA® certification must be satisfied every year.",
  },
  "CLF®": {
    name: "Chartered Leadership Fellow®",
    description:
      "Designation granted by The American College of Financial Services. The CLF® provides financial professionals with the knowledge and tools needed to achieve key organizational goals, such as recruitment and retention, setting performance standards, and developing business plans. Topics include leadership development, interpersonal relationships, problem solving, human resource management, employee recruitment, and current issues within the insurance and financial services profession. To receive the CLF® designation, candidates must successfully complete the CLF® education program, pass the course exams, meet experience requirements and ethics standards. Continuing education requirements to maintain the CLF® designation must be satisfied every two years.",
  },
  "CLTC®": {
    name: "Certification in Long-Term Care",
    description:
      "Certification granted by The CLTC Board of Standards, Inc. The CLTC® focuses on the discipline of extended care planning. It provides professionals the critical tools necessary to discuss the subject of longevity and its consequences on their client's family and finances. Topics include planning for a life-changing event, extended care, funding, long-term care insurance and policy language and coverage. To receive the CLTC® certification, candidates must successfully complete the CLTC® education program and pass the exam. Continuing education requirements to maintain the CLTC® certification must be satisfied every two years.",
  },
  "CLU®": {
    name: "Chartered Life Underwriter®",
    description:
      "Designation granted by The American College of Financial Services. The CLU® program serves the diverse needs of individuals and business clients through in-depth insurance knowledge. Upon completion, financial professionals have the knowledge to provide guidance to clients on types and amounts of life insurance, make recommendations on aspects of risk management and various insurance solutions. Topics include fundamentals of financial planning, life insurance, life insurance law, estate planning and planning for business owners. To receive the CLU® designation, candidates must successfully complete the CLU® education program, pass the course exams, meet experience requirements and ethics standards. Continuing education requirements to maintain the CLU® designation must be satisfied every two years.",
  },
  CPA: {
    name: "Certified Public Accountant",
    description:
      'Credential awarded by the State Accountancy Board. The CPA license allows individuals to provide accounting services to the public. To earn a CPA license, candidates must successfully meet state education and experience requirements and pass the Uniform Certified Public Accountant Examination. Continuing professional education (CPE) is also required to maintain licensure. Individuals who have been awarded the CPA but have lapsed in the fulfillment of the required CPE or who have requested conversion to inactive status are, in some states, permitted to use the designation "CPA Inactive" or an equivalent phrase. Your financial professional is not a practicing CPA and cannot provide tax or accounting advice or services. Thrivent and its affiliates are not CPA firms.',
  },
  "CPM®": {
    name: "Certified Portfolio Manager",
    description:
      "Certification granted by SS&C Learning Institute. The CPM® credential program establishes specialized areas of expertise in discretionary portfolio management, immersing candidates in asset valuation, portfolio construction and risk management. Topics covered include portfolio management, quantitative methods, financial statement analysis, fixed income analysis, equity analysis, corporate finance, fiduciary responsibility and derivatives. To receive the CPM® certification, candidates must meet minimum education requirements, successfully complete the CPM® education program, pass the final exam, meet experience requirements and ethics standards. Continuing education requirements to maintain the CPM® designation must be satisfied every year.",
  },
  "CPWA®": {
    name: "Certified Private Wealth Advisor®",
    description:
      "Certification granted by Investments & Wealth Institute®. CPWA® is an advanced education and certification program for financial professionals who seek to work with high-net-worth clients on the life-cycle of wealth: accumulation, preservation and distribution. Topics covered include ethics, behavioral finance, tax strategies and planning, portfolio and risk management, retirement planning, estate planning and wealth transfer, and charitable giving. To receive the CPWA® certification, candidates must meet minimum education requirements, successfully complete the CPWA® education program, pass the final exam, meet experience requirements and ethics standards. Continuing education requirements to maintain the CPWA® designation must be satisfied every two years.",
  },
  "CRPC®": {
    name: "Chartered Retirement Planning CounselorSM",
    description:
      "Designation granted by The College for Financial Planning®, a Kaplan Company. The CRPC® designation provides the education to help financial professional who are facing complex retirement planning questions as aging baby boomers look for investments to meet their lifestyle needs in 10 years, 20 years, and beyond, as well as determining when they can retire. Topics include the entire retirement planning process, including meeting multiple financial objectives, sources of retirement income, personal savings, employer-sponsored retirement plans, income taxes, retirement cash flow, asset management, estate planning and more. To receive the CRPC® designation, candidates must successfully complete the CRPC® education program and pass the course exam. Continuing education requirements to maintain the CRPC® designation must be satisfied every two years.",
  },
  "CRPS®": {
    name: "Chartered Retirement Plans SpecialistSM",
    description:
      "Designation granted by The College for Financial Planning®, a Kaplan Company. The CRPS® is a credential for those who create, implement and maintain retirement plans for businesses. Topics include types and characteristics of retirement plans, including IRAs, small business retirement plans, defined contribution plans, nonprofit plans, 401(k) and 403(b) plans, and government plans. It also covers plan distributions, plan design and implementation, plan establishment and operation, and fiduciary issues. To receive the CRPS® designation, candidates must successfully complete the CRPS® education program and pass the course exam. Continuing education requirements to maintain the CRPS® designation must be satisfied every two years.",
  },
  "CSRIC®": {
    name: "Chartered SRI CounselorSM",
    description:
      "Designation granted by The College for Financial Planning®, a Kaplan Company. The Chartered SRI CounselorSM (CSRIC®) is a unique program for financial professionals that provides a blend of foundational knowledge and scenario learning to work with sustainable, responsible, and impact (SRI) investments for a variety of clients. Topics covered include foundations and history of SRI, approaches to SRI, portfolio construction principles, fiduciary responsibilities, SRI trends and best practices. To receive the CSRIC® designation, candidates must successfully complete the CSRIC® coursework and pass the final exam. Continuing education requirements to maintain the CSRIC® designation must be satisfied every two years.",
  },
  "CWS®": {
    name: "Certified Wealth Strategist®",
    description:
      "Designation granted by Cannon Financial Institute. The CWS® designation incorporates three competencies required to be productive and effective as a wealth advisor: creating business routines, applying client interaction and relationship skills and obtaining competency in the technical wealth management issues faced by the high-net-worth market. Topics include defining a book of business, working with centers of influence, applying core skills to be successful in serving high-net-worth clients, technical review of 13 wealth management issues, case studies and more. To receive the CWS® designation, candidates must successfully complete the CWS® education program, pass the course exam, complete a capstone project. Continuing education requirements to maintain the CWS® designation must be satisfied every two years.",
  },
  FIC: {
    name: "Fraternal Insurance Counselor",
    description:
      "Designation granted by the Fraternal Field Managers Association (FFMA). The FIC designation focuses on fraternal benefit societies, ethics and fundamentals of life insurance and estate planning for individuals, families and businesses. Topics include life insurance, ethics for the insurance professional, needs analysis and advanced markets. To receive the FIC designation, candidates must successfully complete the FIC education program, pass the course exams and meet experience requirements. There are no required continuing education requirements to maintain this designation.",
  },
  FICF: {
    name: "Fraternal Insurance Counselor Fellow",
    description:
      "Designation granted by the Fraternal Field Managers’ Association. After earning the FIC designation, the financial professional can complete courses to earn FICF designation. Topics include insurance as a part of estate planning, business insurance concepts such as life and health insurance needs of partnerships, sole proprietorships, business continuation plans and more. To receive the FICF designation, candidates must successfully complete the FICF education program, pass the course exams and meet experience requirements. There are no required continuing education requirements to maintain this designation.",
  },
  FLMI: {
    name: "Fellow, Life Management Institute",
    description:
      "Designation granted by the Life Office Management Association®. The FLMI program provides industry-specific business education in the context of the insurance and financial services industry, teaching advanced insurance and financial concepts to build a deeper understanding of the insurance business. Topics include finance and accounting, compliance and legal, institutional investing, life insurance management, leadership and more. To receive the FLMI designation, candidates must successfully complete the FLMI education program and pass the course exams. There are no required continuing education requirements to maintain this designation.",
  },
  FPC: {
    name: "Fraternal Professional Certification",
    description:
      "Certification granted by the Fraternal Field Managers’ Association. The FPC is designed to increase knowledge of a fraternal professional focusing on better customer service with insurance specific training. Topics include life insurance, ethics, delivering quality service and effective business writing for insurance professionals. To receive the FPC certificate, candidates must successfully complete the FPC education program, pass the course exams and meet experience requirements. There are no required continuing education requirements to maintain this certification.",
  },
  FSA: {
    name: "Fellow of the Society of Actuaries",
    description:
      "Designation granted by the Society of Actuaries®. An FSA designation demonstrates a knowledge of the business environments within which financial decisions concerning pensions, life insurance, health insurance, general insurance and investments are made, including the application of mathematical concepts and other techniques to the various areas of actuarial practice. To receive the FSA designation, candidates must successfully complete the FSA education program and pass the course exams. There are no required continuing education requirements to maintain this designation.",
  },
  "FSCP®": {
    name: "Financial Services Certified Professional®",
    description:
      "Designation granted by The American College of Financial Services. The FSCP® program provides essential skills to help financial professionals successfully launch into a financial services career. It teaches prospecting and marketing techniques, fundamentals of a wide range of products, how to meet client needs and how to build a successful business using an active learning format of Learn, Discuss, Do, Reflect. To receive the FSCP® designation, candidates must successfully complete the FSCP® education program, pass the course exams and meet ethics standards. Continuing education requirements to maintain the FSCP® designation must be satisfied every two years.",
  },
  JD: {
    name: "Juris Doctor",
    description:
      "A Juris Doctor or Juris Doctorate (JD) is a graduate-entry professional degree in law and one of several Doctor of Law degrees. The degree is earned by attending a law school that’s been accredited by the American Bar Association. JD is an educational degree, and the holder does not provide legal services on behalf of Thrivent or its affiliates.",
  },
  "LUTCF®": {
    name: "Life Underwriter Training Council FellowSM",
    description:
      "Designation jointly granted by The College for Financial Planning®, a Kaplan Company and the National Association of Insurance and Financial Advisors (NAIFA). The LUTCF® program provides the background and knowledge necessary to ensure a successful career in the insurance business. The program focuses on fundamental prospecting, selling and practice management skills plus working knowledge of the four practice specialties, essential skills for new financial professionals. To receive the LUTCF® designation, candidates must successfully complete the LUTCF® education program, pass the course exams and meet ethics standards. Continuing education requirements to maintain the LUTCF® designation must be satisfied every two years.",
  },
  MBA: {
    name: "Master of Business Administration",
    description:
      "Master of Business Administration is a postgraduate degree that is awarded to students who have mastered the study of business. Students of MBA programs study the theory and application of business and management principles. The core courses cover various areas of business such as accounting, applied statistics, business communication, business ethics, business law, finance, managerial economics, management, entrepreneurship, marketing and operations in a manner most relevant to management analysis and strategy. Many programs base their admission decisions on a combination of undergraduate grade point average, academic transcripts, entrance exam scores, a résumé containing significant work experience, essays, letters of recommendation and personal interviews.",
  },
  "MPAS®": {
    name: "Master Planner Advanced StudiesSM",
    description:
      "Designation granted by The College for Financial Planning®, a Kaplan Company. Individuals who hold the MPAS® designation have completed a Master of Science degree with a major in personal financial planning. The program consists of 30 semester credits and delves deeply into personal financial planning or investment-related content using research-based coursework and real-world case studies. To meet graduation requirements for the Master of Science degree, individuals must complete assignments, projects, research and papers. Continuing education requirements to maintain the MPAS® designation must be satisfied every two years.",
  },
  MSF: {
    name: "Master of Science in Finance",
    description:
      "A Master's degree of Science in Finance is a postgraduate program preparing graduates for careers in Finance. The core curriculum is focused on managerial finance, corporate finance and investment analysis. These topics are generally preceded by more fundamental coursework in economics, managerial accounting, and quantitative methods. The education usually concludes with coursework in advanced topics, such as portfolio management, financial modeling, mergers and acquisitions and real options. A bachelor's degree is required for admission.",
  },
  MSFP: {
    name: "Master of Science in Financial Planning",
    description:
      "The Master of Science in Financial Planning is an accredited post graduate degree program offered by The American College.  Graduates of the MSFP program must complete core coursework in financial planning, estate planning, and behavioral finance along with additional courses specific to their chosen concentration in financial planning, retirement planning, or legacy planning.  To be admitted into the MSFP program, a financial professional must hold a bachelor’s degree.  Obtaining a MSFP post graduate degree is not reflective of the credentials required by Thrivent for its financial professionals to offer Dedicated Planning Services.",
  },
  MSFS: {
    name: "Master of Science in Financial Services",
    description:
      "The Master of Science in Financial Services is an accredited degree program providing individuals with the tools needed to analyze, plan and implement integrated financial and life strategies. Topics include effectively working with high-net-worth clients, integrate ethical considerations into the financial planning process, wealth accumulation process, how to work with business owners to develop compensation, succession planning and retirement strategies and how to guide individuals in the areas of tax minimization, retirement planning, and estate planning. A bachelor's degree is required for admission.",
  },
  MSM: {
    name: "Master of Science in Management",
    description:
      "Master of Science in Management is a postgraduate degree program focusing on the field of management. Additional courses of study may include statistics, marketing, strategy planning, disciplines of management and leadership skills. A bachelor's degree is required for admission.",
  },
  MSPFP: {
    name: "Master of Science in Personal Financial Planning",
    description:
      "The Master of Science in Personal Financial Planning is a postgraduate program tailored for financial planners who are interested in expanding their knowledge beyond typical financial licensing and credentials. The program begins with the six core disciplines of financial planning before exploring advanced topic areas that go beyond traditional education programs. Curriculum may include macro and microeconomics, finance, financial planning ethics, computer applications of financial data and counseling skills. A bachelor's degree is required for admission.",
  },
  "Ph.D.": {
    name: "Doctor of Philosophy Degree",
    description:
      "A Philosophy doctorate degree is a postgraduate academic degree awarded by universities and higher education institutions to candidates who submit a thesis or dissertation, based on extensive and original research in the chosen field. Universities usually require all or some of the following prior to admission: copies of academic transcripts, letters of recommendation, a research proposal, and a personal statement.",
  },
  "RHU®": {
    name: "Registered Health Underwriter®",
    description:
      "Designation granted by National Association of Health Underwriters. The RHU® designation program provides a specialization in living benefits, including income replacement and risk management solutions for individuals, business owners and professionals. This designation demonstrates a high level of knowledge about the principles and practices governing the disability income and health insurance business. To receive the RHU® designation, candidates must successfully complete the RHU® education program, pass the course exams, meet experience requirements and ethics standards. The RHU® designation has been sunset and is no longer available for enrollment. Continuing education requirements to maintain the RHU® designation must be satisfied every two years for current designees.",
  },
  "RICP®": {
    name: "Retirement Income Certified Professional®",
    description:
      "Designation granted by The American College of Financial Services. The RICP® designation equips financial professionals with the knowledge to effectively manage the transition from asset accumulation during a client’s working years to asset decumulation in retirement demonstrating value by delivering smart strategies for creating secure, sustainable income for a client's retirement. Topics include retirement income planning, best practices in social security claiming, risk management, distribution strategies and more. To receive the RICP® designation, candidates must successfully complete the RICP® education program, pass the course exams, meet experience requirements and ethics standards. Continuing education requirements to maintain the RICP® designation must be satisfied every two years.",
  },
  "WMCP®": {
    name: "Wealth Management Certified Professional®",
    description:
      "Designation granted by The American College of Financial Services®. Financial professionals with WMCP® have extensive knowledge of personal wealth and investment management, including portfolio theory, mastery of investment tools, and advanced wealth management strategies. Topics covered in WMCP® include tax rules, financial products, behavioral finance, household portfolio theory, asset allocation, and more. To receive the WMCP® designation, candidates must successfully complete all required program content within the WMCP® learning platform (including knowledge checks, simulations), pass the final exam, meet experience requirements and ethics standards. Continuing education requirements to maintain the WMCP® designation must be satisfied every two years.",
  },
};

export default LocatorCard;
