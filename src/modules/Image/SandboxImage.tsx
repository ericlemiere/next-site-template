import React from "react";
import Image from "next/image";

const SandboxImage = () => {
  return (
    <Image
      src="/placeholder.png"
      className="w-full h-full object-cover"
      alt="Sandbox Image"
      width={330}
      height={257}
    />
  );
};

export default SandboxImage;
