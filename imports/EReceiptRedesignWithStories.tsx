import { brand } from '../config/brand';
import svgPaths from "./svg-knwrtw2e2h";
import imgImage from "figma:asset/f7d5128123da262fcb3a2c347e367286c81eaafb.png";
import imgImageWithFallback from "figma:asset/ca05ef68cfcfbe7f1a5a7bc80e09da1eaea3cf09.png";
import imgImageWithFallback1 from "figma:asset/ff1e5ad757fca8e72f826783abb31dda2f7c8609.png";
import imgImageWithFallback2 from "figma:asset/95b56aa84ff6fffe3e9b9843d76b68c9e1b0656d.png";

function Heading() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[30px] left-[179.02px] not-italic text-[20px] text-center text-neutral-950 text-nowrap top-0 tracking-[-0.4492px] translate-x-[-50%] whitespace-pre">Posts</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Zudio</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-px whitespace-pre">View Story</p>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col h-[39px] items-start left-[98px] top-[3.5px] w-[71.75px]" data-name="Container">
      <Paragraph />
      <Paragraph1 />
    </div>
  );
}

function Image() {
  return (
    <div className="h-[73px] relative shrink-0 w-full" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col h-[73px] items-start overflow-clip relative rounded-[1.67772e+07px] shrink-0 w-full" data-name="Container">
      <Image />
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-white h-[79px] relative rounded-[1.67772e+07px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[79px] items-start pb-0 pt-[3px] px-[3px] relative w-full">
          <Container1 />
        </div>
      </div>
    </div>
  );
}

function StoriesBar() {
  return (
    <div className="absolute bg-gradient-to-b box-border content-stretch flex flex-col from-[#000000] items-start left-0 pb-0 pt-[3.5px] px-[3.5px] rounded-[1.67772e+07px] size-[86px] to-[#1a1a1a] top-[-40px]" data-name="StoriesBar">
      <Container2 />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Container">
      <Container />
      <StoriesBar />
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-white h-[141px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] h-[141px] items-start pb-px pt-[16px] px-[16px] relative w-full">
          <Heading />
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[#000000] relative rounded-[1.67772e+07px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <img src={brand.assets.logo.primary} className="w-full h-full object-cover rounded-full p-1" alt={brand.identity.name} />
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Zudio</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[64px] items-center px-[16px] py-0 relative w-full">
          <Container5 />
          <Paragraph2 />
        </div>
      </div>
    </div>
  );
}

function ImageWithFallback() {
  return (
    <div className="h-[390px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
            <path d={svgPaths.p3df8f300} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[24px]">
        <Icon />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_12.5%_66.67%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
            <path d={svgPaths.p1e531d00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_62.5%_37.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
            <path d={svgPaths.p1e531d00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.67%_12.5%_8.33%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
            <path d={svgPaths.p1e531d00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[56.29%_35.75%_27.13%_35.79%]" data-name="Vector">
        <div className="absolute inset-[-25.13%_-14.64%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 6">
            <path d={svgPaths.p1d55d300} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[27.13%_35.79%_56.29%_35.79%]" data-name="Vector">
        <div className="absolute inset-[-25.13%_-14.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 6">
            <path d={svgPaths.p1e408800} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[24px] items-start relative w-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[24px] relative shrink-0 w-[64px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[24px] items-center relative w-[64px]">
        <Button />
        <Button1 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
            <path d={svgPaths.p3c55a400} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[24px]">
        <Icon2 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex h-[24px] items-center justify-between left-[16px] top-[12px] w-[358px]" data-name="Container">
      <Container7 />
      <Button2 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.pb43a980} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p28db2b80} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[21px] relative shrink-0 w-[75.625px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[75.625px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#364153] text-[14px] top-0 tracking-[-0.1504px] w-[76px]">12.5K views</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[21px] items-center left-[16px] top-[48px] w-[358px]" data-name="Container">
      <Icon3 />
      <Paragraph3 />
    </div>
  );
}

function Text() {
  return (
    <div className="absolute content-stretch flex h-[16.5px] items-start left-0 top-[2px] w-[75.023px]" data-name="Text">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Zudio</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[42px] left-[16px] top-[77px] w-[358px]" data-name="Paragraph">
      <Text />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-neutral-950 top-0 tracking-[-0.1504px] w-[334px]">New arrivals this season! Check out our latest collection 🔥</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute h-[21px] left-[16px] top-[123px] w-[141.836px]" data-name="Button">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[71px] not-italic text-[#6a7282] text-[14px] text-center top-0 tracking-[-0.1504px] translate-x-[-50%] w-[142px]">View all 56 comments</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[156.5px] relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Container9 />
      <Paragraph4 />
      <Button3 />
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[610.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <ImageWithFallback />
      <Container10 />
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-[#000000] relative rounded-[1.67772e+07px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <img src={brand.assets.logo.primary} className="w-full h-full object-cover rounded-full p-1" alt={brand.identity.name} />
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Zudio</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[64px] items-center px-[16px] py-0 relative w-full">
          <Container12 />
          <Paragraph5 />
        </div>
      </div>
    </div>
  );
}

function ImageWithFallback1() {
  return (
    <div className="h-[390px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback1} />
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
            <path d={svgPaths.p3df8f300} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[24px]">
        <Icon4 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_12.5%_66.67%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
            <path d={svgPaths.p1e531d00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_62.5%_37.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
            <path d={svgPaths.p1e531d00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.67%_12.5%_8.33%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
            <path d={svgPaths.p1e531d00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[56.29%_35.75%_27.13%_35.79%]" data-name="Vector">
        <div className="absolute inset-[-25.13%_-14.64%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 6">
            <path d={svgPaths.p1d55d300} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[27.13%_35.79%_56.29%_35.79%]" data-name="Vector">
        <div className="absolute inset-[-25.13%_-14.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 6">
            <path d={svgPaths.p1e408800} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[24px] items-start relative w-full">
        <Icon5 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[24px] relative shrink-0 w-[64px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[24px] items-center relative w-[64px]">
        <Button4 />
        <Button5 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
            <path d={svgPaths.p3c55a400} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[24px]">
        <Icon6 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex h-[24px] items-center justify-between left-[16px] top-[12px] w-[358px]" data-name="Container">
      <Container14 />
      <Button6 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.pb43a980} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p28db2b80} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[21px] relative shrink-0 w-[78.023px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[78.023px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#364153] text-[14px] top-0 tracking-[-0.1504px] w-[79px]">23.4K views</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[21px] items-center left-[16px] top-[48px] w-[358px]" data-name="Container">
      <Icon7 />
      <Paragraph6 />
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute content-stretch flex h-[16.5px] items-start left-0 top-[2px] w-[75.023px]" data-name="Text">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Zudio</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="absolute h-[42px] left-[16px] top-[77px] w-[358px]" data-name="Paragraph">
      <Text1 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-neutral-950 top-0 tracking-[-0.1504px] w-[329px]">Summer sale is here! Up to 50% off on selected items 🌞</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute h-[21px] left-[16px] top-[123px] w-[142.117px]" data-name="Button">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[71.5px] not-italic text-[#6a7282] text-[14px] text-center top-0 tracking-[-0.1504px] translate-x-[-50%] w-[143px]">View all 89 comments</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[156.5px] relative shrink-0 w-full" data-name="Container">
      <Container15 />
      <Container16 />
      <Paragraph7 />
      <Button7 />
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[610.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container13 />
      <ImageWithFallback1 />
      <Container17 />
    </div>
  );
}

function Container19() {
  return (
    <div className="bg-[#000000] relative rounded-[1.67772e+07px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <img src={brand.assets.logo.primary} className="w-full h-full object-cover rounded-full p-1" alt={brand.identity.name} />
      </div>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Zudio</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[64px] items-center px-[16px] py-0 relative w-full">
          <Container19 />
          <Paragraph8 />
        </div>
      </div>
    </div>
  );
}

function ImageWithFallback2() {
  return (
    <div className="h-[390px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback2} />
    </div>
  );
}

function Icon8() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
            <path d={svgPaths.p3df8f300} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[24px]">
        <Icon8 />
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_12.5%_66.67%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
            <path d={svgPaths.p1e531d00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_62.5%_37.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
            <path d={svgPaths.p1e531d00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.67%_12.5%_8.33%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
            <path d={svgPaths.p1e531d00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[56.29%_35.75%_27.13%_35.79%]" data-name="Vector">
        <div className="absolute inset-[-25.13%_-14.64%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 6">
            <path d={svgPaths.p1d55d300} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[27.13%_35.79%_56.29%_35.79%]" data-name="Vector">
        <div className="absolute inset-[-25.13%_-14.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 6">
            <path d={svgPaths.p1e408800} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[24px] items-start relative w-full">
        <Icon9 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[24px] relative shrink-0 w-[64px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[24px] items-center relative w-[64px]">
        <Button8 />
        <Button9 />
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
            <path d={svgPaths.p3c55a400} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[24px]">
        <Icon10 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex h-[24px] items-center justify-between left-[16px] top-[12px] w-[358px]" data-name="Container">
      <Container21 />
      <Button10 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.pb43a980} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p28db2b80} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[21px] relative shrink-0 w-[69.563px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[69.563px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#364153] text-[14px] top-0 tracking-[-0.1504px] w-[70px]">9.9K views</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[21px] items-center left-[16px] top-[48px] w-[358px]" data-name="Container">
      <Icon11 />
      <Paragraph9 />
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute content-stretch flex h-[16.5px] items-start left-0 top-[2px] w-[75.023px]" data-name="Text">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Zudio</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="absolute h-[42px] left-[16px] top-[77px] w-[358px]" data-name="Paragraph">
      <Text2 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-neutral-950 top-0 tracking-[-0.1504px] w-[332px]">Style tip: Mix and match for the perfect look! 💫</p>
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute h-[21px] left-[16px] top-[123px] w-[142.055px]" data-name="Button">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[71.5px] not-italic text-[#6a7282] text-[14px] text-center top-0 tracking-[-0.1504px] translate-x-[-50%] w-[143px]">View all 34 comments</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[156.5px] relative shrink-0 w-full" data-name="Container">
      <Container22 />
      <Container23 />
      <Paragraph10 />
      <Button11 />
    </div>
  );
}

function Container25() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[610.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <ImageWithFallback2 />
      <Container24 />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[1863.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container11 />
      <Container18 />
      <Container25 />
    </div>
  );
}

function Posts() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] h-[2116.5px] items-start overflow-clip relative shrink-0 w-full" data-name="Posts">
      <Container4 />
      <Container26 />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col h-[844px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Posts />
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col h-[844px] items-start left-[293.5px] overflow-clip rounded-[20px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.15)] top-[16px] w-[390px]" data-name="Container">
      <Container27 />
    </div>
  );
}

function App() {
  return (
    <div className="absolute bg-gray-100 h-[876px] left-0 top-0 w-[977px]" data-name="App">
      <Container28 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[21px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
        <g id="Icon">
          <path d={svgPaths.pc4cd900} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="1.75" />
          <path d={svgPaths.pdd28300} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="1.75" />
          <path d="M10.5 15.3125V5.6875" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="1.75" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[18px] relative shrink-0 w-[45.266px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-[45.266px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[23.5px] not-italic text-[12px] text-[rgba(255,255,255,0.6)] text-center text-nowrap top-px tracking-[0.36px] translate-x-[-50%] whitespace-pre">Receipt</p>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="basis-0 grow h-[57px] min-h-px min-w-px relative rounded-[30px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[2px] h-[57px] items-center justify-center relative w-full">
        <Icon12 />
        <Text3 />
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[21px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
        <g id="Icon">
          <path d={svgPaths.p2de1d00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
          <path d={svgPaths.p3451b700} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
          <path d={svgPaths.p30584d00} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
        </g>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[18px] relative shrink-0 w-[33.086px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-[33.086px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[17.5px] not-italic text-[12px] text-center text-nowrap text-white top-px tracking-[0.36px] translate-x-[-50%] whitespace-pre">Posts</p>
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="basis-0 bg-[rgba(255,255,255,0.1)] grow h-[57px] min-h-px min-w-px relative rounded-[30px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[2px] h-[57px] items-center justify-center relative w-full">
        <Icon13 />
        <Text4 />
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[21px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
        <g id="Icon">
          <path d={svgPaths.p24446b80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="1.75" />
        </g>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[18px] relative shrink-0 w-[48.648px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-[48.648px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[24px] not-italic text-[12px] text-[rgba(255,255,255,0.6)] text-center text-nowrap top-px tracking-[0.36px] translate-x-[-50%] whitespace-pre">Reviews</p>
      </div>
    </div>
  );
}

function Button14() {
  return (
    <div className="basis-0 grow h-[57px] min-h-px min-w-px relative rounded-[30px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[2px] h-[57px] items-center justify-center relative w-full">
        <Icon14 />
        <Text5 />
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[21px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
        <g id="Icon">
          <path d={svgPaths.pd883800} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="1.75" />
          <path d={svgPaths.p212eb900} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="1.75" />
        </g>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[18px] relative shrink-0 w-[38.828px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-[38.828px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[19.5px] not-italic text-[12px] text-[rgba(255,255,255,0.6)] text-center text-nowrap top-px tracking-[0.36px] translate-x-[-50%] whitespace-pre">Profile</p>
      </div>
    </div>
  );
}

function Button15() {
  return (
    <div className="basis-0 grow h-[57px] min-h-px min-w-px relative rounded-[30px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[2px] h-[57px] items-center justify-center relative w-full">
        <Icon15 />
        <Text6 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[66px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[66px] items-center px-[8px] py-0 relative w-full">
          <Button12 />
          <Button13 />
          <Button14 />
          <Button15 />
        </div>
      </div>
    </div>
  );
}

function BottomNav() {
  return (
    <div className="absolute bg-[rgba(36,38,50,0.85)] h-[68px] left-[312.5px] rounded-[35px] top-[756px] w-[352px]" data-name="BottomNav">
      <div className="box-border content-stretch flex flex-col h-[68px] items-start overflow-clip p-px relative rounded-[inherit] w-[352px]">
        <Container29 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[35px] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.37)]" />
    </div>
  );
}

export default function EReceiptRedesignWithStories() {
  return (
    <div className="bg-white relative size-full" data-name="E-Receipt Redesign with Stories">
      <App />
      <BottomNav />
    </div>
  );
}