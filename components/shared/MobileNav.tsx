import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
// import { Separator } from "../ui/separator";
import NavItems from "./NavItems";
import { Separator } from "../ui/separator";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const MobileNav = () => {
  return (
    <nav className="md:hidden dark:text-white">
      <Sheet>
        <SheetTrigger className="align-middle bg-white dark:bg-black dark:text-white">
          <Image
            src="/assets/icons/menu.svg"
            alt="menu"
            width={24}
            height={24}
            className="cursor-pointer dark:bg-white rounded-lg"
          />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6  bg-white dark:bg-gray-800 md:hidden dar:text-white">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={128}
            height={38}
          />
          <Separator className="border border-gray-50" />
          <NavItems />
        </SheetContent>
      </Sheet>

      {/* <DropdownMenu>
        <DropdownMenuTrigger className="align-middle">
          <Image
            src="/assets/icons/menu.svg"
            alt="menu"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="border border-gray-50" />
          <DropdownMenuItem className="flex flex-col gap-6 bg-white md:hidden">
            <Image
              src="/assets/images/logo.svg"
              alt="logo"
              width={128}
              height={38}
            />
            <NavItems />
          </DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
          <DropdownMenuItem>Paid Services</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </nav>
  );
};

export default MobileNav;
