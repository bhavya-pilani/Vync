"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import Loader from "../loader";
import FolderDuotone from "@/components/icons/folder-duotone";
import { useMutationData, useMutationDataState } from "@/hooks/useMutationData";
import { renameFolders, deleteFolder } from "@/actions/workspace";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Props = {
  name: string;
  id: string;
  optimistic?: boolean;
  count?: number;
};

const Folder = ({ id, name, optimistic, count }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const folderCardRef = useRef<HTMLDivElement | null>(null);
  const pathName = usePathname();
  const router = useRouter();
  const [onRename, setOnRename] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const Rename = () => setOnRename(true);
  const Renamed = () => setOnRename(false);

  //optimistic
  const { mutate, isPending } = useMutationData(
    ["rename-folders"],
    (data: { name: string }) => renameFolders(id, data.name),
    "workspace-folders",
    Renamed,
  );

  const { mutate: onDeleteFolder, isPending: isDeleting } = useMutationData(
    ["delete-folder"],
    () => deleteFolder(id),
    "workspace-folders",
  );

  const { latestVariables } = useMutationDataState(["rename-folders"]);

  const handleFolderClick = () => {
    if (onRename) return;
    router.push(`${pathName}/folder/${id}`);
  };

  const handleNameDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    Rename();
    //Rename functionality
  };

  const updateFolderName = (e: React.FocusEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      if (inputRef.current.value) {
        mutate({ name: inputRef.current.value, id });
      } else Renamed();
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    onDeleteFolder({});
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div
        onClick={handleFolderClick}
        ref={folderCardRef}
        className={cn(
          optimistic && "opacity-60",
          "flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] py-4 px-4 rounded-lg  border-[1px]",
        )}
      >
        <Loader state={isPending || isDeleting}>
          <div className="flex flex-col gap-[1px] flex-1">
            {onRename ? (
              <Input
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                  updateFolderName(e);
                }}
                autoFocus
                placeholder={name}
                className="border-none text-base w-full outline-none text-neutral-300 bg-transparent p-0"
                ref={inputRef}
              />
            ) : (
              <p
                onClick={(e) => e.stopPropagation()}
                className="text-neutral-300"
                onDoubleClick={handleNameDoubleClick}
              >
                {latestVariables &&
                latestVariables.status === "pending" &&
                latestVariables.variables.id === id
                  ? latestVariables.variables.name
                  : name}
              </p>
            )}
            <span className="text-sm text-neutral-500">
              {count || 0} videos
            </span>
          </div>
        </Loader>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDeleteClick}
            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400 hover:text-red-300"
            title="Delete folder"
          >
            <Trash2 size={18} />
          </button>
          <FolderDuotone />
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-[#1A1A1D] border border-[#27272A] text-zinc-100">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-zinc-100">
              Delete Folder
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              Are you sure you want to delete "{name}"? This will also delete
              all videos in this folder from both your database and Cloudinary.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel className="bg-neutral-800 hover:bg-neutral-700 text-zinc-100 border border-neutral-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Folder;
