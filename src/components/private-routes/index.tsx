import { useAuth } from "@/services";
import { pathnames } from "@/utils/constants";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useEffect, useState } from "react";

export const PrivateRoutes: FC<PropsWithChildren> = ({ children }) => {
  const user = useAuth((state) => state.value.user);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false); // Untuk mencegah rendering di server

  useEffect(() => {
    setIsMounted(true); // Menandai bahwa komponen sudah ter-mount di klien
  }, []);

  useEffect(() => {
    if (isMounted && !user) {
      router.replace(pathnames.login); // Redirect jika tidak ada user
    }
  }, [isMounted, user, router]);

  // Jangan render apa pun sebelum komponen ter-mount
  if (!isMounted || !user) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoutes;
