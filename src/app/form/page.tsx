import { Label } from "@/components/ui/label";
import { FieldInput } from "@/components/wed/field-input";
import { FieldTextarea } from "@/components/wed/field-textarea";
import { LogoUpload } from "./logo-upload";

const Page = () => {
  return (
    <div className="flex flex-col items-center min-h-dvh p-12">
      <div className="w-full max-w-2xl flex flex-col gap-6 border p-5 bg-white drop-shadow-sm rounded-[16px]">
        <div className="flex flex-col items-start gap-4">
          <span className="font-medium px-1">Upload logo</span>
          <LogoUpload />
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-4 flex-1">
            <span className="font-medium px-1">Pay To:</span>
            <div className="flex flex-col gap-4">
              <FieldInput
                id="pay2Company"
                label="Company"
                variant="bordered"
                className="shadow-none rounded-lg bg-white"
              />
              <FieldInput
                id="pay2Email"
                label="Email"
                variant="bordered"
                className="shadow-none rounded-lg bg-white"
              />
              <FieldTextarea
                id="pay2Address"
                label="Address"
                variant="bordered"
                disableResize
                className="shadow-none rounded-lg bg-white"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <span className="font-medium px-1">Invoiced To:</span>
            <div className="flex flex-col gap-4">
              <FieldInput
                id="invoiced2Company"
                label="Company"
                variant="bordered"
                className="shadow-none rounded-lg"
              />
              <FieldInput
                id="invoiced2Email"
                label="Email"
                variant="bordered"
                className="shadow-none rounded-lg"
              />
              <FieldTextarea
                id="invoiced2Address"
                label="Address"
                variant="bordered"
                disableResize
                className="shadow-none rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
