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
  MusicPostValidator,
  MusicPostValidatorType,
} from "@/lib/validator/music";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "react-query";
import { IError } from "@/types/interface/IError";
import toast from "react-hot-toast";
import { uploadImg } from "@/lib/axios/fetch/upload/upload-image";
import { uploadSong } from "@/lib/axios/fetch/upload/upload-song";
import IReturnFileInformation from "@/types/interface/IReturnFileInformation";
import { ISong, ISongDto } from "@/types/interface/ISongDTO";
import { fetchAddNewSong } from "@/lib/axios/fetch/song/add-new-song";
import bytesToMB from "@/utils/bytes-to-mb";
import useTimeout from "@/custom-hooks/use-time-out";

export default function AddMusicSection() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MusicPostValidatorType>({
    resolver: zodResolver(MusicPostValidator),
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
      reset();
    },
  });

  async function onSubmit(data: MusicPostValidatorType) {
    try {
      const [imgRes, songRes]: [
        IReturnFileInformation,
        IReturnFileInformation
      ] = await Promise.all([
        uploadImg(data.imgFile[0]),
        uploadSong(data.songFile[0]),
      ]);

      addMusic({
        songName: data.songName,
        size: bytesToMB(songRes.fileSize),
        songFileName: songRes.fileName,
        songURL: songRes.url,
        extension: songRes.extension,
        type: data.type as SONG_TYPE,
        imgURL: imgRes.url,
        author: data.author ?? undefined,
        imgFileName: imgRes.fileName,
        likes: 0,
        dislikes: 0,
        visibility: data.visibility,
      });
    } catch (error) {
      console.log(error);
      toast.error("Something is wrong, can't add new song");
    }
  }

  return (
    <div>
      <div>
        <Tooltip content="Add new music" className="poi" placement="bottom">
          <PlusCircle onClick={onOpen} className="poi" />
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
                      placeholder="Author"
                      label="Author Name"
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
                      error={errors.imgFile?.message?.toString()}
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
                        {...register("visibility")}
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
                  <Button startContent={<Plus />} color="primary" type="submit">
                    Action
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
