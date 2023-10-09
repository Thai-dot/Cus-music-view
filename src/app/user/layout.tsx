import MenuUser from "@/components/layout/user/menu-user";
import UserLayout from "@/components/layout/user/user-infor";


export default  function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  

  return (
    <main className=" w-[85%] mx-auto">
      <UserLayout />
      <div className="grid grid-cols-12 mt-6 lg:gap-20">
        <div className=" lg:col-span-3 hidden lg:block">
          <MenuUser />
        </div>

        <div className="lg:col-span-9 col-span-12">{children}</div>
      </div>
    </main>
  );
}
