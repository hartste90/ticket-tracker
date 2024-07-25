import React, { useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { markListingAsSold } from "@/api/listings";
import { Listing } from "@/api/listing";
import { useToast } from "@/components/ui/use-toast";

interface RemoveListingDialogProps {
  setRemoveListingModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refreshListingData: () => void;
  listing: Listing | null;
}

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

const RemoveListingDialog: React.FC<RemoveListingDialogProps> = (props) => {
  const { toast } = useToast();
  const [status, setStatus] = useState<"idle" | "removing" | "error">("idle");

  const removeListing = async (listingId: string) => {
    setStatus("removing");
    await markListingAsSold(listingId);
    props.refreshListingData();
    toast({
      title: "Listing sold!",
      description: "The listing has been removed",
    });
    setStatus("idle");
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="">Mark Listing as Sold</DialogTitle>
        <DialogDescription>
          <span className="text-md">{props.listing?.eventName}</span>
          <span className="text-sm"> sold by </span>
          <span className="text-md underline">{props.listing?.posterName}</span>
        </DialogDescription>
        <div className="p-5 space-y-3">
          <Button
            variant="outline"
            className="min-w-full block"
            disabled={status === "removing"}
            onClick={async () => {
              if (props.listing == null) {
                console.error("Listing not found to mark sold");
              } else {
                await removeListing(props.listing.listingId);
                props.setRemoveListingModalOpen(false);
              }
            }}
          >
            I <span className="">bought</span> this ticket!
          </Button>
          <Button
            variant="outline"
            className="bg-blue-100 block min-w-full"
            disabled={status === "removing"}
            onClick={async () => {
              if (props.listing == null) {
                console.error("Listing not found to mark sold");
              } else {
                await removeListing(props.listing.listingId);
                props.setRemoveListingModalOpen(false);
              }
            }}
          >
            I <span className="">sold</span> this ticket!
          </Button>
        </div>
      </DialogHeader>
    </DialogContent>
  );
};
export default RemoveListingDialog;
