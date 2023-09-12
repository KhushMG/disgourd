"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";
import { ActionTooltip } from "../action-tooltip";

export const InviteModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();

  const isModalOpen = isOpen && type === "invite";
  const { server } = data;

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );
      onOpen("invite", {server: response.data}); 
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="dark:bg-[#2B2D31] dark:text-white bg-zinc-300/50 text-black">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label
            className="uppercase text-xs font-bold 
          text-zinc-500  dark:text-white"
          >
            Server invite Link
          </Label>
          <div className="flex items-center mt-2 gap-x-3">
            <Input
              disabled={isLoading}
              className="bg-zinc-300/50 border-0
            focus-visible: ring-0 text-black
            focus-visible: ring-offset0 dark: bg-white
            dark:text-black"
              value={inviteUrl}
            />
            <Button
              disabled={isLoading}
              onClick={onCopy}
              size="icon"
              className="transition transform duration-300 ease-in-out "
            >
              {copied ? (
                <button
                  className="h-10 px-8 ml-4
               bg-green-500 rounded-lg 
               flex items-center justify-center text-white overflow-hidden"
                >
                  Copied
                </button>
              ) : (
                <Button
                  className="h-10 px-8 w-6
               bg-indigo-600 rounded-lg focus:shadow-outline hover:bg-indigo-900 
               flex items-center text-white gap-x-2 overflow-hidden ml-4"
                >
                  Copy
                </Button>
              )}
            </Button>
          </div>
          <Button
            onClick={onNew}
            disabled={isLoading}
            variant="link"
            size="sm"
            className="text-xs text-zinc-700 mt-4 dark:text-white"
          >
            Generate a new link
            <RefreshCw className="w-4 h-4 ml-2  dark:text-white" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
