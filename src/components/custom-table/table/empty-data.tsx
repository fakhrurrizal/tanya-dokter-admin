const EmptyDataTableCustom = () => {
  return (
    <>
      <div className="w-full h-[250px] flex flex-col gap-3 items-center justify-center">
        <img
          src="/images/data-empty.png"
          alt="data empty"
          className="w-full h-auto object-cover max-w-[100px]"
        />
        <p className="text-primary">Data Kosong</p>
      </div>
    </>
  );
};

export default EmptyDataTableCustom;
