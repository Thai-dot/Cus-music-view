import { DropdownItem, DropdownMenu, Tooltip } from "@nextui-org/react";
import { MoreHorizontal, PlusCircle, Settings } from "lucide-react";

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
import PlayListToolSection from "@/components/user/playlist/tool-playlist-section";
import { useAppSelector } from "@/redux/store";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function MoreSettingPlaylist() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [customOpen, setCustomOpen] = React.useState(false);
  const { currentPlaylist } = useAppSelector(
    (state) => state.playlistPlayerReducer
  );

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
              key="add"
              onClick={onOpen}
              startContent={<PlusCircle size={14} />}
            >
              Add song
            </DropdownItem>

            <DropdownItem
              key="edit"
              startContent={<Settings size={14} />}
              onClick={() => setCustomOpen(true)}
            >
              Edit
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

      {currentPlaylist && (
        <PlayListToolSection
          customClose={setCustomOpen}
          customOpen={customOpen}
          isPlaylistPlayer
          playlist={currentPlaylist}
        />
      )}
    </div>
  );
}
