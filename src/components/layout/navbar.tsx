"use client";

import React from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import { usePathname } from "next/navigation";

import { signOut, useSession } from "next-auth/react";
import { useScroll, useTransform, motion, easeInOut } from "framer-motion";
import { LogIn, User2 } from "lucide-react";

export default function NavbarLayout() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathName = usePathname();
  const isHomePage = pathName === "/";

  const leftDropdownMenu = [
    {
      name: "User",
      link: "/user",
    },
    {
      name: "My Lists",
      link: "/user/list",
    },
    {
      name: "Log out",
    },
  ];

  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.1],
    ["rgba(0, 0, 0, 0)", "#fcfcfc"],
    {
      ease: easeInOut,
    }
  );

  const { data: session } = useSession();

  const menuItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Music List",
      link: "/lists",
    },
  ];

  return (
    <motion.nav
      style={{
        backgroundColor: isHomePage ? backgroundColor : "#f8fafc",
        transition: "background-color 0.2s",
      }}
      className="fixed w-full z-[200] border-transparent"
    >
      <Navbar className="bg-transparent" onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden text-[#0070F0]"
          />
          <NavbarBrand>
            <Link href="/">
              <p className="font-bold text-amber-500">ACME</p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((item) => {
            return (
              <NavbarItem key={item.name} isActive={pathName === item.link}>
                <Link color="primary" href={item.link}>
                  {item.name}
                </Link>
              </NavbarItem>
            );
          })}
        </NavbarContent>
        <NavbarContent justify="end">
          {session?.user ? (
            <NavbarItem>
              <Dropdown>
                <DropdownTrigger>
                  <User2 color="#0070F0" cursor="pointer" />
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  {leftDropdownMenu.map((item) => {
                    if (item.name === "Log out") {
                      return (
                        <DropdownItem key={item.name}>
                          {" "}
                          <div onClick={() => signOut()}>{item.name}</div>
                        </DropdownItem>
                      );
                    }

                    return (
                      <DropdownItem key={item.name}>
                        {" "}
                        <Link href={item.link}>{item.name}</Link>
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          ) : (
            <>
              <NavbarItem className="hidden lg:flex">
                <Link href="/sign-in">Sign In</Link>
              </NavbarItem>
              <NavbarItem className="hidden lg:flex">
                <Button
                  as={Link}
                  color="primary"
                  href="/sign-up"
                  variant="flat"
                >
                  Sign Up
                </Button>
              </NavbarItem>
              <NavbarItem className="lg:hidden flex">
                <Dropdown>
                  <DropdownTrigger>
                    <LogIn color="#0070F0" cursor="pointer" />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="signIn">
                      {" "}
                      <Link href="/sign-in">Sign In</Link>
                    </DropdownItem>
                    <DropdownItem key="signUp">
                      {" "}
                      <Link href="/sign-up">Sign Up</Link>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.name}-${index}`}>
              <Link className="w-full" href={item.link} size="lg">
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </motion.nav>
  );
}
