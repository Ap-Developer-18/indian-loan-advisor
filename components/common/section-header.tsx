"use client";

import React from "react";
import Badge from "./badge";

interface SectionHeaderProps {
  badgeText: string;
  badgeIcon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle?: string;
  className?: string;
  alignment?: "left" | "center" | "right";
}

export default function SectionHeader({
  badgeText,
  badgeIcon: Icon,
  title,
  subtitle,
  className = "",
  alignment = "center",
}: SectionHeaderProps) {
  const alignmentStyles = {
    left: "text-left items-start mx-0 ml-0 mr-auto",
    center: "text-center items-center mx-auto",
    right: "text-right items-end mx-0 mr-0 ml-auto",
  };

  return (
    <div
      className={`flex flex-col max-w-3xl space-y-4 ${alignmentStyles[alignment]} ${className}`}
    >
      <Badge text={badgeText} icon={<Icon className="w-4 h-4" />} />
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">
        {title}
      </h2>
      <p className="text-muted text-sm md:text-base font-light leading-relaxed max-w-2xl">
        {subtitle}
      </p>
    </div>
  );
}
