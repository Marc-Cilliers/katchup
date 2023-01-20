import React from "react";

import { IconName, IconProps, Icons } from "./types";

interface ExtraIconProps {
  name: IconName;
}

export const Icon = ({
  name,
  height,
  width,
  viewBox,
}: IconProps & ExtraIconProps) => {
  const NamedIcon = Icons[name];

  return NamedIcon ? (
    <NamedIcon
      height={height}
      width={width}
      viewBox={viewBox}
      testID={`${name}-icon`}
    />
  ) : null;
};
