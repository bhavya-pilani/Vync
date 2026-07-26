"use client";
import { getWorkspaceMembers } from "@/actions/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, User, Users } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Loader from "../loader";

type Props = {
  workspaceId: string;
  compact?: boolean;
};

type MemberData = {
  id: string;
  email: string;
  firstname: string | null;
  lastname: string | null;
  image: string | null;
  isOwner: boolean;
};

const WorkspaceMembersModal = ({ workspaceId, compact = false }: Props) => {
  const [open, setOpen] = useState(false);

  const { data, isFetched, isFetching } = useQueryData(
    [`workspace-members-modal-${workspaceId}`],
    () => getWorkspaceMembers(workspaceId),
  );

  if (!data) {
    return <div />;
  }

  const { status, data: members } = data as {
    status: number;
    data: MemberData[];
  };

  if (status !== 200 || !members || members.length === 0) {
    return <div />;
  }

  if (compact) {
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="group bg-[#1A1A1D] border border-[#27272A] rounded-3xl p-7 hover:border-[#9D4EDD]/40 hover:bg-[#1A1A1D]/80 hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl hover:shadow-[#9D4EDD]/5 w-full text-left"
        >
          <div className="bg-[#27272A] w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#9D4EDD]/20 group-hover:scale-110 transition-all duration-300">
            <Users
              className="text-zinc-300 group-hover:text-[#9D4EDD] transition-colors"
              size={24}
            />
          </div>
          <h3 className="text-zinc-100 font-semibold text-lg mb-2">
            Team Members
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {members.length} member{members.length !== 1 ? "s" : ""} in this
            workspace
          </p>
        </button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-[#1A1A1D] border border-[#27272A] text-zinc-100 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-zinc-100">Team Members</DialogTitle>
              <DialogDescription className="text-zinc-400">
                {members.length} member{members.length !== 1 ? "s" : ""} in this
                workspace
              </DialogDescription>
            </DialogHeader>

            {isFetching && !isFetched ? (
              <div className="flex justify-center py-8">
                <Loader2/>
              </div>
            ) : (
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-900/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.image || undefined} />
                        <AvatarFallback className="bg-zinc-800">
                          <User size={16} />
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <h4 className="text-zinc-100 font-medium text-sm truncate">
                          {member.firstname || ""} {member.lastname || ""}
                        </h4>
                        <p className="text-zinc-500 text-xs truncate">
                          {member.email}
                        </p>
                      </div>
                    </div>
                    {member.isOwner && (
                      <span className="px-2 py-1 bg-purple-600/20 text-purple-400 text-xs font-medium rounded whitespace-nowrap ml-2">
                        Owner
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <div className="space-y-4">
      <div className="border border-zinc-700 rounded-lg overflow-hidden">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between p-4 border-b border-zinc-700 last:border-b-0 hover:bg-zinc-900/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={member.image || undefined} />
                <AvatarFallback>
                  <User size={20} />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h3 className="text-zinc-100 font-medium">
                  {member.firstname || ""} {member.lastname || ""}
                </h3>
                <p className="text-zinc-500 text-sm">{member.email}</p>
              </div>
            </div>
            <div>
              {member.isOwner && (
                <span className="px-3 py-1 bg-purple-600/20 text-purple-400 text-sm font-medium rounded-full">
                  Owner
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkspaceMembersModal;
