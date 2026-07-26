"use client";
import { getWorkspaceMembers } from "@/actions/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, User } from "lucide-react";
import React from "react";
import Loader from "../loader";


type Props = {
  workspaceId: string;
};

type MemberData = {
  id: string;
  email: string;
  firstname: string | null;
  lastname: string | null;
  image: string | null;
  isOwner: boolean;
};

const WorkspaceMembers = ({ workspaceId }: Props) => {
  const { data, isFetched, isFetching } = useQueryData(
    [`workspace-members-${workspaceId}`],
    () => getWorkspaceMembers(workspaceId),
  );

  if (isFetching && !isFetched) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="py-8">
        <p className="text-zinc-400 text-center">
          No members in this workspace
        </p>
      </div>
    );
  }

  const { status, data: members } = data as {
    status: number;
    data: MemberData[];
  };

  if (status !== 200 || !members || members.length === 0) {
    return (
      <div className="py-8">
        <p className="text-zinc-400 text-center">
          No members in this workspace
        </p>
      </div>
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

export default WorkspaceMembers;
