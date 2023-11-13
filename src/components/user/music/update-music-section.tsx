"use client";

import {
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
  Switch,
  Tooltip,
} from "@nextui-org/react";
import { Eye, EyeOff, PenSquare, Plus, Settings, Trash2 } from "lucide-react";
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
import { songTypeArray } from "@/types/enum/song-type";
import { useForm } from "react-hook-form";
import {
  UpdateMusicValidator,
  UpdateMusicValidatorType,
} from "@/lib/validator/music";
import { zodResolver } from "@hookform/resolvers/zod";

import { QueryClient, useMutation } from "react-query";
import { IError } from "@/types/interface/IError";
import toast from "react-hot-toast";
import { deleteImg, uploadImg } from "@/lib/axios/fetch/upload/upload-image";
import IReturnFileInformation from "@/types/interface/IReturnFileInformation";
import { ISong, ISongDto } from "@/types/interface/ISongDTO";
import { fetchUpdateSong } from "@/lib/axios/fetch/song/input-song";
import { useAppDispatch } from "@/redux/store";
import { setFormSubmitted } from "@/redux/slice/song";
import {
  ALLOWED_IMG_UPLOAD_TYPE,
  FILE_UPLOAD_MAX_SIZE,
} from "@/constant/config";
import { deleteSongs } from "@/lib/axios/fetch/song/delete-song";
import { createPortal } from "react-dom";

interface UpdateSongSectionProps {
  song: ISong;
}

export default function UpdateSongSection({ song }: UpdateSongSectionProps) {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onOpenChange: onOpenChangeDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const [isSelected, setIsSelected] = React.useState(song.visibility);

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
  } = useForm<UpdateMusicValidatorType>({
    resolver: zodResolver(UpdateMusicValidator),
    defaultValues: {
      songName: song.songName,
      author: song.author,
      imgFile: undefined,
      visibility: song.visibility,
      type: song.type,
    },
  });

  const { isLoading, mutate: updateMusic } = useMutation<
    ISong,
    IError,
    ISongDto
  >({
    mutationFn: async (reqData) => {
      const { data } = await fetchUpdateSong(song.id, reqData);

      return data as ISong;
    },
    onError: () => {
      toast.error("Updated song failed 😣");
    },
    onSuccess: async () => {
      toast.success("Updated song successfully 😂");
      await refreshQuery();
      setTimeout(onClose, 2000);
      dispatch(setFormSubmitted(true));

      window.location.reload();
    },
  });

  async function onSubmit(data: UpdateMusicValidatorType) {
    try {
      setFileErr("");

      let imgUploadInfor: IReturnFileInformation | null = null;

      let dto: any = {
        songName: data.songName,

        type: !!data.type ? data.type : song.type,

        author: data.author ?? song.author,

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
          await deleteImg(song.imgFileName);
          dto["imgURL"] = imgUploadInfor.url;

          dto["imgFileName"] = imgUploadInfor.fileName;
        }
      }

      updateMusic({
        ...dto,
      });
    } catch (error) {
      console.error(error);

      toast.error("Something is wrong, can't add update song");
    }
  }

  const deleteSong = async (id: number) => {
    try {
      await deleteSongs([id]);
      toast.success("Deleted song successfully ");
      dispatch(setFormSubmitted(true));
      setTimeout(onCloseDelete, 1500);
      window.location.reload();
    } catch (error) {
      toast.error("Failed to delete the song");
    }
  };

  return (
    <div>
      <div>
        <Tooltip content="Update this music" className="poi" placement="bottom">
          <Dropdown>
            <DropdownTrigger>
              <Settings className="poi hover:text-slate-600" />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                key="update"
                onClick={() => {
                  onOpen();
                  dispatch(setFormSubmitted(false));
                }}
                startContent={<PenSquare size={18} />}
                className="hover:text-slate-700 poi"
              >
                Update this song
              </DropdownItem>

              <DropdownItem
                key="delete"
                startContent={<Trash2 size={18} />}
                className="text-danger poi"
                color="danger"
                onClick={() => {
                  onOpenDelete();
                  dispatch(setFormSubmitted(false));
                }}
              >
                Delete this song
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
                    Update Song
                  </ModalHeader>
                  <ModalBody>
                    <FormControl>
                      <Input
                        placeholder="Song name"
                        label="Song Name"
                        maxLength={100}
                        errorMessage={errors.songName?.message}
                        {...register("songName")}
                      />
                    </FormControl>

                    <FormControl>
                      <Input
                        placeholder="Artist"
                        label="Artist Name"
                        maxLength={120}
                        errorMessage={errors.author?.message}
                        {...register("author")}
                      />
                    </FormControl>

                    <FormControl>
                      <FileUpload
                        label="Music's background image update"
                        error={fileErr}
                        {...register("imgFile")}
                      />
                    </FormControl>

                    <FormControl>
                      <div className="flex-center justify-between">
                        <Select
                          {...register("type")}
                          placeholder={song.type}
                          label="Song Type"
                          size="sm"
                          className=" w-44 "
                        >
                          {songTypeArray.map((item) => (
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
                <h4 className="mt-1 mb-6">Want to delete this song???</h4>
                <div className="flex-center justify-between ">
                  <Button color="default" onPress={onCloseDelete}>
                    Cancel
                  </Button>
                  <Button color="danger" onClick={() => deleteSong(song.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
