import CheckCircleFill from "../assets/images/CheckCircleFill.png";
import CheckCircle from "../assets/images/CheckCircle.png";
import CheckCircleDarkMode from "../assets/images/CheckCircleDarkMode.png"

export default function PricingLayout(props) {
    const lightMode ="ml-[30px] mt-[30px] flex-col items-start gap-[15px] border-borderoutline w-[371px] h-[500px] border-[3px] rounded-md";
    const DarkMode  ="ml-[30px] mt-[30px] flex-col bg-pricingbackground items-start gap-[15px] border-borderoutline w-[371px] h-[500px] rounded-md" 
  return (
    <div className={props.tier==2? DarkMode:lightMode }>
      <UpperContent price={props.price} tier={props.tier} />
      <hr className="w-[260px] ml-[41px] mt-[6px] self-center " />
      <div className="w-[338px] flex-col mt-[18px] h-[205.5px] ml-[16.5px] ">
        {props.tier == 1
          ? default_text.services_one.map((item) => {
              return <ServicesCard tier={item.tier} text={item.name} />;
            })
          : props.tier == 2
          ? default_text.services_two.map((item) => {
              return <ServicesCard mode={true} tier={item.tier} text={item.name} />;
            })
          : default_text.services_three.map((item) => {
              return <ServicesCard tier={item.tier} text={item.name} />;
            })}
      </div>
      <Button mode={props.tier} />
    </div>
  );
}

function UpperContent({ price,tier }) {
    const lightMode="font-montserrat text-textblack mb-[6px] text-[18px] font-semibold w-[195.5px] h-[25px]";
    const DarkMode="font-montserrat text-white mb-[6px] text-[18px] font-semibold w-[195.5px] h-[25px]"
  return (
    <div className="flex-col ml-[30.5px] mt-[23.15px] gap-[23px] w-[195.5px] h-[93.37px] ">
      <p className={tier===2 ? DarkMode:lightMode}>
        {tier==1?'Basic':'Standard'}
      </p>
      <FeaturedPrice price={price} tier={tier} />
    </div>
  );
}

function FeaturedPrice({ price,tier }) {
    const lightModeOne="font-montserrat text-left font-semibold text-[38px] ";
    const darkModeOne="font-montserrat text-left font-semibold text-[38px] text-white";
    const lightModeTwo= "font-montserrat text-[18px] font-light ";
    const darkModeTwo="font-montserrat text-[18px] font-light text-white"
  return (
    <div className="w-[195.5px] mt-[7px] h-[45.37px] flex items-center justify-between">
      <p className={tier==2?darkModeOne:lightModeOne}>
        {price}$
      </p>
      <p className={tier==2 ? darkModeTwo: lightModeTwo }>Per month</p>
    </div>
  );
}

function ServicesCard(props) {
    const lightMode="w-[306px] font-montserrat text-[16px] font-light";
    const darkMode= "w-[306px] font-montserrat text-white text-[16px] font-light "
  return (
    <div className="w-[306px] h-[44px] mt-[7px] flex items-center gap-[7px] ml-[16.5px] ">
      <div className="w-[25px] h-[25px] ">
        <img
          className="w-[25px] h-[25px] "
          src={props.tier ? CheckCircleFill : CheckCircle}
          alt={props.tier ? "check_circle_filed" : "check_circle"}
        />
      </div>
      <p className={props.mode?darkMode:lightMode}>
        {props.text}
      </p>
    </div>
  );
}

function Button(props) {
    const lightMode= "font-montserrat font-semibold text-[19px] text-textblack w-[124px] ";
    const darkMode= "font-montserrat font-semibold text-[19px] text-white w-[124px] "
  return (
    <div className="ml-[79.2px] mt-[7px] cursor-pointer w-[213.61px] h-[59px] border-buttonoutline border-[3px] rounded-md flex justify-center items-center ">
      <p className={props.mode==2 ? darkMode:lightMode}>
        Choose plan
      </p>
    </div>
  );
}

const default_text = {
  services_one: [
    {
      name: "View Real Time Market Analysis on Dashboard",
      tier: true,
    },
    {
      name: "Download/Export market Analysis",
      tier: true,
    },
    {
      name: "Download QR codes for all Products",
      tier: false,
    },
    {
      name: "Dedicated 24/7 Medscan Agent",
      tier: false,
    },
  ],
  services_two: [
    {
      name: "View Real Time Market Analysis on Dashboard",
      tier: true,
    },
    {
      name: "Download/Export market Analysis",
      tier: true,
    },
    {
      name: "Download QR codes for all Products",
      tier: true,
    },
    {
      name: "Dedicated 24/7 Medscan Agent",
      tier: false,
    },
  ],
  services_three: [
    {
      name: "View Real Time Market Analysis on Dashboard",
      tier: true,
    },
    {
      name: "Download/Export market Analysis",
      tier: true,
    },
    {
      name: "Download QR codes for all Products",
      tier: true,
    },
    {
      name: "Dedicated 24/7 Medscan Agent",
      tier: false,
    },
  ],
};
