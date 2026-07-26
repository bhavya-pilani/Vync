"use client";

import { WorkSpace } from "../../../generated/prisma/client";
import { usePathname, useParams } from "next/navigation";
import React, { useState } from "react";
import { Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import WorkspaceMembersModal from "../workspace-members-modal";

type Props = {
  workspace: WorkSpace;
};

const GlobalHeader = ({ workspace }: Props) => {
  const [membersOpen, setMembersOpen] = useState(false);
  const params = useParams();
  const workspaceId = params.workspaceId as string;

  //Pathname
  const pathName = usePathname().split(`/dashboard/${workspace.id}`)[1];
  return (
    <>
      <article className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-[#707070] text-xs">
            {pathName.includes("video")
              ? ""
              : workspace.type.toLocaleUpperCase()}
          </span>
          <h1 className="text-4xl font-bold">
            {pathName &&
            !pathName.includes("folder") &&
            !pathName.includes("video")
              ? pathName.charAt(1).toUpperCase() +
                pathName.slice(2).toLowerCase()
              : pathName.includes("video")
                ? ""
                : "My Library"}
          </h1>
        </div>

        <button
          onClick={() => setMembersOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-700/50 hover:border-zinc-600 transition-all text-zinc-400 hover:text-zinc-200"
        >
          <Users size={18} />
          <span className="text-sm font-medium">Members</span>
        </button>
      </article>

      <Dialog open={membersOpen} onOpenChange={setMembersOpen}>
        <DialogContent className="bg-[#1A1A1D] border border-[#27272A] text-zinc-100 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-zinc-100">Team Members</DialogTitle>
            <DialogDescription className="text-zinc-400">
              View all members in {workspace.name}
            </DialogDescription>
          </DialogHeader>
          <WorkspaceMembersModal workspaceId={workspaceId} compact={false} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GlobalHeader;
