import svgPaths from "./svg-js43437mrt";

function Icon() {
  return (
    <div className="h-[23.999px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[20.83%] left-[20.83%] right-1/2 top-[20.83%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 16">
            <path d={svgPaths.p35270e80} id="Vector" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99991" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-1px_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 2">
            <path d="M15 0.999955H0.999955" id="Vector" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99991" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[2.12437e+07px] shrink-0 size-[39.985px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-0 pt-[7.993px] px-[7.993px] relative size-[39.985px]">
        <Icon />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[27.995px] relative shrink-0 w-[63.766px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[27.995px] relative w-[63.766px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#101828] text-[20px] text-nowrap top-[-0.73px] whitespace-pre">Profile</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="box-border content-stretch flex gap-[11.999px] h-[39.985px] items-center pr-0 py-0 relative shrink-0 w-full" data-name="Container">
      <Button />
      <Heading />
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="absolute h-[23.989px] left-[64.45px] top-0 w-[8.329px]" data-name="ProfilePage">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#fb2c36] text-[16px] text-nowrap top-[-1.1px] whitespace-pre">*</p>
    </div>
  );
}

function PrimitiveLabel() {
  return (
    <div className="h-[23.989px] relative shrink-0 w-full" data-name="Primitive.label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-[-1.1px] whitespace-pre">Gender</p>
      <ProfilePage />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[3.36px] size-[7.993px] top-[-4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        <g clipPath="url(#clip0_62_3387)" id="Icon">
          <path d={svgPaths.p16bb9b0} fill="var(--fill-0, #030213)" id="Vector" stroke="var(--stroke-0, #D61F26)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.666087" />
        </g>
        <defs>
          <clipPath id="clip0_62_3387">
            <rect fill="white" height="7.99305" width="7.99305" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function PrimitiveSpan() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="Primitive.span">
      <Icon1 />
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="bg-[rgba(255,255,255,0)] relative rounded-[2.12437e+07px] shrink-0 size-[15.996px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-[0.633px] border-solid inset-0 pointer-events-none rounded-[2.12437e+07px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-[0.633px] pt-[7.993px] px-[0.633px] relative size-[15.996px]">
        <PrimitiveSpan />
      </div>
    </div>
  );
}

function PrimitiveLabel1() {
  return (
    <div className="h-[13.998px] relative shrink-0 w-[31.814px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[13.998px] items-center relative w-[31.814px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[14px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap whitespace-pre">Male</p>
      </div>
    </div>
  );
}

function ProfilePage1() {
  return (
    <div className="h-[15.996px] relative shrink-0 w-[400.661px]" data-name="ProfilePage">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[7.993px] h-[15.996px] items-center relative w-[400.661px]">
        <PrimitiveButton />
        <PrimitiveLabel1 />
      </div>
    </div>
  );
}

function PrimitiveButton1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] relative rounded-[2.12437e+07px] shrink-0 size-[15.996px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-[0.633px] border-solid inset-0 pointer-events-none rounded-[2.12437e+07px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[15.996px]" />
    </div>
  );
}

function PrimitiveLabel2() {
  return (
    <div className="h-[13.998px] relative shrink-0 w-[47.345px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[13.998px] items-center relative w-[47.345px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[14px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap whitespace-pre">Female</p>
      </div>
    </div>
  );
}

function ProfilePage2() {
  return (
    <div className="h-[15.996px] relative shrink-0 w-[400.661px]" data-name="ProfilePage">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[7.993px] h-[15.996px] items-center relative w-[400.661px]">
        <PrimitiveButton1 />
        <PrimitiveLabel2 />
      </div>
    </div>
  );
}

function PrimitiveButton2() {
  return (
    <div className="bg-[rgba(255,255,255,0)] relative rounded-[2.12437e+07px] shrink-0 size-[15.996px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-[0.633px] border-solid inset-0 pointer-events-none rounded-[2.12437e+07px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[15.996px]" />
    </div>
  );
}

function PrimitiveLabel3() {
  return (
    <div className="h-[13.998px] relative shrink-0 w-[153.728px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[13.998px] items-center relative w-[153.728px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[14px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap whitespace-pre">Do not wish to disclose</p>
      </div>
    </div>
  );
}

function ProfilePage3() {
  return (
    <div className="h-[15.996px] relative shrink-0 w-[400.661px]" data-name="ProfilePage">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[7.993px] h-[15.996px] items-center relative w-[400.661px]">
        <PrimitiveButton2 />
        <PrimitiveLabel3 />
      </div>
    </div>
  );
}

function PrimitiveDiv() {
  return (
    <div className="content-stretch flex flex-col gap-[15.996px] h-[79.98px] items-start relative shrink-0 w-full" data-name="Primitive.div">
      <ProfilePage1 />
      <ProfilePage2 />
      <ProfilePage3 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[11.999px] h-[119.965px] items-start left-0 pb-0 pt-[3.997px] px-0 top-[386.2px] w-[400.661px]" data-name="Container">
      <PrimitiveLabel />
      <PrimitiveDiv />
    </div>
  );
}

function PrimitiveLabel4() {
  return (
    <div className="h-[23.989px] relative shrink-0 w-full" data-name="Primitive.label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-[-1.1px] whitespace-pre">Get updates on WhatsApp</p>
    </div>
  );
}

function PrimitiveSpan1() {
  return (
    <div className="bg-white relative rounded-[2.12437e+07px] shrink-0 size-[15.996px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[15.996px]" />
    </div>
  );
}

function PrimitiveButton3() {
  return (
    <div className="bg-[#d61f26] h-[18.4px] relative rounded-[2.12437e+07px] shrink-0 w-[31.992px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[0.633px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[2.12437e+07px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[18.4px] items-center pl-[14.629px] pr-[0.633px] py-[0.633px] relative w-[31.992px]">
        <PrimitiveSpan1 />
      </div>
    </div>
  );
}

function PrimitiveLabel5() {
  return (
    <div className="h-[13.998px] relative shrink-0 w-[137.939px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[13.998px] items-center relative w-[137.939px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[14px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap whitespace-pre">Yes, keep me posted</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[7.993px] h-[18.4px] items-center relative shrink-0 w-full" data-name="Container">
      <PrimitiveButton3 />
      <PrimitiveLabel5 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[11.999px] h-[58.385px] items-start left-0 pb-0 pt-[3.997px] px-0 top-[526.16px] w-[400.661px]" data-name="Container">
      <PrimitiveLabel4 />
      <Container2 />
    </div>
  );
}

function PrimitiveLabel6() {
  return (
    <div className="h-[23.989px] relative shrink-0 w-full" data-name="Primitive.label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-[-1.1px] whitespace-pre">Preferred medium of communication</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[13.998px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p3cbaa80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16648" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveSpan2() {
  return (
    <div className="content-stretch flex h-[13.998px] items-center justify-center relative shrink-0 w-full" data-name="Primitive.span">
      <Icon2 />
    </div>
  );
}

function PrimitiveButton4() {
  return (
    <div className="bg-[#d61f26] relative rounded-[4px] shrink-0 size-[15.996px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[#d61f26] border-[0.633px] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-[0.633px] pt-[0.999px] px-[0.633px] relative size-[15.996px]">
        <PrimitiveSpan2 />
      </div>
    </div>
  );
}

function PrimitiveLabel7() {
  return (
    <div className="h-[13.998px] relative shrink-0 w-[30.31px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[13.998px] items-center relative w-[30.31px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[14px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap whitespace-pre">SMS</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[15.996px] relative shrink-0 w-[54.299px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[7.993px] h-[15.996px] items-center relative w-[54.299px]">
        <PrimitiveButton4 />
        <PrimitiveLabel7 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[13.998px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p3cbaa80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16648" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveSpan3() {
  return (
    <div className="h-[13.998px] relative shrink-0 w-full" data-name="Primitive.span">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex h-[13.998px] items-center justify-center relative w-full">
          <Icon3 />
        </div>
      </div>
    </div>
  );
}

function PrimitiveButton5() {
  return (
    <div className="bg-[#d61f26] relative rounded-[4px] shrink-0 size-[15.996px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[#d61f26] border-[0.633px] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-[0.633px] pt-[0.999px] px-[0.633px] relative size-[15.996px]">
        <PrimitiveSpan3 />
      </div>
    </div>
  );
}

function PrimitiveLabel8() {
  return (
    <div className="h-[13.998px] relative shrink-0 w-[68.248px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[13.998px] items-center relative w-[68.248px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[14px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap whitespace-pre">WhatsApp</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[15.996px] relative shrink-0 w-[92.237px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[7.993px] h-[15.996px] items-center relative w-[92.237px]">
        <PrimitiveButton5 />
        <PrimitiveLabel8 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[13.998px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p3cbaa80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16648" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveSpan4() {
  return (
    <div className="h-[13.998px] relative shrink-0 w-full" data-name="Primitive.span">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex h-[13.998px] items-center justify-center relative w-full">
          <Icon4 />
        </div>
      </div>
    </div>
  );
}

function PrimitiveButton6() {
  return (
    <div className="bg-[#d61f26] relative rounded-[4px] shrink-0 size-[15.996px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[#d61f26] border-[0.633px] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-[0.633px] pt-[0.999px] px-[0.633px] relative size-[15.996px]">
        <PrimitiveSpan4 />
      </div>
    </div>
  );
}

function PrimitiveLabel9() {
  return (
    <div className="basis-0 grow h-[13.998px] min-h-px min-w-px relative shrink-0" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[13.998px] items-center relative w-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[14px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap whitespace-pre">Email</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[15.996px] relative shrink-0 w-[59.067px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[7.993px] h-[15.996px] items-center relative w-[59.067px]">
        <PrimitiveButton6 />
        <PrimitiveLabel9 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[23.999px] h-[15.996px] items-center relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Container5 />
      <Container6 />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[11.999px] h-[55.981px] items-start left-0 pb-0 pt-[3.997px] px-0 top-[604.53px] w-[400.661px]" data-name="Container">
      <PrimitiveLabel6 />
      <Container7 />
    </div>
  );
}

function PrimitiveButton7() {
  return <div className="absolute bg-[#f3f3f5] border-[#d1d5dc] border-[0.633px] border-solid left-0 rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] size-[15.996px] top-[11.99px]" data-name="Primitive.button" />;
}

function PrimitiveLabel10() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[136.456px] items-center left-[28px] top-[7.99px] w-[372.666px]" data-name="Primitive.label">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-nowrap whitespace-pre">{`We would like to contact you by SMS, Email or WhatsApp to send you information about our products & services, including promotional campaigns and relevant marketing information in relation to Bikanervala brands and carefully selected third party partners using the contact details provided by you in this form`}</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute h-[144.449px] left-0 top-[680.51px] w-[400.661px]" data-name="Container">
      <PrimitiveButton7 />
      <PrimitiveLabel10 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[351.41px] size-[15.996px] top-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3760f980} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton8() {
  return (
    <div className="h-[55.981px] relative rounded-[8px] shrink-0 w-full" data-name="Primitive.button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-[14.9px] whitespace-pre">Additional Details</p>
      <Icon5 />
    </div>
  );
}

function PrimitiveDiv1() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[57.247px] items-start left-0 px-[16.629px] py-[0.633px] rounded-[14px] top-[844.95px] w-[400.661px]" data-name="Primitive.div">
      <div aria-hidden="true" className="absolute border-[0.633px] border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
      <PrimitiveButton8 />
    </div>
  );
}

function Input() {
  return (
    <div className="absolute bg-[#f3f3f5] h-[57.247px] left-0 rounded-[14px] top-0 w-[400.661px]" data-name="Input">
      <div className="box-border content-stretch flex h-[57.247px] items-center overflow-clip pb-[8px] pt-[24px] px-[12px] relative rounded-[inherit] w-[400.661px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-neutral-950 text-nowrap whitespace-pre">Pankaj</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.633px] border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function ProfilePage4() {
  return (
    <div className="absolute h-[15.996px] left-[70.06px] top-0 w-[6.252px]" data-name="ProfilePage">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#fb2c36] text-[12px] text-nowrap top-[0.63px] whitespace-pre">*</p>
    </div>
  );
}

function PrimitiveLabel11() {
  return (
    <div className="absolute h-[15.996px] left-[12px] top-[7.99px] w-[76.31px]" data-name="Primitive.label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-[0.63px] whitespace-pre">First Name</p>
      <ProfilePage4 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute h-[57.247px] left-0 top-0 w-[400.661px]" data-name="Container">
      <Input />
      <PrimitiveLabel11 />
    </div>
  );
}

function Input1() {
  return (
    <div className="absolute bg-[#f3f3f5] h-[57.247px] left-0 rounded-[14px] top-0 w-[400.661px]" data-name="Input">
      <div className="box-border content-stretch flex h-[57.247px] items-center overflow-clip pb-[8px] pt-[24px] px-[12px] relative rounded-[inherit] w-[400.661px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-neutral-950 text-nowrap whitespace-pre">Narwal</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.633px] border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function ProfilePage5() {
  return (
    <div className="absolute h-[15.996px] left-[68.92px] top-0 w-[6.252px]" data-name="ProfilePage">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#fb2c36] text-[12px] text-nowrap top-[0.63px] whitespace-pre">*</p>
    </div>
  );
}

function PrimitiveLabel12() {
  return (
    <div className="absolute h-[15.996px] left-[12px] top-[7.99px] w-[75.172px]" data-name="Primitive.label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-[0.63px] whitespace-pre">Last Name</p>
      <ProfilePage5 />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute h-[57.247px] left-0 top-[77.24px] w-[400.661px]" data-name="Container">
      <Input1 />
      <PrimitiveLabel12 />
    </div>
  );
}

function Input2() {
  return (
    <div className="absolute bg-[#f3f3f5] h-[57.247px] left-0 rounded-[14px] top-0 w-[400.661px]" data-name="Input">
      <div className="box-border content-stretch flex h-[57.247px] items-center overflow-clip pb-[8px] pt-[24px] px-[12px] relative rounded-[inherit] w-[400.661px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-neutral-950 text-nowrap whitespace-pre">8109109571</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.633px] border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function ProfilePage6() {
  return (
    <div className="absolute h-[15.996px] left-[95.96px] top-0 w-[6.252px]" data-name="ProfilePage">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#fb2c36] text-[12px] text-nowrap top-[0.63px] whitespace-pre">*</p>
    </div>
  );
}

function PrimitiveLabel13() {
  return (
    <div className="absolute h-[15.996px] left-[12px] top-[7.99px] w-[102.208px]" data-name="Primitive.label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-[0.63px] whitespace-pre">Mobile Number</p>
      <ProfilePage6 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute h-[57.247px] left-0 top-[154.48px] w-[400.661px]" data-name="Container">
      <Input2 />
      <PrimitiveLabel13 />
    </div>
  );
}

function Input3() {
  return (
    <div className="absolute bg-[#f3f3f5] h-[57.247px] left-0 rounded-[14px] top-0 w-[400.661px]" data-name="Input">
      <div aria-hidden="true" className="absolute border-[0.633px] border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function ProfilePage7() {
  return (
    <div className="absolute h-[15.996px] left-[38.75px] top-0 w-[6.252px]" data-name="ProfilePage">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#fb2c36] text-[12px] text-nowrap top-[0.63px] whitespace-pre">*</p>
    </div>
  );
}

function PrimitiveLabel14() {
  return (
    <div className="absolute h-[15.996px] left-[12px] top-[7.99px] w-[45px]" data-name="Primitive.label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-[0.63px] whitespace-pre">Email</p>
      <ProfilePage7 />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute h-[57.247px] left-0 top-[231.72px] w-[400.661px]" data-name="Container">
      <Input3 />
      <PrimitiveLabel14 />
    </div>
  );
}

function Input4() {
  return (
    <div className="absolute bg-[#f3f3f5] h-[57.247px] left-0 rounded-[14px] top-0 w-[400.661px]" data-name="Input">
      <div aria-hidden="true" className="absolute border-[0.633px] border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[368.67px] size-[19.993px] top-[22.62px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_62_3369)" id="Icon">
          <path d="M6.66417 1.66604V4.99813" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66604" />
          <path d="M13.3283 1.66604V4.99813" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66604" />
          <path d={svgPaths.p3f698300} id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66604" />
          <path d="M2.49906 8.33021H17.4934" id="Vector_4" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66604" />
        </g>
        <defs>
          <clipPath id="clip0_62_3369">
            <rect fill="white" height="19.9925" width="19.9925" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ProfilePage8() {
  return (
    <div className="absolute h-[15.996px] left-[146.07px] top-0 w-[6.252px]" data-name="ProfilePage">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#fb2c36] text-[12px] text-nowrap top-[0.63px] whitespace-pre">*</p>
    </div>
  );
}

function PrimitiveLabel15() {
  return (
    <div className="absolute h-[15.996px] left-[12px] top-[7.99px] w-[152.323px]" data-name="Primitive.label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-[0.63px] whitespace-pre">Select your date of birth</p>
      <ProfilePage8 />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute h-[57.247px] left-0 top-[308.96px] w-[400.661px]" data-name="Container">
      <Input4 />
      <Icon6 />
      <PrimitiveLabel15 />
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[902.195px] relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Container3 />
      <Container8 />
      <Container9 />
      <PrimitiveDiv1 />
      <Container10 />
      <Container11 />
      <Container12 />
      <Container13 />
      <Container14 />
    </div>
  );
}

function ProfilePage9() {
  return (
    <div className="bg-white h-[1118.18px] relative shrink-0 w-full" data-name="ProfilePage">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[23.999px] h-[1118.18px] items-start pb-0 pt-[23.999px] px-[19.993px] relative w-full">
          <Container />
          <Container15 />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[1182.17px] items-start left-0 overflow-clip top-0 w-[440.646px]" data-name="App">
      <ProfilePage9 />
    </div>
  );
}

function Container16() {
  return <div className="absolute left-[37.67px] opacity-0 rounded-[25px] size-0 top-[35.37px]" data-name="Container" />;
}

function Icon7() {
  return (
    <div className="absolute left-[25.67px] size-[23.999px] top-[12.37px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.pee64880} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99991" />
          <path d={svgPaths.p28601a80} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99991" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[17.994px] left-[20.6px] top-[40.36px] w-[34.149px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-[17.5px] not-italic text-[#6a7282] text-[12px] text-center text-nowrap top-[0.27px] translate-x-[-50%] whitespace-pre">Home</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute h-[70.731px] left-[5.99px] top-0 w-[75.35px]" data-name="Button">
      <Container16 />
      <Icon7 />
      <Text />
    </div>
  );
}

function Container17() {
  return <div className="absolute left-[37.67px] opacity-0 rounded-[25px] size-0 top-[35.37px]" data-name="Container" />;
}

function Icon8() {
  return (
    <div className="absolute left-[25.67px] size-[23.999px] top-[12.37px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.pb47f400} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99991" />
          <path d={svgPaths.p17554400} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99991" />
          <path d="M9.99964 8.9996H7.99964" id="Vector_3" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99991" />
          <path d="M15.9996 12.9994H7.99964" id="Vector_4" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99991" />
          <path d="M15.9996 16.9992H7.99964" id="Vector_5" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99991" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute h-[17.994px] left-[21.54px] top-[40.36px] w-[32.279px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-[16.5px] not-italic text-[#6a7282] text-[12px] text-center text-nowrap top-[0.27px] translate-x-[-50%] whitespace-pre">Posts</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute h-[70.731px] left-[81.35px] top-0 w-[75.35px]" data-name="Button">
      <Container17 />
      <Icon8 />
      <Text1 />
    </div>
  );
}

function Container18() {
  return <div className="absolute left-[37.67px] opacity-0 rounded-[25px] size-0 top-[35.37px]" data-name="Container" />;
}

function Icon9() {
  return (
    <div className="absolute left-[25.67px] size-[23.999px] top-[12.37px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p9b81900} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99991" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute h-[17.994px] left-[13.51px] top-[40.36px] w-[48.314px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-[24.5px] not-italic text-[#6a7282] text-[12px] text-center text-nowrap top-[0.27px] translate-x-[-50%] whitespace-pre">Reviews</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute h-[70.731px] left-[156.7px] top-0 w-[75.35px]" data-name="Button">
      <Container18 />
      <Icon9 />
      <Text2 />
    </div>
  );
}

function Container19() {
  return <div className="absolute left-[37.67px] opacity-0 rounded-[25px] size-0 top-[35.37px]" data-name="Container" />;
}

function Icon10() {
  return (
    <div className="absolute left-[25.67px] size-[23.999px] top-[12.37px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p2edd0f00} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99991" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute h-[17.994px] left-[14.34px] top-[40.36px] w-[46.652px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-[23px] not-italic text-[#6a7282] text-[12px] text-center text-nowrap top-[0.27px] translate-x-[-50%] whitespace-pre">Support</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute h-[70.731px] left-[232.05px] top-0 w-[75.35px]" data-name="Button">
      <Container19 />
      <Icon10 />
      <Text3 />
    </div>
  );
}

function Container20() {
  return <div className="absolute bg-gray-100 h-[59.997px] left-[3.68px] rounded-[25px] top-[5.37px] w-[67.99px]" data-name="Container" />;
}

function Icon11() {
  return (
    <div className="absolute left-[25.67px] size-[23.999px] top-[12.37px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <g id="Vector"></g>
          <g id="Vector_2"></g>
        </g>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute h-[17.994px] left-[18.84px] top-[40.36px] w-[37.65px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-[19px] not-italic text-[12px] text-black text-center text-nowrap top-[0.27px] translate-x-[-50%] whitespace-pre">Profile</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute h-[70.731px] left-[307.4px] top-0 w-[75.35px]" data-name="Button">
      <Container20 />
      <Icon11 />
      <Text4 />
    </div>
  );
}

function FloatingBottomNav() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] border-[0.633px] border-[rgba(255,255,255,0.4)] border-solid h-[71.997px] left-[25.32px] rounded-[35px] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.12)] top-[868.01px] w-[390.007px]" data-name="FloatingBottomNav">
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
    </div>
  );
}

export default function NebulaBikanervala() {
  return (
    <div className="bg-white relative size-full" data-name="Nebula Bikanervala">
      <App />
      <FloatingBottomNav />
    </div>
  );
}