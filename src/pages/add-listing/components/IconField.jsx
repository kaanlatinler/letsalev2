import React from 'react'
import { 
    FaClipboardList, FaTag, FaDollarSign, FaMoneyBillAlt, FaCar, 
    FaCheckCircle, FaChargingStation, FaIndustry, FaCarSide, FaCalendarAlt, 
    FaRoad, FaCogs, FaGasPump, FaTachometerAlt, FaWrench, FaCircle, 
    FaPalette, FaDoorClosed, FaIdCard, FaTags, FaFileAlt, FaPlus
  } from "react-icons/fa";

  
  const iconMap = {
    FaClipboardList: <FaClipboardList />,
    FaTag: <FaTag />,
    FaDollarSign: <FaDollarSign />,
    FaMoneyBillAlt: <FaMoneyBillAlt />,
    FaCar: <FaCar />,
    FaCheckCircle: <FaCheckCircle />,
    FaChargingStation: <FaChargingStation />,
    FaIndustry: <FaIndustry />,
    FaCarSide: <FaCarSide />,
    FaCalendarAlt: <FaCalendarAlt />,
    FaRoad: <FaRoad />,
    FaCogs: <FaCogs />,
    FaGasPump: <FaGasPump />,
    FaTachometerAlt: <FaTachometerAlt />,
    FaWrench: <FaWrench />,
    FaCircle: <FaCircle />,
    FaPalette: <FaPalette />,
    FaDoorClosed: <FaDoorClosed />,
    FaIdCard: <FaIdCard />,
    FaTags: <FaTags />,
    FaFileAlt: <FaFileAlt />,
    FaPlus: <FaPlus />
  };
  
const IconField = ({icon}) => {
  return (
    <div className='text-primary bg-slate-400 rounded-full p-1.5'>{iconMap[icon]}</div>
  )
}

export default IconField