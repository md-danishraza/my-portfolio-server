import { memo } from "react";

const ProfileImage = memo(({ profile }) => (
  <image
    href={profile}
    alt="Md. Danish Raza"
    x="-25"
    y="-25"
    width="250"
    height="250"
    // preserveAspectRatio="xMidYMid slice"
    fetchpriority="high" // ← Critical!
    loading="eager" // ← Don't lazy load LCP element
    style={{
      transform: "scale(1.5) translateY(20px) translateX(5px)", // Adjust this value to zoom in/out
      transformOrigin: "center",
    }}
  />
));

export default ProfileImage;
