export const defaultIconPath="/icons/";
export const CreateIcon=(standardName)=>{
  return `${defaultIconPath}${standardName}.ico`; 
}
export const Icons={
  file:CreateIcon("2"),
  application:CreateIcon("15"),
  text:CreateIcon("19"),
  mail:CreateIcon("20"),
  image:CreateIcon("21"),
  music:CreateIcon("22"),
  video:CreateIcon("23"),
  internet:CreateIcon("25"),
  printer:CreateIcon("26"),
  controlPanel:CreateIcon("27"),
  floppyDisk:CreateIcon("28"),
  diskette:CreateIcon("29"),
  cd:CreateIcon("30"),
  drive:CreateIcon("35"),
  windowsDrive:CreateIcon("36"),
  dvd:CreateIcon("37"),
  dvdr:CreateIcon("38"),
  dvdram:CreateIcon("39"),
  dvdrom:CreateIcon("40"),
  dvdrw:CreateIcon("41"),
  recyclingBin:CreateIcon("54"),
}