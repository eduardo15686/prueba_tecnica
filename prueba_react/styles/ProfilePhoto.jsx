// ProfilePhoto.js
import React from "react";

const ProfilePhoto = ({ src, alt, style }) => {
  return (
    <img
      src="/images/profile.jpg"
      alt="Perfil"
      style={{
        width: "100%",
        height: "auto",
        borderRadius: "50%",
        objectFit: "cover",
        marginTop: 10,
      }}
    />
  );
};

export default ProfilePhoto;
