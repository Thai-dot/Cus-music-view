"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

import { Listbox, ListboxItem } from "@nextui-org/react";
import Link from "next/link";

export default function MenuUser() {
  const pathName = usePathname();
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([pathName]));
  const router = useRouter();

  const listMenu = [
    {
      name: "User Information",
      link: "/user/information",
    },
    {
      name: "My Playlist",
      link: "/user/play-list",
    },
    {
      name: "My Music",
      link: "/user/music",
    },
  ];

  return (
    <div className="border rounded-md p-2">
      <Listbox
        aria-label="Actions"
        itemClasses={{
          title: "text-lg",
        }}
        variant="shadow"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        // @ts-ignore
        onSelectionChange={(key) => setSelectedKeys(key)}
      >
        {listMenu.map((item) => {
          return (
            <ListboxItem
              onClick={() => {
                router.push(item.link);
                router.refresh();
              }}
              key={item.link}
              className="w-full"
            >
              {item.name}
            </ListboxItem>
          );
        })}
      </Listbox>
    </div>
  );
}
