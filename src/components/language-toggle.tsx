"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGUAGES, usePathname, useRouter } from "@/i18n/routing";
import { ChevronDownIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export const LanguageToggle = () => {
  const t = useTranslations("locale");
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="group gap-1 p-0! h-fit w-fit text-base font-normal focus-visible:ring-0 hover:bg-transparent data-[state=open]:scale-95"
        >
          {t(currentLocale)}
          <ChevronDownIcon className="size-4 group-data-[state=open]:rotate-180 transition-transform duration-200" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        aria-label="Languages"
        className="min-w-fit p-2 rounded-xl"
      >
        {LANGUAGES.map((locale) => (
          <DropdownMenuItem
            key={locale}
            className="p-1.5 rounded-md text-base"
            onClick={() => router.replace(pathname, { locale })}
          >
            {t(locale)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
