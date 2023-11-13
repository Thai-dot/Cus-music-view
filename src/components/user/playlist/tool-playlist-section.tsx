"use client";

import { Input, Select, SelectItem, Switch, Tooltip } from "@nextui-org/react";
import {
  Eye,
  EyeOff,
  MoreVertical,
  PenSquare,
  Plus,
  Settings,
  SidebarOpenIcon,
  Trash2,
} from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import React from "react";
import FormControl from "@/components/ui-component/form-control";
import FileUpload from "@/components/ui-component/file-upload";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { QueryClient, useMutation } from "react-query";
import { IError } from "@/types/interface/IError";
import toast from "react-hot-toast";
import { deleteImg, uploadImg } from "@/lib/axios/fetch/upload/upload-image";
import IReturnFileInformation from "@/types/interface/IReturnFileInformation";

import { useAppDispatch } from "@/redux/store";
import { setFormSubmitted } from "@/redux/slice/song";
import {
  ALLOWED_IMG_UPLOAD_TYPE,
  FILE_UPLOAD_MAX_SIZE,
} from "@/constant/config";
import { createPortal } from "react-dom";
import { IPlayList, IPlayListDTO } from "@/types/interface/IPlayList";
import {
  AddPlaylistValidator,
  AddPlaylistValidatorType,
} from "@/lib/validator/playlist";
import { fetchUpdatePlayList } from "@/lib/axios/fetch/playlist/input-playlist";
import { deletePlaylists } from "@/lib/axios/fetch/playlist/delete-playlist";
import { playlistTypeArray } from "@/types/enum/playlist-type";
import { useRouter } from "next/navigation";

interface UpdatePlayListSectionProps {
  playlist: IPlayList;
}

export default function PlayListToolSection({
  playlist,
}: UpdatePlayListSectionProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onOpenChange: onOpenChangeDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const [isSelected, setIsSelected] = React.useState(playlist.visibility);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        refetchOnWindowFocus: true,
        cacheTime: 0,
      },
    },
  });

  const refreshQuery = async () => {
    await queryClient.refetchQueries(["fetchSongByUser"], { active: true });
    await queryClient.refetchQueries(["song-user-infinite"]);
  };

  const [fileErr, setFileErr] = React.useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddPlaylistValidatorType>({
    resolver: zodResolver(AddPlaylistValidator),
    defaultValues: {
      name: playlist.name,

      imgFile: undefined,
      visibility: playlist.visibility,
      type: playlist.type,
    },
  });

  const { isLoading, mutate: updatePlaylist } = useMutation<
    IPlayList,
    IError,
    IPlayListDTO
  >({
    mutationFn: async (reqData) => {
      const { data } = await fetchUpdatePlayList(playlist.id, reqData);

      return data as IPlayList;
    },
    onError: () => {
      toast.error("Updated playlist failed 😣");
    },
    onSuccess: async () => {
      toast.success("Updated playlist successfully 😂");
      await refreshQuery();
      setTimeout(onClose, 2000);
      dispatch(setFormSubmitted(true));

      window.location.reload();
    },
  });

  async function onSubmit(data: AddPlaylistValidatorType) {
    try {
      setFileErr("");
      let imgUploadInfor: IReturnFileInformation | null = null;

      let dto: any = {
        name: data.name,

        type: !!data.type ? data.type : playlist.type,

        visibility: isSelected,
      };
      if (data.imgFile[0]) {
        if (FILE_UPLOAD_MAX_SIZE < data.imgFile[0]?.size) {
          setFileErr("Max image size is 8MB.");
          throw new Error("Max image size is 8MB.");
        }
        if (!ALLOWED_IMG_UPLOAD_TYPE.includes(data.imgFile[0]?.type)) {
          setFileErr("Only .jpg, .jpeg, .png and .webp formats are supported.");

          throw new Error(
            "Only .jpg, .jpeg, .png and .webp formats are supported."
          );
        }
        imgUploadInfor = await uploadImg(data.imgFile[0]);
        if (imgUploadInfor) {
          await deleteImg(playlist.imgName);
          dto["imgURL"] = imgUploadInfor.url;

          dto["imgName"] = imgUploadInfor.fileName;
        }
      }

      updatePlaylist({
        ...dto,
      });
    } catch (error) {
      console.error(error);

      toast.error("Something is wrong, can't update playlist");
    }
  }

  const deletePlaylist = async (id: number) => {
    try {
      await deletePlaylists([id]);
      toast.success("Deleted playlist successfully ");

      setTimeout(onCloseDelete, 1500);
      window.location.reload();
    } catch (error) {
      toast.error("Failed to delete the playlist");
    }
  };

  return (
    <div>
      <div>
        <Tooltip content="Interact" className="poi">
          <Dropdown>
            <DropdownTrigger>
              <MoreVertical className="poi" />
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                startContent={<SidebarOpenIcon size={18} />}
                key="new"
                onClick={() => {
                  router.push(`/playlist-player/${playlist.id}`);
                  router.refresh();
                }}
              >
                Open
              </DropdownItem>
              <DropdownItem
                startContent={<PenSquare size={18} />}
                key="copy"
                onClick={onOpen}
              >
                Edit
              </DropdownItem>

              <DropdownItem
                startContent={<Trash2 size={18} />}
                onClick={onOpenDelete}
                key="delete"
                className="text-danger"
                color="danger"
              >
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Tooltip>
        {createPortal(
          <Modal
            isOpen={isOpen}
            backdrop="opaque"
            className=" z-[10000]"
            onOpenChange={onOpenChange}
          >
            <ModalContent>
              {(onClose) => (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalHeader className="flex flex-col gap-1">
                    Update Playlist
                  </ModalHeader>
                  <ModalBody>
                    <FormControl>
                      <Input
                        placeholder="Playlist name"
                        label="Playlist Name"
                        maxLength={100}
                        errorMessage={errors.name?.message}
                        {...register("name")}
                      />
                    </FormControl>

                    <FormControl>
                      <FileUpload
                        label="Playlist's background image update"
                        error={fileErr}
                        {...register("imgFile")}
                      />
                    </FormControl>

                    <FormControl>
                      <div className="flex-center justify-between">
                        <Select
                          {...register("type")}
                          placeholder={playlist.type}
                          label="Playlist Type"
                          size="sm"
                          className=" w-44 "
                        >
                          {playlistTypeArray.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </Select>

                        <Switch
                          isSelected={isSelected}
                          onValueChange={setIsSelected}
                          startContent={<Eye />}
                          endContent={<EyeOff />}
                        >
                          Visibility
                        </Switch>
                      </div>
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      startContent={<Plus />}
                      isLoading={isLoading}
                      color="primary"
                      type="submit"
                    >
                      Update
                    </Button>
                  </ModalFooter>
                </form>
              )}
            </ModalContent>
          </Modal>,
          document.body
        )}

        <Modal
          isOpen={isOpenDelete}
          backdrop="opaque"
          className=" z-[10000]"
          onOpenChange={onOpenChangeDelete}
        >
          <ModalContent>
            {(onCloseDelete) => (
              <div className="p-8">
                <h4 className="mt-1 mb-6">Want to delete this playlist???</h4>
                <div className="flex-center justify-between ">
                  <Button color="default" onPress={onCloseDelete}>
                    Cancel
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => deletePlaylist(playlist.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </ModalContent>
        </Modal>

        {/* <PlaylistPlayerSection
          id={playlist.id}
          isOpen={isOpenPlaylist}
          onOpenChange={onOpenChangePlayList}
          onClose={onClosePlayList}
        /> */}
      </div>
    </div>
  );
}
