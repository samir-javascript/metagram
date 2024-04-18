import sunIcon from "../../assets/icons/sun.svg"
import moonIcon from "../../assets/icons/moon.svg"
import computerIcon from "../../assets/icons/computer.svg"


import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
 
  MenubarTrigger,
} from "@/components/ui/menubar"
import { useTheme } from "../../context/ThemeProvider"
const Theme = () => {
  const themes = [
    { value: "light", label: "Light", icon: sunIcon },
    { value: "dark", label: "Dark", icon: moonIcon},
    { value: "system", label: "System", icon: computerIcon },
  ];
  const { mode,setMode} = useTheme()
  console.log(mode, "MODE FROM THEME")
  return (
    <Menubar className="relative bg-transparent border-none outline-none">
  <MenubarMenu>
    <MenubarTrigger className="focus:bg-secondary-100 data-[state=open]:bg-secondary-100
           dark:focus:bg-secondary-800  dark:data-[state=open]:bg-secondary-800 
        "
        >
          {mode === "light" ? (
              <img src={sunIcon} alt="sun icon" className="w-[20px] active-theme  h-[20px] object-contain " />
          ): (
           <img src={moonIcon} alt="moon icon" className="w-[20px] h-[20px] object-contain " />
          )}
    </MenubarTrigger>
    <MenubarContent className="absolute z-[999] right-[-3rem] mt-3 min-w-[120px] bg-white dark:bg-secondary-800 py-2 rounded border dark:border-secondary-300   ">
        {themes.map((item)=> (
            <MenubarItem 
            className="flex items-center gap-4 px-2.5 py-2 focus:bg-secondary-100 dark:focus:bg-[#222]"
            onClick={() => {
              setMode(item.value);
              if (item.value !== "system") {
                localStorage.theme = item.value;
              } else {
                localStorage.removeItem("theme");
              }
            }}
            key={item.value}>
                 <img className={`${mode === item.value ? "active-theme" : ""} w-[16px] h-[16px] object-contain`} src={item.icon} alt={item.label} />
                 <p className={`${item.value === mode ? "text-orange-500" : "text-black dark:text-white"} font-semibold  text-[15px] `}> {item.label} </p>
            </MenubarItem>
        ))}
    </MenubarContent>
  </MenubarMenu>
</Menubar>

  )
}

export default Theme