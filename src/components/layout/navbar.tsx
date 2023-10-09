"use client";

import React, { useState } from "react";

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
  Avatar,
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
import { LogIn } from "lucide-react";
import { decodeToken, isTokenExpired } from "@/utils/jwt-function";

export default function NavbarLayout() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathName = usePathname();
  const isHomePage = pathName === "/";

  const leftDropdownMenu = [
    {
      name: "User",
      link: "/user/information",
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

  const isExpired = isTokenExpired(session?.user.access_token ?? "");
  const email = decodeToken(session?.user.access_token ?? "");

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
      className="fixed w-full z-20 border-transparent"
    >
      <Navbar className="bg-transparent" onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden text-amber-500"
          />
          <NavbarBrand>
            <Link href="/">
              <p className="font-extrabold text-amber-500 ">YML</p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((item) => {
            return (
              <NavbarItem key={item.name} isActive={pathName === item.link}>
                <Link className="text-amber-500 font-semibold" href={item.link}>
                  {item.name}
                </Link>
              </NavbarItem>
            );
          })}
        </NavbarContent>
        <NavbarContent justify="end">
          {!isExpired ? (
            <NavbarItem>
              <Dropdown>
                <DropdownTrigger>
                  <Avatar
                    name={email.email.slice(0, 1)}
                    classNames={{
                      base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                    }}
                    className=" cursor-pointer uppercase"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  {leftDropdownMenu.map((item) => {
                    if (item.name === "Log out") {
                      return (
                        <DropdownItem key={item.name}>
                          {" "}
                          <div
                            onClick={() => signOut()}
                            className="text-amber-500"
                          >
                            {item.name}
                          </div>
                        </DropdownItem>
                      );
                    }

                    return (
                      <DropdownItem key={item.name}>
                        {" "}
                        <Link
                          href={item.link}
                          className="w-full text-amber-500"
                        >
                          {item.name}
                        </Link>
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          ) : (
            <>
              <NavbarItem className="hidden lg:flex">
                <Link href="/sign-in" className="text-amber-500">
                  Sign In
                </Link>
              </NavbarItem>
              <NavbarItem className="hidden lg:flex">
                <Link href="/sign-up" className="text-amber-500">
                  Sign Up
                </Link>
              </NavbarItem>
              <NavbarItem className="lg:hidden flex">
                <Dropdown>
                  <DropdownTrigger>
                    <LogIn className="text-amber-500" cursor="pointer" />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="signIn">
                      {" "}
                      <Link href="/sign-in" className="text-amber-500">
                        Sign In
                      </Link>
                    </DropdownItem>
                    <DropdownItem key="signUp">
                      {" "}
                      <Link href="/sign-up" className="text-amber-500">
                        Sign Up
                      </Link>
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
              <Link
                className="w-full text-amber-500"
                href={item.link}
                size="lg"
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </motion.nav>
  );
}
