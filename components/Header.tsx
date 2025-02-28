function Header() {
  return (
    <div
      className="bg-black min-h-[150px] pl-10 sm:pl-20 flex items-center"
      style={{ borderBottomLeftRadius: "60px" }}
    >
      <div>
        <h1 className="text-3xl text-white">ModGen</h1>
        <h5 className="text-sm text-white">
          Reversible Modification Image Generator
        </h5>
      </div>
    </div>
  );
}

export default Header;
