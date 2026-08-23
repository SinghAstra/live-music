"use client";

import React, { useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

interface ComponentPreviewProps {
  preview: React.ReactNode;
  code: React.ReactNode;
  className?: string;
}

export function ComponentPreview({
  preview,
  code,
  className,
}: ComponentPreviewProps) {
  const [isCopied, setIsCopied] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = () => {
    if (codeRef.current) {
      const text = codeRef.current.textContent || "";
      navigator.clipboard.writeText(text.trim());
      
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <Tabs
      defaultValue="preview"
      className={cn("relative my-6 w-full flex flex-col", className)}
    >
      <div className="flex w-full items-center justify-between">
        <TabsList className="rounded-none bg-transparent! p-0">
          <TabsTrigger
            value="preview"
            className="relative cursor-pointer rounded-none p-2 text-muted-foreground data-active:bg-transparent! data-active:shadow-none! data-active:text-foreground"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            value="code"
            className="relative cursor-pointer rounded-none p-2 text-muted-foreground data-active:bg-transparent! data-active:shadow-none! data-active:text-foreground"
          >
            Code
          </TabsTrigger>
        </TabsList>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={copyToClipboard}
          className="text-muted-foreground hover:text-foreground"
        >
          {isCopied ? (
            <>
              <Check className="mr-2 h-4 w-4 text-primary" />
              <span className="text-primary">Copied</span>
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copy Code
            </>
          )}
        </Button>
      </div>

      <TabsContent
        value="preview"
        className="mt-1 flex min-h-87.5 w-full items-center justify-center rounded-xl border bg-background p-10"
      >
        {preview}
      </TabsContent>
      
      <TabsContent 
        value="code" 
        className="mt-1 flex min-h-87.5 max-h-125 w-full overflow-auto rounded-xl border bg-muted/30"
      >
        <div className="w-full [&>pre]:m-0 [&>pre]:rounded-none [&>pre]:border-none [&>div]:m-0 [&>div]:rounded-none [&>div]:border-none">
          {code}
        </div>
      </TabsContent>

      <div className="hidden" aria-hidden="true" ref={codeRef}>
        {code}
      </div>
    </Tabs>
  );
}