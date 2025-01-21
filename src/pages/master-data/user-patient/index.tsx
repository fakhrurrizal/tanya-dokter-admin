import { getNavbarLayout } from "@/components";
import { NextPageWithLayout } from "@/pages/_app";
import UserListPasienPageViews from "@/views/master-data/users-pasien";
import Head from "next/head";

const UserList: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Daftar Pasien - Tanya Dokter</title>
      </Head>
      <UserListPasienPageViews />
    </>
  );
};

UserList.getLayout = getNavbarLayout;
export default UserList;
