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
import SONG_TYPE, { songTypeArray } from "@/types/enum/song-type";
import { useForm } from "react-hook-form";
import {
  AddMusicValidator,
  AddMusicValidatorType,
} from "@/lib/validator/music";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "react-query";
import { IError } from "@/types/interface/IError";
import toast from "react-hot-toast";
import { uploadImg } from "@/lib/axios/fetch/upload/upload-image";
import { uploadSong } from "@/lib/axios/fetch/upload/upload-song";
import IReturnFileInformation from "@/types/interface/IReturnFileInformation";
import { ISong, ISongDto } from "@/types/interface/ISongDTO";
import { fetchAddNewSong } from "@/lib/axios/fetch/song/input-song";
import bytesToMB from "@/utils/bytes-to-mb";
import { useAppDispatch } from "@/redux/store";
import { setFormSubmitted } from "@/redux/slice/song";
import {
  ALLOWED_IMG_UPLOAD_TYPE,
  FILE_UPLOAD_MAX_SIZE,
} from "@/constant/config";

export default function AddMusicSection() {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isSelected, setIsSelected] = React.useState(false);
  const [fileErr, setFileErr] = React.useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddMusicValidatorType>({
    resolver: zodResolver(AddMusicValidator),
    defaultValues: {
      songName: "",
      author: "",
      songFile: undefined,
      imgFile: undefined,
      visibility: false,
      type: "",
    },
  });

  const { isLoading, mutate: addMusic } = useMutation<ISong, IError, ISongDto>({
    mutationFn: async (reqData) => {
      const { data } = await fetchAddNewSong(reqData);

      return data as ISong;
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

  async function onSubmit(data: AddMusicValidatorType) {
    try {
      setFileErr("");
  
      let imgUploadInfor: IReturnFileInformation | null = null;

      let dto: any = {
        songName: data.songName,

        type: !!data.type ? data.type : "OTHERS",

        author: data.author ?? "No artist",

        visibility: isSelected,
        likes: 0,
        dislikes: 0,
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

          dto["imgFileName"] = imgUploadInfor.fileName;
        }
      }

      const [songRes]: [IReturnFileInformation] = await Promise.all([
        uploadSong(data.songFile[0]),
      ]);

      addMusic({
        ...dto,
        size: bytesToMB(songRes.fileSize),
        songFileName: songRes.fileName,
        songURL: songRes.url,
        extension: songRes.extension,
      });
    } catch (error) {
      console.error(error);
      toast.error("Something is wrong, can't add new song");
    }
  }

  return (
    <div>
      <div>
        <Tooltip content="Add new music" className="poi" placement="bottom">
          <PlusCircle
            onClick={() => {
              onOpen();
              dispatch(setFormSubmitted(false));
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
                  Add New Song
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
                      error={errors.songFile?.message?.toString()}
                      label="Music's file upload"
                      {...register("songFile")}
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
