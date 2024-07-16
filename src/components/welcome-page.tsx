//template page component
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

//add props with a function called setStatusCallback
type Props = {
  setStatusCallback: (status: string) => void;
};

export default function WelcomePage({ setStatusCallback }: Props) {
  const [status, setStatus] = useState("initializing");
  const [input, setInput] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  //fetch post from url
  const onSubmit = (input: string) => {
    setStatus("fetching");
    fetch(
      "https://k4i6ycglle.execute-api.us-west-1.amazonaws.com/validateLatestPassphrase",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer my-token",
        },
        body: JSON.stringify({ passphrase: input }),
      }
    )
      .then((response) => {
        if (response.status === 200) {
          setStatus("loaded");
          toast({
            title: "Passphrase Accepted",
            description: "Loading listings...",
            variant: "success",
          });
          setStatusCallback("authenticated");
        }
        if (response.status === 400) throw new Error("Malformed request");
        if (response.status === 401)
          throw new Error("Incorrect/outdated passphrase");
        // console.log("response is: ", response);
        return response.json();
      })
      .then((data) => {
        // console.log("data is: ", data);
        return data;
      })
      .catch((error) => {
        setStatus("idle");
        console.error("Error submitting passphrase:", error);
        toast({
          title: "Passphrase Rejected",
          description: error.toString(),
          variant: "destructive",
        });
      });
  };

  return (
    <div className="flex items-center justify-center p-10 w-screen h-screen">
      {/* {status === "fetching" && <p>Fetching...</p>} */}
      <div className=" bg-onyx-500 shadow-2xl rounded-2xl w-full max-w-2xl p-10">
        <h1 className="text-center text-xl mb-5 text-white">
          Welcome to Ticket Tracker
        </h1>
        <p className=" text-center mb-10 text-white">
          This is a private server for connecting people looking to buy and sell
          tickets in the SF Bay Area.
        </p>
        <div className="w-full flex flex-col justify-center items-center">
          <p className="mb-2 text-old_gold">
            Please enter the secret passphrase to gain entry.
          </p>
          <div className="flex w-full max-w-sm items-center space-x-2 content-center justify-center">
            <Input
              type="text"
              placeholder="enter passphrase"
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              className="bg-old_gold-500 hover:bg-old_gold-600"
              onClick={() => onSubmit(input)}
              type="submit"
              disabled={status === "fetching"}
            >
              {status === "fetching" ? (
                <Loader2 className="black animate-spin" size={24} />
              ) : (
                <ArrowRight className="black" size={24} />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
