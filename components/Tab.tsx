"use client";
import { ReactNode, useEffect, useRef, useState } from "react";

interface TabProps {
  children: ReactNode;
  initialTab: number;
  setCurrentTab(activeTab: number): void;
}
export default function Tab({ children, initialTab, setCurrentTab }: TabProps) {
  const mainDiv = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    let childrens = mainDiv.current
      ?.childNodes as NodeListOf<HTMLAnchorElement>;

    if (childrens) {
      childrens.forEach((el, indx) => {
        el.onclick = function () {
          if (indx !== activeTab) {
            childrens[activeTab].classList.remove("tab-active");
            setActiveTab(indx);
          }
        };
      });
    }
  });

  useEffect(() => {
    let childrens = mainDiv.current
      ?.childNodes as NodeListOf<HTMLAnchorElement>;
    childrens[activeTab].classList.add("tab-active");
    setCurrentTab(activeTab);
  }, [activeTab]);

  return (
    <div ref={mainDiv} className="flex justify-center w-full tabs p-4">
      {children}
    </div>
  );
}
