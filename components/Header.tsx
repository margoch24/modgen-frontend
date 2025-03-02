"use client";

import { StorageType, useStorageItem } from "@/common/hooks/useStorage";
import { BackendUrlType, Env } from "@/common/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PROD_BASE_URL = process.env.NEXT_PUBLIC_PROD_BASE_URL;
const DEV_BASE_URL = process.env.NEXT_PUBLIC_DEV_BASE_URL;
const DEV_BASE_URL_TWO = process.env.NEXT_PUBLIC_DEV_BASE_URL_TWO;
const PROD_BASE_URL_TWO = process.env.NEXT_PUBLIC_PROD_BASE_URL_TWO;

function Header() {
  const [storedBackendUrlType, storeBackendUrlType] = useStorageItem<
    string | undefined
  >(StorageType.SessionStorage, "backendUrlType", BackendUrlType.One);

  return (
    <div
      className="bg-black min-h-[150px] px-10 sm:px-20 flex items-center"
      style={{ borderBottomLeftRadius: "60px" }}
    >
      <div>
        <h1 className="text-3xl text-white">ModGen</h1>
        <h5 className="text-sm text-white">
          Reversible Modification Image Generator
        </h5>
      </div>

      <div className="opacity-0 absolute right-5 top-0">
        <Select
          onValueChange={(value) => storeBackendUrlType(value)}
          value={storedBackendUrlType}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {process.env.NODE_ENV === Env.Production ? (
              <>
                <SelectItem value={BackendUrlType.One}>
                  {PROD_BASE_URL}
                </SelectItem>
                <SelectItem value={BackendUrlType.Two}>
                  {PROD_BASE_URL_TWO}
                </SelectItem>
              </>
            ) : (
              <>
                <SelectItem value={BackendUrlType.One}>
                  {DEV_BASE_URL}
                </SelectItem>
                <SelectItem value={BackendUrlType.Two}>
                  {DEV_BASE_URL_TWO}
                </SelectItem>
              </>
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default Header;
