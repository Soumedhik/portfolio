import React, { useState, useEffect } from "react";

function UserProfile({ name }) {
  const [userInitials, setUserInitials] = useState("");

  useEffect(() => {
    if (name) {
      setUserInitials(generateInitials(name));
    }
  }, [name]);

  return (
    <div className="flex items-center justify-center w-36 h-full bg-blue-500 rounded-full text-white text-2xl font-bold select-none">
      {name ? (
        <div className="text-white text-4xl font-normal">{userInitials}</div>
      ) : (
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img
              src="/assets/icons/external/loading-animation.gif"
              alt="Profile"
              className="pointer-events-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function generateInitials(name) {
  const words = name.split(" ");
  const initials = words
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
  return initials;
}

export { UserProfile, generateInitials };
