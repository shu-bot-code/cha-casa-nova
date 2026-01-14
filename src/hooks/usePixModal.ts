import { useState, useCallback } from "react";
import type { Gift } from "../types/gift";

export const usePixModal = () => {
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback((gift: Gift) => {
    setSelectedGift(gift);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
    setTimeout(() => setSelectedGift(null), 300);
  }, []);

  return { selectedGift, isOpen, openModal, closeModal };
};
