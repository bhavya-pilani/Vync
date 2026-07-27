"use client";
import { getWorkspaceMembers, removeMember } from "@/actions/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import { useMutationData } from "@/hooks/useMutationData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, User, Users, Trash2 } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  const [memberToRemove, setMemberToRemove] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { data, isFetched, isFetching } = useQueryData(
    [`workspace-members-modal-${workspaceId}`],
    () => getWorkspaceMembers(workspaceId),
  );

  const { mutate: onRemoveMember, isPending: isRemoving } = useMutationData(
    ["remove-member"],
    (data: { memberId: string }) => removeMember(workspaceId, data.memberId),
    `workspace-members-modal-${workspaceId}`,
  );

  if (!data) {
    return <div />;
  }

  const response = data as {
    status: number;
    data: MemberData[];
    isOwner?: boolean;
  };

  const { status, data: members, isOwner } = response;

  if (status !== 200 || !members || members.length === 0) {
    return <div />;
  }

  const handleRemoveClick = (memberId: string, memberName: string) => {
    setMemberToRemove({ id: memberId, name: memberName });
  };

  const handleConfirmRemove = () => {
    if (memberToRemove) {
      onRemoveMember({ memberId: memberToRemove.id });
      setMemberToRemove(null);
    }
  };

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
                <Loader2 />
              </div>
            ) : (
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-900/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
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
                    <div className="flex items-center gap-2 ml-2">
                      {member.isOwner && (
                        <span className="px-2 py-1 bg-purple-600/20 text-purple-400 text-xs font-medium rounded whitespace-nowrap">
                          Owner
                        </span>
                      )}
                      {isOwner && !member.isOwner && (
                        <button
                          onClick={() =>
                            handleRemoveClick(
                              member.id,
                              `${member.firstname} ${member.lastname}`,
                            )
                          }
                          className="p-1 hover:bg-red-500/20 rounded transition-colors text-red-400 hover:text-red-300"
                          title="Remove member"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
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
            <div className="flex items-center gap-3 flex-1">
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
            <div className="flex items-center gap-3 ml-4">
              {member.isOwner && (
                <span className="px-3 py-1 bg-purple-600/20 text-purple-400 text-sm font-medium rounded-full whitespace-nowrap">
                  Owner
                </span>
              )}
              {isOwner && !member.isOwner && (
                <button
                  onClick={() =>
                    handleRemoveClick(
                      member.id,
                      `${member.firstname} ${member.lastname}`,
                    )
                  }
                  className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400 hover:text-red-300"
                  title="Remove member"
                  disabled={isRemoving}
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <AlertDialog
        open={!!memberToRemove}
        onOpenChange={(open) => !open && setMemberToRemove(null)}
      >
        <AlertDialogContent className="bg-[#1A1A1D] border border-[#27272A] text-zinc-100">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-zinc-100">
              Remove Member
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              Are you sure you want to remove {memberToRemove?.name} from this
              workspace? They will no longer have access to any videos or
              folders.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel className="bg-neutral-800 hover:bg-neutral-700 text-zinc-100 border border-neutral-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmRemove}
              disabled={isRemoving}
              className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
            >
              {isRemoving ? "Removing..." : "Remove"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default WorkspaceMembersModal;
