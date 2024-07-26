import React from "react";

const FeedbackFooter: React.FC = () => {
  return (
    <div className="fixed bottom-0 w-screen items-center justify-center bg-blue-500 text-white p-5">
      <div className="flex items-center justify-center">
        <span>
          This site is under active development. Send your feedback{" "}
          <a
            className="underline"
            target="_blank"
            href="https://github.com/hartste90/ticket-tracker/discussions/16"
          >
            here
          </a>
          .
        </span>
      </div>
    </div>
  );
};

export default FeedbackFooter;
