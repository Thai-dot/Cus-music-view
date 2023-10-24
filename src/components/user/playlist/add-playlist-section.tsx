"use client";

import { Input, Select, SelectItem, Switch, Tooltip } from "@nextui-org/react";
import { Eye, EyeOff, Plus, PlusCircle } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import React from "react";
import FormControl from "@/components/ui-component/form-control";
import FileUpload from "@/components/ui-component/file-upload";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "react-query";
import { IError } from "@/types/interface/IError";
import toast from "react-hot-toast";
import { uploadImg } from "@/lib/axios/fetch/upload/upload-image";
import { uploadSong } from "@/lib/axios/fetch/upload/upload-song";
import IReturnFileInformation from "@/types/interface/IReturnFileInformation";
import { fetchAddNewSong } from "@/lib/axios/fetch/song/input-song";
import bytesToMB from "@/utils/bytes-to-mb";
import { useAppDispatch } from "@/redux/store";
import { setFormSubmitted } from "@/redux/slice/song";
import {
  ALLOWED_IMG_UPLOAD_TYPE,
  FILE_UPLOAD_MAX_SIZE,
} from "@/constant/config";
import {
  AddPlaylistValidator,
  AddPlaylistValidatorType,
} from "@/lib/validator/playlist";
import { IPlayList, IPlayListDTO } from "@/types/interface/IPlayList";
import { playlistTypeArray } from "@/types/enum/playlist-type";
import { fetchAddPlayListSong } from "@/lib/axios/fetch/playlist/input-playlist";

export default function AddPlayListSection() {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isSelected, setIsSelected] = React.useState(false);
  const [fileErr, setFileErr] = React.useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddPlaylistValidatorType>({
    resolver: zodResolver(AddPlaylistValidator),
    defaultValues: {
      name: "",

      imgFile: undefined,
      visibility: false,
      type: "",
    },
  });

  const { isLoading, mutate: addPlaylist } = useMutation<
    IPlayList,
    IError,
    IPlayListDTO
  >({
    mutationFn: async (reqData) => {
      const { data } = await fetchAddPlayListSong(reqData);

      return data as IPlayList;
    },
    onError: () => {
      toast.error("Added new song failed 😣");
    },
    onSuccess: () => {
      toast.success("Added new song successfully 😂");

      setTimeout(onClose, 2000);
      dispatch(setFormSubmitted(true));
      window.location.reload();
      reset();
    },
  });

  async function onSubmit(data: AddPlaylistValidatorType) {
    try {
      setFileErr("");
      let imgUploadInfor: IReturnFileInformation | null = null;

      let dto: any = {
        name: data.name,

        type: !!data.type ? data.type : "OTHERS",

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
          dto["imgURL"] = imgUploadInfor.url;

          dto["imgName"] = imgUploadInfor.fileName;
        }
      }

      addPlaylist({
        ...dto,
      });
    } catch (error) {
      console.log(error);
      toast.error("Something is wrong, can't add new song");
    }
  }

  return (
    <div>
      <div>
        <Tooltip content="Add new playlist" className="poi" placement="bottom">
          <PlusCircle
            onClick={() => {
              onOpen();
            }}
            className="poi text-primary"
          />
        </Tooltip>
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
                  Add New Play List
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
                      label="Music's background image upload"
                      error={fileErr}
                      {...register("imgFile")}
                    />
                  </FormControl>

                  <FormControl>
                    <div className="flex-center justify-between">
                      <Select
                        {...register("type")}
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
                    Add
                  </Button>
                </ModalFooter>
              </form>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
