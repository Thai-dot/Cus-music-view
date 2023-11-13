import { DropdownItem, DropdownMenu, Tooltip } from "@nextui-org/react";
import { MoreHorizontal, Settings, Share2 } from "lucide-react";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  DropdownTrigger,
  Dropdown,
} from "@nextui-org/react";

import DisplayAssignSongSection from "./display-assign-song-section";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function MoreSettingPlaylist() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <Tooltip content="More" className="z-[10]">
        <Dropdown>
          <DropdownTrigger>
            <MoreHorizontal
              size={40}
              className="poi text-slate-300 hover:text-slate-50 transition hover:scale-105  z-[10]"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem
              key="edit"
              onClick={onOpen}
              startContent={<Settings size={14} />}
            >
              Edit
            </DropdownItem>
            <DropdownItem key="share" startContent={<Share2 size={14} />}>
              Share
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Assigning song to play list
              </ModalHeader>
              <ModalBody>
                <DisplayAssignSongSection />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
